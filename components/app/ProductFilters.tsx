"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BATTERY_OPTIONS,
  BRANDS,
  CAMERA_OPTIONS,
  COLORS,
  DISPLAY_OPTIONS,
  MATERIALS,
  NETWORK_OPTIONS,
  OS_OPTIONS,
  PROCESSOR_OPTIONS,
  RAM_OPTIONS,
  SORT_OPTIONS,
  STORAGE_OPTIONS,
} from "@/lib/constants/filters";
import type { ALL_CATEGORIES_QUERY_RESULT } from "@/sanity.types";

interface ProductFiltersProps {
  categories: ALL_CATEGORIES_QUERY_RESULT;
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentColor = searchParams.get("color") ?? "";
  const currentMaterial = searchParams.get("material") ?? "";
  const currentRam = searchParams.get("ram") ?? "";
  const currentStorage = searchParams.get("storage") ?? "";
  const currentBattery = searchParams.get("battery") ?? "";
  const currentCamera = searchParams.get("camera") ?? "";
  const currentNetwork = searchParams.get("network") ?? "";
  const currentOs = searchParams.get("os") ?? "";
  const currentBrand = searchParams.get("brand") ?? "";
  const currentDisplay = searchParams.get("display") ?? "";
  const currentProcessor = searchParams.get("processor") ?? "";
  const currentSort = searchParams.get("sort") ?? "name";
  const currentInStock = searchParams.get("inStock") === "true";

  // Check which filters are active
  const isSearchActive = !!currentSearch;
  const isCategoryActive = !!currentCategory;
  const isColorActive = !!currentColor;
  const isMaterialActive = !!currentMaterial;
  const isRamActive = !!currentRam;
  const isStorageActive = !!currentStorage;
  const isBatteryActive = !!currentBattery;
  const isCameraActive = !!currentCamera;
  const isNetworkActive = !!currentNetwork;
  const isOsActive = !!currentOs;
  const isBrandActive = !!currentBrand;
  const isDisplayActive = !!currentDisplay;
  const isProcessorActive = !!currentProcessor;
  const MOBILE_CATEGORY_SLUGS = [
    "mobile",
    "mobiles",
    "smartphone",
    "smartphones",
    "phone",
    "phones",
    "cellphone",
    "cellphones",
    "cell-phone",
    "cell-phones",
  ];
  const isMobileCategory = MOBILE_CATEGORY_SLUGS.includes(
    currentCategory.toLowerCase(),
  );
  const isInStockActive = currentInStock;

  const hasActiveFilters =
    isSearchActive ||
    isCategoryActive ||
    (isMobileCategory && isColorActive) ||
    (isMobileCategory && isMaterialActive) ||
    (isMobileCategory && isRamActive) ||
    (isMobileCategory && isStorageActive) ||
    (isMobileCategory && isBatteryActive) ||
    (isMobileCategory && isCameraActive) ||
    (isMobileCategory && isNetworkActive) ||
    (isMobileCategory && isOsActive) ||
    (isMobileCategory && isBrandActive) ||
    (isMobileCategory && isDisplayActive) ||
    (isMobileCategory && isProcessorActive) ||
    isInStockActive;

