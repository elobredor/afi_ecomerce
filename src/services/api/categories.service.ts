import axiosInstance from "./axios.instance";

export const CategoriesService = {
	getAll: async (categoryid:any) => {
		console.log("me asegur de recibir", categoryid);
		
		const {data} = await axiosInstance.post(`/articlesBrand`, {categoryid});
		return data;
	},
	getList: async ()=>{
		const {data} = await axiosInstance.get("/articleCategories");
		return data;
	}

	
};
