import React from 'react';
import UserMenu from '../components/UserMenu';
import { IoClose } from 'react-icons/io5';

// This component renders a mobile-friendly user menu with a close button
export default function UserMenuMobile() {
  // Function to handle the close button click
  const handleClose = () => {
    // Go back to the previous page
    window.history.back();
  };

  return (
    <section className="bg-white h-full w-full py-2">
      {/* Close Button in the top right corner */}
      <button
        onClick={handleClose}
        className="text-neutral-800 block w-fit ml-auto p-2"
        aria-label="Close"
      >
        <IoClose size={25} />
      </button>

      {/* User Menu content */}
      <div className="container mx-auto px-3 pb-8">
        <UserMenu />
      </div>
    </section>
  );
}
