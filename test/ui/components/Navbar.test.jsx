import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar"

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <Nabvar />', () => {

    const contextValue = {
        logged: true,
        user: {
            id: '1234',
            name: 'Mariano'
        },
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() );
    test('debe mostrar el nombre logueado', () => {


        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter >
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText( contextValue.user.name )).toBeTruthy();

    });

    test('hacer click en logout y navigate cuando se hace click en el boton', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter >
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutButton = screen.getByRole('button');
        fireEvent.click( logoutButton );
        expect( contextValue.logout ).toHaveBeenCalled();
        expect ( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true})


    });



})