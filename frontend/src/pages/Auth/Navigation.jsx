import { useState } from "react";
import {
    AiOutlineHome, 
    AiOutlineShopping,
    AiOutlineLogin,
    AiOutlineUserAdd,
    AiOutlineShoppingCart
} from "react-icons/ai";
import { FaHeart } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import {logout} from "../../redux/features/auth/authSlice.js";
import FavoritesCount from "../Products/FavoritesCount.jsx";

const Navigation = () => {

    const {userInfo} = useSelector(state => state.auth)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    const closeSidebar = () => {
        setShowSidebar(false);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {

        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div 
            style={{zIndex: 999, minWidth: 75}} 
            className={`${showSidebar ? "hidden" : "flex"} 
            xl:flex lg:flex md:hidden sm:hidden flex-col justify 
            between p-4 text-white bg-black bg-opacity-30 w-[4%] hover:w-[15%] 
            h-[100vh] fixed shadow-lg backdrop-blur-[10px]`}
            id="navigation-container"    
        >
            <div className="flex flex-col justify-center space-y-4" id="pageLinks">
                <Link 
                    to="/" 
                    className="flex items-center transition-transform 
                    transform hover:translate-x-2 withIcon"
                >
                    <AiOutlineHome className="mr-2 mt-[3rem] svg" size={26} />
                    <span className="nav-item-name mt-[3rem]">Home</span>{" "}
                </Link>
                <Link 
                    to="/shop" 
                    className="flex items-center transition-transform 
                    transform hover:translate-x-2 withIcon"
                >
                    <AiOutlineShopping className="mr-2 mt-[3rem] svg" size={26} />
                    <span className="nav-item-name mt-[3rem]">Store</span>{" "}
                </Link>
                <Link 
                    to="/cart" 
                    className="flex items-center transition-transform 
                    transform hover:translate-x-2 withIcon"
                >
                    <AiOutlineShoppingCart className="mr-2 mt-[3rem] svg" size={26} />
                    <span className="nav-item-name mt-[3rem]">Cart</span>{" "}
                </Link>
                <Link 
                    to="/favorite" 
                    className="flex items-center transition-transform 
                    transform hover:translate-x-2 withIcon"
                >
                    <FaHeart className="mr-2 mt-[3rem] svg" size={26} />
                    <span className="nav-item-name mt-[3rem]">Favorites</span>{" "}
                    <FavoritesCount />
                </Link>
            </div>

            <div>
                <button 
                    onClick={toggleDropdown} 
                    className="flex items-center text-gray-8000"
                >
                    {userInfo ? (
                        <div className="flex">
                            <img className="rounded-[50%] mr-2" src="/uploads/defaultProfilePicture.jpg" width="26px" />
                            <span className="text-white nav-item-name">{userInfo.username}</span>
                        </div>
                    ) : (
                        <></>
                    )}

                    {userInfo && (

                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-1 nav-item-name ${
                            dropdownOpen ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        >
                            <path 
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg>
                    )}

                </button>
            
                {dropdownOpen && userInfo && (

                    <ul className={`absolute mt-2 mr-14 space-y-2 bg-lightGray text-gray-600 bottom-20`}
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-100">Plugins</Link>
                                </li>
                                <li>
                                    <Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-100">Categories</Link>
                                </li>
                                <li>
                                    <Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-100">Purchases</Link>
                                </li>
                                <li>
                                    <Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-100">Users</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                        </li>
                        <li>
                            <Link 
                                to="/"
                                onClick={logoutHandler} 
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Log out
                            </Link>
                        </li>
                    </ul>
                )}
            </div>

            {!userInfo && (
                
                <ul>
                <li>
                    <Link 
                        to="/login" 
                        className="flex items-center transition-transform 
                        transform hover:translate-x-2"
                    >
                        <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                        <span className="nav-item-name mt-[3rem]">Login</span>{" "}
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/register" 
                        className="flex items-center transition-transform 
                        transform hover:translate-x-2"
                    >
                        <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                        <span className="nav-item-name mt-[3rem]">Register</span>{" "}
                    </Link>
                </li>
            </ul>
            )}
            

        </div>
    );
};

export default Navigation;