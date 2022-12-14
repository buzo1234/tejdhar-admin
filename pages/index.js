import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AllOrdersScreen from '../screens/AllOrdersScreen';
import AllUsersScreen from '../screens/AllUsersScreen';
import DashboardScreen from '../screens/DashboardScreen';
import UpdateProductsScreen from '../screens/UpdateProductsScreen';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { client } from '../lib/client';


export default function Home({ products }) {
  const [action, setAction] = useState(0);
  

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  function showActionTab() {
    console.log('run');
    if (action === 0) {
      return <DashboardScreen data={products}/>;
    } else if (action === 1) {
      return <UpdateProductsScreen />;
    } else if (action === 2) {
      return <AllOrdersScreen />;
    } else {
      return <AllUsersScreen />;
    }
  }
  return (
    <div className='md:h-screen md:fixed lg:h-screen lg:fixed xl:h-screen xl:fixed w-screen'>
      <Head>
        <title>Tejdharart | ADMIN</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/logo_tejdharart.jpg' />
      </Head>
      <div className='md:grid md:grid-cols-5 md:h-screen lg:grid lg:grid-cols-5 lg:h-screen xl:grid xl:grid-cols-5 xl:h-screen w-full flex flex-col sticky top-0'>
        <div className='col-span-1  bg-amber-400 flex md:flex-col lg:flex-col xl:flex-col justify-between md:justify-start lg:justify-start xl:justify-start items-center md:items-start lg:items-start xl:items-start
         px-4'>
          <div className='flex justify-start'>
            <Image
              src='/logo_tejdharart.jpg'
              width={100}
              height={100}
              objectFit='contain'
              className='p-2'
            />
          </div>

          <div className='px-2 mt-3 md:flex lg:flex xl:flex hidden flex-col w-full'>
            <div
              className={ action !== 0 ? 'px-2 py-2 text-black font-semibold rounded-md hover:bg-amber-500 cursor-pointer' : 'px-2 py-2 text-black font-semibold rounded-md bg-amber-500 cursor-pointer'}
              onClick={() => setAction(0)}
            >
              Dashboard
            </div>
            <div className='h-[0.2px] bg-gray-300 w-full'></div>
            <div
              className={ action !== 1 ? 'px-2 py-2 text-black font-semibold rounded-md hover:bg-amber-500 cursor-pointer' : 'px-2 py-2 text-black font-semibold rounded-md bg-amber-500 cursor-pointer'}
              onClick={() => setAction(1)}
            >
              Update Products
            </div>
            <div className='h-[0.2px] bg-gray-300 w-full'></div>
            <div
              className={ action !== 2 ? 'px-2 py-2 text-black font-semibold rounded-md hover:bg-amber-500 cursor-pointer' : 'px-2 py-2 text-black font-semibold rounded-md bg-amber-500 cursor-pointer'}
              onClick={() => setAction(2)}
            >
              All Orders
            </div>
            <div className='h-[0.2px] bg-gray-300 w-full'></div>

            <div
              className={ action !== 3 ? 'px-2 py-2 text-black font-semibold rounded-md hover:bg-amber-500 cursor-pointer' : 'px-2 py-2 text-black font-semibold rounded-md bg-amber-500 cursor-pointer'}
              onClick={() => setAction(3)}
            >
              All Users
            </div>
          </div>

          {/*  */}

          <Menu as="div" className="relative inline-block text-left">
      <div className='flex md:hidden lg:hidden xl:hidden'>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <div className='w-[30px] flex flex-col'>
            <div className='w-full h-[3px] bg-black'></div>
            <div className='w-full h-[3px] my-2 bg-black'></div>
            <div className='w-full h-[3px] bg-black'></div>
          </div>
         
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => setAction(0)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Dashboard
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={() => setAction(1)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Update Products
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={() => setAction(2)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  All Orders
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                onClick={() => setAction(3)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  All Users
                </a>
              )}
            </Menu.Item>
          </div>
          
         
        </Menu.Items>
      </Transition>
    </Menu>
        </div>
        <div className='col-span-4 p-4 overflow-y-auto hidden md:block lg:block xl:block bg-[#f5f5f5]'>
          {showActionTab()}
        </div>
      </div>
      <div className='col-span-4 p-4 bg-[#f5f5f5] overflow-y-auto md:hidden lg:hidden xl:hidden'>
        {showActionTab()}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = "*[_type == 'product' && !(_id in path('drafts.**'))]";
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};