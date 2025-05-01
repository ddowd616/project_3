import {queryByText, render, screen, waitFor} from "@testing-library/react"
import {it, describe, beforeEach} from "vitest";
import {expect} from "vitest";
import '@testing-library/jest-dom'
import CarPage from "../CarPage";
import {userEvent} from "@testing-library/user-event"


describe('Car Page', () => {

    const doRender = async () =>{
        await waitFor(() =>{
            render(<CarPage/>)
        })
    }

    // beforeEach(() => {
    //     render(<CarPage/>)
    // })


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