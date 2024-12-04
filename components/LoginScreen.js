import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // Estado para controlar o erro de login

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      // Recupera os dados do usuário armazenados
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedUsername = await AsyncStorage.getItem('username'); // Recupera o username

      if (storedEmail === email && storedPassword === password) {
        // Passa o username para a HomeScreen
        navigation.navigate('Home', { username: storedUsername });
        setLoginError(false); // Reseta o erro de login se o login for bem-sucedido
      } else {
        setLoginError(true); // Exibe a mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao acessar o AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Faça login para acessar o app</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#aaa"
            keyboardType="email-address"
          />
          {loginError && (
            <Text style={styles.errorText}>Login errado</Text> // Mensagem de erro sobre o campo e-mail
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputSpacing]} // Adiciona o espaçamento
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Não tem uma conta? Registre-se</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#04B4AE', // Título verde
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#04B4AE', // Subtítulo verde
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400, // Limita a largura para telas maiores
    padding: 20,
    backgroundColor: '#111', // Fundo preto mais claro
    borderRadius: 10,
    elevation: 5, // Para sombra no Android
    shadowColor: '#04B4AE', // Sombra verde no iOS
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#04B4AE', // Borda verde
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#222', // Fundo cinza escuro
    fontSize: 16,
    color: '#04B4AE', // Texto verde
  },
  inputSpacing: {
    marginBottom: 20, // Espaçamento entre os campos
  },
  errorText: {
    color: 'red', // Mensagem de erro em vermelho
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    width: '100%',
    backgroundColor: '#04B4AE', // Botão verde
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000', // Texto do botão em preto
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 14,
    color: '#04B4AE', // Texto do registro em verde
    marginTop: 10,
    textAlign: 'center',
  },
});
