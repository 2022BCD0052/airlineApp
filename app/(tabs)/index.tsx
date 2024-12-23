import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '@/components/Header';
import { ArrowPathRoundedSquareIcon, ChevronDoubleRightIcon } from "react-native-heroicons/outline";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface TripOptionProps {
  pageNavigation: string;
  handNavigationChange: (type: string) => void;
}


const TripOption: React.FC<TripOptionProps> = ({ pageNavigation, handNavigationChange }) => (
  <View className="flex-row justify-between w-full  py-2">
    {/* One Way Option */}
    <Pressable onPress={() => handNavigationChange("OneWay")} className="flex-row w-1/2">
      <View className={`w-full  justify-center items-center flex-row space-x-3 pb-3 ${pageNavigation === "OneWay" ? "border-b-4 border-[#12B3A8]" : "border-transparent"}`}>
        <ChevronDoubleRightIcon className='w-6 h-6' size={24} color={pageNavigation === "OneWay" ? "#12B3A8" : "gray"} strokeWidth={pageNavigation === "OneWay" ? 3 : 2} />
        <Text className={`text-xl font-semibold ${pageNavigation === "OneWay" ? "text-[#12B3A8]" : "text-gray-500"}`}>
          One Way
        </Text>
      </View>
    </Pressable>

    {/* Round Trip Option */}
    <Pressable onPress={() => handNavigationChange("RoundTrip")} className="flex-row w-1/2">
      <View className={`w-full  justify-center items-center flex-row space-x-3 pb-3 ${pageNavigation === "RoundTrip" ? "border-b-4 border-[#12B3A8]" : "border-transparent"}`}>
        <ArrowPathRoundedSquareIcon className='w-6 h-6' size={20} color={pageNavigation === "RoundTrip" ? "#12B3A8" : "gray"} strokeWidth={pageNavigation === "RoundTrip" ? 3 : 2} />
        <Text className={`text-xl font-semibold ${pageNavigation === "RoundTrip" ? "text-[#12B3A8]" : "text-gray-500"}`}>
          Round Trip
        </Text>
      </View>
    </Pressable>
  </View>
);


// location component
interface LocationInputProps {
  placeholder:string;
  value: string;
  icon:React.ReactNode;
  onPress : ()=>void
}
const LocationInput: React.FC<LocationInputProps> = ({
  placeholder,
  value,
  icon,
  onPress,
}) =>(
 <View className='border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center'>
  <Pressable onPress={onPress}>
    <View className='px-4 flex-row justify-between items-center'>
      <View className='w-[15%] border-r-2 border-gray-300'>
        {icon}
      </View>
        <View className='w-[80%] py-3'>
          {
            value ? (
              <Text className='bg-transparent text-gray-600 font-bold'>{value}</Text>
            ):(
              <Text className='text-gray-500 text-lg font-semibold'>{placeholder}</Text>
            )
          }
        </View>
    </View>

  </Pressable>

 </View>
)

// search flightdata
interface SearchFlightData {
  originCity: string,
    destinationCity: string,
    DepartureDate:string,
    seat :number
}
// 

export default function HomeScreen() {
  const [isPending, setIsPending] = useState(false);
  const [pageNavigation, setPageNavigation] = useState("OneWay");
  const [searchFlightData, setsearchFlightData] = useState<SearchFlightData>({
    originCity: "",
    destinationCity: "",
    DepartureDate:"",
    seat :0
  });

  const handleNavigationChange = (type: string) => {
    setPageNavigation(type); // Update the navigation state to reflect the chosen option
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Loading Screen */}
      {isPending && (
        <View style={styles.loaderContainer} className='z-50'>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Main Form Area */}
      <View className="w-full px-4 -mt-28 mx-4">
        <View className="w-full bg-white rounded-3xl shadow-lg shadow-slate-400 p-2">
          <View className="flex-row justify-between w-full px-2 py-2">
            <TripOption pageNavigation={pageNavigation} handNavigationChange={handleNavigationChange} />
          </View>
        {/*origin location */}
        <LocationInput 
        placeholder={
          searchFlightData.originCity ? searchFlightData.originCity : "Departure City"
        }
        icon={<FontAwesome5 size={20} color="gray" name='plane-departure'/>}
        value={ searchFlightData.destinationCity}
        onPress={()=>{}}

        />
                {/*Destination location */}

           <LocationInput 
        placeholder={
          searchFlightData.originCity ? searchFlightData.originCity : "Departure City"
        }
        icon={<FontAwesome5 size={20} color="gray" name='plane-departure'/>}
        value={ searchFlightData.destinationCity}
        onPress={()=>{}}

        />


       
     
        </View>
        

      </View>
    </View>
  );
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
    justifyContent: "flex-start",
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
});
