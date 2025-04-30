import {Car} from "../types.ts";

// type FetchCars = () => Promise<Car[]>;

export function fetchCars(): Promise<Car[]>{
    const mockedCars: Car[] = [
        {id: 1, make: 'Ford', model: 'Mustang', year: 2017, price: 30000.65, used: true},
        {id: 2, make: 'Kia', model: 'Optima', year: 2020, price: 13500, used: true},
        {id: 3, make: 'Chevy', model: 'Silverado', year: 2025, price: 60000.34, used: false},
    ]
    return Promise.resolve(mockedCars)
}

// export const fetchCars: FetchCars = () => (
//     axios.get('/api/car')
//         .then((r: AxiosResponse<Car[]>) => r.data)
// )