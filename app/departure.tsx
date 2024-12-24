import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { apiToken } from './utils/api';
import axios from 'axios'

export default function DepartureScreen() {
  const [searchInput, setSearchInput] = React.useState('')
  const [autocomplete, setAutocomplete] = React.useState([])
  const autoCompleteSearch = async (searchInput :string)=>{
    try {
      const headers = {
Authorization : ` Bearer ${apiToken}`
      };
      const url = ` https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${searchInput}`
      const response = await axios.get(url,{headers})
      setAutocomplete( response.data.data)
      
    } catch (error) {
      if(error.response && error.response.status===429){
        console.log('Too many requests')
      }
      console.error(error)
      
    }
  }
  const debounceSearch = async (searchInput:string)=>{
    
  }
  const handleInputChange = (value: string) => {
    setSearchInput(value)
  }
  return (
    <View className='flex-1 items-center bg-[#F5F7FA]'>
      <View className='w-full h-full'>
        <View className='' style={styles.headerContainer}>
          <View>
            {/* header */}
            <View className='flex-row gap-4 justify-start items-center px-2 py-6'>
              <Pressable
                onPress={() => router.back()}
                className='flex-row gap-2  items-center justify-center h-14 w-[20%] '
              >
                <View className='rounded-full bg-gray-500 h-10 w-10 justify-center items-center'>
                  <MaterialIcons name='arrow-back' size={24} color='white' />
                </View>
              </Pressable>
              <View className='w-[60%] justify-center items-center flex-row'>
                <Text className='text-lg font-bold text-gray-100'>Departure</Text>
              </View>
              <View>
                <MaterialCommunityIcons name='dots-horizontal' size={24} color='white' />
              </View>
            </View>
          </View>
        </View>

        {/*  Airport or city search */}
        <View className='w-full py-4 mt-6 px-4 relative'>
          <View className='flex-row  items-center justify-between bg-white border-2 border-gray-400 rounded-xl  h-14 overflow-hidden'>
            <View className='w-full h-full justify-center'>
              <TextInput
                placeholder='Search airport or city'
                className='w-full h-full px-2 text-gray-600  rounded-lg capitalize'
                value={searchInput}
                onChangeText={handleInputChange}
              />
            </View>
          </View>

          {/* autocomplete */}
          {
            autocomplete.length > 0 && (
              <View className='absolute  bg-white border-2 rounded-xl shadow-sm mt-2'>
                <FlatList
                data={autocomplete}
                keyExtractor={(item)=>item.id}
                renderItem={({item}) => (
                  <Pressable
                  onPress={() => {}}
                  className='border-b-2 border-gray-300 py-2 px-4'>
                    <Text className='capitalize'>{item.name} ({item.iatacode})</Text>
                  </Pressable>
                )
              }
                />
              </View>
            )
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
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
})
