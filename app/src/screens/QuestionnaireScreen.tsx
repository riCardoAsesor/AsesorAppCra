import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Questionnaire'>;

export default function QuestionnaireScreen({ route, navigation }: Props) {
  const { option } = route.params;
  const [budget, setBudget] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    if (city.trim() === '' || (option === 'presupuesto' && budget.trim() === '')) {
      Toast.show({
        type: 'error',
        text1: 'Campos incompletos',
        text2: 'Por favor llena todos los campos.',
      });
      return;
    }

    setLoading(true);

    const data = {
      tipoBusqueda: option,
      presupuesto: budget,
      ciudad: city,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, 'respuestas'), data);

      const response = await axios.post(`${API_BASE_URL}/recomendar-carro`, {
        presupuesto: budget,
        ciudad: city,
        tipoBusqueda: option,
      });

      setLoading(false);
      navigation.navigate('Results', { recomendacion: response.data.recomendacion });

    } catch (error: any) {
      setLoading(false);
      console.error('Error:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Hubo un problema al obtener la recomendación.',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        <Animatable.Text animation="fadeInDown" style={styles.title}>
          {option === 'presupuesto' ? 'Búsqueda por presupuesto' : 'Búsqueda por tipo de carro'}
        </Animatable.Text>

        {option === 'presupuesto' && (
          <Animatable.View animation="fadeInUp" delay={200} style={styles.inputWrapper}>
            <Ionicons name="cash-outline" size={20} color="#555" style={styles.icon} />
            <TextInput
              placeholder="¿Cuál es tu presupuesto máximo?"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
              style={styles.input}
            />
          </Animatable.View>
        )}

        <Animatable.View animation="fadeInUp" delay={400} style={styles.inputWrapper}>
          <Ionicons name="location-outline" size={20} color="#555" style={styles.icon} />
          <TextInput
            placeholder="¿En qué ciudad vives?"
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={600}>
          <TouchableOpacity style={styles.button} onPress={handleFinish} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Obtener recomendación</Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    marginBottom: 20, 
    width: '100%' 
  },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 10, fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});

