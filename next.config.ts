import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "autofrioimportaciones.com",
				port: "",
				pathname: "/**",
			},
			// Agrega más patrones si necesitas permitir otros dominios
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	// Otras opciones de configuración aquí
};

export default nextConfig;
