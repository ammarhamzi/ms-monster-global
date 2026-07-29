import HomePage from '../pages/HomePage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function HomeRoute() {
  const { locale } = useCurrentRoute();

  return <HomePage locale={locale} />;
}
