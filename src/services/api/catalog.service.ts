import axiosInstance from "./axios.instance";

export const CatalogService = {
	getAll: async () => {
		const {data} = await axiosInstance.get("/catalog/getAll");
		return data;
	},

	
};
