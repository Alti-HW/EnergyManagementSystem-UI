import { Outlet } from "react-router"
import Header from "../header/Header";

import './Layout.scss'

const Layout = () => {
    return (
        <div className="">
            <Header />
            <div>
                <Outlet />
            </div>
            <footer></footer>
        </div>
    )
}

export default Layout