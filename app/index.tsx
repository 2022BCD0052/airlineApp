import React from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';

const WelcomeScreen = () => {
  return (
    <LinearGradient
      colors={['#1E293B', '#0F172A']}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.container}>
          {/* Header */}
          <Animated.View
            entering={FadeInDown.duration(300).springify()}
            style={styles.header}
          >
            <MaterialCommunityIcons
              name="airplane-takeoff"
              size={36}
              color="#12B3A8"
              style={styles.icon}
            />
            <Text style={styles.headerText}>
              Stacks<Text style={styles.headerAccent}>Fly</Text>
            </Text>
          </Animated.View>

          {/* Main Content */}
          <Animated.View
            entering={FadeInDown.duration(300).springify()}
            style={styles.glassCard}
          >
            <Text style={styles.title}>Discover Your Dream Flight</Text>
            <Text style={styles.subtitle}>Explore the world effortlessly</Text>
          </Animated.View>

          {/* Call to Action */}
          <Animated.View
            entering={FadeInDown.duration(300).springify()}
            style={styles.actionContainer}
          >
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed ? styles.buttonPressed : null,
              ]}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.buttonText}>Discover</Text>
            </Pressable>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don\u2019t have an account?</Text>
              <Pressable onPress={() => router.push('/register')}>
                <Text style={styles.registerText}>
                  Register <MaterialCommunityIcons name="arrow-right" size={16} />
                </Text>
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
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  headerAccent: {
    color: '#4AE8DD',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#B0BEC5',
    textAlign: 'center',
  },
  actionContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#12B3A8',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 64,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: '#0E9285',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
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
