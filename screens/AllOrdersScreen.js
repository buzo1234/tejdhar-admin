import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ExcelExport from '../components/ExcelExport';
import OrderBlock from '../components/OrderBlock';

const AllOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [all, setAll] = useState([]);
  const [sall, setsall] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderData();
  }, []);

  useEffect(() => {
    let arr = arrangeOrders(orders);
    setAll(arr[0]);
    setsall(arr[1]);
  }, [orders]);


  function arrangeOrders(orders) {
    let all_orders = [];
    let sin_orders = [];
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].orders.length > 0) {
        for (let j = 0; j < orders[i].orders.length; j++) {
          all_orders.push(orders[i].orders[j]);
          let val = orders[i].orders[j];
          let ord = val.order;
          let name = orders[i].orders[j].user_name;
          let phone = orders[i].orders[j].user_phone;
          let address = orders[i].orders[j].address;
          let date = orders[i].orders[j].datetime;
          let status = orders[i].orders[j].status;
          
          for(let k=0; k<ord.length; k++){
            let obj = Object.assign({}, ord[k]);
          
            obj.name = name;
            obj.phone = phone;
            obj.address = address;
            obj.date = date; 
            obj.status = status;
            delete obj.id_main;
            delete obj.slug;
            delete obj.productImage;
            delete obj.category;
            delete obj.body;
            delete obj._rev;
            delete obj._updatedAt;
            delete obj._createdAt;
            delete obj._id;
            delete obj.colorVariants;
            delete obj.sizeVariants;
            delete obj.defaultPrice;
            delete obj._type;
            sin_orders.push(obj);
          }
          sin_orders = [...sin_orders].sort((a, b) =>
          new Date(a.date) > new Date(b.date) ? -1 : 1,
        );
        }
      }
    }

    all_orders.sort((a, b) => (new Date(a.datetime) > new Date(b.datetime) ? -1 : 1));
    return [all_orders, sin_orders];
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
      <ExcelExport excelData={sall} fileName={'Tejdharart_orders'}/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        all.map((item, i) => {
          return <OrderBlock key={i} item={item} index={all.length - i} />;
        })
      )}
    </div>
  );
};

export default AllOrdersScreen;
