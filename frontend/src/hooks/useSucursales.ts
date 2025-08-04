import { useState, useEffect } from 'react';
import {
  getSucursales,
  createSucursal,
  updateSucursal,
  deleteSucursal
} from '../services/sucursalService';
import type { Sucursal } from '../types/sucursal';

export const useSucursales = () => {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSucursales = async () => {
    try {
      setLoading(true);
      const data = await getSucursales();
      setSucursales(data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al cargar sucursales');
      }
    } finally {
      setLoading(false);
    }
  };

  const addSucursal = async (sucursal: Omit<Sucursal, 'id'>) => {
    try {
      const nuevaSucursal = await createSucursal(sucursal);
      setSucursales(prev => [...prev, nuevaSucursal]);
      return nuevaSucursal;
    } catch (err) {
      throw err;
    }
  };

  const editSucursal = async (id: number, sucursal: Partial<Sucursal>) => {
    try {
      const sucursalActualizada = await updateSucursal(id, sucursal);
      setSucursales(prev =>
        prev.map(s => (s.id === id ? sucursalActualizada : s))
      );
      return sucursalActualizada;
    } catch (err) {
      throw err;
    }
  };

  const removeSucursal = async (id: number) => {
    try {
      await deleteSucursal(id);
      setSucursales(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchSucursales();
  }, []);

  return {
    sucursales,
    loading,
    error,
    fetchSucursales,
    addSucursal,
    editSucursal,
    removeSucursal
  };
};