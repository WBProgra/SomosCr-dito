import { useSucursales } from '../hooks/useSucursales';
import { SucursalList } from '../components/sucursales/SucursalList';

export const SucursalesPage = () => {
  const {
    sucursales,
    loading,
    error,
    addSucursal,
    editSucursal,
    removeSucursal,
    fetchSucursales
  } = useSucursales();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Sucursales</h1>
      <SucursalList
        sucursales={sucursales}
        loading={loading}
        error={error}
        onAdd={async (sucursal) => { await addSucursal(sucursal); }}
        onEdit={async (id, sucursal) => { await editSucursal(id, sucursal); }}
        onDelete={removeSucursal}
      />
    </div>
  );
};