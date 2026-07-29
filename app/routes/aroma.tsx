import AromaSolutionsPage from '../pages/AromaSolutionsPage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function AromaRoute() {
  return <AromaSolutionsPage locale={useCurrentRoute().locale} />;
}
