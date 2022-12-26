import React from 'react'
import './Pagination.css'
const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
  let pages = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i)
  }
  return (
    <div className="page">
      {pages.map((v, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              setCurrentPage(v)
            }}
            className="text-xl bg-indigo-300 mx-2 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in"
          >
            {v}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination
