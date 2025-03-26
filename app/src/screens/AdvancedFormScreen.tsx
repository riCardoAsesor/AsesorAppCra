import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Toast from 'react-native-toast-message';

export default function AdvancedFormScreen() {
  const [location, setLocation] = useState('');
  const [financing, setFinancing] = useState(false);
  const [financingBudget, setFinancingBudget] = useState('');
  const [usage, setUsage] = useState('');
  const [vehicleCondition, setVehicleCondition] = useState('');
  const [mustHaveFeatures, setMustHaveFeatures] = useState('');
  const [dealBreakers, setDealBreakers] = useState('');
  const [ownershipDuration, setOwnershipDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!location || !vehicleCondition || !ownershipDuration) {
      Toast.show({
        type: 'error',
        text1: 'Campos requeridos',
        text2: 'Por favor completa todos los campos obligatorios.',
      });
      return;
    }

    const payload = {
      location,
      financing,
      financing_budget: financing ? financingBudget : '',
      usage: usage.split(',').map(item => item.trim()),
      vehicle_condition: vehicleCondition,
      must_have_features: mustHaveFeatures.split(',').map(item => item.trim()),
      deal_breakers: dealBreakers.split(',').map(item => item.trim()),
      ownership_duration: ownershipDuration,
      timestamp: new Date(),
    };

    try {
      setLoading(true);
      await addDoc(collection(db, 'formulariosAvanzados'), payload);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Formulario enviado',
        text2: 'Tus preferencias fueron guardadas.',
      });
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se pudo guardar el formulario.',
      });
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario avanzado de preferencias</Text>

      <TextInput
        placeholder="Ciudad donde vives"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.switchRow}>
        <Text>¿Necesitas financiación?</Text>
        <Switch value={financing} onValueChange={setFinancing} />
      </View>

      {financing && (
        <TextInput
          placeholder="Presupuesto para financiación"
          style={styles.input}
          value={financingBudget}
          onChangeText={setFinancingBudget}
          keyboardType="numeric"
        />
      )}

      <TextInput
        placeholder="¿Qué uso le darás? (ej. trabajo, familia, viajes)"
        style={styles.input}
        value={usage}
        onChangeText={setUsage}
      />

      <TextInput
        placeholder="Condición del vehículo (nuevo, usado, ambos)"
        style={styles.input}
        value={vehicleCondition}
        onChangeText={setVehicleCondition}
      />

      <TextInput
        placeholder="Características obligatorias (separadas por coma)"
        style={styles.input}
        value={mustHaveFeatures}
        onChangeText={setMustHaveFeatures}
      />

      <TextInput
        placeholder="Aspectos que no toleras (separados por coma)"
        style={styles.input}
        value={dealBreakers}
        onChangeText={setDealBreakers}
      />

      <TextInput
        placeholder="¿Cuánto tiempo planeas tener el carro?"
        style={styles.input}
        value={ownershipDuration}
        onChangeText={setOwnershipDuration}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
