# WIP 👷‍♂️

# react-native-use-flatlist

make `<FlatList />` easier to use

## Installation

```sh
yarn add react-native-use-flatlist
```

## Features

- 👌 handles all the complex calculation for `getItemLayout`
- ✅ accurate scroll to index with `scrollToIndex`
- 👀 easy viewable item tracking API for view event logging

## Usage

### Vertical FlatList

<img width="300" height="500" src="./samples/vertical.gif" />

<img width="300" height="500" src="./samples/vertical.png" />

```tsx
import { useVerticalFlatList } from 'react-native-use-flatlist';

// item should have fixed size
const ITEM_HEIGHT = 100;

const { ref, itemWidth, props, scrollToIndex, onHeaderLayout } =
  useVerticalFlatList<string>({
    paddingVertical: 20,
    columnPaddingHorizontal: 10,
    itemHeight: ITEM_HEIGHT,
    numColumns: 2,
    itemGap: 10,
    rowGap: 10,
  });

return (
  <FlatList
    ref={ref}
    data={data}
    {...props}
    ListHeaderComponent={<MyHeader onLayout={onHeaderLayout} />}
  />
);
```

### Horizontal FlatList

```tsx
import { useHorizontalFlatList } from 'react-native-use-flatlist';

const ITEM_WIDTH = 100;

const { ref, props, onHeaderLayout, scrollToIndex } =
  useHorizontalFlatList<ItemType>({
    itemWidth: ITEM_WIDTH,
    itemGap: 10,
    paddingHorizontal: 10,
  });

return (
  <FlatList
    ref={ref}
    data={data}
    {...props}
    ListHeaderComponent={<MyHeader onLayout={onHeaderLayout} />}
  />
);
```

### Viewable Item Tracking

```tsx
interface ViewableItemOptions<T> {
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

const { onViewableItemsChanged } = useFlatListViewableItems({
  shouldViewable: 'once',
  onItemViewable: (item) => {
    console.log('visible', item);
  },
});

<FlatList data={data} onViewableItemsChanged={onViewableItemsChanged} />;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
