import React from 'react';
import Link from 'next/link';

const UpdateProductsScreen = () => {
  return (
    <div className=''>
      <p className=' font-bold text-2xl mb-10'>Add/Edit Products</p>
      <p className='mb-10'>Click below to head to the Managment Tool</p>
      <Link href='https://tejdharart.sanity.studio'>
        <button className='px-5 w-[100px] py-1 text-white bg-black rounded-md shadow-md '>
          Go!
        </button>
      </Link>
    </div>
  );
};

export default UpdateProductsScreen;
