import {Car} from "../types.ts";
import {deleteCar, editCar} from "./CarService.ts";

type carItemProps={
    car: Car,
    onDelete,
    onEdit
}

export const CarItem=({car, onDelete, onEdit}:carItemProps) =>{
   return(
       <>
           <h2>{car.make} {car.model}</h2>
           <p>Year: {car.year}</p>
           <p>Price: {car.price}</p>
           <label>Used Vehicle <input disabled type="checkbox" defaultChecked={car.used}/></label>
           <button onClick={async () =>{
               deleteCar(car.id)
               onDelete()
           }}>Delete</button>
           <button onClick={async()=> {
               editCar(car.id)
               onEdit()
           }}> Edit
           </button>
       </>
   )
}