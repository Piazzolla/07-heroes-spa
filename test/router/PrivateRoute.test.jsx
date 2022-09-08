import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from '../../src/auth/context';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('pruebas en <PrivateRoute />', () => {
    test('si estoy autenticado debe mostrar el children', () => {

        Storage.prototype.setItem = jest.fn();
        const contextValue = {
            logged: true,
            user: {
                id: '1234',
                name: 'Mariano'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={[ '/search?q=batman' ]}>
                    <PrivateRoute>
                        <h1>Ruta publica</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>

        )

        expect(screen.getByText('Ruta publica')).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search?q=batman");
    });





    //las pruebas son iguales a las de public route mas esta
    // test('', () => {  })
})