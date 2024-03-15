import { render, fireEvent } from '@testing-library/react';
import Navigation from '../components/Navigation';

test('clicking the link opens a separate tab to the website', () => {
    const {getByText} = render(<Navigation />);
    const link = getByText('Museum World Map');
    
    expect(link).toBeInTheDocument();
    
    fireEvent.click(link);
  
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('href', 'https://www.vam.ac.uk/');
  });