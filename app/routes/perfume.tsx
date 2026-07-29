import PerfumePage from '../pages/PerfumePage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function PerfumeRoute() {
  return <PerfumePage locale={useCurrentRoute().locale} />;
}
