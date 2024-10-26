import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Pages & Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import CustomerOverview from "./pages/CustomerOverview";
import Navbar from "./components/Navbar";
import CustomerDetails from "./pages/CustomerDetails";
import TileOverview from "./pages/TileOverview";
import TileDetails from "./pages/TileDetails";
import TileCreateForm from "./pages/TileCreateForm";
import { useAxiosInterceptor } from "./hooks/useAxiosInterceptor";


function App() {  
  const { user } = useAuthContext();
  useAxiosInterceptor();

  return (
    <div className="bg-[#F1F1F1] min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/customerOverview" element={user ? <CustomerOverview /> : <Login />} />
          <Route path="/customer/:id" element={user ? <CustomerDetails /> : <Login />} />
          <Route path="/tileOverview" element={user ? <TileOverview /> : <Login />} />
          <Route path="/tile/:id" element={user ? <TileDetails /> : <Login />} />
          <Route path="/createTile/" element={user ? <TileCreateForm /> : <Login />} />
          <Route path="/account" element={user ? <Account /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
