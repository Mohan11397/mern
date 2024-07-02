import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/loginpage/LoginPage";
import { AppProvider } from "./components/context/AppContext";
import FruitShop from "./components/tailwind/FruitShop";
import PrivateRoute from "./auth/PrivateRoute";
import ProfileDetail from "./components/profile/ProfileDetail";
import TableComponent from "./components/tailwind/TableComponent";
import SignupForm from "./components/loginpage/SignupForm";
// import Footer from "./components/footer/Footer";

function App() {
  return (
    <AppProvider>
      <Router>
        {/* header is placed here to be rendered on all routes */}
        {/* <Header /> */}
        <Routes>
          
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/fruit" element={<FruitShop />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<TableComponent />} />
            <Route path="/profile" element={<ProfileDetail />} />
          </Route>
        </Routes>
        {/* Footer is placed here to be rendered on all routes */}
        {/* <Footer />  */}
      </Router>
    </AppProvider>
  );
}

export default App;
