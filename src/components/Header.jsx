import React from "react";
import Logo from "./img/logo.png"
import {MdShoppingBasket} from "react-icons/md";
import Avatar from "./img/avatar.png"
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Header (){
    return(
        <header className="w-screen fixed z-50 p-6 px-16">
            
            {/* desktop and tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link href={"/"} className="flex items-center gap-2">
                    <img src={Logo} alt="logo" className="w-8 object-cover" />
                    <p className="text-headingColor text-x1 font-bold">City</p>
                </Link>
                <div className="flex items-center gap-8">
                <ul className="flex items-center gap-8">
                    <li className="text-base text-headingColor cursor-pointer
                     hover:text-headingColor duration-100 transition-all ease-in-out ">
                        Home</li>
                    <li className="text-base text-headingColor cursor-pointer
                     hover:text-headingColor duration-100 transition-all ease-in-out ">
                        Menu</li>
                    <li className="text-base text-headingColor cursor-pointer
                     hover:text-headingColor duration-100 transition-all ease-in-out ">
                        About</li>
                    <li className="text-base text-headingColor cursor-pointer
                     hover:text-headingColor duration-100 transition-all ease-in-out ">
                        Service</li>
                </ul>

                <div className="relative flex items-center justify-center">
                    <MdShoppingBasket className="text-textColor text-2x1 cursor-pointer"/>
                    <div className="absolute -top-2 -right-5  w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                        <p className="text-xs text-white font-semibold">2</p>
                    </div>
                </div>
                <div className="relative">
                <motion.img whileTap={{scale:0.6}} src={Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer" alt="userprofile" />
                </div>
                </div>
            </div>






            {/* mobile */}
            <div className="flex md:hidden w-full h-full"></div>


        </header>
    )
}
export default Header;