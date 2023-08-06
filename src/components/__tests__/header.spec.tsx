import { render, screen } from '@testing-library/react';
import Header from '../header'

describe('header tests', () => {
    it('should show header text', () => {
        render(<Header />)
        const header = screen.getByText('User Records App')
        expect(header).toBeTruthy();
        expect(header).toBeVisible();
    })
})