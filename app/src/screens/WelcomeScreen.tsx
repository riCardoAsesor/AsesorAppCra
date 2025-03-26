import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Animatable.View animation="bounceIn" delay={200} style={styles.innerContainer}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>¿Cómo deseas buscar tu próximo carro?</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInLeft" delay={500}>
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#007bff' }]}
          onPress={() => navigation.navigate('Questionnaire', { option: 'presupuesto' })}
        >
          <Ionicons name="cash-outline" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Por presupuesto</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInRight" delay={700}>
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#28a745' }]}
          onPress={() => navigation.navigate('Questionnaire', { option: 'tipo' })}
        >
          <Ionicons name="car-outline" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Por tipo de carro</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={900}>
        <TouchableOpacity
          style={[styles.optionButton, { backgroundColor: '#6f42c1' }]}
          onPress={() => navigation.navigate('AdvancedForm')}
        >
          <Ionicons name="options-outline" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Formulario avanzado</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f8fa' },
  innerContainer: { alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30, textAlign: 'center' },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: 250,
    marginBottom: 15,
  },
  icon: { marginRight: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});



