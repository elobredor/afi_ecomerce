import axiosInstance from "./axios.instance";

export const CategoriesService = {
	getAll: async (categoryname:string) => {
		categoryname = categoryname.replace(/-/g, '/').replace(/_/g, ' ');
		const {data} = await axiosInstance.post(`/articlesBrand`, {categoryname});
		return data;
	},
	getList: async ()=>{
		const {data} = await axiosInstance.get("/articleCategories");
		return data;
	}

	
};
