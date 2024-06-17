import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../components/Navbars/Navbar';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Navbar', () => {
    test('renders the brand name', () => {
        renderWithRouter(<Navbar />);
        const brandName = screen.getByText(/Blogz/i);
        expect(brandName).toBeInTheDocument();
    });

    test('renders all navigation links', () => {
        renderWithRouter(<Navbar />);
        const dashboardLink = screen.getByText(/Dashboard/i);
        const postsLink = screen.getByText(/Posts/i);
        const settingsLink = screen.getByText(/Settings/i);

        expect(dashboardLink).toBeInTheDocument();
        expect(postsLink).toBeInTheDocument();
        expect(settingsLink).toBeInTheDocument();
    });

    test('renders the login button', () => {
        renderWithRouter(<Navbar />);
        const loginButton = screen.getByRole('button', { name: /log in/i });
        expect(loginButton).toBeInTheDocument();
    });

    test('navigation links have correct attributes', () => {
        renderWithRouter(<Navbar />);
        const dashboardLink = screen.getByText(/Dashboard/i);
        const postsLink = screen.getByText(/Posts/i);
        const settingsLink = screen.getByText(/Settings/i);

        expect(dashboardLink.closest('a')).toHaveAttribute('href', '/dashboard');
        expect(postsLink.closest('a')).toHaveAttribute('href', '/posts');
        expect(settingsLink.closest('a')).toHaveAttribute('href', '/settings');
    });
});
