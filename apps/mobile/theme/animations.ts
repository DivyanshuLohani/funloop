// theme/animations.ts
import { Animated, Easing } from "react-native";

export const Animations = {
  /** Fade + scale for modals */
  modalEnter: (scale: Animated.Value, opacity: Animated.Value) => {
    scale.setValue(0.9);
    opacity.setValue(0);

    return Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);
  },

  modalExit: (scale: Animated.Value, opacity: Animated.Value) =>
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]),

  /** Avatar glow pulse */
  avatarPulse: (value: Animated.Value) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ),

  /** Slide from bottom (for sheets) */
  slideUp: (translateY: Animated.Value) => {
    translateY.setValue(40);
    return Animated.spring(translateY, {
      toValue: 0,
      friction: 7,
      tension: 70,
      useNativeDriver: true,
    });
  },

  /** Button press scale */
  pressIn: (scale: Animated.Value) =>
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }),

  pressOut: (scale: Animated.Value) =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }),
};
