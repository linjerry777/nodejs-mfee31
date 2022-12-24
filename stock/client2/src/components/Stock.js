import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'

const Stock = (props) => {
  // const [error, setError] = useState(null);
  const {error}=props
  const [stock,setStock]=useState([])
  const getStockname = async() =>{
    try {
      const response = await axios.get('http://localhost:8800/stocks')
      setStock(response.data)
    } catch (error) {
      console.log(error)
    
    }
  }
  useEffect(()=>{
    getStockname()
  },[])
/*   const navigate= useNavigate()
  const location = useLocation()
  const stockId = location.pathname.split("/")[2]
  const handleClick = async (e) => {
    e.preventDefault()
    try {
        await axios.put("http://localhost:8800/stocks/"+ stockId)
        navigate('/')
    } catch (err) {
        console.log(err)
    }
} */
  return (
    <div>
      {error && <div>{error}</div>}
      {stock.map((v,i)=>{
        return <>
        <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼:{v.id}</h2>
        <div className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
        <Link to={`/stocks/${v.id}`}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">股票代碼:{v.id}</h2>
          <p className="text-gray-700">股票名稱:{v.name}</p>
        </Link>
      </div>
        </>
      })}

      
    </div>
  );
};

export default Stock;
