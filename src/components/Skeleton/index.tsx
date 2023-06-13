import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Container,
  Body
} from './styles';

import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  w: string;
  h: string;
  r: string;
}

function Skeleton({ w, h, r}: Props) {

  const x = useSharedValue(0);

  useEffect(() => {
    x.value = withRepeat(withTiming(1, { duration: 2000 }), -1);
  }, [])

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(x.value, [0, 1], [-width, width]) }
    ]
  }));

  const wSize = w;
  const hSize = h;
  const radius = r;

  return (
    <Container>
      <Body wSize={wSize} hSize={hSize} radius={radius}>
        <AnimatedLinearGradient
          colors={['#FFFFFF', '#F3F3F3', '#FFFFFF']}
          style={[{ ...StyleSheet.absoluteFillObject }, rStyle]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Body>
    </Container>
  )
}

export default Skeleton;