declare const __DEV__: boolean;

const LOCAL_IP = 'http://192.168.1.5:4000'; // Cambia X por tu IP real
const PROD_URL = 'https://backend-asesor.onrender.com'; // Tu dominio real si lo tienes

export const API_BASE_URL = __DEV__ ? LOCAL_IP : PROD_URL;
