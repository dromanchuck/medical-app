import { useEffect, useState } from 'react';

export function useMountState(timestamp?: number) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (timestamp) {
      setTimeout(() => {
        setIsMounted(true);
      }, timestamp);

      return;
    }

    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, [setIsMounted, timestamp]);

  return isMounted;
}
