import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function FirstPage({ navigation }) {
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

      <FlatList
        data={shoes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.shoeContainer}
            onPress={() => {
              // Navigate to DisplayScreen and pass the image and name of the shoe as props
              navigation.navigate('SecondPage', {
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
});
