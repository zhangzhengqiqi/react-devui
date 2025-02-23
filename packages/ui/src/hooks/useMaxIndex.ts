import { useMemo, useRef } from 'react';

import { useId, useUnmount } from '@react-devui/hooks';

import { usePrefixConfig } from '../components/root';

const MAX_INDEX_MANAGER = {
  record: {} as { [index: string]: number },

  getMaxIndex(id: string): number {
    let maxZIndex = 0;
    Object.values(this.record).forEach((num) => {
      maxZIndex = Math.max(maxZIndex, num);
    });
    maxZIndex += 1;
    this.record[id] = maxZIndex;
    return maxZIndex;
  },

  deleteRecord(id: string) {
    delete this.record[id];
  },
};

export function useMaxIndex(condition?: boolean) {
  const dPrefix = usePrefixConfig();

  const dataRef = useRef<{
    prevIndex?: string;
  }>({});

  const id = useId();

  const zIndex = useMemo(() => {
    MAX_INDEX_MANAGER.deleteRecord(id);

    if (condition) {
      const maxZIndex = MAX_INDEX_MANAGER.getMaxIndex(id);
      return `calc(var(--${dPrefix}zindex-fixed) + ${maxZIndex})`;
    }

    return dataRef.current.prevIndex;
  }, [condition, dPrefix, id]);
  dataRef.current.prevIndex = zIndex;

  useUnmount(() => {
    MAX_INDEX_MANAGER.deleteRecord(id);
  });

  return zIndex;
}
