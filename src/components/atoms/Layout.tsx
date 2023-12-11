// components/Layout/Layout.js

import React from 'react';
import Footer from "@/components/atoms/Footer";
import {useRouter} from "next/router";
interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter()
    return (
        <div className="flex flex-col min-h-screen bg-colouryellow-300">
            <main>{children}</main>
            <Footer/>
        </div>
    );
};
export default Layout;
