import ContactPage from '../pages/ContactPage';
import { useCurrentRoute } from '../hooks/useCurrentRoute';

export { routeMeta as meta } from '../seo/meta';

export default function ContactRoute() {
  const { locale } = useCurrentRoute();

  return <ContactPage locale={locale} />;
}
