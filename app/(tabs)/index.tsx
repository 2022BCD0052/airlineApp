import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Header from '@/components/Header'
import { ArrowPathRoundedSquareIcon, ChevronDoubleRightIcon } from 'react-native-heroicons/outline'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { router, useFocusEffect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiBaseUrl, apiToken } from '../utils/api'
import axios from 'axios'

interface TripOptionProps {
  pageNavigation: string
  handNavigationChange: (type: string) => void
}

const TripOption: React.FC<TripOptionProps> = ({ pageNavigation, handNavigationChange }) => (
  <View className='flex-row justify-between w-full  py-2'>
    {/* One Way Option */}
    <Pressable onPress={() => handNavigationChange('OneWay')} className='flex-row w-1/2'>
      <View
        className={`w-full  justify-center items-center flex-row space-x-3 pb-3 ${
          pageNavigation === 'OneWay' ? 'border-b-4 border-[#12B3A8]' : 'border-transparent'
        }`}
      >
        <ChevronDoubleRightIcon
          className='w-6 h-6'
          size={24}
          color={pageNavigation === 'OneWay' ? '#12B3A8' : 'gray'}
          strokeWidth={pageNavigation === 'OneWay' ? 3 : 2}
        />
        <Text
          className={`text-xl font-semibold ${
            pageNavigation === 'OneWay' ? 'text-[#12B3A8]' : 'text-gray-500'
          }`}
        >
          One Way
        </Text>
      </View>
    </Pressable>

    {/* Round Trip Option */}
    <Pressable onPress={() => handNavigationChange('RoundTrip')} className='flex-row w-1/2'>
      <View
        className={`w-full  justify-center items-center flex-row space-x-3 pb-3 ${
          pageNavigation === 'RoundTrip' ? 'border-b-4 border-[#12B3A8]' : 'border-transparent'
        }`}
      >
        <ArrowPathRoundedSquareIcon
          className='w-6 h-6'
          size={20}
          color={pageNavigation === 'RoundTrip' ? '#12B3A8' : 'gray'}
          strokeWidth={pageNavigation === 'RoundTrip' ? 3 : 2}
        />
        <Text
          className={`text-xl font-semibold ${
            pageNavigation === 'RoundTrip' ? 'text-[#12B3A8]' : 'text-gray-500'
          }`}
        >
          Round Trip
        </Text>
      </View>
    </Pressable>
  </View>
)

// location component
interface LocationInputProps {
  placeholder: string
  value: string
  icon: React.ReactNode
  onPress: () => void
}
const LocationInput: React.FC<LocationInputProps> = ({ placeholder, value, icon, onPress }) => (
  <View className='border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center'>
    <Pressable onPress={onPress}>
      <View className='px-4 flex-row justify-between items-center'>
        <View className='w-[15%] border-r-2 border-gray-300'>{icon}</View>
        <View className='w-[80%] py-3'>
          {value ? (
            <Text className='bg-transparent text-gray-600 font-bold'>{value}</Text>
          ) : (
            <Text className='text-gray-500 text-lg font-semibold'>{placeholder}</Text>
          )}
        </View>
      </View>
    </Pressable>
  </View>
)

// search flightdata
interface SearchFlightData {
  originCity: string
  destinationCity: string
  DepartureDate: string
  seat: number
}
//  departure date

interface DepartureDateProps {
  placeholder: string
  value: string
  icon: React.ReactNode
  onPress: () => void
}
const DepartureDate: React.FC<DepartureDateProps> = ({ placeholder, value, icon, onPress }) => (
  <Pressable
    onPress={onPress}
    className='border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center flex-row items-center py-4'
  >
    <View className='w-[15%] border-r-2 border-gray-300'>{icon}</View>
    <View className='w-[80%] px-4'>
      {value ? (
        <Text className='bg-transparent text-gray-600 font-bold'>{value}</Text>
      ) : (
        <Text className='text-gray-500 text-lg font-semibold'>{placeholder}</Text>
      )}
    </View>
  </Pressable>
)

// flight offer data form
export interface FlightOfferData {
  originLocationCode: string
  destinationLocationCode: string
  DepartureDate: Date
  returnDate: Date
  adults: number
  maxResults: number
}

