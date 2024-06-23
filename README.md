# WIP 👷‍♂️

# react-native-use-flatlist

make <FlatList /> easier to use

## Installation

```sh
yarn add react-native-use-flatlist
```

## Usage

### Vertical FlatList

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

return <FlatList ref={ref} data={data} {...props} />;
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

return <FlatList ref={ref} data={data} {...props} />;
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
