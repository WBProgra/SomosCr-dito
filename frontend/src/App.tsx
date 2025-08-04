import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SucursalesPage } from './pages/SucursalesPage';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <main className="py-8">
            <Routes>
              <Route path="/" element={<SucursalesPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};