import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

interface Recomendacion {
  modelo: string;
  precio_aproximado: number;
  justificacion: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

export default function ResultsScreen({ route, navigation }: Props) {
  const { recomendacion }: { recomendacion: Recomendacion } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🎉 Banner de éxito */}
      <Animatable.View animation="fadeInDown" delay={100} style={styles.banner}>
        <Text style={styles.bannerText}>🎉 ¡Felicidades! Encontramos la mejor opción para ti</Text>
      </Animatable.View>

      <Animatable.View animation="bounceIn" delay={400} style={styles.card}>
        <Ionicons name="car-sport" size={64} color="#007bff" style={styles.icon} />

        <Text style={styles.label}>Modelo recomendado:</Text>
        <Text style={styles.value}>{recomendacion.modelo}</Text>

        <Text style={styles.label}>Precio aproximado:</Text>
        <Text style={styles.value}>${recomendacion.precio_aproximado.toLocaleString()}</Text>

        <Text style={styles.label}>¿Por qué es ideal para ti?</Text>
        <Text style={styles.value}>{recomendacion.justificacion}</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={600} style={{ width: '100%' }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] })}>
          <Text style={styles.buttonText}>🔄 Hacer otra consulta</Text>
        </TouchableOpacity>
      </Animatable.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  banner: { backgroundColor: '#e0f7fa', padding: 12, borderRadius: 10, marginBottom: 20 },
  bannerText: { fontSize: 16, color: '#007bff', fontWeight: '600', textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 }, shadowRadius: 6, elevation: 4, width: '100%', marginBottom: 30 },
  icon: { alignSelf: 'center', marginBottom: 15 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#555' },
  value: { fontSize: 16, marginBottom: 5, color: '#333' },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
