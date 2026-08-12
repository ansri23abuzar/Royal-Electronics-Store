"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn, formatPrice } from "@/lib/utils";
import type { FEATURED_PRODUCTS_QUERY_RESULT } from "@/sanity.types";

type FeaturedProduct = FEATURED_PRODUCTS_QUERY_RESULT[number];

interface FeaturedCarouselProps {
  products: FEATURED_PRODUCTS_QUERY_RESULT;
}

export function FeaturedCarousel({
  products,
}: FeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-zinc-950">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="relative w-full"
      >
        <CarouselContent className="ml-0">
          {products.map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-full pl-0"
            >
              <FeaturedSlide product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Arrow */}
        <CarouselPrevious
          className="
            left-4
            z-30
            border-zinc-600
            bg-zinc-900/80
            text-white
            backdrop-blur-sm
            hover:bg-zinc-800
            hover:text-white
            sm:left-6
            md:left-8
          "
        />

        {/* Next Arrow */}
        <CarouselNext
          className="
            right-4
            z-30
            border-zinc-600
            bg-zinc-900/80
            text-white
            backdrop-blur-sm
            hover:bg-zinc-800
            hover:text-white
            sm:right-6
            md:right-8
          "
        />

        {/* Dot Indicators */}
        {count > 1 && (
          <div
            className="
              absolute
              bottom-4
              left-1/2
              z-30
              flex
              -translate-x-1/2
              items-center
              gap-2
            "
          >
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  current === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        )}
      </Carousel>
    </section>
  );
}

interface FeaturedSlideProps {
  product: FeaturedProduct;
}

function FeaturedSlide({
  product,
}: FeaturedSlideProps) {
  const mainImage = product.images?.[0]?.asset?.url;

  return (
    <div
      className="
        flex
        h-[420px]
        w-full
        flex-col
        overflow-hidden
        bg-gradient-to-br
        from-zinc-900
        via-zinc-850
        to-zinc-950
        md:h-[500px]
        md:flex-row
      "
    >
      {/* =========================
          IMAGE
          ========================= */}
      <div
        className="
          relative
          h-[230px]
          w-full
          overflow-hidden
          bg-zinc-100
          md:h-full
          md:w-3/5
        "
      >
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name ?? "Featured product"}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain object-center"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-800">
            <span className="text-zinc-500">
              No image available
            </span>
          </div>
        )}

        {/* Image → Content gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            hidden
            w-1/4
            bg-gradient-to-r
            from-transparent
            to-zinc-900
            md:block
          "
        />

        {/* Mobile gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-gradient-to-t
            from-zinc-950
            to-transparent
            md:hidden
          "
        />
      </div>

      {/* =========================
          PRODUCT DETAILS
          ========================= */}
      <div
        className="
          flex
          w-full
          flex-1
          flex-col
          justify-center
          px-6
          py-6
          md:w-2/5
          md:px-8
          md:py-8
          lg:px-12
          xl:px-16
        "
      >
        {/* Category */}
        {product.category && (
          <Badge
            variant="secondary"
            className="
              mb-3
              w-fit
              border-0
              bg-amber-500/20
              text-amber-400
              hover:bg-amber-500/30
            "
          >
            {product.category.title}
          </Badge>
        )}

        {/* Product Name */}
        <h2
          className="
            text-2xl
            font-bold
            leading-tight
            tracking-tight
            text-white
            sm:text-3xl
            lg:text-4xl
          "
        >
          {product.name}
        </h2>

        {/* Description */}
        {product.description && (
          <p
            className="
              mt-3
              line-clamp-3
              text-sm
              leading-6
              text-zinc-300
              sm:text-base
            "
          >
            {product.description}
          </p>
        )}

        {/* Price */}
        <p
          className="
            mt-5
            text-3xl
            font-bold
            tracking-tight
            text-white
            lg:text-4xl
          "
        >
          {formatPrice(product.price)}
        </p>

        {/* Shop Button */}
        <div className="mt-5">
          <Button
            asChild
            size="lg"
            className="
              bg-white
              text-zinc-900
              hover:bg-zinc-100
            "
          >
            <Link href={`/products/${product.slug}`}>
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}