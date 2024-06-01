import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className='flex justify-between p-4 items-center' style={{backgroundColor:'#141f49'}}>
      <div>
        <img src="https://www.saib.ai/logo-new-white.webp?imwidth=256" alt="logo" width={65} />

      </div>
      <div className='flex gap-16 font-medium text-white '>
        <p className='hover:text-amber-500'>Menu</p>
        <p className='hover:text-amber-500'>Offers</p>
        <p className='hover:text-amber-500'>Contact us</p>
      </div>
      <div>
        <Button style={{backgroundColor:'#fd8c29', width:'100px'}} className="rounded-full">
            Login
        </Button>
      </div>
    </div>
  )
}

export default Navbar
