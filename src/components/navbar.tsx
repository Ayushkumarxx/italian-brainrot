import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="max-w-[950px] mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Logo */}
      <div className="text-white text-2xl font-extrabold px-3 py-2 border border-dashed border-gray-500 rounded-lg">
        BRAINROT
      </div>

      {/* Line */}
      <div className="w-full md:w-1/2 border-t border-dashed border-gray-500" />

      {/* Right side */}
      <div className="flex gap-4 md:gap-7 text-white text-sm md:text-base font-extrabold px-3 py-2 border border-dashed border-gray-500 rounded-lg">
        <p>CREATED</p>
        <p>BY</p>
        <p>AYUSH</p>
      </div>
    </nav>
  );
};

export default Navbar;
