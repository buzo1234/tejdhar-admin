import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBlock from '../components/UserBlock';
import ExcelExport from '../components/ExcelExport';

const AllUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
    console.log('Users',users);
  }, [])
  

  async function getUsers(){
    setLoading(true);
    try {
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/users/',
      }).then((response) => {
        if (response.data[0]) {
          setUsers(response.data[1]);
        } else {
          console.log(error);
        }
      });
      setLoading(false);

    } catch (error) {
      console.log(error);      
    }
  }

  return <div>
    <div className='flex w-full flex-col'>
      <p className=' font-bold text-2xl mb-10'>All Users</p>
      <ExcelExport excelData={users} fileName={"Tejdharart_users"} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='border-black border-[1px]w-full'>
        <thead>
            <tr  className='border-black border-[1px]'>
              <th  className='border-black border-[1px] p-3 bg-amber-300'>User Name</th>
              <th  className='border-black border-[1px] p-3 bg-amber-300'>Phone Number</th>
            </tr>
        </thead>
        <tbody>
          {users.map((item, i) => {
            return <tr  className='border-black border-[1px]' key={i}>
              <td  className='border-black border-[1px] p-3 border-collapse bg-white'>{item.name}</td>
              <td  className='border-black border-[1px] p-3 border-collapse bg-white'>{item.email}</td>
            </tr>
          })}
        </tbody>
      </table>
      )}

      
    </div>
  </div>;
};

export default AllUsersScreen;
