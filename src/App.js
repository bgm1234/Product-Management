import { AppBar, Toolbar, Button, Badge, IconButton } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Home } from "./pages/home";
import { SingIn } from "./pages/sign-in";
import { SignUp } from "./pages/sign-up";
import { Management } from "./pages/management";
import { CategoryManagement } from "./pages/category-management";
import { ProductManagement } from "./pages/product-management";
import { ProductDetailPage } from "./pages/product-detail-page";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BasketPage } from "./pages/basket-page";
import { useBasketContext } from "./context/basket-context";
import { PaymentPage } from "./pages/payment-page";
import { UsersPage } from "./pages/users-page";

const theme = createTheme({
  typography: {
    fontSize: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#2e7d32",
    },
    secondary:{
      main: "#FFEB3B",
    },
  },
});

function App() {
  const navigate = useNavigate();
  const { basketCount } = useBasketContext();

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              </Button>
              <Button component={Link} to="/management" color="inherit">
                Yönetim Paneli
              </Button>
              <div style={{ flexGrow: 1 }} />
              <Button component={Link} to={"/sign-in"} color="inherit">
                Giriş Yap
              </Button>
              <Button component={Link} to={"/sign-up"} color="inherit">
                Kayıt Ol
              </Button>
              <IconButton onClick={() => navigate("/basket")}>
                <Badge
                  badgeContent={basketCount}
                  color="secondary"
                  sx={{ ml: 1 }}
                >
                  <ShoppingBasketIcon style={{ color: "white" }} />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/management" element={<Management />}>
                <Route
                  path="/management"
                  element={<ProductManagement />}
                ></Route>
                <Route
                  path="/management/category"
                  element={<CategoryManagement />}
                ></Route>
                <Route
                  path="/management/users"
                  element={<UsersPage />}
                ></Route>
              </Route>
              <Route path="/sign-in" element={<SingIn />}></Route>
              <Route path="/sign-up" element={<SignUp />}></Route>
              <Route
                path="/product/:id"
                element={<ProductDetailPage />}
              ></Route>
              <Route path="/basket" element={<BasketPage />}></Route>
              <Route path="/payment" element={<PaymentPage />}></Route>
            </Routes>
          </div>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;
