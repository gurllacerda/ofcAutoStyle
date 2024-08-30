'use client';

import { Button, Dropdown, Menu } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
// import { Color } from 'antd/es/color-picker';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const menuItems = [
    {
      key: 'menu',
      label: (
        <Link href="/order/menu" className="block px-4 py-2 hover:bg-orange-100 text-orange-600">
          Our Menu
        </Link>
      ),
    },
    {
      key: 'create',
      label: (
        <Link href="/order/create" className="block px-4 py-2 hover:bg-orange-100 text-orange-600">
          Create your pizza
        </Link>
      ),
    },
  ];

  const menu = (
    <Menu
      items={menuItems}
      className="bg-white shadow-lg rounded-md border border-orange-200"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#FFA500',
      }}
    />
  );

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-3xl font-bold text-white">AUTO STYLE</span>
        </Link>

        <div className="hidden md:flex md:w-auto items-center">
          <ul className="flex flex-col font-medium md:flex-row md:space-x-8">
            <li>
              <Link href="/" className="block py-2 px-3 text-white rounded-md transition duration-300 ease-in-out hover:bg-orange-400 hover:text-white">
                Home
              </Link>
            </li>
            <li className="relative flex items-center">
              <Dropdown
                overlay={menu}
                trigger={['click']}
                open={dropdownOpen}
                onOpenChange={setDropdownOpen}
              >
                <Button
                  type="text"
                  onClick={toggleDropdown}
                  className="text-white hover:bg-orange-400 hover:text-white transition duration-300 ease-in-out py-2 px-3 text-lg font-medium"
                  style={{ backgroundColor: 'transparent',  }}
                >
                  Make your order <DownOutlined />
                </Button>
              </Dropdown>
            </li>
            <li>
              <Link href="/myOrders" className="block py-2 px-3 text-white rounded-md transition duration-300 ease-in-out hover:bg-orange-400">
                My orders
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 px-3 text-white rounded-md transition duration-300 ease-in-out hover:bg-orange-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:hidden">
          <Button
            type="text"
            icon={<DownOutlined />}
            onClick={toggleDropdown}
            className="text-white hover:bg-orange-400 hover:text-white transition duration-300 ease-in-out py-2 px-3 text-lg font-medium"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      </div>
    </nav>
  );
}