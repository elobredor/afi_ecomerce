import axiosInstance from "./axios.instance";

export const LineService = {
	getAll: async (categoryid:any, brandid) => {
		console.log("me asegur de recibir", categoryid);
		
		const {data} = await axiosInstance.post(`/articlesLine`, {brandid, categoryid});
		return data;
	},

	
};
