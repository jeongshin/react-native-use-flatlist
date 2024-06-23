import * as React from 'react';

import { View, FlatList, SafeAreaView, Button, Image } from 'react-native';
import {
  useFlatListViewableItems,
  useVerticalFlatList,
} from 'react-native-use-flatlist';
import { data } from './sample-data';

export default function Vertical() {
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

  const { onViewableItemsChanged } = useFlatListViewableItems({
    shouldViewable: 'once',
    onItemViewable: (item) => {
      console.log('visible', item);
    },
  });

  const [currentItem, setCurrentItem] = React.useState<string | null>(null);

  const scrollToRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * data.length);

    const randomItem = data[randomIndex];

    if (!randomItem) return;

    setCurrentItem(randomItem);

    scrollToIndex({
      index: randomIndex,
      animated: true,
      viewOffset: 0,
      viewPosition: 0,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#eeeeee',
        }}
      >
        <Button
          title="random"
          onPress={() => {
            scrollToRandomItem();
          }}
        />
        {currentItem ? (
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundColor: currentItem,
            }}
          />
        ) : null}
      </View>
      <FlatList
        ref={ref}
        data={data}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item }) => (
          <View
            style={[
              {
                width: itemWidth,
                height: ITEM_HEIGHT,
                backgroundColor: item,
                opacity: currentItem === item ? 1 : 0.3,
                borderRadius: 20,
              },
            ]}
          />
        )}
        ListHeaderComponent={
          <Image
            onLayout={onHeaderLayout}
            source={{
              uri: 'https://file.sportsseoul.com/news/cms/2024/04/09/news-p.v1.20240228.0ff452386c954b99ae4850cff3d40522_P1.jpg',
            }}
            resizeMode="cover"
            style={{ width: '100%', height: 200, backgroundColor: 'pink' }}
          />
        }
        {...props}
      />
    </SafeAreaView>
  );
}
