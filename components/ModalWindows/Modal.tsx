import React from 'react'

interface ModalProps {
  children: React.ReactNode,
  width:number
}

const Modal = ( { children, width } : ModalProps ) => {
  return (
    <div className='fixed bg-black/50 top-0 right-0 left-0 bottom-0 z-10'>
      <div className={` p-5 mt-[4%] rounded bg-white absolute top-10 left-1/2 -translate-x-1/2`} style={{width:`${width}%`}}>
        { children }
      </div>
    </div>
  )
}
// w-[${width}%]
export default Modal