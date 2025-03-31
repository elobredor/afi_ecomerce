import axiosInstance from "./axios.instance";

export const CategoriesService = {
	getAll: async (categoryname:string) => {
		const {data} = await axiosInstance.post(`/articlesBrand`, {categoryname});
		return data;
	},
	getList: async ()=>{
		const {data} = await axiosInstance.get("/articleCategories");
		return data;
	}

	
};