export default function HomeScreen() {
  const [isPending, setIsPending] = useState(false)
  const [refressData, setRefressData] = useState(false)
  const [session, setSession] = useState<any>(null)
  const [pageNavigation, setPageNavigation] = useState('OneWay')
  const [searchFlightData, setsearchFlightData] = useState<SearchFlightData>({
    originCity: '',
    destinationCity: '',
    DepartureDate: '',
    seat: 1,
  })


  const [selectedDate, setSelectedDate] = useState<any>(new Date())
  const [flightOfferData, setFlightOfferDate] = useState<FlightOfferData>({
    originLocationCode: '',
    destinationLocationCode: '',
    DepartureDate: new Date(),
    returnDate: new Date(),
    adults: 0,
    maxResults: 10,
  })
// fixed departure date 
useEffect(() => {
  const loadSelectedDestination = async () => {
    try {
      const departureCities = await AsyncStorage.getItem("departureCities");

      if (departureCities) {
        const departureCityArray = JSON.parse(departureCities);
        const lastAddedItem = departureCityArray[departureCityArray.length - 1];
        setsearchFlightData((prev) => ({
          ...prev,
          originCity: lastAddedItem.city,
        }));
        setFlightOfferDate((prev) => ({
          ...prev,
          originLocationCode: lastAddedItem.iataCode,
        }));
      }
    } catch (error) {
      console.error("Error loading data from AsyncStorage", error);
    }
  };

  if (refressData) {
    loadSelectedDestination();
    setRefressData(false);
  }
}, [refressData]);

// fixed destination date 
useEffect(() => {
  const loadSelectedDestination = async () => {
    try {
      const departureCities = await AsyncStorage.getItem("destinationCities")

      if (departureCities) {
        const departureCityArray = JSON.parse(departureCities);
        const lastAddedItem = departureCityArray[departureCityArray.length - 1];
        setsearchFlightData((prev) => ({
          ...prev,
          destinationCity: lastAddedItem.city,
        }));
        setFlightOfferDate((prev) => ({
          ...prev,
          destinationLocationCode: lastAddedItem.iataCode,
        }));
      }
    } catch (error) {
      console.error("Error loading data from AsyncStorage", error);
    }
  };

  if (refressData) {
    loadSelectedDestination();
    setRefressData(false);
  }
}, [refressData]);

// save selected departure date
useEffect(() => {
  const loadDepartureDate = async () => {
    try {
      const savedDate = await AsyncStorage.getItem("departureDate");
      if (savedDate) {
        setsearchFlightData((prev) => ({
          ...prev,
          DepartureDate: savedDate,
        }));
      } else {
        // If no saved date, set the default future date
        const defaultDate = getDefaultFutureDate();
        setsearchFlightData((prev) => ({
          ...prev,
          DepartureDate: defaultDate,
        }));
      }
    } catch (error) {
      console.error("Error loading departure date from AsyncStorage", error);
    }
  };

  loadDepartureDate();
}, [refressData]);


  const hnadleBackFromPreviousScreen = ()=>{
    setRefressData(true);
  }
  useFocusEffect(
useCallback(()=>{
  hnadleBackFromPreviousScreen();

},[session])
  )

  const handleNavigationChange = (type: string) => {
    setPageNavigation(type) // Update the navigation state to reflect the chosen option
  }

  const getDefaultFutureDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Add 1 day to ensure it's in the future
    return today.toISOString().split('T')[0];
  };
  
  const validateDepartureDate = (date) => {
    const today = new Date();
    const departureDate = new Date(date);
  
    // If DepartureDate is in the past, replace it with the default future date
    if (departureDate < today) {
      console.warn(
        `DepartureDate (${date}) is in the past. Using default future date.`
      );
      return getDefaultFutureDate();
    }
    return date;
  };
  
