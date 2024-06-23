import * as React from 'react';

import { View, FlatList, SafeAreaView, Button, Image } from 'react-native';
import { useVerticalFlatList } from 'react-native-use-flatlist';

export default function Vertical() {
  const { ref, itemWidth, props, scrollToIndex, onHeaderLayout } =
    useVerticalFlatList<string>({
      columnPaddingHorizontal: 10,
      itemHeight: 100,
      numColumns: 2,
      itemGap: 10,
      rowGap: 10,
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
    <SafeAreaView>
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
        renderItem={({ item }) => (
          <View
            style={[
              {
                width: itemWidth,
                height: 100,
                backgroundColor: item,
                opacity: currentItem === item ? 1 : 0.3,
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

/**
 * random 100 colors
 */
const data = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e99e9',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e99e9',
];
