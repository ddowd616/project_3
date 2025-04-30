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
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    return(
        <div>
            <h1>Car Inventory</h1>
            {carList.map((el, index)=>(<CarItem car={el} key={index}/>))}
            <form onSubmit={handleSubmit}>
                    <input type="text" title={"Make"} placeholder={"Make"}/>
                <input type="text" placeholder={"Model"}/>
                <input type="number" placeholder={"Year"}/>
                <input type="number" placeholder={"Price"}/>
                <label>
                    Used? (y/n)
                <input type="checkbox" />
                </label>
                <button type={"submit"} aria-label={"addButton"}>Submit</button>
            </form>
        </div>
    );
};

export default CarPage;