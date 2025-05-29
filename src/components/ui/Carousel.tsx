import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Feather';

interface CarouselProps {
  data: any[];
  renderItem: (item: any) => React.ReactNode;
  itemWidth?: number;
  style?: ViewStyle;
  onSnapToItem?: (index: number) => void;
}

interface CarouselItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  style?: ViewStyle;
}

const CarouselComponent: React.FC<CarouselProps> & {
  Item: React.FC<CarouselItemProps>;
  Navigation: React.FC<CarouselNavigationProps>;
} = ({
  data,
  renderItem,
  itemWidth = Dimensions.get('window').width * 0.8,
  style,
  onSnapToItem,
}) => {
  const carouselRef = useRef<Carousel<any>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSnapToItem = (index: number) => {
    setActiveIndex(index);
    onSnapToItem?.(index);
  };

  const handlePrevious = () => {
    carouselRef.current?.snapToPrev();
  };

  const handleNext = () => {
    carouselRef.current?.snapToNext();
  };

  return (
    <View style={[styles.container, style]}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={itemWidth}
        onSnapToItem={handleSnapToItem}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        enableMomentum
        decelerationRate="fast"
      />
      <CarouselComponent.Navigation
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoPrevious={activeIndex > 0}
        canGoNext={activeIndex < data.length - 1}
      />
    </View>
  );
};

const CarouselItem: React.FC<CarouselItemProps> = ({ children, style }) => {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  );
};

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  style,
}) => {
  return (
    <View style={[styles.navigation, style]}>
      <TouchableOpacity
        onPress={onPrevious}
        disabled={!canGoPrevious}
        style={[
          styles.navButton,
          !canGoPrevious && styles.navButtonDisabled,
        ]}
      >
        <Icon
          name="chevron-left"
          size={24}
          color={canGoPrevious ? '#9333ea' : '#d1d5db'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        disabled={!canGoNext}
        style={[
          styles.navButton,
          !canGoNext && styles.navButtonDisabled,
        ]}
      >
        <Icon
          name="chevron-right"
          size={24}
          color={canGoNext ? '#9333ea' : '#d1d5db'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    padding: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
});

CarouselComponent.Item = CarouselItem;
CarouselComponent.Navigation = CarouselNavigation;

export { CarouselComponent as Carousel }; 