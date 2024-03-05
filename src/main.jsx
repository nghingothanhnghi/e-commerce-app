import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import ConfirmConnectStatus from "./components/ConfirmConnectStatus/ConfirmConnectStatus.jsx";
import AuthProvider from "./components/AuthProvider/AuthProvider.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import { ToastContextProvider } from "./contexts/ToastContext.jsx";
import { ColorModeProvider } from "./contexts/ColorModeContext.jsx";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ColorModeProvider>
        <AuthProvider>
          <ToastContextProvider>
            <ConfirmConnectStatus />
            <CartProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </CartProvider>
          </ToastContextProvider>
        </AuthProvider>
      </ColorModeProvider>
    </I18nextProvider>
  </React.StrictMode>
);
