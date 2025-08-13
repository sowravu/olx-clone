import { Link } from "react-router-dom"

import favorate from  '../../assets/favorite.svg'

interface CardProps{
    items:any
}

const Card = ({ items }:CardProps) => {
  return (
    <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>
      <h1 style={{color:'#002f34'}} className='text-2xl'>Fresh recommendations</h1>

      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>
        {items.map((item:any) => (
          <Link to={'/details'}
           state={{item}}
           key={item.id}
           style={{borderWidth:'1px', borderColor: 'lightgrey'}}

          >
        <div
  key={item.id}
  className="relative w-full h-72 rounded-md border border-gray-300 bg-gray-50 overflow-hidden cursor-pointer flex flex-col"
>
  {/* Image section */}
  <div className="w-full h-48 bg-white flex justify-center items-center overflow-hidden">
    <img
      src={item.imageUrl || 'https://via.placeholder.com/300'}
      alt={item.title}
      className="max-w-full max-h-full object-contain"
    />
  </div>

  {/* Details section */}
  <div className="details flex-1 p-4">
    <h1 className="font-bold text-xl text-[#002f34]">₹ {item.Price}</h1>
    <p className="text-sm pt-2">{item.category}</p>
    <p className="pt-2">{item.title}</p>
  </div>

  {/* Favorite icon */}
  <div className="absolute top-3 right-3 p-2 bg-white rounded-full shadow cursor-pointer">
    <img className="w-5" src={favorate} alt="favorite" />
  </div>
</div>

          </Link>
        ))}
      </div>
    </div>
  )
}

export default Card
