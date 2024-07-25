import { useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  type FlatListProps,
} from 'react-native';
import useFlatListHeaderInternal from '../use-flatlist-header-internal';
import { isPercentValue } from '../utils';

export interface VerticalFlatListOption {
  itemHeight: number | `${number}%`;
  numColumns?: number;
  itemGap?: number;
  rowGap?: number;
  columnPaddingHorizontal?: number;
  paddingVertical?: number;
  headerHeight?: number;
  columnWrapperStyle?: FlatListProps<unknown>['columnWrapperStyle'];
  contentContainerStyle?: FlatListProps<unknown>['contentContainerStyle'];
}

export function useVerticalFlatList<T>({
  itemHeight,
  numColumns: initialNumColumns,
  itemGap = 0,
  rowGap = 0,
  columnPaddingHorizontal = 0,
  paddingVertical = 0,
  headerHeight,
  contentContainerStyle,
  columnWrapperStyle,
}: VerticalFlatListOption) {
  const ref = useRef<FlatList<T>>(null);

  // numColumns should not be changed on the fly
  const numColumns = useRef(initialNumColumns ?? 1).current;

  const { width } = useWindowDimensions();

  const { headerSize, onHeaderLayout } = useFlatListHeaderInternal(
    'vertical',
    headerHeight
  );

  const itemWidth =
    (width - columnPaddingHorizontal * 2 - itemGap * (numColumns - 1)) /
    numColumns;

  const itemHeightInPx = isPercentValue(itemHeight)
    ? (parseFloat(itemHeight) / 100) * itemWidth
    : itemHeight;

  const getItemLayout = useCallback(
    (_data: ArrayLike<T> | null | undefined, index: number) => {
      return {
        length: itemHeightInPx,
        offset:
          (itemHeightInPx + rowGap) * Math.floor(index / numColumns) +
          paddingVertical +
          (headerSize.current ? headerSize.current + rowGap : 0),
        index: index,
      };
    },
    [itemHeightInPx, rowGap, paddingVertical, headerSize, numColumns]
  );

  // const estimateItemCountInViewport =
  //   Math.round(height / itemHeight) * numColumns;

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
    columnWrapperStyle: StyleSheet.flatten([
      columnWrapperStyle,
      numColumns > 1
        ? {
            columnGap: itemGap,
            paddingHorizontal: columnPaddingHorizontal,
          }
        : undefined,
    ]),
    contentContainerStyle: StyleSheet.flatten([
      contentContainerStyle,
      {
        paddingVertical,
        rowGap,
      },
    ]),
    getItemLayout,
    numColumns,
    // windowSize: estimateItemCountInViewport * 3,
    // initialNumToRender: estimateItemCountInViewport * 2,
  } satisfies Partial<FlatListProps<T>>;

  return {
    ref,
    props,
    itemWidth,
    itemHeight: itemHeightInPx,
    scrollToIndex,
    onHeaderLayout,
  };
}
