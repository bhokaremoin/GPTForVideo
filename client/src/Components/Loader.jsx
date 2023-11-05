import React from 'react'
import {Triangle} from 'react-loader-spinner';

const Loader = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full bg-dark-gray'>
      <Triangle
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClassName=""
  visible={true}
/>
      <p className="text-lg text-center px-2 text-white">{message}</p>
    </div>
  )
}

export default Loader
