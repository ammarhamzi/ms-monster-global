import CustomFragrancePage from '../pages/CustomFragrancePage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function FragranceRoute() {
  return <CustomFragrancePage locale={useCurrentRoute().locale} />;
}
