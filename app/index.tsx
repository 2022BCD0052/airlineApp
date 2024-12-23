import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const WelcomeScreen = () => {
  return (
    <LinearGradient
      colors={['#0f2027', '#203a43', '#2c5364']}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Header Section */}
          <Animated.View
            entering={FadeInDown.duration(300).springify()}
            style={styles.header}
          >
            <MaterialCommunityIcons
              name="airplane-takeoff"
              size={48}
              color="#12B3A8"
            />
            <Text style={styles.headerText}>
              Stacks<Text style={styles.headerAccent}>Fly</Text>
            </Text>
          </Animated.View>

          {/* Main Content Section */}
          <Animated.View
            entering={FadeInDown.duration(300).springify()}
            style={styles.contentCard}
          >
            <Text style={styles.title}>Dream. Discover. Fly.</Text>
            <Text style={styles.subtitle}>
              Make your travel dreams a reality with ease.
            </Text>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View
            entering={FadeInDown.duration(300).springify()}
            style={styles.actionContainer}
          >
            <Pressable
              style={({ pressed }) => [
                styles.discoverButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.buttonText}>Discover</Text>
            </Pressable>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Pressable onPress={() =>{}}>
                <Text style={styles.registerText}>Register</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  headerAccent: {
    color: '#4AE8DD',
  },
  contentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    width: width * 0.9,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#B0BEC5',
    textAlign: 'center',
    marginTop: 10,
  },
  actionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  discoverButton: {
    backgroundColor: '#12B3A8',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 50,
    shadowColor: '#12B3A8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.7,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  registerText: {
    fontSize: 16,
    color: '#4AE8DD',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
