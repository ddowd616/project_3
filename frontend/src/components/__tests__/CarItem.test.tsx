import { render, screen} from "@testing-library/react"
import {it, expect, describe, beforeEach} from "vitest";
import '@testing-library/jest-dom'
import {Car} from "../../types.ts";
import {CarItem} from "../CarItem.tsx";


describe('Car Page', () => {

    const mockedCars: Car[] = [
        { make: 'toyota', model: 'corolla', id: 1, year: 2022, used:true, price:12000},
        { make: 'honda', model: 'civic', id: 2, year: 2020, used:false, price:30000 },
        { make: 'ford', model: 'F150', id: 3, year: 2019, used:true, price:18000 }
    ]
    beforeEach(() => {

        render(<CarItem car={mockedCars[2]}/>)

    })


    it('should show make, model, price, etc. for each car', () => {

        expect(screen.getByText(/Price: */i)).toBeVisible()
        expect(screen.getByText(/Year: */i)).toBeVisible()

    })

    it ('should should be able to see a delete button', async () => {

        expect (screen.getAllByText('Delete')[0]).toBeVisible()


    })

    it("should be able to see a edit button", async() => {
        expect (screen.getAllByText("Edit")[0]).toBeVisible()
    })

})