import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="max-w-[950px] mx-auto px-2 py-5 flex items-center justify-between">
      <div className="text-white text-2xl font-extrabold px-3 py-2 border border-dashed border-gray-500 rounded-lg">
        BETRUPPE
      </div>
      <div className="w-1/2 border-t border-dashed border-gray-500"></div>
      <div className="flex gap-7 text-white text-base font-extrabold px-3 py-2 border border-dashed border-gray-500 rounded-lg">
        <p>CREATED</p>
        <p>BY</p>
        <p>AYUSH</p>
      </div>
    </nav>
  );
};

export default Navbar;
