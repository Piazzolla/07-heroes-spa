import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

import { SearchPage } from '../../../src/heroes/pages'



const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrarse correctamente con valores', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot();
        //        screen.debug();

    });


    test('debe de mostrar a batman y el input con el valor del query', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');
        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');
        const searchDiv = screen.getByLabelText('search');
        expect( searchDiv.style.display ).toBe('none');

    });

    test('debe mostrar un error si no se encuentra el hero (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const searchDiv = screen.getByLabelText('hero-error');
        expect( searchDiv.style.display ).not.toBe('none');
      })

    test('debe llamar el navigate en la pantalla nueva', () => { 
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );


        

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: 'batman' }})
        const form = screen.getByLabelText('form');
        fireEvent.submit( form );
        expect ( mockedUseNavigate ).toHaveBeenCalledWith(`?q=batman`); 
     })
});