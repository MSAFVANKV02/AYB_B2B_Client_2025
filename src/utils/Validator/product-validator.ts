import { z } from "zod";

const AVAILABLE_SORT = ["none", "lowtohigh", "hightolow", "bestselling"] as const;

export const SORT_OPTIONS = [
  { name: "New Arrivals", value: "none" },
  { name: "Price : Low to High", value: "lowtohigh" },
  { name: "Price : High to Low", value: "hightolow" },
  { name: "Best Selling", value: "bestselling" },
];

const AVAILABLE_FiLTERS = ["price", "minOrder", "brand", "color","size",""] as const;



export const ProductFilterValidator = z.object({
  colors: z.array(z.string()),
  fTab:z.enum(AVAILABLE_FiLTERS),
  size: z.array(z.string()),
  sort: z.enum(AVAILABLE_SORT),
  brands: z.array(z.string()),
  // minimumQuantity: z.number(),
  minimumQuantity: z.union([z.number(), z.undefined()]),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
});

export type ProductState = Omit<z.infer<typeof ProductFilterValidator>, "priceRange"> & {
  priceRange: { min: number; max: number };
};
