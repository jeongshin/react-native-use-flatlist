import { useCallback, useRef } from 'react';
import type { LayoutChangeEvent } from 'react-native';

function useFlatListHeaderInternal(
  direction: 'horizontal' | 'vertical',
  givenHeaderHeight: number | undefined
) {
  const headerSize = useRef(givenHeaderHeight ?? 0);

  const onHeaderLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (direction === 'horizontal') {
        headerSize.current = e.nativeEvent.layout.width;
        return;
      }

      if (direction === 'vertical') {
        headerSize.current = e.nativeEvent.layout.height;
      }
    },
    [direction]
  );

  return {
    headerSize,
    onHeaderLayout,
  };
}

export default useFlatListHeaderInternal;
