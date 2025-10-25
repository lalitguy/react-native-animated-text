// import 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';

import AnimatedText from 'react-native-animated-text';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text>

      <FadeText text="Fade Animation is awesome!✨" />
      <RotateText text="Rotate Animation is Awesome!✨" />
      <SpringText text="Spring Animation is Awesome!✨" /> */}

      <AnimatedText
        text="123456789✨1234567891"
        reanimateOnTextChange
        config={[
          {
            offsetX: 10,
            offsetY: 10,
            opacity: 0,
            staggerDelay: 50,
            delay: 0,
            duration: 300,
          },
          {
            offsetX: 10,
            offsetY: 0,
            opacity: 1,
            staggerDelay: 0,
            delay: 10,
            duration: 200,
          },
          {
            offsetX: 0,
            offsetY: 0,
            opacity: 1,
            staggerDelay: 0,
            delay: 0,
            duration: 1,
          },
        ]}
      />

      {/* <Animated.Text>njo</Animated.Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
