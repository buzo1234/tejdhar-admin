import axios from 'axios';
import React, { useState, useEffect } from 'react';
import OrderBlock from '../components/OrderBlock';

const AllOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderData();
  }, []);

  useEffect(() => {
    setAll(arrangeOrders(orders));
    console.log('ALL', all);
  }, [orders]);

  console.log(orders);

  function arrangeOrders(orders) {
    let all_orders = [];
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].orders.length > 0) {
        for (let j = 0; j < orders[i].orders.length; j++) {
          all_orders.push(orders[i].orders[j]);
        }
      }
    }

    all_orders.sort((a, b) => (a.datetime > b.datetime ? 1 : -1));

    return all_orders;
  }

  async function getOrderData() {
    setLoading(true);
    try {
      await axios({
        method: 'post',
        url: 'https://tejdhar-otp-service.vercel.app/auth/adminorders/',
      }).then((response) => {
        if (response.data[0]) {
          setOrders(response.data[1]);
        } else {
          console.log(error);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <p className=' font-bold text-2xl mb-10'>All Orders</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        all.map((item, i) => {
          return <OrderBlock key={i} item={item} index={i + 1} />;
        })
      )}
    </div>
  );
};

export default AllOrdersScreen;
