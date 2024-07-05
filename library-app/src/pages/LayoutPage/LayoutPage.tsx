import { useAuth } from "../../context/Contextprovider";
import { Outlet } from "react-router-dom";

import './LayoutPage.css'
import { LoginRegisterModal } from "../../Features/authentication/components/LoginForm";
import { Footer, Navbar } from "../../Features/navigation";

export default function LayoutPage(){
const {state} = useAuth()
    return(
        <div className="layout-page">
         {state.displayLogin && <LoginRegisterModal />}
         <Navbar />
         <Outlet />
        <Footer />
        </div>
    )
}