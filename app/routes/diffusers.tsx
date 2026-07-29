import AromaDiffusersPage from '../pages/AromaDiffusersPage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function DiffusersRoute() {
  return <AromaDiffusersPage locale={useCurrentRoute().locale} />;
}
