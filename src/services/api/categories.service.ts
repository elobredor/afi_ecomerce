import axiosInstance from "./axios.instance";

export const CategoriesService = {
	getAll: async () => {
		const { data } = await axiosInstance.get("/articleCategories");
		console.log("esto responde el servicio", data);
		return data;
	},
	getList: async () => {
		const { data } = await axiosInstance.get("/categories/getAll");
		return data;
	},
};
