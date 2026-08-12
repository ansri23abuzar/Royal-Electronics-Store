// ============================================
// Product Attribute Constants
// Shared between frontend filters and Sanity schema
// ============================================

export const COLORS = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "oak", label: "Oak" },
  { value: "walnut", label: "Walnut" },
  { value: "grey", label: "Grey" },
  { value: "natural", label: "Natural" },
] as const;

export const MATERIALS = [
  { value: "glass", label: "Glass" },
  { value: "aluminum", label: "Aluminum" },
  { value: "plastic", label: "Plastic" },
  { value: "glass-aluminum", label: "Glass + Aluminum" },
  { value: "glass-plastic", label: "Glass + Plastic" },
  { value: "vegan-leather", label: "Vegan Leather" },
  { value: "composite", label: "Composite" },
] as const;

export const RAM_OPTIONS = [
  { value: "4gb", label: "4 GB" },
  { value: "8gb", label: "8 GB" },
  { value: "12gb", label: "12 GB" },
  { value: "16gb", label: "16 GB" },
  { value: "24gb", label: "24 GB" },
  { value: "32gb", label: "32 GB" },
] as const;

export const STORAGE_OPTIONS = [
  { value: "64gb", label: "64 GB" },
  { value: "128gb", label: "128 GB" },
  { value: "256gb", label: "256 GB" },
  { value: "512gb", label: "512 GB" },
  { value: "1tb", label: "1 TB" },
] as const;

export const BATTERY_OPTIONS = [
  { value: "3000mah", label: "3000 mAh" },
  { value: "4000mah", label: "4000 mAh" },
  { value: "5000mah", label: "5000 mAh" },
  { value: "6000mah", label: "6000 mAh" },
] as const;

export const CAMERA_OPTIONS = [
  { value: "single", label: "Single Camera" },
  { value: "dual", label: "Dual Camera" },
  { value: "triple", label: "Triple Camera" },
  { value: "quad", label: "Quad Camera" },
  { value: "multi", label: "Multi Camera" },
] as const;

export const NETWORK_OPTIONS = [
  { value: "4g", label: "4G" },
  { value: "5g", label: "5G" },
  { value: "wifi6", label: "Wi-Fi 6" },
  { value: "wifi6e", label: "Wi-Fi 6E" },
  { value: "wifi7", label: "Wi-Fi 7" },
] as const;

export const OS_OPTIONS = [
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "windows", label: "Windows" },
  { value: "chromeos", label: "ChromeOS" },
  { value: "linux", label: "Linux" },
] as const;

export const BRANDS = [
  { value: "apple", label: "Apple" },
  { value: "samsung", label: "Samsung" },
  { value: "oneplus", label: "OnePlus" },
  { value: "xiaomi", label: "Xiaomi" },
  { value: "sony", label: "Sony" },
  { value: "asus", label: "ASUS" },
  { value: "dell", label: "Dell" },
] as const;

export const DISPLAY_OPTIONS = [
  { value: "lcd", label: "LCD" },
  { value: "oled", label: "OLED" },
  { value: "amoled", label: "AMOLED" },
  { value: "ips", label: "IPS" },
  { value: "retina", label: "Retina" },
] as const;

export const PROCESSOR_OPTIONS = [
  { value: "snapdragon", label: "Snapdragon" },
  { value: "apple-silicon", label: "Apple Silicon" },
  { value: "intel", label: "Intel" },
  { value: "amd", label: "AMD" },
  { value: "mediatek", label: "MediaTek" },
  { value: "exynos", label: "Exynos" },
] as const;

export const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "relevance", label: "Relevance" },
] as const;

// Type exports
export type ColorValue = (typeof COLORS)[number]["value"];
export type MaterialValue = (typeof MATERIALS)[number]["value"];
export type RamValue = (typeof RAM_OPTIONS)[number]["value"];
export type StorageValue = (typeof STORAGE_OPTIONS)[number]["value"];
export type BatteryValue = (typeof BATTERY_OPTIONS)[number]["value"];
export type CameraValue = (typeof CAMERA_OPTIONS)[number]["value"];
export type NetworkValue = (typeof NETWORK_OPTIONS)[number]["value"];
export type OsValue = (typeof OS_OPTIONS)[number]["value"];
export type BrandValue = (typeof BRANDS)[number]["value"];
export type DisplayValue = (typeof DISPLAY_OPTIONS)[number]["value"];
export type ProcessorValue = (typeof PROCESSOR_OPTIONS)[number]["value"];
export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// ============================================
// Sanity Schema Format Exports
// Format compatible with Sanity's options.list
// ============================================

/** Colors formatted for Sanity schema options.list */
export const COLORS_SANITY_LIST = COLORS.map(({ value, label }) => ({
  title: label,
  value,
}));

/** Materials formatted for Sanity schema options.list */
export const MATERIALS_SANITY_LIST = MATERIALS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const RAM_SANITY_LIST = RAM_OPTIONS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const STORAGE_SANITY_LIST = STORAGE_OPTIONS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const BATTERY_SANITY_LIST = BATTERY_OPTIONS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const CAMERA_SANITY_LIST = CAMERA_OPTIONS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const NETWORK_SANITY_LIST = NETWORK_OPTIONS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const OS_SANITY_LIST = OS_OPTIONS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const BRANDS_SANITY_LIST = BRANDS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const DISPLAY_SANITY_LIST = DISPLAY_OPTIONS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const PROCESSOR_SANITY_LIST = PROCESSOR_OPTIONS.map(({ value, label }) => ({
  title: label,
  value,
}));

/** Color values array for zod enums or validation */
export const COLOR_VALUES = COLORS.map((c) => c.value) as [
  ColorValue,
  ...ColorValue[],
];

/** Material values array for zod enums or validation */
export const MATERIAL_VALUES = MATERIALS.map((m) => m.value) as [
  MaterialValue,
  ...MaterialValue[],
];