// ++++++++++++++++++++++++++++++++++++++++++?//
// construct search url from session data and session
const constructSearchUrl = () => {
  const {
    originLocationCode,
    destinationLocationCode,
    DepartureDate,
    adults,
    maxResults,
  } = flightOfferData;

  if (!originLocationCode || !destinationLocationCode || !DepartureDate || !adults) {
    Alert.alert("Missing Data", "Please fill in all required fields.");
    return null;
  }

  // Validate DepartureDate
  const FormateddateDepartureDate(DepartureDate);

  console.log("Validated DepartureDate:", validatedDepartureDate);
  console.log("Original DepartureDate:", DepartureDate);
console.log("Validated DepartureDate:", validatedDepartureDate);


  // Construct the search URL with the validated date
  const searchUrl = `${apiBaseUrl}?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${formattedDepartureDate}&adults=${adults}&max=${maxResults};
  return searchUrl;
};


const handleParentSearch = async () => {
  // Validate the date first

  const searchUrl = constructSearchUrl();
  if (!searchUrl) return; // Exit if URL is invalid

  setIsPending(true);
  try {
    const response = await axios.get(searchUrl, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });
    console.log("API Response:", response.data);
  } catch (error) {
    console.error("Error Response Data:", error.response?.data);
    console.error("Error Status:", error.response?.status);
    console.error("Error Message:", error.message);

    let errorMessage = "Error fetching flight data, please try again.";
    if (error.response?.status === 401) {
      errorMessage = "Session expired, please try again.";
    } 
     else if (error.response?.status === 500) {
      errorMessage = "Server error, please try later.";
    }

    Alert.alert("Error", errorMessage);
  } finally {
    setIsPending(false);
  }
};


// fetch flight data

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      {/* Loading Screen */}
      {isPending && (
        <View style={styles.loaderContainer} className='z-50'>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      )}

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Main Form Area */}
      <View className='w-full px-4 -mt-28 mx-4'>
        <View className='w-full bg-white rounded-3xl shadow-lg shadow-slate-400 p-2'>
          <View className='flex-row justify-between w-full px-2 py-2'>
            <TripOption
              pageNavigation={pageNavigation}
              handNavigationChange={handleNavigationChange}
            />
          </View>
          {/*origin location */}
          <LocationInput
            placeholder={
              searchFlightData.originCity ? searchFlightData.originCity : 'Departure City'
            }
            icon={<FontAwesome5 size={20} color='gray' name='plane-departure' />}
            value={searchFlightData. originCity}
            onPress={() => router.push("/departure")}
          />
          {/*Destination location */}

          <LocationInput
            placeholder={
              searchFlightData.destinationCity ? searchFlightData.destinationCity : 'Departure City'
            }
            icon={<FontAwesome5 size={20} color='gray' name='plane-departure' />}
            value={searchFlightData.destinationCity}
            onPress={() => router.push("/destination")}
          />
          {/*Departure date */}
          <DepartureDate
            placeholder={
              selectedDate && selectedDate.length > 0
                ? selectedDate.replace(/^"|"$/g, '')
                : 'Departure Date'
            }
            icon={<FontAwesome5 size={20} color='gray' name='calendar-alt' />}
            value={searchFlightData.DepartureDate}
            onPress={() => router.push('/departureDate')}
          />
          {/* seats */}
          <View className='border-gray-300 border-2 mx-4 flex-row rounded-2xl py-1 items-center justify-center pl-4'>
            <View className=''>
              <MaterialCommunityIcons name='seat-passenger' size={20} color='gray' />
            </View>
            <TextInput
              className='w-[85%]  text-base px-4 font-semibold border-gray-600 '
              placeholder='Select Seats'
              keyboardType='numeric'
              value={String(searchFlightData.seat)}
              onChangeText={(text) => {
                const seatValue = parseInt(text, 10)
                const validSeatValue = isNaN(seatValue) ? 0 : seatValue
                setsearchFlightData((prev) => {
                  return { ...prev, seat: validSeatValue }
                })

                setFlightOfferDate((prev) => ({
                  ...prev,
                  adults: validSeatValue,
                }))
              }}
            />
          </View>

          {/* search button */}
          <View className='w-full justify-start pt-2 px-4 mt-2'>
            <Pressable
              className='bg-[#12B3A8] rounded-lg justify-center items-center py-3'
              onPress={handleParentSearch}
            >
              <Text className='text-white font-bold text-lg'>Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    position: 'relative',
  },
  loaderContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerContainer: {
    height: 250,
    width: '100%',
    backgroundColor: '#192031',
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    marginBottom: -30, // To overlap and create an elevated effect
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}) 