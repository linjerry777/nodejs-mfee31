import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'


const StockDetails = () => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([])

  const navigate= useNavigate()
  const location = useLocation()
  const stockId = location.pathname.split("/")[2]
  const getData = async() =>{ 
    try {
      const response = await axios.get('http://localhost:8800/stocks/'+ stockId)
      console.log(response)
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div>
      {error && <div>{error}</div>}
      <ul>
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            // backgroundColor: page === i ? '#00d1b2' : '',
            // borderColor: page === i ? '#00d1b2' : '#dbdbdb',
            // color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            textAlign: 'center',
          }}
        >
          1
        </li>
      </ul>
      目前在第 1 頁 {users.map((v, i) => {
          return (
            
      <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{v.date}</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          成交金額：{v.amount}
        </h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          成交股數：{v.volume}
        </h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          開盤價：{v.open_price}
        </h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          收盤價：{v.close_price}
        </h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          漲跌價差：{v.delta_price}
        </h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          最高價：{v.high_price}
        </h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          最低價：{v.low_price}
        </h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          成交筆數：{v.transactions}
        </h2>
      </div>
          )
        })}
    </div>
  );
};

export default StockDetails;
