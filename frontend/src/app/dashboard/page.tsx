import React from "react";
import { getDashboardData } from "../../shared/utils/dashboardData";
import { DashboardClient } from "../../shared/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardClient initialData={data} />;
}
