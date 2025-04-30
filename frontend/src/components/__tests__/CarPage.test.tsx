import { render, screen} from "@testing-library/react"
import {it, describe, beforeEach} from "vitest";
import {expect} from "vitest";
import '@testing-library/jest-dom'
import CarPage from "../CarPage";


describe('Car Page', () => {

    beforeEach(() => {
        render(<CarPage/>)
    })


    it('should see a list of cars', () => {

        expect(screen.getByText('Ford')).toBeVisible()
    })

})