import React, {useEffect, useState} from 'react';

const DashboardScreen = ({data}) => {
  const [prod, setProd] = useState([]);

  useEffect(() => {
    setProd([])
    for(var i = 0; i<data.length; i++){
      let product = {"name" : data[i].title, "inStock" : data[i].InStock}

      setProd(arr => [...arr, product]);
     
    }
  }, [data])


  console.log('product', prod)
 
  

  return (
    <div  className='flex w-full flex-col'>
     <table className='border-black border-[1px]w-full'>
        <thead>
            <tr  className='border-black border-[1px]'>
              <th  className='border-black border-[1px] p-3 bg-amber-300'>Product Name</th>
              <th  className='border-black border-[1px] p-3 bg-amber-300'>Stock</th>
            </tr>
        </thead>
        <tbody>
          {prod.map((item, i) => {
            return <tr  className='border-black border-[1px]' key={i}>
              
              <td  className='border-black border-[1px] p-3 border-collapse bg-white'>{item.name}</td>
              <td  className={ item.inStock < 5 ? 'border-black border-[1px] p-3 border-collapse bg-red-300' : 'border-black border-[1px] p-3 border-collapse bg-white'}>{item.inStock}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};




export default DashboardScreen;
