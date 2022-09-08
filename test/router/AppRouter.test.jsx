import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from '../../src/auth/context';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {
    test('debe mostrar el login si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{ contextValue }}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

//        screen.debug();
        expect( screen.getAllByText('Login').length).toBe(1);
    })

    test('debe mostrar el componente de marvel si esta autenticado', () => { 
        const contextValue = {
            logged: true,
            user: {
                id: 'alpedo',
                name: 'Ricardo'
            }
        }
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Marvel').length).toBeGreaterThan(0);

     })
})