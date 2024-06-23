import { useState } from 'react';
import { Button, FlatList, Image, SafeAreaView, View } from 'react-native';
import { data } from './sample-data';
import { useHorizontalFlatList } from 'react-native-use-flatlist';

const Horizontal = () => {
  const ITEM_WIDTH = 100;

  const { ref, props, onHeaderLayout, scrollToIndex } =
    useHorizontalFlatList<string>({
      itemWidth: ITEM_WIDTH,
      itemGap: 10,
      paddingHorizontal: 10,
    });

  const [currentItem, setCurrentItem] = useState<string | null>(null);

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
        ListHeaderComponent={
          <Image
            source={{
              uri: 'https://file.sportsseoul.com/news/cms/2024/04/09/news-p.v1.20240228.0ff452386c954b99ae4850cff3d40522_P1.jpg',
            }}
            resizeMode="cover"
            style={{
              width: 200,
              height: 200,
              backgroundColor: 'pink',
              borderRadius: 20,
            }}
            onLayout={onHeaderLayout}
          />
        }
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_WIDTH,
                backgroundColor: item,
                opacity: currentItem === item ? 1 : 0.3,
                borderRadius: 20,
              }}
            />
          );
        }}
        {...props}
      />
    </SafeAreaView>
  );
};

export default Horizontal;
