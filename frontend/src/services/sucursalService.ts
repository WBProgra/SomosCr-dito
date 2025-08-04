import api from './api';
import type { Sucursal } from '../types/sucursal';
import { showErrorAlert } from './alertService';

export const getSucursales = async (): Promise<Sucursal[]> => {
  try {
    const response = await api.get('/sucursales');
    return response.data;
  } catch (error) {
    showErrorAlert(error);
    throw error;
  }
};

export const createSucursal = async (sucursal: Omit<Sucursal, 'id'>): Promise<Sucursal> => {
  try {
    const response = await api.post('/sucursales', sucursal);
    return response.data;
  } catch (error) {
    showErrorAlert(error);
    throw error;
  }
};

export const updateSucursal = async (id: number, sucursal: Partial<Sucursal>): Promise<Sucursal> => {
  try {
    const response = await api.put(`/sucursales/${id}`, sucursal);
    return response.data;
  } catch (error) {
    showErrorAlert(error);
    throw error;
  }
};

export const deleteSucursal = async (id: number): Promise<void> => {
  try {
    await api.delete(`/sucursales/${id}`);
  } catch (error) {
    showErrorAlert(error);
    throw error;
  }
};