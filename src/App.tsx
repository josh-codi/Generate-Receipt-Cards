import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OrderCard, { type OrderCardType } from './components/OrderCard'
import { Plus } from 'lucide-react'
import { Button } from './components/ui/button'
import { toPng } from 'html-to-image'
import download from 'downloadjs'
import { logo } from './assets'

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [details, setDetails] = useState<OrderCardType|null>();
  const orderCardRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    setDetails({
      name: customerName,
      price: price,
      items
    });
  };

  const handleDownload = () => {
    if (!orderCardRef.current) return;
    toPng(orderCardRef.current)
      .then((dataUrl) => {
        download(dataUrl, `${details?.name || 'order'}-receipt.png`);
        setDetails(null);
        setItems([]);
        setCustomerName('');
        setPrice(0);
      })
      .catch((err) => {
        alert(`Sorry, something went wrong`)
        console.error('Download failed', err);
      });
  };

  return <div className="w-full h-[100dvh] flex flex-col items-center justify-center gap-4 sm:scale-100 scale-90">
    {
      details ? <>
        <div ref={orderCardRef} className='relative flex items-center justify-center w-full'>
          <div className='size-full absolute animate-pulse top-0 left-0 bg-gradient-to-br from-orange-500 via-emerald-500 to-indigo-600 blur-2xl'/>
          <OrderCard items={details.items} name={details.name} price={details.price} />
        </div>
        <div className="flex flex-col icen gap-3 z-10">
          <Button className='w-[200px]' onClick={handleDownload}>Download</Button>
          <Button className='w-[200px]' variant="outline" onClick={() => setDetails(null)}>Make Changes</Button>
        </div>
      </> : 
      <form onSubmit={e=>{
        e.preventDefault();
        handleSubmit();
      }} className="bg-white shadow-md rounded-2xl border items-center px-4 sm:px-8 pt-6 pb-8 w-full min-[520px]:w-[500px] flex flex-col gap-4">
        <img src={logo} alt="logo" className='w-32' />
        <div className="w-full flex flex-col items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-center">Place an Order</h2>
          <small>Fill in the form below to generate customer's order.</small>
        </div>
        <br />

        <label className="flex w-full items-start flex-col text-gray-700 text-sm mb-2">
          Customer's Name
          <input type="text" value={customerName} onChange={e=>setCustomerName(e.target.value)} name="customerName" className="w-full h-10 border rounded-xl px-3" placeholder="Enter customer's name" required />
        </label>
        
        <label className="text-gray-700 flex flex-col items-start text-sm mb-2 w-full">
          <b className="mb-2 text-lg">Add Items</b>
          {
            items.length>0 ? 
            <div className="flex items-center gap-1 flex-wrap my-2">
              {items.map((item, idx)=>{
                return <span key={`added item - ${idx}`} className="px-3 py-1 flex items-center gap-2 rounded-xl bg-gray-100">
                  {item}
                  <span><Plus className='size-4 rotate-45'/></span>
                </span>
              })}
            </div> : null
          }
          <div className="w-full flex gap-2">
            <input type="text" id='item' placeholder='eg:10 Pancakes' className="w-full px-3 h-10 border rounded-xl" />
            <button
              type="button"
              onClick={() => {
                let input = document.getElementById('item') as HTMLInputElement;
                let value = input.value;
                if(value.length > 3){
                  setItems(prev=>([...prev, value]));
                  input.value = '';
                }
              }}
              className="bg-emerald-700 text-white flex items-center h-10 px-3 rounded-xl self-start min-w-fit"
                >
              + Add Item
            </button>
          </div>
        </label>

        <label className="block text-gray-700 text-sm my-6 mb-2 w-full">
          <input
            type="number"
            name="totalPrice"
            className="w-full h-10 outline-none rounded-xl px-3 text-center text-3xl"
            placeholder="Enter total price"
            min="0"
            step="0.01"
            defaultValue={price||''}
            onChange={e=>setPrice(+e.target.value)}
            required
          />
        </label>
        <Button
          type="submit"
          className="rounded-xl text-white font-bold h-12 px-4 focus:outline-none focus:shadow-outline w-full"
        >
          Submit Order
        </Button>
      </form>
    }
    

  </div>
}

export default App
