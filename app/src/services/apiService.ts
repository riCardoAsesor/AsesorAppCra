import axios from 'axios';
import { API_BASE_URL } from '../config/config';

export async function obtenerRecomendacion({
  presupuesto,
  ciudad,
  tipoBusqueda,
}: {
  presupuesto: string;
  ciudad: string;
  tipoBusqueda: string;
}) {
  try {
    const response = await axios.post(`${API_BASE_URL}/recomendar-carro`, {
      presupuesto,
      ciudad,
      tipoBusqueda,
    });

    return response.data.recomendacion;
  } catch (error) {
    console.error('Error al obtener recomendación:', error);
    throw new Error('Error en la API. No se pudo obtener la recomendación');
  }
}