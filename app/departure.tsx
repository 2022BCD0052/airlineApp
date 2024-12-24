import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { apiToken } from "./utils/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DepartureScreen() {
  const [searchInput, setSearchInput] = React.useState("");
  const [autocomplete, setAutocomplete] = React.useState([]);
  const [flightOfferData, setFlightOfferData] = React.useState<any>({
    originLocationCode: "",
  });
  const [previousSelectedDeparture, setPreviousSelectedDeparture] = React.useState([]);

  const autoCompleteSearch = async (searchInput: string) => {
    try {
      if (!searchInput.trim()) {
        setAutocomplete([]);
        return;
      }

      const headers = {
        Authorization: `Bearer ${apiToken}`,
      };

      const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${searchInput}`;
      const response = await axios.get(url, { headers });

      setAutocomplete(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPreviousSelectedCities = async () => {
    try {
      const storedCities = await AsyncStorage.getItem("previousSelectedCities");
      if (storedCities) {
        const parsedCities = JSON.parse(storedCities);
        console.log("Loaded cities:", parsedCities); // Debugging log
        setPreviousSelectedDeparture(parsedCities);
      }
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  useEffect(() => {
    loadPreviousSelectedCities();
  }, []);

  const debounce = (func: any, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debounceSearch = debounce(autoCompleteSearch, 800);

  const handleInputChange = (value: string) => {
    setSearchInput(value);
    debounceSearch(value);
  };

  const handleAutocompleteSelect = async (item: any) => {
    try {
      const updatedCities = [...previousSelectedDeparture];
      const newCity = {
        city: item.name,
        iataCode: item.iataCode,
      };

      // Prevent duplicates
      const isDuplicate = updatedCities.some(
        (city) => city.iataCode === newCity.iataCode
      );

      if (!isDuplicate) {
        updatedCities.push(newCity);
        await AsyncStorage.setItem(
          "previousSelectedCities",
          JSON.stringify(updatedCities)
        );
        setPreviousSelectedDeparture(updatedCities);
      }

      setFlightOfferData({
        ...flightOfferData,
        originLocationCode: item.iataCode,
      });
      setSearchInput(`${item.name} (${item.iataCode})`);
      setAutocomplete([]);
    } catch (error) {
      console.error("Error saving city:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>Departure</Text>
        <MaterialCommunityIcons name="dots-horizontal" size={24} color="white" />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search airport or city"
          style={styles.searchInput}
          value={searchInput}
          onChangeText={handleInputChange}
        />
      </View>

      {/* Autocomplete */}
      {autocomplete.length > 0 && (
        <View style={styles.autocompleteContainer}>
          <FlatList
            data={autocomplete}
            keyExtractor={(item) => item.id || item.iataCode || item.name}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleAutocompleteSelect(item)}
                style={styles.autocompleteItem}
              >
                <Text style={styles.autocompleteText}>
                  {item.name} ({item.iataCode})
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}

      {/* Previous Selected Cities */}
      <View style={styles.previousContainer}>
        <Text style={styles.previousTitle} className="color-gray-800">Previous Selected Cities</Text>
        {previousSelectedDeparture.map((city, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setFlightOfferData({
                ...flightOfferData,
                originLocationCode: city.iataCode,
              });
              setSearchInput(`${city.city} (${city.iataCode})`);
            }}
            style={styles.previousItem}
          >
            <Text style={styles.previousText} className="color-gray-500">
              {city.city} ({city.iataCode})
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    height: 100,
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  searchInput: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  autocompleteContainer: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 10,
  },
  autocompleteItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  autocompleteText: {
    fontSize: 16,
    color: "#333",
  },
  previousContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  previousTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  previousItem: {
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
  },
  previousText: {
    fontSize: 16,
    color: "#555",
  },
});
