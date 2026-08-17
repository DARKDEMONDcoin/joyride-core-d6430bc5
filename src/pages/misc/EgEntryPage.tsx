/**
 * @doc /eg entry — Egypt edition.
 *
 * Turns on Egypt mode (Egyptian dialect + Kashier-only payments) and then
 * forwards to the matching page on the app, so `/eg/pricing` lands on
 * `/pricing` fully localised.
 */
import { useLocation, Navigate } from "react-router-dom";

import { enableEgMode } from "@/lib/egMode";

const EgEntryPage = () => {
  const location = useLocation();
  enableEgMode();

  const rest = location.pathname.replace(/^\/eg/, "") || "/";
  const target = `${rest}${location.search}${location.hash}`;

  return <Navigate to={target} replace />;
};

export default EgEntryPage;
