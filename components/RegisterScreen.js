import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleRegister = async () => {
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');

    if (!email.includes('@') || !email.includes('.com')) {
      setEmailError('Por favor, insira um e-mail válido');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError('As senhas não coincidem');
      isValid = false;
    }

    if (username.trim() && email.trim() && password.trim() && confirmPassword.trim() && isValid) {
      try {
        // Armazenar dados no AsyncStorage
        await AsyncStorage.setItem('username', username); // Armazenando o username
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);

        console.log('Usuário registrado:', { username, email, password });
        navigation.navigate('Login');
      } catch (error) {
        console.error('Erro ao armazenar dados no AsyncStorage', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar-se</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#aaa"
        />

        <View style={styles.errorContainer}>
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />

        <View style={styles.errorContainer}>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // Fundo preto
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#04B4AE', // Texto verde
    marginBottom: 30,
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#111', // Fundo preto mais claro
    borderRadius: 10,
    elevation: 5, // Sombra no Android
    shadowColor: '#04B4AE', // Sombra verde no iOS
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#04B4AE', // Borda verde
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#222', // Fundo cinza escuro
    fontSize: 16,
    color: '#04B4AE', // Texto verde
  },
  button: {
    width: '100%',
    backgroundColor: '#04B4AE', // Fundo verde
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000', // Texto preto no botão
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    width: '100%',
    marginBottom: -10,
  },
  errorText: {
    color: '#ff4d4d', // Vermelho para erros
    fontSize: 12,
    marginBottom: 5,
  },
});
