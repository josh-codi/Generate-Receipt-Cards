import { fruits, juices, logo, pastries1, pastries2, thankyou } from '@/assets';
import React from 'react'

export type OrderCardType = {
    price:number;
    name:string;
    items: string[]
}

const OrderCard = ({price, name, items}:OrderCardType) => {
    return <div className="z-10 w-full min-[580px]:w-[550px] min-h-[300px] p-6 relative border rounded-2xl bg-white flex flex-col items-center gap-1 overflow-hidden">
        <img src={logo} alt="logo" className='w-24'/>
        <img src={thankyou} alt="thank you" className='rounded-[5rem]' />

        <h1 style={{fontFamily: 'cursive'}} className="text-2xl">{name||'HobesFoods'}</h1>
        <small className="text-slate-800">FOR YOUR ORDER</small>

        <div className="w-400px flex items-center flex-wrap justify-center">
            {items.map((item, idx)=>
                <p key={idx} className='px-2 py-1 rounded-lg bg-white' style={{color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 40%)`,}} >
                    {item}
                </p>
            )}
        </div>
        <b className="font-extrobold text-[2rem] bg-white rounded-lg p-1">₵{price||0}.00</b>

        <span className="text-gray-600 flex text-xs flex-col items-center italic bg-white p-1 rounded-lg">
            <span>Contact Us</span>
            <span>0206803955 / 0542893124</span>
        </span>


        <img src={fruits} alt="back nice stuff" className="-z-10 -top-[90px] right-[20px] absolute rounded-full object-cover size-[160px] shadow-xl" />
        <img src={pastries2} alt="back nice stuff" className="-z-10 bottom-[30px] -right-[60px] absolute rounded-full object-cover size-[130px] shadow-xl" />
        <img src={juices} alt="back nice stuff" className="-z-10 top-[20px] -left-[60px] absolute rounded-full object-cover size-[130px] shadow-xl" />
        <img src={pastries1} alt="back nice stuff" className="-z-10 -bottom-[90px] -left-[60px] absolute rounded-full object-cover size-[200px] shadow-xl" />
    </div>
}

export default OrderCard
