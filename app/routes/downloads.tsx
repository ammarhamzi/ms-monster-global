import DownloadsPage from '../pages/DownloadsPage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function DownloadsRoute() {
  const { locale } = useCurrentRoute();

  return <DownloadsPage locale={locale} />;
}
