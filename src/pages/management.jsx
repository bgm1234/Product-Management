import React from "react";
import { Link, Outlet } from "react-router-dom";

export const Management = () => {
    return (

        <div style={{ display: "flex" }}>
            <div style={{ width: 150, backgroundColor: "#f0f0f0", padding: 20, minHeight: 600 }}>
                <ul style={{ fontWeight: "bold" }}>
                    <li style={{ marginBottom: '8px' }}><Link to={"/management"}>Ürün Listesi</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/management/category"}> Kategoriler</Link></li>
                    <li style={{ marginBottom: '8px' }}><Link to={"/management/users"}> Kullanıcılar</Link></li>
                </ul>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}