  // Count active filters
  const activeFilterCount = [
    isSearchActive,
    isCategoryActive,
    isMobileCategory && isColorActive,
    isMobileCategory && isMaterialActive,
    isMobileCategory && isRamActive,
    isMobileCategory && isStorageActive,
    isMobileCategory && isBatteryActive,
    isMobileCategory && isCameraActive,
    isMobileCategory && isNetworkActive,
    isMobileCategory && isOsActive,
    isMobileCategory && isBrandActive,
    isMobileCategory && isDisplayActive,
    isMobileCategory && isProcessorActive,
    isInStockActive,
  ].filter(Boolean).length;

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === 0) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    updateParams({ q: searchQuery || null });
  };

  const handleClearFilters = () => {
    router.push("/", { scroll: false });
  };

  const clearSingleFilter = (key: string) => {
    updateParams({ [key]: null });
  };

  // Helper to build labels for selected filters (used in mobile badge row)
  const getLabel = (
    list: { label: string; value: string }[] | undefined,
    value: string,
  ) => list?.find((i) => i.value === value)?.label ?? value;

  const selectedFilters: { key: string; label: string }[] = [];
  if (isMobileCategory && isColorActive) selectedFilters.push({ key: "color", label: getLabel(COLORS, currentColor) });
  if (isMobileCategory && isMaterialActive) selectedFilters.push({ key: "material", label: getLabel(MATERIALS, currentMaterial) });
  if (isMobileCategory && isRamActive) selectedFilters.push({ key: "ram", label: getLabel(RAM_OPTIONS, currentRam) });
  if (isMobileCategory && isStorageActive) selectedFilters.push({ key: "storage", label: getLabel(STORAGE_OPTIONS, currentStorage) });
  if (isMobileCategory && isBatteryActive) selectedFilters.push({ key: "battery", label: getLabel(BATTERY_OPTIONS, currentBattery) });
  if (isMobileCategory && isCameraActive) selectedFilters.push({ key: "camera", label: getLabel(CAMERA_OPTIONS, currentCamera) });
  if (isMobileCategory && isNetworkActive) selectedFilters.push({ key: "network", label: getLabel(NETWORK_OPTIONS, currentNetwork) });
  if (isMobileCategory && isOsActive) selectedFilters.push({ key: "os", label: getLabel(OS_OPTIONS, currentOs) });
  if (isMobileCategory && isBrandActive) selectedFilters.push({ key: "brand", label: getLabel(BRANDS, currentBrand) });
  if (isMobileCategory && isDisplayActive) selectedFilters.push({ key: "display", label: getLabel(DISPLAY_OPTIONS, currentDisplay) });
  if (isMobileCategory && isProcessorActive) selectedFilters.push({ key: "processor", label: getLabel(PROCESSOR_OPTIONS, currentProcessor) });

  // Helper for filter label with active indicator
  const FilterLabel = ({
    children,
    isActive,
    filterKey,
  }: {
    children: React.ReactNode;
    isActive: boolean;
    filterKey: string;
  }) => (
    <div className="mb-2 flex items-center justify-between">
      <span
        className={`block text-sm font-medium ${
          isActive
            ? "text-zinc-900 dark:text-zinc-100"
            : "text-zinc-700 dark:text-zinc-300"
        }`}
      >
        {children}
        {isActive && (
          <Badge className="ml-2 h-5 bg-amber-500 px-1.5 text-xs text-white hover:bg-amber-500">
            Active
          </Badge>
        )}
      </span>
      {isActive && (
        <button
          type="button"
          onClick={() => clearSingleFilter(filterKey)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          aria-label={`Clear ${filterKey} filter`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Clear Filters - Show at top when active */}
      {hasActiveFilters && (
        <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-950">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
              {activeFilterCount}{" "}
              {activeFilterCount === 1 ? "filter" : "filters"} applied
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleClearFilters}
            className="w-full bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
          >
            <X className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
          {/* Mobile: show selected filters as clearable badges */}
          {selectedFilters.length > 0 && (
            <div className="mt-2 sm:hidden flex flex-wrap gap-2">
              {selectedFilters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => clearSingleFilter(f.key)}
                  className="inline-flex items-center"
                >
                  <Badge className="h-6 bg-amber-100 text-amber-800 px-2 dark:bg-amber-900 dark:text-amber-200">
                    {f.label}
                    <X className="ml-2 h-3 w-3" />
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search */}
      <div>
        <FilterLabel isActive={isSearchActive} filterKey="q">
          Search
        </FilterLabel>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            name="search"
            placeholder="Search products..."
            defaultValue={currentSearch}
            className={`flex-1 ${
              isSearchActive
                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                : ""
            }`}
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>
      </div>

      {/* Category */}
      <div>
        <FilterLabel isActive={isCategoryActive} filterKey="category">
          Category
        </FilterLabel>
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) => {
            const selectedCategory = value === "all" ? null : value;
            const isSelectedMobile =
              !!selectedCategory &&
              MOBILE_CATEGORY_SLUGS.includes(selectedCategory.toLowerCase());

            const updates: Record<string, string | number | null> = {
              category: selectedCategory,
            };

            if (!isSelectedMobile) {
              updates.ram = null;
              updates.storage = null;
              updates.battery = null;
              updates.camera = null;
              updates.network = null;
              updates.os = null;
              updates.brand = null;
              updates.display = null;
              updates.processor = null;
            }

            updateParams(updates);
          }}
        >
          <SelectTrigger
            className={
              isCategoryActive
                ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                : ""
            }
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.slug ?? ""}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color (mobile-only) */}
      {isMobileCategory && (
        <div>
          <FilterLabel isActive={isColorActive} filterKey="color">
            Color
          </FilterLabel>
          <Select
            value={currentColor || "all"}
            onValueChange={(value) =>
              updateParams({ color: value === "all" ? null : value })
            }
          >
            <SelectTrigger
              className={
                isColorActive
                  ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                  : ""
              }
            >
              <SelectValue placeholder="All Colors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colors</SelectItem>
              {COLORS.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Material (mobile-only) */}
      {isMobileCategory && (
        <div>
          <FilterLabel isActive={isMaterialActive} filterKey="material">
            Material
          </FilterLabel>
          <Select
            value={currentMaterial || "all"}
            onValueChange={(value) =>
              updateParams({ material: value === "all" ? null : value })
            }
          >
            <SelectTrigger
              className={
                isMaterialActive
                  ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                  : ""
              }
            >
              <SelectValue placeholder="All Materials" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Materials</SelectItem>
              {MATERIALS.map((material) => (
                <SelectItem key={material.value} value={material.value}>
                  {material.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {isMobileCategory && (
        <>
          {/* RAM */}
          <div>
            <FilterLabel isActive={isRamActive} filterKey="ram">
              RAM
            </FilterLabel>
            <Select
              value={currentRam || "all"}
              onValueChange={(value) =>
                updateParams({ ram: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isRamActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All RAM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All RAM</SelectItem>
                {RAM_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Storage */}
          <div>
            <FilterLabel isActive={isStorageActive} filterKey="storage">
              Storage
            </FilterLabel>
            <Select
              value={currentStorage || "all"}
              onValueChange={(value) =>
                updateParams({ storage: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isStorageActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All Storage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Storage</SelectItem>
                {STORAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Battery */}
          <div>
            <FilterLabel isActive={isBatteryActive} filterKey="battery">
              Battery
            </FilterLabel>
            <Select
              value={currentBattery || "all"}
              onValueChange={(value) =>
                updateParams({ battery: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isBatteryActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All Battery" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Battery</SelectItem>
                {BATTERY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Camera */}
          <div>
            <FilterLabel isActive={isCameraActive} filterKey="camera">
              Camera
            </FilterLabel>
            <Select
              value={currentCamera || "all"}
              onValueChange={(value) =>
                updateParams({ camera: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isCameraActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All Cameras" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cameras</SelectItem>
                {CAMERA_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Network */}
          <div>
            <FilterLabel isActive={isNetworkActive} filterKey="network">
              Network
            </FilterLabel>
            <Select
              value={currentNetwork || "all"}
              onValueChange={(value) =>
                updateParams({ network: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isNetworkActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All Networks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Networks</SelectItem>
                {NETWORK_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* OS */}
          <div>
            <FilterLabel isActive={isOsActive} filterKey="os">
              OS
            </FilterLabel>
            <Select
              value={currentOs || "all"}
              onValueChange={(value) =>
                updateParams({ os: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isOsActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All OS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All OS</SelectItem>
                {OS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brand */}
          <div>
            <FilterLabel isActive={isBrandActive} filterKey="brand">
              Brand
            </FilterLabel>
            <Select
              value={currentBrand || "all"}
              onValueChange={(value) =>
                updateParams({ brand: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isBrandActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {BRANDS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Display */}
          <div>
            <FilterLabel isActive={isDisplayActive} filterKey="display">
              Display
            </FilterLabel>
            <Select
              value={currentDisplay || "all"}
              onValueChange={(value) =>
                updateParams({ display: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isDisplayActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All Displays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Displays</SelectItem>
                {DISPLAY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Processor */}
          <div>
            <FilterLabel isActive={isProcessorActive} filterKey="processor">
              Processor
            </FilterLabel>
            <Select
              value={currentProcessor || "all"}
              onValueChange={(value) =>
                updateParams({ processor: value === "all" ? null : value })
              }
            >
              <SelectTrigger
                className={
                  isProcessorActive
                    ? "border-amber-500 ring-1 ring-amber-500 dark:border-amber-400 dark:ring-amber-400"
                    : ""
                }
              >
                <SelectValue placeholder="All Processors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Processors</SelectItem>
                {PROCESSOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* In Stock Only */}
      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) =>
              updateParams({ inStock: e.target.checked ? "true" : null })
            }
            className="h-5 w-5 rounded border-zinc-300 text-amber-500 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800"
          />
          <span
            className={`text-sm font-medium ${
              isInStockActive
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            Show only in-stock
            {isInStockActive && (
              <Badge className="ml-2 h-5 bg-amber-500 px-1.5 text-xs text-white hover:bg-amber-500">
                Active
              </Badge>
            )}
          </span>
        </label>
      </div>

      {/* Sort */}
      <div>
        <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Sort By
        </span>
        <Select
          value={currentSort}
          onValueChange={(value) => updateParams({ sort: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
