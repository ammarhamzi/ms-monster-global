import AboutPage from '../pages/AboutPage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function AboutRoute() {
  const { locale } = useCurrentRoute();

  return <AboutPage locale={locale} />;
}
