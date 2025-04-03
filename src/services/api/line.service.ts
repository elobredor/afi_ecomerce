import axiosInstance from "./axios.instance";

export const LineService = {
	getAll: async (categoryname: string, brandname: string, ) => {
		// Convertir '-' a '/' y '_' a espacios en los parámetros
		categoryname = categoryname.replace(/-/g, '/').replace(/_/g, ' ');
		brandname = brandname.replace(/-/g, '/').replace(/_/g, ' ');

		const { data } = await axiosInstance.post(`/articlesLine`, { brandname, categoryname});
		return data;
	},
	getArticles: async (categoryname: string, brandname: string, linename: string) => {
		// Convertir '-' a '/' y '_' a espacios en los parámetros
		categoryname = categoryname.replace(/-/g, '/').replace(/_/g, ' ');
		brandname = brandname.replace(/-/g, '/').replace(/_/g, ' ');
		linename = linename.replace(/-/g, '/').replace(/_/g, ' ');

		const { data } = await axiosInstance.post(`/articles`, { brandname, categoryname, linename });
		return data;
	},
};
