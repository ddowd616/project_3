import {queryByText, render, screen, waitFor} from "@testing-library/react"
import {it, describe, beforeEach} from "vitest";
import {expect} from "vitest";
import '@testing-library/jest-dom'
import CarPage from "../CarPage";
import {userEvent} from "@testing-library/user-event"
import {fetchCars,CreateCar} from "../CarService"

describe('Car Page', () => {

    const doRender = async () =>{
        await waitFor(() =>{
            render(<CarPage/>)
        })
    }

    beforeEach(() => {
        vi.spyOn(CarService, 'fetchCars').mockResolvedValue([
        {id: 1, make: 'Ford', model: 'Mustang', year: 2017, price: 30000.65, used: true},
        {id: 2, make: 'Kia', model: 'Optima', year: 2020, price: 13500, used: true},
        {id: 3, make: 'Chevy', model: 'Silverado', year: 2025, price: 60000.34, used: false},
        ]);

        vi.spyOn(CarService, 'CreateCar').mockResolvedValue({
            id: 3, make: 'Toyota', model: 'Camry', year: 2021, price: 6900, used: true
        });
    });


    it('should see a list of cars', async () => {
        doRender()
        expect(await screen.getByText(/Ford*/i)).toBeVisible()
        expect(await screen.getByText(/Kia/i)).toBeVisible()
        expect(await screen.getByText(/Mustang/i)).toBeVisible()
    })

    it('should have form element to add a new vehicle', () => {
        expect(screen.getByPlaceholderText('Make')).toBeVisible()
        expect(screen.getByPlaceholderText('Model')).toBeVisible()
        expect(screen.getByLabelText('addButton')).toBeVisible()
    })
    it('should find cars that were submitted', async ()=>{
        const make=screen.getByPlaceholderText('Make')
        const model =screen.getByPlaceholderText('Model')
        const year =screen.getByPlaceholderText('Year')
        const price=screen.getByPlaceholderText('Price')
        const box = screen.getByLabelText('box')
        const add =screen.getByLabelText("addButton")

        await userEvent.type(make, "Ford")
        await userEvent.type(model, "Fiesta")
        await userEvent.type(year, "2017")
        await userEvent.type(price, "69000")
        await userEvent.click(box)
        await userEvent.click(add)

        expect(await screen.findByText(/fiesta*/i)).toBeVisible()
    } )

    it('should create a new Car item on submit from post method', async () => {
        doRender()
        const make=screen.getByPlaceholderText('Make')
        const model =screen.getByPlaceholderText('Model')
        const year =screen.getByPlaceholderText('Year')
        const price=screen.getByPlaceholderText('Price')
        const box = screen.getByLabelText('box')
        const add =screen.getByLabelText("addButton")

        await userEvent.type(make, "Toyota")
        await userEvent.type(model, "Camry")
        await userEvent.type(year, "2021")
        await userEvent.type(price, "6900")
        await userEvent.click(box)
        await userEvent.click(add)


        expect( await screen.findByText(/camry*/i)).toBeVisible()
    })

})