"use client";

import {
  Cable,
  Grid2X2,
  Headphones,
  Smartphone,
  Speaker,
  Watch,
} from "lucide-react";
import Link from "next/link";
import type { ALL_CATEGORIES_QUERY_RESULT } from "@/sanity.types";

interface CategoryTilesProps {
  categories: ALL_CATEGORIES_QUERY_RESULT;
  activeCategory?: string;
}

/*
 * Icons used for each category.
 *
 * The key should match the category title
 * coming from Sanity.
 */
const categoryIcons = {
  accessories: Cable,
  headphones: Headphones,
  mobiles: Smartphone,
  "mobile cases": Smartphone,
  "mobiles cases": Smartphone,
  speaker: Speaker,
  speakers: Speaker,
  smartwatch: Watch,
  smartwatches: Watch,
};

/*
 * Returns the correct icon for a category.
 * If a category doesn't have a matching icon,
 * Grid2X2 is used as the default.
 */
function getCategoryIcon(title: string | null | undefined) {
  if (!title) {
    return Grid2X2;
  }

  const key = title.trim().toLowerCase();

  return (
    categoryIcons[key as keyof typeof categoryIcons] ??
    Grid2X2
  );
}

export function CategoryTiles({
  categories,
  activeCategory,
}: CategoryTilesProps) {
  return (
    <div className="relative w-full">
      {/* Horizontal scrolling container */}
      <div
        className="
          flex
          gap-4
          overflow-x-auto
          px-4
          py-4
          sm:px-6
          lg:px-8
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* =========================================
            ALL PRODUCTS
        ========================================= */}
        <Link
          href="/"
          className={`
            group
            relative
            flex-shrink-0
            overflow-hidden
            rounded-2xl
            transition-all
            duration-300
            hover:-translate-y-1
            ${
              !activeCategory
                ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-950"
                : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-950"
            }
          `}
        >
          <div
            className="
              relative
              flex
              h-40
              w-56
              flex-col
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              bg-gradient-to-br
              from-zinc-800
              via-zinc-900
              to-black
              sm:h-48
              sm:w-64
              lg:h-52
              lg:w-72
            "
          >
            {/* Decorative circle */}
            <div
              className="
                absolute
                -right-10
                -top-10
                h-32
                w-32
                rounded-full
                bg-white/5
                transition-transform
                duration-500
                group-hover:scale-125
              "
            />

            {/* Icon background */}
            <div
              className="
                relative
                z-10
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/10
                backdrop-blur-sm
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:bg-white/15
              "
            >
              <Grid2X2
                className="
                  h-8
                  w-8
                  text-white
                  transition-transform
                  duration-300
                  group-hover:rotate-6
                "
                strokeWidth={1.7}
              />
            </div>

            {/* Title */}
            <span
              className="
                relative
                z-10
                mt-5
                text-sm
                font-semibold
                text-white
                sm:text-base
              "
            >
              All Products
            </span>

            {/* Active indicator */}
            {!activeCategory && (
              <span
                className="
                  absolute
                  bottom-3
                  h-1
                  w-8
                  rounded-full
                  bg-amber-500
                "
              />
            )}
          </div>
        </Link>

        {/* =========================================
            SANITY CATEGORIES
        ========================================= */}
        {categories.map((category) => {
          const title = category.title ?? "Category";

          const isActive = activeCategory === category.slug;

          const Icon = getCategoryIcon(title);

          return (
            <Link
              key={category._id}
              href={`/?category=${category.slug}`}
              className={`
                group
                relative
                flex-shrink-0
                overflow-hidden
                rounded-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                ${
                  isActive
                    ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-950"
                    : "hover:ring-2 hover:ring-amber-300 hover:ring-offset-2 dark:hover:ring-amber-500 dark:hover:ring-offset-zinc-950"
                }
              `}
            >
              <div
                className="
                  relative
                  flex
                  h-40
                  w-56
                  flex-col
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  bg-gradient-to-br
                  from-amber-400
                  via-amber-500
                  to-orange-500
                  sm:h-48
                  sm:w-64
                  lg:h-52
                  lg:w-72
                "
              >
                {/* Decorative background circles */}
                <div
                  className="
                    absolute
                    -right-12
                    -top-12
                    h-36
                    w-36
                    rounded-full
                    bg-white/10
                    transition-transform
                    duration-500
                    group-hover:scale-125
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-16
                    -left-12
                    h-32
                    w-32
                    rounded-full
                    bg-black/5
                    transition-transform
                    duration-500
                    group-hover:scale-125
                  "
                />

                {/* Icon */}
                <div
                  className={`
                    relative
                    z-10
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/20
                    bg-white/20
                    shadow-lg
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-white/30
                    ${
                      isActive
                        ? "scale-105 bg-white/30"
                        : ""
                    }
                  `}
                >
                  <Icon
                    className="
                      h-8
                      w-8
                      text-zinc-950
                      transition-transform
                      duration-300
                      group-hover:rotate-3
                    "
                    strokeWidth={1.8}
                  />
                </div>

                {/* Category name */}
                <span
                  className="
                    relative
                    z-10
                    mt-5
                    text-center
                    text-sm
                    font-semibold
                    text-zinc-950
                    sm:text-base
                  "
                >
                  {title}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <span
                    className="
                      absolute
                      bottom-3
                      h-1
                      w-8
                      rounded-full
                      bg-zinc-950
                    "
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}