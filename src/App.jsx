/// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import "./App.css";

import Layout from "./layout/layout";
import LandingLayout from "./layout/LandingLayout";
import FimiPage from "./pages/landings/fimiPage";
import CampaignSinglePage from "./pages/landings/campaigns/campaignSinglePage";

import SignIn from "./pages/authen/signIn";
import SignInAdmin from "./pages/authen/Admin/signInAdmin";
import SignUpAdmin from "./pages/authen/Admin/signUpAdmin";
import ForgotPasswordAdmin from "./pages/authen/Admin/forgotPasswordAdmin";

import SignInAdvertiser from "./pages/authen/Advertiser/signInAdvertiser";
import SignUpAdvertiser from "./pages/authen/Advertiser/signUpAdvertiser";
import ForgotPasswordAdvertiser from "./pages/authen/Advertiser/forgotPasswordAdvertiser";

import SignInPublisher from "./pages/authen/Publisher/signInPublisher";
import SignUpPublisher from "./pages/authen/Publisher/signUpPublisher";
import ForgotPasswordPublisher from "./pages/authen/Publisher/forgotPasswordPublisher";

import SignUp from "./pages/authen/signUp";
import ForgotPassword from "./pages/authen/forgotPassword";
import ConfirmCode from "./pages/authen/confirmCode";
import ResetPassword from "./pages/authen/resetPassword";

import ProtectedLayout from "./layout/protectedLayout";
import Dashboard from "./pages/backOffice/dashboard/dashboard";
import DashboardAdvertiser from "./pages/backOffice/dashboard/advertiser/dashboardAdvertiser";
import DashboardPublisher from "./pages/backOffice/dashboard/publisher/dashboardPublisher";
import Profile from "./pages/backOffice/profile/profile";
import Campaigns from "./pages/backOffice/campaigns/campaigns";
import Users from "./pages/backOffice/users/users";
import ErrorPage from "./pages/errorPage/errorPage";
import { getToken } from "./helpers/helpers";

function App() {
  return (
    // router run on localhost, note check link in page, remove FiMiApp
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="fimi" />} />
          <Route path="fimi/*" element={<LandingLayout />}>
            <Route index element={<FimiPage />} />
            <Route path="campaigns/:campaignId" element={< CampaignSinglePage />} /> 
          </Route>
          <Route path="/signin/admin" element={<SignInAdmin />} />
          <Route path="/signup/admin" element={<SignUpAdmin />} />
          <Route path="/forgot-password/admin" element={<ForgotPasswordAdmin />} />
              
          <Route path="/signin/advertiser" element={<SignInAdvertiser />} />
          <Route path="/signup/advertiser" element={<SignUpAdvertiser />} />
          <Route path="/forgot-password/advertiser" element={<ForgotPasswordAdvertiser />} />
          
          <Route path="/signin/publisher" element={<SignInPublisher />} />
          <Route path="/signup/publisher" element={<SignUpPublisher />} />
          <Route path="/forgot-password/publisher" element={<ForgotPasswordPublisher />} />
          
          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-code" element={<ConfirmCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            element={
              getToken() ? (
                <ProtectedLayout />
              ) : (
                <Navigate to="/signin/advertiser" />
              )
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Navigate to="advertiser" />} />
              <Route path="advertiser" element={<DashboardAdvertiser />} />
              <Route path="publisher" element={<DashboardPublisher />} />
            </Route>
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    // router run on Git
    // <HashRouter base="/FiMiApp/">
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route path="/signin/*" element={<SignIn />} />
    //       <Route path="/signin/admin" element={<SignInAdmin />} />
    //       <Route path="/signin/advertiser" element={<SignInAdvertiser />} />
    //       <Route path="/signin/publisher" element={<SignInPublisher />} />
    //       <Route path="/signup" element={<SignUp />} />
    //       <Route path="/forgot-password" element={<ForgotPassword />} />
    //       <Route path="/confirm-code" element={<ConfirmCode />} />
    //       <Route path="/reset-password" element={<ResetPassword />} />
    //       <Route
    //         element={
    //           getToken() ? <ProtectedLayout /> : <Navigate to="/signin/advertiser" />
    //         }
    //       >
    //         <Route index element={<Navigate to="/dashboard" />} />
    //         <Route path="/dashboard" element={<Dashboard />} />
    //         <Route path="/campaigns" element={<Campaigns />} />
    //         <Route path="/users" element={<Users />} />
    //         <Route path="/profile" element={<Profile />} />
    //       </Route>
    //     </Route>
    //   </Routes>
    // </HashRouter>
  );
}

export default App;
