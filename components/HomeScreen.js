import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { getExchangeRates } from '../services/api';

export default function HomeScreen({ route }) {
  const { username } = route.params;
  const [brl, setBrl] = useState('');
  const [exchangeRates, setExchangeRates] = useState([]);

  const handleConversion = async () => {
    const rates = await getExchangeRates();
    const results = [
      { name: 'USD', flag: require('../assets/eus.png'), value: (parseFloat(brl) / rates.USD).toFixed(2) },
      { name: 'EUR', flag: require('../assets/franca.png'), value: (parseFloat(brl) / rates.EUR).toFixed(2) },
      { name: 'GBP', flag: require('../assets/reino.png'), value: (parseFloat(brl) / rates.GBP).toFixed(2) },
      { name: 'JPY', flag: require('../assets/jap.png'), value: (parseFloat(brl) / rates.JPY).toFixed(2) },
    ];
    setExchangeRates(results);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo(a), {username}!</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o valor em BRL"
        keyboardType="numeric"
        value={brl}
        onChangeText={setBrl}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleConversion}>
        <Text style={styles.buttonText}>Converter</Text>
      </TouchableOpacity>

      <View style={styles.resultsContainer}>
        <FlatList
          data={exchangeRates}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Image source={item.flag} style={styles.flag} />
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.value}</Text>
            </View>
          )}
          contentContainerStyle={styles.table}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#04B4AE',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#04B4AE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#222',
    color: '#04B4AE',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#04B4AE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsContainer: {
    width: '100%',
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    shadowColor: '#04B4AE',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#04B4AE',
  },
  tableCell: {
    flex: 1,
    color: '#04B4AE',
    fontSize: 18,
    textAlign: 'center',
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});