import { useCallback, useState } from 'react';
import { InteractionManager, type FlatListProps } from 'react-native';

export interface ViewableItemOptions<T> {
  /**
   * callback when item is viewable
   */
  onItemViewable?: (item: T, index: number) => void;

  /**
   * 'multiple' - `onItemViewable` will be called multiple times for each item
   * 'once' - `onItemViewable` will be called only once for each item
   *
   * @default 'multiple'
   */
  shouldViewable?: 'multiple' | 'once';
}

export function useFlatListViewableItems<T>({
  shouldViewable = 'multiple',
  onItemViewable,
}: ViewableItemOptions<T>) {
  const [cache] = useState<Map<string, boolean>>(() => new Map());

  const handleItemViewable = useCallback(
    (item: T, key: string, index: number) => {
      if (shouldViewable === 'once' && cache.has(key)) return;

      onItemViewable?.(item, index);

      if (shouldViewable === 'once') {
        cache.set(key, true);
      }
    },
    [cache, onItemViewable, shouldViewable]
  );

  const onViewableItemsChanged: NonNullable<
    FlatListProps<T>['onViewableItemsChanged']
  > = useCallback(
    ({ viewableItems }) => {
      if (typeof onItemViewable !== 'function') return;

      const tokens = viewableItems.filter((item) => item.isViewable);

      InteractionManager.runAfterInteractions(() => {
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          if (token?.item) {
            handleItemViewable(token.item, token.key, i);
          }
        }
      });
    },
    [handleItemViewable, onItemViewable]
  );

  return { onViewableItemsChanged };
}
