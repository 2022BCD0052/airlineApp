import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function searchResult() {

  const router = useRouter();
  const { flightOfferData } = router.query;  // Get the query parameter

  const [storedData, setStoredData] = useState(null);
  const [parsedFlightOfferData, setParsedFlightOfferData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('searchFlightData');
      setStoredData(data ? JSON.parse(data) : null);
      console.log('Retrieved Search Data:', data);

      // Parse the flightOfferData from the query string
      if (flightOfferData) {
        setParsedFlightOfferData(JSON.parse(flightOfferData)); // Parse the JSON string to an object
      }
    };

    fetchData();
  }, [flightOfferData]);  // Run again when flightOfferData changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Result</Text>

      {/* Check and display parsed flight offer data */}
      {parsedFlightOfferData ? (
        <Text style={styles.text}>Flight Offer Data: {JSON.stringify(parsedFlightOfferData)}</Text>
      ) : (
        <Text style={styles.text}>No Flight Offer Data passed.</Text>
      )}

      {/* Display stored data from AsyncStorage */}
      {storedData ? (
        <Text style={styles.text}>Stored Data: {JSON.stringify(storedData)}</Text>
      ) : (
        <Text style={styles.text}>No Stored Data available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, color: '#333', marginBottom: 5 },
});
