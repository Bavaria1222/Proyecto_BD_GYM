import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { usePathname } from 'src/hooks/use-pathname';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

export function useNprogress() {
  const isMounted = useRefMounted();
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!visible) {
      nProgress.start();
      setVisible(true);
    }

    if (visible) {
      nProgress.done();
      setVisible(false);
    }

    if (!visible && isMounted()) {
      setVisible(false);
      nProgress.done();
    }

    return () => {
      nProgress.done();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isMounted]);
}
