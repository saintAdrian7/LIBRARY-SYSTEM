import { useAuth, fetchUser} from "./context/Contextprovider";
import Homepage from "./pages/Homepage/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import { useEffect } from "react";
import Profilepage from "./pages/Profilepage/Profilepage";

function App() {
  const { state, dispatch } = useAuth();

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (userId && !state.loggedInUser) {
      fetchUser(dispatch, { userId, property: "loggedInUser" });
    }
  }, [state.loggedInUser, dispatch]);


  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LayoutPage />}>
       <Route path="" element={<Homepage/>} />
       <Route path="/catalog" element={<>Catalog</>} />
       <Route path="/resource/:barcode" element={<>Resource</>} />
       <Route path="/profile/:userId" element={<Profilepage />} />
    </Route>
   </Routes>
   
   </BrowserRouter>
  );
}

export default App;