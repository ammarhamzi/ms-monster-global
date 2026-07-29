import { useLocation } from 'react-router';
import { getRouteByPath } from '../config/routes';

export function useCurrentRoute() {
  const { pathname } = useLocation();
  return getRouteByPath(pathname);
}
