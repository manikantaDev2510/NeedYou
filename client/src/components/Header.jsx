import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import Search from "./Search.jsx";
import useMobile from "../hooks/useMobile.jsx";
import UserMenu from "./UserMenu.jsx";
import { BsCart4 } from "react-icons/bs";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees.js";
import DisplayCartItem from "./DisplayCartItem.jsx";
import { useGlobalContext } from "../provider/GlobalProvider.jsx";

export default function Header() {
    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    // const [totalPrice,setTotalPrice] = useState(0)
    // const [totalQty,setTotalQty] = useState(0)
    const { totalPrice, totalQty } = useGlobalContext()
    const [openCartSection, setOpenCartSection] = useState(false)

    const redirectToLoginPage = () => {
        navigate("/login")
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login")
            return
        }

        navigate("/user")
    }

    //total item and total price
    // useEffect(()=>{
    //     const qty = cartItem.reduce((preve,curr)=>{
    //         return preve + curr.quantity
    //     },0)
    //     setTotalQty(qty)

    //     const tPrice = cartItem.reduce((preve,curr)=>{
    //         return preve + (curr.productId.price * curr.quantity)
    //     },0)
    //     setTotalPrice(tPrice)

    // },[cartItem])

    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='container mx-auto flex items-center px-2 justify-between'>

                        <div className="h-full">
                            <Link to="/" className="h-full flex justify-center items-center">
                                {/* Large screens */}
                                <div className="hidden lg:flex items-baseline space-x-1 pl-10">
                                    <span className="text-6xl font-extrabold tracking-tight text-[#f4c143]">Need</span>
                                    <span className="text-6xl font-extrabold tracking-tight text-[#4e953f]">You</span>
                                </div>

                                {/* Small screens */}
                                <span className="lg:hidden text-2xl font-extrabold tracking-tight pl-4">
                                    <span className="text-[#f4c143]">Need</span>
                                    <span className="text-[#4e953f]">You</span>
                                </span>
                            </Link>
                        </div>

                        {/**Search */}
                        <div className='hidden lg:block'>
                            <Search />
                        </div>


                        {/**login and my cart */}
                        <div className=''>
                            {/**user icons display in only mobile version**/}
                            <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                <FaRegCircleUser size={26} />
                            </button>

                            {/**Desktop**/}
                            <div className='hidden lg:flex  items-center gap-10'>
                                {
                                    user?._id ? (
                                        <div className='relative'>
                                            <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                                                <p>Account</p>
                                                {
                                                    openUserMenu ? (
                                                        <GoTriangleUp size={25} />
                                                    ) : (
                                                        <GoTriangleDown size={25} />
                                                    )
                                                }

                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className='absolute right-0 top-12'>
                                                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                            <UserMenu close={handleCloseUserMenu} />
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ) : (
                                        <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                                    )
                                }
                                <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                    {/**add to card icons */}
                                    <div className='animate-bounce'>
                                        <BsCart4 size={26} />
                                    </div>
                                    <div className='font-semibold text-sm'>
                                        {
                                            cartItem[0] ? (
                                                <div>
                                                    <p>{totalQty} Items</p>
                                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                </div>
                                            ) : (
                                                <p>My Cart</p>
                                            )
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
        </header>
    )
}