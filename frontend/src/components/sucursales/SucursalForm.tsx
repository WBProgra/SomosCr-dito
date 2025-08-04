import React from 'react';
import {
    TextField,
    Button,
    Stack,
    InputAdornment,
    useTheme,
    CircularProgress,
    Box,
    FormHelperText
} from '@mui/material';
import { Phone, LocationOn, Business } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { Sucursal } from '../../types/sucursal';
import { showSuccessAlert, showErrorAlert } from '../../services/alertService';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no puede exceder los 100 caracteres')
        .required('El nombre es requerido'),
    direccion: Yup.string()
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .max(255, 'La dirección no puede exceder los 255 caracteres')
        .required('La dirección es requerida'),
    telefono: Yup.string()
        .matches(
            /^[0-9\-\+]{8,15}$/,
            'Formato de teléfono inválido (8-15 dígitos)'
        )
        .required('El teléfono es requerido'),
    activa: Yup.boolean()
});

type SucursalFormProps = {
    initialData?: Partial<Sucursal>;
    onSubmit: (sucursal: Omit<Sucursal, 'id'> | Partial<Sucursal>) => Promise<void>;
    onCancel: () => void;
    isEditing?: boolean;
    onSuccess?: () => void;
};

export const SucursalForm = ({
    initialData = {},
    onSubmit,
    onCancel,
    isEditing = false,
    onSuccess
}: SucursalFormProps) => {
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            nombre: initialData.nombre || '',
            direccion: initialData.direccion || '',
            telefono: initialData.telefono || '',
            activa: initialData.activa ?? true
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await onSubmit(values);
                showSuccessAlert(
                    isEditing
                        ? 'Sucursal actualizada correctamente'
                        : 'Sucursal creada correctamente'
                );
                onSuccess?.();
            } catch (error) {
                showErrorAlert(error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                maxWidth: '600px',
                margin: '0 auto'
            }}
        >
            <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Business color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                fullWidth
                label="Dirección"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                helperText={formik.touched.direccion && formik.errors.direccion}
                required
                multiline
                rows={3}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOn color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                helperText={formik.touched.telefono && formik.errors.telefono}
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Phone color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    sx={{
                        color: theme.palette.text.secondary,
                        borderColor: theme.palette.divider
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={formik.isSubmitting || !formik.isValid}
                    startIcon={formik.isSubmitting ? <CircularProgress size={20} /> : undefined}
                >
                    {formik.isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Guardar'}
                </Button>
            </Stack>
        </Box>
    );
};