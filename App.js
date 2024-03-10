
import { Button,FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';
import axios from 'axios';




function DetailsScreen(props) {


  const [items, setItems] = useState(props.items || []);
  const navigation = useNavigation();

  useEffect(() => {
    setItems([
      ...items,
      {
      id: props.route.params.id,

        image: props.route.params.image,
        name: props.route.params.name,
      }
    ]);
  }, [props.route.params.image, props.route.params.name]);


  const addToCart = () => {
    navigation.navigate('Cart', {
      item: {
        id: props.route.params.id,
        image: props.route.params.image,
        name: props.route.params.name,
      }
    });
  }





    return (
        <ScrollView>
          <View style={styles.container1}>
            <Image style={styles.shoeImage1} source={{ uri: props.route.params.image}} />
            <Text style={styles.shoeName1}>{props.route.params.name}</Text>
            <Text style={styles.shoeprice1}>${props.route.params.price}</Text>
            <Text style={styles.shoedesc1}>{props.route.params.description}</Text>
            <Text style={styles.shoedesc1}>Rating :{props.route.params.rate}</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
}

function HomeScreen({ navigation }) {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios({
            method: 'GET',
            url: 'https://shoes-collections.p.rapidapi.com/shoes',
            headers: {
              'X-RapidAPI-Key': '81347b885amsh9c8a1791b74a2f9p1a33acjsn407b07f89963',
              'X-RapidAPI-Host': 'shoes-collections.p.rapidapi.com',
            },
          });
          setShoes(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, []);

    return (
      <View style={styles.container}>
        <Image style={{}} source={require('./images/shoe.png')} />
        <FlatList
          data={shoes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.shoeContainer}
              onPress={() => {
                // Navigate to DisplayScreen and pass the image and name of the shoe as props
                navigation.navigate('Details', {
                  id: item.id,
                  image: item.image,
                  name: item.name,
                  price: item.price,
                  description: item.description,
                  rate: item.rating.rate,
                });
              }}
            >
              <Image style={styles.shoeImage} source={{ uri: item.image }} />
              <Text style={styles.shoeName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>
    );
}

function SettingsScreen(props) {

  const [items, setItems] = useState(props.route.params.items || []);

  return (
    <FlatList
      data={props.route.params.items}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image style={styles.shoeImage} source={{ uri: item.image }} />
          <Text style={styles.shoeName}>{item.name}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />

    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Cart1" component={SettingsScreen}  />


    </SettingsStack.Navigator>
  );
}



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarActiveBackgroundColor:'#fff',
        tabBarActiveTintColor:'blue',
        headerShown: false }}>
        <Tab.Screen name="home" component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Cart" component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
      },
      headerImage: {
        width: '100%',
        height: 200,
      },
      list: {
        alignItems: 'center',
      },
      shoeContainer: {
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        margin: 10,

        width: '45%',
      },
      shoeImage: {
        width: '100%',
        height: 200,
      },
      shoeName: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
      },

    container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    },
    shoeImage1: {
    width: '100%',
    height: 200,
    marginTop:40,
    },
    shoeName1: {
    textAlign: 'center',
    fontSize: 28,
    marginHorizontal:30,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    },
    shoedesc1: {
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal:50,
        fontWeight: '500',
        color: '#000000',
        marginTop: 10,
        },
        shoeprice1: {
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#000000',
            marginTop: 10,
            },
            addToCartButton: {
                backgroundColor: '#0288D1',
                width:300,
                height:60,
                padding: 10,
                marginTop: 20,
                marginBottom: 30,
                borderRadius: 10,
              },
              addToCartButtonText: {
                color: 'white',
                fontSize: 28,
                textAlign: 'center',
              },

    });