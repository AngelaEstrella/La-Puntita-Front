import React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";

const NAVIGATION = [
  {
    kind: "header",
    title: "Configuración de Cuenta",
  },
  {
    segment: "perfil",
    title: "Mi Perfil",
    icon: <DashboardIcon />,
  },
  {
    segment: "historial-compras",
    title: "Historial de Compras",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Otras Opciones",
  },
  {
    segment: "seguimiento-pedidos",
    title: "Seguimiento de Pedidos",
    icon: <BarChartIcon />,
  },
  {
    segment: "integraciones",
    title: "Integraciones",
    icon: <LayersIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const AppBarCliente = (props) => {
  const { window } = props;
  const router = useDemoRouter("/perfil");

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
            <Grid xs={12}>
              <h2>Bienvenido a Mi Cuenta</h2>
              <p>Selecciona una opción en el menú de navegación para empezar.</p>
            </Grid>
            <Grid xs={4}>
              <Skeleton height={150} />
            </Grid>
            <Grid xs={8}>
              <Skeleton height={150} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};
/*Jelou, codigo completo*/ 
export default AppBarCliente;
