import {useEffect, useState} from "react";
import {Car} from "../types.ts";
import {CreateCar, fetchCars} from "./CarService.ts";
import {CarItem} from "./CarItem.tsx";


const CarPage=()=>{

    const initalForm = {
        Make: '',
        Model: '',
        Year: 0,
        Price: 0,
        Used: false
    }

    const [carList, setCarList] = useState<Car[]>([])
    const [form,setForm] = useState(initalForm)
    const {Make, Model, Year, Price, Used} = form
    const [render,setRender] = useState(false)

    const reload = () => {
        fetchCars().then(setCarList)
        setRender(prev => !prev)
    }


    useEffect(() => {
        let isMounted = true;
        fetchCars().then(data => {
            if (isMounted) {
                setCarList(data);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [render]);


    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newCar: Omit<Car, 'id'> = {
            make: Make,
            model: Model,
            year: Number(Year),
            price: Number(Price),
            isUsed: Used
        }
        CreateCar(newCar).catch(console.error)
        fetchCars().then(setCarList)
        reload()
        // console.log(newCar)
        setForm(initalForm)
        // console.log(carList)
    }

    const handleChange = (e) => {
        setForm(
            {...form,
                [e.target.name]: e.target.value}
        )
        // console.log(form)
    }


    return(
        <div>
            <h1>Car Inventory</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" title={"Make"} value={Make} placeholder={"Make"} name={'Make'} onChange={handleChange}/>
                <input type="text" placeholder={"Model"} value={Model} name={'Model'} onChange={handleChange}/>
                <input type="number" placeholder={"Year"} value={Year} name={'Year'} onChange={handleChange}/>
                <input type="number" placeholder={"Price"} value={Price} name={'Price'} onChange={handleChange}/>
                <label>
                    Used? (y/n)
                <input type="checkbox" aria-label={"box"} name={'Used'} checked={Used} onChange={(e) => setForm({...form, Used: e.target.checked})}/>
                </label>
                <button type={"submit"} aria-label={"addButton"}>Submit</button>
            </form>
            {carList.map((el, index)=>(<CarItem onDelete={reload} car={el} key={index}/>))}
        </div>
    );
};

export default CarPage;