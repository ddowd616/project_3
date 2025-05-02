import {Car} from "../types.ts";
import {deleteCar} from "./CarService.ts";

type carItemProps={
    car: Car,
    onDelete,
    // onEdit
}

export const CarItem=({car, onDelete}:carItemProps) =>{
   return(
       <>
           <h2>{car.make} {car.model}</h2>
           <p>Year: {car.year}</p>
           <p>Price: {car.price}</p>
           {/*<label>Used Vehicle <input disabled type="checkbox" defaultChecked={car.used}/></label>*/}
           {car.isUsed ? <p>Used</p> : <p>New</p>}
           <button onClick={async () =>{
               deleteCar(car.id)
               onDelete()
           }}>Delete</button>
           {/*<button onClick={async()=> {*/}
           {/*    editCar(car.id)*/}
           {/*    onEdit()*/}
           {/*}}> Edit*/}
           {/*</button>*/}
       </>
   )
}