import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const Stock = () => {
  const [error, setError] = useState(null)
  // const {error}=props

  //從資料庫抓股票並存進stock
  const [stock, setStock] = useState([])

  //新增股票輸入id

  const getStockname = async () => {
    try {
      const response = await axios.get('http://localhost:8800/stocks')
      setStock(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getStockname()
  }, [stock])

  const [newstock, setNewstcok] = useState({
    id: '',
    name: '',
  })
  const handleChange = (e) => {
    setNewstcok((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8800/stocks', newstock)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8800/stocks/' + id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
    console.log(id)
  }

  return (
    <div>
      {error && <div>{error}</div>}
      {stock.map((v, i) => {
        return (
          <>
            {/* <h2 key={v.name} className="ml-7 mt-6 text-xl text-gray-600">股票代碼:{v.id}</h2> */}
            <div
              key={v.id}
              className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer"
            >
              <Link to={`/stocks/${v.id}`}>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  股票代碼:{v.id}
                </h2>
                <p className="text-gray-700">股票名稱:{v.name}</p>
              </Link>
              {/*  <button
                className="text-xl bg-indigo-300 mx-5 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
                onClick={handleClick}
              >
                修改
              </button> */}
              <button
                className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
                onClick={() => handleDelete(v.id)}
              >
                刪除
              </button>
            </div>
          </>
        )
      })}
      <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
        <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">
          新增股票
        </h2>
        <div className="mb-4 text-2xl">
          <label htmlFor="name" className="flex mb-2 w-32">
            股票代碼
          </label>
          <input
            className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
            type="number"
            id="stockId"
            name="id"
            onChange={handleChange}
          />
        </div>
        <div className="mb-8 text-2xl">
          <label htmlFor="password" className="flex mb-2 w-32">
            股票名稱
          </label>
          <input
            className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
            type="text"
            id="stockName"
            name="name"
            onChange={handleChange}
          />
        </div>
        <button
          className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
          onClick={handleClick}
        >
          新增
        </button>
      </form>
    </div>
  )
}

export default Stock
