
import React from 'react';
import logo from './assets/logo.jpg';

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-10" />
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold">EthVault</h1>
      </div>
      <div className="invisible">Placeholder</div>
    </nav>
  );
}

export default Navbar;
