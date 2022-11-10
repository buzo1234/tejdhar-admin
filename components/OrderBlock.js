import React, { useState } from 'react';
import { urlFor } from '../lib/client';
import toast from 'react-hot-toast';
import axios from 'axios';

const OrderBlock = ({ item, index }) => {
  const [val, setVal] = useState('Received');
  const options = ['Received', 'Processing', 'In Transit', 'Delivered'];

  const onOptionChangeHandler = async (event) => {
    try {
      let data = {
        status: event.target.value,
        phone: item.user_phone,
        id: item._id,
      };
      console.log('Data', data);
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/status',
        data: data,
      })
        .then((res) => {
          if (res.data[0]) {
            toast.success(`Status changed to ${event.target.value}`);
            setVal(event.target.value);
            console.log('sent', res.data[1], 'end');
          } else {
            toast.error('Some error occured!');
            console.log('error', res.data[1]);
          }
        })
        .catch((error) => {
          toast.error('Some error occured!');
          console.log('error', error);
        });
    } catch (error) {}
  };
  console.log('HERE', item);
  
  return (
    <div className='shadow-md bg-white rounded-md px-2 py-1 my-3 flex flex-col '>
      <div className='flex w-full items-center justify-between '>
        <div>
          <p className='text-lg font-semibold'>Order: {index}</p>
          <p className='font-semibold'>Date: {item.datetime}</p>
        </div>
        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row gap-x-2 items-center'>
          <p className='font-semibold text-lg'>Set Status : </p>
          <select
            
            defaultValue={item.status}
            onChange={onOptionChangeHandler}
            className='border-[0.5px] border-gray-600 rounded-md px-2 py-1'
          >
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
      </div>

      {item?.order.map((o, index) => (
        <>
          <div
            className=' grid grid-cols-4 h-[150px] justify-center items-center my-2 '
            key={index}
          >
            <div className='flex  w-full justify-center items-center'>
              <img
                src={
                  o.productImage
                    ? urlFor(o.productImage && o.productImage[0])
                    : urlFor(
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnIm-lbLsUFMpqohRj4di_06WAkoJrDC9AFg&usqp=CAU'
                      )
                }
                width={130}
                height={130}
                className='rounded-lg mr-2'
              />
            </div>
            <div>
              <p className='font-semibold text-sm md:text-lg lg:text-lg xl:text-lg text-center'>{o.title}</p>
              {o.colorVariant !== null ? (
                <p className='font-semibold italic text-gray-600 text-xs md:text-md lg:text-md xl:text-md text-center'>
                  Color Variant :<br className='md:hidden lg:hidden xl:hidden'/> {o.colorVariant}
                </p>
              ) : null}
              {o.sizeVariant !== null && o.sizeVariant!==undefined ? (
                <p className='font-semibold italic text-gray-600 text-xs md:text-md lg:text-md xl:text-md text-center'>
                  Size Variant :<br className='md:hidden lg:hidden xl:hidden'/> {o.sizeVariant}
                </p>
              ) : null}
            </div>
            {o.variantPrice === undefined ? (<p className='font-semibold text-sm md:text-lg lg:text-lg xl:text-lg text-center'>
              Price:<br className='md:hidden lg:hidden xl:hidden'/> &#x20B9;{o.defaultPrice}
            </p>): (<p className='font-semibold text-sm md:text-lg lg:text-lg xl:text-lg text-center'>
              Price:<br className='md:hidden lg:hidden xl:hidden'/> &#x20B9;{o.variantPrice}
            </p>) }
            
            <p className='font-semibold text-sm md:text-lg lg:text-lg xl:text-lg text-center'>
              Qty <br className='md:hidden lg:hidden xl:hidden'/> x {o.quantity}
            </p>
          </div>
          {item.order.length > 1 && item.order.length !== index + 1 ? (
            <div className='bg-gray-400 h-[0.2px] w-full'></div>
          ) : null}
        </>
      ))}
      <div className='flex w-full flex-col bg-gray-100 py-4'>
        <div className='flex w-full justify-evenly'>
          <p>
            <b>Customer Name :</b> {item.user_name}
          </p>
          <p>
            <b>Phone Number :</b> {item.user_phone}
          </p>
        </div>
        <div className='flex w-full justify-center mt-4'>
          <p className='font-bold mr-3'>Delivery Address : </p>
          <div className='w-[300px] overflow-x-auto rounded-md border-[0.1px] border-gray-500 px-2 py-1'>
            <p>{item.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBlock;
