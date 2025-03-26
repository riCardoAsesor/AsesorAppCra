import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { auth } from '../firebaseConfig';
import Toast from 'react-native-toast-message';

export default function LogoutButton() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await auth.signOut();
    Toast.show({
      type: 'success',
      text1: 'Sesión cerrada',
      text2: 'Has cerrado sesión correctamente.',
    });
    navigation.replace('Auth');
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={handleLogout}>
      <Ionicons name="log-out-outline" size={24} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 30,
    zIndex: 1000,
    elevation: 5,
  },
});
