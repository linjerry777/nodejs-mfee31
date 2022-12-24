
import './App.scss';
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])

  const getData = async() =>{
    try {
      const response = await axios.get('http://localhost:8800/stocks')
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
    <div className="App">
      <table>
      <thead>
        <tr>
        {console.log(users)}
          <th>stock_id</th>
          <th>date</th>
          <th>open_price</th>
          <th>high_price</th>
          <th>low_price</th>
          <th>close_price</th>
          <th>delta_price</th>
          <th>transactions</th>
          <th>volume</th>
          <th>amount</th>
          {/* <th>價格</th> */}
        </tr>
      </thead>
      <tbody>
        {users.map((v, i) => {
          return (
            <tr key={v.stock_id}>
              <td>{v.stock_id}</td>

              <td>{v.date}</td>
              <td>{v.open_price}</td>
              <td>{v.high_price}</td>
              <td>{v.low_price}</td>
              <td>{v.close_price}</td>
              <td>{v.delta_price}</td>
              <td>{v.transactions}</td>
              <td>{v.volume}</td>
              <td>{v.amount}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  );
}

export default App;
