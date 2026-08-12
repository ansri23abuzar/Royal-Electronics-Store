import { PackageIcon } from "@sanity/icons/Package";
import { defineField, defineType } from "sanity";
import {
  BATTERY_SANITY_LIST,
  BRANDS_SANITY_LIST,
  CAMERA_SANITY_LIST,
  COLORS_SANITY_LIST,
  DISPLAY_SANITY_LIST,
  MATERIALS_SANITY_LIST,
  NETWORK_SANITY_LIST,
  OS_SANITY_LIST,
  PROCESSOR_SANITY_LIST,
  RAM_SANITY_LIST,
  STORAGE_SANITY_LIST,
} from "@/lib/constants/filters";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "inventory", title: "Inventory" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "details",
      validation: (rule) => [rule.required().error("Product name is required")],
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "details",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => [
        rule.required().error("Slug is required for URL generation"),
      ],
    }),
    defineField({
      name: "description",
      type: "text",
      group: "details",
      rows: 4,
      description: "Product description",
    }),
    defineField({
      name: "price",
      type: "number",
      group: "details",
      description: "Price in INR (e.g., 5999.99)",
      validation: (rule) => [
        rule.required().error("Price is required"),
        rule.positive().error("Price must be a positive number"),
      ],
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (rule) => [rule.required().error("Category is required")],
    }),
    defineField({
      name: "material",
      type: "string",
      group: "details",
      options: {
        list: MATERIALS_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "color",
      type: "string",
      group: "details",
      options: {
        list: COLORS_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "ram",
      type: "string",
      group: "details",
      title: "RAM",
      options: {
        list: RAM_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "storage",
      type: "string",
      group: "details",
      title: "Storage",
      options: {
        list: STORAGE_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "battery",
      type: "string",
      group: "details",
      title: "Battery",
      options: {
        list: BATTERY_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "camera",
      type: "string",
      group: "details",
      title: "Camera",
      options: {
        list: CAMERA_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "network",
      type: "string",
      group: "details",
      title: "Network",
      options: {
        list: NETWORK_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "os",
      type: "string",
      group: "details",
      title: "OS",
      options: {
        list: OS_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "brand",
      type: "string",
      group: "details",
      title: "Brand",
      options: {
        list: BRANDS_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "display",
      type: "string",
      group: "details",
      title: "Display",
      options: {
        list: DISPLAY_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "processor",
      type: "string",
      group: "details",
      title: "Processor",
      options: {
        list: PROCESSOR_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "dimensions",
      type: "string",
      group: "details",
      description: 'e.g., "120cm x 80cm x 75cm"',
    }),
    defineField({
      name: "images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => [
        rule.min(1).error("At least one image is required"),
      ],
    }),
    defineField({
      name: "stock",
      type: "number",
      group: "inventory",
      initialValue: 0,
      description: "Number of items in stock",
      validation: (rule) => [
        rule.min(0).error("Stock cannot be negative"),
        rule.integer().error("Stock must be a whole number"),
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "inventory",
      initialValue: false,
      description: "Show on homepage and promotions",
    }),
    defineField({
      name: "assemblyRequired",
      type: "boolean",
      group: "inventory",
      initialValue: false,
      description: "Does this product require assembly?",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.title",
      media: "images.0",
      price: "price",
    },
    prepare({ title, subtitle, media, price }) {
      return {
        title,
        subtitle: `${subtitle ? `${subtitle} • ` : ""}₹${price ?? 0}`,
        media,
      };
    },
  },
});
