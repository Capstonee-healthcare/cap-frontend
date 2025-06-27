import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const getIconComponent = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Exercise':
      return 'fitness';
    case 'Videos':
    case 'VideoLibrary':
      return 'play-circle';
    case 'AIChat':
    case 'Chat':
      return 'chatbubble';
    case 'Maps':
    case 'Location':
      return 'location';
    case 'Detection':
      return 'camera';
    default:
      return 'ellipse';
  }
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_MARGIN = 0;
const TAB_BAR_HEIGHT = 80;
const CIRCLE_SIZE = 40;

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  console.log('🎨 CustomTabBar is rendering!', state.routes.map(r => r.name));
  
  const tabCount = state.routes.length;
  const availableWidth = SCREEN_WIDTH - TAB_BAR_MARGIN * 2;
  const tabWidth = availableWidth / tabCount;
  const bumpWidth = tabWidth;
  const bumpHeight = 100;

  const activeTabX = useSharedValue(tabWidth / 2);

  useEffect(() => {
    const currentIndex = state.index;
    const targetX = currentIndex * tabWidth + tabWidth / 2;
    activeTabX.value = withSpring(targetX, {
      damping: 20,
      stiffness: 180,
    });
  }, [state.index, tabWidth]);

  const minLeft = 0;
  const maxLeft = availableWidth - bumpWidth;

  const animatedBumpStyle = useAnimatedStyle(() => {
    let left = activeTabX.value - bumpWidth / 2;
    left = Math.max(minLeft, Math.min(left, maxLeft));
    return {
      position: 'absolute',
      top: 0,
      left,
      width: bumpWidth,
      height: bumpHeight,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    };
  });

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarInner}>
        {/* Animated bump with icon */}
        <Animated.View style={animatedBumpStyle} pointerEvents="none">
          <Svg
            width={bumpWidth}
            height={bumpHeight}
            viewBox={`0 0 ${bumpWidth} ${bumpHeight}`}
            style={StyleSheet.absoluteFill}
          >
            <Path
              d={`M0,0 A${bumpWidth / 2},${bumpHeight} 0 0 1 ${bumpWidth},0 Q${bumpWidth / 2},${bumpHeight} 0,0 Z`}
              fill="#FFFFFF"
            />
          </Svg>
          <View style={styles.activeCircle}>
            {(() => {
              const activeRoute = state.routes[state.index];
              const iconName = getIconComponent(activeRoute.name);
              return <Ionicons name={iconName as any} size={24} color="#FFFFFF" />;
            })()}
          </View>
        </Animated.View>

        {/* Inactive tabs */}
        {state.routes.map((route: typeof state.routes[number], idx: number) => {
          const isFocused = state.index === idx;

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.tabItem, { width: tabWidth }]}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              onLongPress={() =>
                navigation.emit({ type: 'tabLongPress', target: route.key })
              }
              activeOpacity={1}
            >
              {!isFocused && (
                <Ionicons name={getIconComponent(route.name) as any} size={24} color="#fff" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 0,
    zIndex: 20,
  },
  tabBarInner: {
    flexDirection: 'row',
    backgroundColor: '#4DD0E1',
    marginHorizontal: 0,
    borderRadius: 0,
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 14,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_BAR_HEIGHT,
    zIndex: 20,
  },
  activeCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#4DD0E1',
    top: -CIRCLE_SIZE / 2 + 16,
    left: '50%',
    marginLeft: -CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 7,
  },
});

export default CustomTabBar;
