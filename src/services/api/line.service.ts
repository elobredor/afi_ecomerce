import axiosInstance from "./axios.instance";

export const LineService = {
	getAll: async (categoryname:string, brandname:string, linename:string) => {
		
		
		const {data} = await axiosInstance.post(`/articlesLine`, {brandname, categoryname, linename});
		return data;
	},
	getArticles: async (categoryname:string, brandname:string, linename:string) => {
		
		
		const {data} = await axiosInstance.post(`/articles`, {brandname, categoryname, linename});
		return data;
	},


	

	
};
