import {render, screen, waitFor} from "@testing-library/react"
import {it, describe, beforeEach} from "vitest";
import {expect} from "vitest";
import '@testing-library/jest-dom'
import CarPage from "../CarPage";


describe('Car Page', () => {

    beforeEach(() => {
        render(<CarPage/>)
    })

    const doRender = async () =>{
        await waitFor(() =>{
            render(<CarPage/>)
        })
    }


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

})