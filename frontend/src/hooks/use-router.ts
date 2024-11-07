import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type NavigateOptions = object;

interface Router {
  back(): void;

  forward(): void;

  refresh(): void;

  push(href: string, options?: NavigateOptions): void;

  replace(href: string, options?: NavigateOptions): void;

  prefetch(href: string): void;
}

export const useRouter = (): Router => {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
      prefetch: () => {},
    };
  }, [navigate]);
};
