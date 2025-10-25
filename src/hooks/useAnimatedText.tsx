import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { AnimationHook } from '../types';
import type {
  AnimatedTextConfig,
  AnimatedTextHookProps,
} from '../types/animations';
import { useEffect } from 'react';

const getAnimationSpan = (config: AnimatedTextConfig[], size: number) => {
  let current: number = 0;
  let timespan: number[] = [0];

  config.map(({ staggerDelay = 20, delay = 0, duration = 300 }) => {
    const span = (size - 1) * staggerDelay + delay + duration + current;
    current = span;
    timespan.push(span);
  });

  return timespan;
};
const useAnimatedText: AnimationHook<AnimatedTextHookProps> = ({
  index,
  config = {},
}) => {
  const animationConfig = Array.isArray(config) ? config : [config];
  const {
    opacity: fromOpacity = 0,
    offsetX: fromOffsetX = 0,
    offsetY: fromOffsetY = 10,
  } = animationConfig[0] || {};

  const opacity = useSharedValue(fromOpacity);
  const translateX = useSharedValue(fromOffsetX);
  const translateY = useSharedValue(fromOffsetY);
  const timeSpan = getAnimationSpan(animationConfig, 20);

  useEffect(() => {
    // const delayTime = index * staggerDelay + delay;
    // opacity.value = withDelay(delayTime, withTiming(1, { duration }));
    // translateY.value = withDelay(delayTime, withTiming(0, { duration }));
    // translateX.value = withDelay(delayTime, withTiming(0, { duration }));

    translateX.value = withSequence(
      ...animationConfig.map(
        ({ delay = 0, duration = 300, offsetX = 0, staggerDelay = 20 }, i) => {
          const totalDelay = index * staggerDelay + delay + (timeSpan[i] || 0);
          return withDelay(
            totalDelay,
            withTiming(offsetX, { duration, easing: Easing.linear })
          );
        }
      )
    );

    translateY.value = withSequence(
      ...animationConfig.map(
        ({ delay = 0, duration = 300, offsetY = 0, staggerDelay = 20 }, i) => {
          const totalDelay = index * staggerDelay + delay + (timeSpan[i] || 0);
          console.log(totalDelay);
          return withDelay(
            totalDelay,
            withTiming(offsetY, { duration, easing: Easing.linear })
          );
        }
      )
    );

    opacity.value = withSequence(
      ...animationConfig.map(
        (
          {
            delay = 0,
            duration = 300,
            opacity: toOpacity = 1,
            staggerDelay = 20,
          },
          i
        ) => {
          const totalDelay = index * staggerDelay + delay + (timeSpan[i] || 0);
          return withDelay(
            totalDelay,
            withTiming(toOpacity, { duration, easing: Easing.linear })
          );
        }
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, index]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
      ],
    };
  });

  return animatedStyles;
};

export default useAnimatedText;
