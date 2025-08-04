import type { Sucursal } from '../../types/sucursal';
import { 
  TableRow, 
  TableCell, 
  IconButton, 
  Tooltip,
  Chip,
  Typography,
  Box
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

type SucursalItemProps = {
  sucursal: Sucursal;
  onEdit: (sucursal: Sucursal) => void;
  onDelete: (id: number) => void;
  isMobile: boolean;
};

export const SucursalItem = ({ 
  sucursal, 
  onEdit, 
  onDelete,
  isMobile 
}: SucursalItemProps) => {
  if (isMobile) {
    return (
      <TableRow hover>
        <TableCell colSpan={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {sucursal.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sucursal.direccion}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tel: {sucursal.telefono}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Chip
                label={sucursal.activa ? 'Activa' : 'Inactiva'}
                color={sucursal.activa ? 'success' : 'error'}
                size="small"
              />
              <Box>
                <Tooltip title="Editar">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(sucursal)}
                    sx={{ mr: 1 }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(sucursal.id!)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow hover>
      <TableCell>{sucursal.nombre}</TableCell>
      <TableCell>{sucursal.direccion}</TableCell>
      <TableCell>{sucursal.telefono}</TableCell>
      <TableCell>
        <Chip
          label={sucursal.activa ? 'Activa' : 'Inactiva'}
          color={sucursal.activa ? 'success' : 'error'}
          size="small"
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Editar">
          <IconButton
            color="primary"
            onClick={() => onEdit(sucursal)}
            sx={{ mr: 1 }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            color="error"
            onClick={() => onDelete(sucursal.id!)}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};