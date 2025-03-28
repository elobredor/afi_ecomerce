import { CatalogService } from "./catalog.service";
import { CategoriesService } from "./categories.service";
import { productService } from "./products.service";
import { userService } from "./user.service";


export const api = {

	catalog: CatalogService,
	user: userService, 
	products: productService,
	categories: CategoriesService,
} as const;

// Type for the entire API
export type Api = typeof api;
