import { useSearchParams as _useSearchParams } from 'react-router-dom';

export const useSearchParams = () => {
  const [searchParams] = _useSearchParams();

  return searchParams;
};
