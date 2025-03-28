export const API_CONFIG = {
	baseURL: process.env.API_URL || "http://209.97.157.73:12099/api/v1/", // Reemplazar esto por la nueva direccion
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
	mode: "cors" as RequestMode,
	credentials: "include" as RequestCredentials,
	HEADERS: {
		DEFAULT: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		AUTH: (token: string) => ({
			Authorization: `Bearer ${token}`,
		}),
	},
};
