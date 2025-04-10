"use client";
import KPICard from "@/components/admin/dashboard/cardKpi";
import MixedChart from "@/components/admin/dashboard/mixedChart";

export default function PortalPage() {
	return (
		<div>
			<div className="py-4">
				<h2 className="text-xl font-semibold py-2">
					Tus indicadores del mes actual
				</h2>
				{/* <KPICard /> */}
			</div>
			<div className="py-4">
				<h2 className="text-xl font-semibold  py-2">
					Tus movimientos los ultimos 6 meses
				</h2>
				{/* <MixedChart /> */}
			</div>
		</div>
	);
}
