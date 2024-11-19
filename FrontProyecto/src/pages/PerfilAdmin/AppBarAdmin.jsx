import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Grid from '@mui/material/Grid';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Menú',
  },
  {
    segment: 'admin',
    title: 'Administrador',
    icon: <PersonIcon />,
  },
  {
    segment: 'pedidos',
    title: 'Pedidos',
    icon: <ListIcon />,
  },
  {
    segment: 'modificar',
    title: 'Modificar carta',
    icon: <EditIcon />,
  },
  {
    segment: 'salir',
    title: 'Salir',
    icon: <ExitToAppIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutCustom(props) {
  const { window } = props;
  const router = useDemoRouter('/admin');

  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={2}>
            {/* Menú lateral */}
            <Grid item xs={3}>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <img
                  src="https://via.placeholder.com/100"
                  alt="Perfil"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    marginBottom: '10px',
                  }}
                />
                <h3>Administrador</h3>
              </div>
            </Grid>

            {/* Contenido principal */}
            <Grid item xs={9}>
              <h2>Foto de perfil</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img
                  src="https://via.placeholder.com/100"
                  alt="Perfil"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                  }}
                />
                <div>
                  <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Quitar foto
                  </Button>
                  <Button variant="contained" color="secondary">
                    Cambiar foto
                  </Button>
                </div>
              </div>

              <div style={{ marginTop: '30px' }}>
                {['Nombre', 'DNI', 'Correo electrónico', 'Teléfono', 'Dirección'].map((field) => (
                  <div
                    key={field}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px',
                    }}
                  >
                    <TextField
                      label={field}
                      variant="outlined"
                      fullWidth
                      disabled
                      style={{ marginRight: '10px' }}
                    />
                    <Button variant="outlined" color="primary">
                      Editar
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="contained" color="success" fullWidth style={{ marginTop: '20px' }}>
                Guardar cambios
              </Button>
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
