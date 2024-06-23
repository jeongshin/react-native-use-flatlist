import { useCallback, useRef } from 'react';
import {
  FlatList,
  useWindowDimensions,
  type FlatListProps,
  type LayoutChangeEvent,
} from 'react-native';

export interface VerticalFlatListOption {
  itemHeight: number;
  numColumns?: number;
  itemGap?: number;
  columnPaddingHorizontal?: number;
  rowGap?: number;
}

export function useVerticalFlatList<T>({
  itemHeight,
  numColumns: initialNumColumns,
  itemGap = 0,
  rowGap = 0,
  columnPaddingHorizontal = 0,
}: VerticalFlatListOption) {
  const headerHeight = useRef(0);

  const ref = useRef<FlatList<T>>(null);

  // numColumns should not be changed on the fly
  const numColumns = useRef(initialNumColumns ?? 1).current;

  const { width, height } = useWindowDimensions();

  const itemWidth =
    (width - columnPaddingHorizontal * 2 - itemGap * (numColumns - 1)) /
    numColumns;

  const onHeaderLayout = useCallback((e: LayoutChangeEvent) => {
    headerHeight.current = e.nativeEvent.layout.height;
  }, []);

  const getItemLayout = useCallback(
    (_data: ArrayLike<T> | null | undefined, index: number) => {
      return {
        length: itemHeight,
        offset: (itemHeight + rowGap) * index + headerHeight.current,
        index: index,
      };
    },
    [itemHeight, rowGap]
  );

  const estimateItemCountInViewport =
    Math.round(height / itemHeight) * numColumns;

  const scrollToIndex = useCallback(
    (options: Parameters<FlatList<T>['scrollToIndex']>[0]) => {
      const index = Math.floor(options.index / numColumns);

      ref.current?.scrollToIndex({
        ...options,
        index,
      });
    },
    [numColumns]
  );

  const props = {
    columnWrapperStyle:
      numColumns > 1
        ? {
            columnGap: itemGap,
            paddingHorizontal: columnPaddingHorizontal,
          }
        : undefined,
    contentContainerStyle: {
      rowGap,
    },
    getItemLayout,
    numColumns,
    windowSize: 4,
    initialNumToRender: estimateItemCountInViewport * 2,
  } satisfies Partial<FlatListProps<T>>;

  return {
    ref,
    props,
    itemWidth,
    scrollToIndex,
    onHeaderLayout,
  };
}
