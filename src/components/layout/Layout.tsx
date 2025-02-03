import { Outlet } from "react-router"
import Header from "../header/Header";

import './Layout.scss'
import { useState } from "react";

const Layout = () => {
    const [isMenuMinimized, setIsMenuMinimized] = useState(false)
    const onMenuExpand = (flag: boolean) => {
        setIsMenuMinimized(flag)
    }
    return (
        <div className="">
            <Header onMenuExpand={onMenuExpand} />
            <div className={`layoutWrapper ${isMenuMinimized ? 'fullWidth' : ''}`}>
                <Outlet />
            </div>
            <footer></footer>
        </div>
    )
}

export default Layout