import {Car} from "../types.ts";

export function fetchCars(): Promise<Car[]>{
    const mockedCars: Car[] = [
        { make: 'toyota', model: 'corolla', id: 1, year: 2022, used:true, price:12000},
        { make: 'honda', model: 'civic', id: 2, year: 2020, used:false, price:30000 },
        { make: 'ford', model: 'F150', id: 3, year: 2019, used:true, price:18000 }
    ]
    return Promise.resolve(mockedCars)
}