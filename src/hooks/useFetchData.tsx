import { useState, useEffect, useCallback } from "react";

const useFetchData = (fetchFn: (params?: any) => Promise<any>, params?: any) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refetchIndex, setRefetchIndex] = useState(0);

	const refetch = useCallback(() => {
		setRefetchIndex(prevIndex => prevIndex + 1);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const result = await fetchFn(params);
				setData(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [fetchFn, params, refetchIndex]);

	return { data, loading, refetch };
};

export default useFetchData;
