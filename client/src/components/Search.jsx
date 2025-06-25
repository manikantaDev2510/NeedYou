import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

import useMobile from '../hooks/useMobile';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();

    // Extract search text from URL query
    const searchText = location.search.slice(3);

    // Update state if current page is search
    useEffect(() => {
        setIsSearchPage(location.pathname === '/search');
    }, [location]);

    // Navigate to /search page
    const redirectToSearchPage = () => {
        navigate('/search');
    };

    // Handle typing in search input
    const handleOnChange = (e) => {
        const value = e.target.value;
        navigate(`/search?q=${value}`);
    };

    return (
        <div className="w-full min-w-[280px] sm:min-w-[320px] lg:min-w-[420px] h-11 lg:h-12 border rounded-lg bg-slate-50 flex items-center overflow-hidden shadow-sm group focus-within:border-blue-400 transition">

            {/* Left icon: Search icon or back arrow on mobile search page */}
            <div>
                {isMobile && isSearchPage ? (
                    <Link
                        to="/"
                        className="flex justify-center items-center h-full p-2 m-1 rounded-full bg-white shadow group-focus-within:text-blue-400"
                    >
                        <FaArrowLeft size={20} />
                    </Link>
                ) : (
                    <button className="flex justify-center items-center h-full p-3 group-focus-within:text-blue-400">
                        <IoSearch size={22} />
                    </button>
                )}
            </div>

            {/* Search input or animated placeholder */}
            <div className="w-full h-full">
                {!isSearchPage ? (
                    <div
                        onClick={redirectToSearchPage}
                        className="w-full h-full flex items-center cursor-text px-1"
                    >
                        <TypeAnimation
                            sequence={[
                                'Search "milk"', 1000,
                                'Search "bread"', 1000,
                                'Search "sugar"', 1000,
                                'Search "paneer"', 1000,
                                'Search "chocolate"', 1000,
                                'Search "curd"', 1000,
                                'Search "rice"', 1000,
                                'Search "egg"', 1000,
                                'Search "chips"', 1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="text-gray-400 text-sm"
                        />
                    </div>
                ) : (
                    <input
                        type="text"
                        placeholder="Search for atta, dal, and more..."
                        autoFocus
                        defaultValue={searchText}
                        className="bg-transparent w-full h-full outline-none px-1 text-sm"
                        onChange={handleOnChange}
                    />
                )}
            </div>

        </div>
    );
};
