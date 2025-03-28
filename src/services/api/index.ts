import { CatalogService } from "./catalog.service";
import { CategoriesService } from "./categories.service";
import { LineService } from "./line.service";
import { productService } from "./products.service";
import { userService } from "./user.service";


export const api = {
	catalog: CatalogService,
	user: userService, 
	products: productService,
	categories: CategoriesService,
	line:LineService
} as const;

// Type for the entire API
export type Api = typeof api;
