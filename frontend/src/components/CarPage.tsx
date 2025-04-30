import {useEffect, useState} from "react";
import {Car} from "../types.ts";
import {fetchCars} from "./CarService.ts";
import {CarItem} from "./CarItem.tsx";

const CarPage=()=>{
    const [carList, setCarList]= useState<Car[]>([])

    useEffect(()=>{
        fetchCars().then((r)=>{
            setCarList(r)})
        },[]);
    return(
        <div>
            {carList.map((el, index)=>(<CarItem car={el} key={index}/>))}
            <h1>Ford</h1>
        </div>
    );
    };
export default CarPage;