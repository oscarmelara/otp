// -----------------------------------------------------------------------------
//   Imports
// -----------------------------------------------------------------------------

import DashboardLayout from "../../../layouts/dashboard";
import Header from "../../../components/header";
import { useEffect, useState } from "react";
import IconLoading from "../../../components/loading";

// -----------------------------------------------------------------------------
//   Page
// -----------------------------------------------------------------------------

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <DashboardLayout>
      {loading ? (
        <IconLoading />
      ) : (
        <div className="pt-32 px-12">
          <Header title="Inicio " />
        </div>
      )}
    </DashboardLayout>
  );
}
