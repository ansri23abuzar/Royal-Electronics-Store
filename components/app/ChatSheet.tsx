"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useAuth } from "@clerk/nextjs";
import { Bot, Loader2, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useChatActions,
  useIsChatOpen,
  usePendingMessage,
} from "@/lib/store/chat-store-provider";

import {
  getToolParts,
  MessageBubble,
  ToolCallUI,
  WelcomeScreen,
} from "./chat";

export function ChatSheet() {
  const isOpen = useIsChatOpen();

  const { closeChat, clearPendingMessage } = useChatActions();

  const pendingMessage = usePendingMessage();

  const { isSignedIn } = useAuth();

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connect the chatbot to our API route
  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading =
    status === "streaming" || status === "submitted";

  // Scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Send pending message when chat opens
  useEffect(() => {
    if (
      isOpen &&
      pendingMessage &&
      !isLoading
    ) {
      sendMessage({
        text: pendingMessage,
      });

      clearPendingMessage();
    }
  }, [
    isOpen,
    pendingMessage,
    isLoading,
    sendMessage,
    clearPendingMessage,
  ]);

  // Submit message
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = input.trim();

    if (!message || isLoading) {
      return;
    }

    sendMessage({
      text: message,
    });

    setInput("");
  };

  // Don't render when chat is closed
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile / tablet backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 xl:hidden"
        onClick={closeChat}
        aria-hidden="true"
      />

      {/* Chat sidebar */}
      <div
        className="
          fixed
          top-0
          right-0
          z-50
          flex
          h-full
          w-full
          flex-col
          border-l
          border-zinc-200
          bg-white
          overscroll-contain
          dark:border-zinc-800
          dark:bg-zinc-950
          sm:w-[448px]
          animate-in
          slide-in-from-right
          duration-300
        "
      >
        {/* Header */}
        <header className="shrink-0 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Sparkles className="h-5 w-5 text-amber-500" />
              </div>

              <div>
                <div className="font-semibold">
                  Shopping Assistant
                </div>

                <div className="text-xs text-zinc-500">
                  Royal Electronics Store
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={closeChat}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {messages.length === 0 ? (
            <WelcomeScreen
              onSuggestionClick={(text : string) => {
                sendMessage({ text });
              }}
              isSignedIn={isSignedIn ?? false}
            />
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                /*
                 * AI SDK messages now use `parts`.
                 *
                 * Text is stored inside:
                 * message.parts -> { type: "text", text: "..." }
                 *
                 * This prevents [object Object] from appearing.
                 */

                const content = message.parts
                  .filter(
                    (part) => part.type === "text",
                  )
                  .map(
                    (part) => part.text,
                  )
                  .join("");

                const toolParts =
                  getToolParts(message);

                const hasContent =
                  content.length > 0;

                const hasTools =
                  toolParts.length > 0;

                if (
                  !hasContent &&
                  !hasTools
                ) {
                  return null;
                }

                return (
                  <div
                    key={message.id}
                    className="space-y-3"
                  >
                    {/* Tool calls */}
                    {hasTools &&
                      toolParts.map(
                        (toolPart) => (
                          <ToolCallUI
                            key={`tool-${message.id}-${toolPart.toolCallId}`}
                            toolPart={toolPart}
                            closeChat={closeChat}
                          />
                        ),
                      )}

                    {/* Message */}
                    {hasContent && (
                      <MessageBubble
                        role={message.role}
                        content={content}
                        closeChat={closeChat}
                      />
                    )}
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <Bot className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.3s]" />

                      <span className="h-2 w-2 animate-bounce rounded-full bg-amber-400 [animation-delay:-0.15s]" />

                      <span className="h-2 w-2 animate-bounce rounded-full bg-amber-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* API error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                  <p className="font-semibold">
                    Something went wrong.
                  </p>

                  <p className="mt-1 break-words">
                    {error.message ||
                      "Unable to connect to the AI assistant."}
                  </p>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950">
          <form
            onSubmit={handleSubmit}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              placeholder="Ask about phones, laptops, headphones..."
              disabled={isLoading}
              className="flex-1"
            />

            <Button
              type="submit"
              size="icon"
              disabled={
                !input.trim() ||
                isLoading
              }
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}