import {Car} from "../types.ts";

type carItemProps={
    car: Car
}

export const CarItem=({car}:carItemProps) =>{
   return(
       <>
           <h1>{car.make} {car.model}</h1>
           <p>Year: {car.year}</p>
           <p>Price: {car.price}</p>
           <label>Used Vehicle <input disabled type="checkbox" defaultChecked={car.used}/></label>
       </>
   )
}