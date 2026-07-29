import ItMaintenancePage from '../pages/ItMaintenancePage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function ItRoute() {
  return <ItMaintenancePage locale={useCurrentRoute().locale} />;
}
