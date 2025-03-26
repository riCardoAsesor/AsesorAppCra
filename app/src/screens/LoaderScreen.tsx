import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function LoaderScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const animRef = useRef<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setTimeout(() => {
        if (animRef.current) {
          animRef.current.fadeOut(500).then(() => {
            if (user) {
              navigation.replace('Home');
            } else {
              navigation.replace('Auth');
            }
          });
        }
      }, 2000);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View ref={animRef} animation="fadeInUp" delay={200}>
        <LottieView
          source={require('../../assets/loader-car.json')}
          autoPlay
          loop
          style={{ width: 220, height: 220 }}
        />
        <Text style={styles.text}>Cargando tu asesor personal...</Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { marginTop: 20, fontSize: 16, color: '#555', textAlign: 'center' },
});


