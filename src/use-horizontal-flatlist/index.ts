import { useCallback, useRef } from 'react';
import { type FlatList, type FlatListProps } from 'react-native';
import useFlatListHeaderInternal from '../use-flatlist-header-internal';

export interface HorizontalFlatListOption {
  itemWidth: number;
  itemGap?: number;
  paddingHorizontal?: number;
  headerHeight?: number;
}

export function useHorizontalFlatList<T>({
  itemWidth,
  headerHeight,
  itemGap = 0,
  paddingHorizontal = 0,
}: HorizontalFlatListOption) {
  const ref = useRef<FlatList<T>>(null);

  const { headerSize, onHeaderLayout } = useFlatListHeaderInternal(
    'horizontal',
    headerHeight
  );

  const getItemLayout = useCallback(
    (_: ArrayLike<T> | null | undefined, index: number) => {
      return {
        length: itemWidth,
        offset:
          (itemWidth + itemGap) * index +
          paddingHorizontal +
          (headerSize.current ? headerSize.current + itemGap : 0),
        index: index,
      };
    },
    [itemWidth, itemGap, paddingHorizontal, headerSize]
  );

  // const { width } = useWindowDimensions();

  // const estimateItemCountInViewport = Math.round(width / itemWidth);

  const props = {
    horizontal: true,
    getItemLayout,
    contentContainerStyle: {
      paddingHorizontal,
      gap: itemGap,
    },
    // windowSize: estimateItemCountInViewport * 3,
    // initialNumToRender: estimateItemCountInViewport * 2,
  } satisfies Partial<FlatListProps<T>>;

  const scrollToIndex = useCallback(
    (options: Parameters<FlatList<T>['scrollToIndex']>[0]) => {
      ref.current?.scrollToIndex(options);
    },
    []
  );

  return {
    ref,
    props,
    scrollToIndex,
    onHeaderLayout,
  };
}
