import {Car} from "../types.ts";
import axios, {AxiosResponse} from "axios";

type FetchCars = () => Promise<Car[]>;

// export function fetchCars(): Promise<Car[]>{
//     const mockedCars: Car[] = [
//         {id: 1, make: 'Ford', model: 'Mustang', year: 2017, price: 30000.65, used: true},
//         {id: 2, make: 'Kia', model: 'Optima', year: 2020, price: 13500, used: true},
//         {id: 3, make: 'Chevy', model: 'Silverado', year: 2025, price: 60000.34, used: false},
//     ]
//     return Promise.resolve(mockedCars)
// }

export const CreateCar = ( newCar: Omit<Car, 'id'>) => (
    axios.post("api/carInventory", newCar).then((r:AxiosResponse<Car[]>) => r.data)
)

export const fetchCars: FetchCars = () => (
    axios.get('/api/carInventory')
        .then((r: AxiosResponse<Car[]>) => r.data)
)