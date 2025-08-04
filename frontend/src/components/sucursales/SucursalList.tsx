import { useState } from 'react';
import { 
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { AddCircleOutline, Close } from '@mui/icons-material';
import { SucursalForm } from './SucursalForm';
import { SucursalItem } from './SucursalItem';
import { useSucursales } from '../../hooks/useSucursales';
import { showErrorAlert } from '../../services/alertService';
import type { Sucursal } from '../../types/sucursal';

export const SucursalList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    sucursales,
    loading,
    error,
    addSucursal,
    editSucursal,
    removeSucursal,
    fetchSucursales
  } = useSucursales();
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSucursal, setEditingSucursal] = useState<Sucursal | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await removeSucursal(id);
      fetchSucursales();
    } catch (error) {
      showErrorAlert(error);
    }
  };

  const handleSuccess = () => {
    setOpenDialog(false);
    fetchSucursales();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    showErrorAlert(error);
    return null;
  }

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h5" component="h2" fontWeight="bold">
              Gestión de Sucursales
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sucursales.length} sucursal{sucursales.length !== 1 ? 'es' : ''} registrada{sucursales.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={() => setOpenDialog(true)}
          >
            Agregar Sucursal
          </Button>
        </Box>

        <TableContainer 
          component={Paper} 
          elevation={0} 
          variant="outlined"
          sx={{ 
            maxWidth: '100%',
            overflowX: 'auto',
            margin: '0 auto'
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
              {!isMobile && (
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Dirección</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {sucursales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isMobile ? 1 : 5}>
                    <Box 
                      display="flex" 
                      flexDirection="column" 
                      alignItems="center" 
                      justifyContent="center" 
                      py={4}
                      color="text.secondary"
                    >
                      <Typography variant="h6">No hay sucursales registradas</Typography>
                      <Typography variant="body2">
                        Comienza agregando tu primera sucursal
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                sucursales.map((sucursal) => (
                  <SucursalItem
                    key={sucursal.id}
                    sucursal={sucursal}
                    onEdit={(s) => {
                      setEditingSucursal(s);
                      setOpenDialog(true);
                    }}
                    onDelete={handleDelete}
                    isMobile={isMobile}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingSucursal ? 'Editar Sucursal' : 'Agregar Nueva Sucursal'}
            <IconButton
              aria-label="close"
              onClick={() => setOpenDialog(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <SucursalForm
              initialData={editingSucursal || undefined}
              onSubmit={editingSucursal ? 
                (data) => editSucursal(editingSucursal.id!, data) : 
                addSucursal
              }
              onCancel={() => setOpenDialog(false)}
              isEditing={!!editingSucursal}
              onSuccess={handleSuccess}
            />
          </DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
};