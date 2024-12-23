import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../assets/images/profile.jpeg')}
            style={styles.profileImage}
          />
        </View>
        <View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.username}>Stack</Text>
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.actionsContainer}>
        <View style={styles.notificationWrapper}>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>P</Text>
          </View>
          <View>
            <Text style={styles.actionLabel}>Flight Points</Text>
            <Text style={styles.pointsText}>8,524</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 80,
    backgroundColor: '#192031',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageWrapper: {
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 50,
    overflow: 'hidden',
    width: 60,
    height: 60,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '50%',
  },
  notificationWrapper: {
    backgroundColor: '#374151', // Darker gray background
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  notificationBadge: {
    backgroundColor: '#4B5563', // Darker gray for badge
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  pointsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
