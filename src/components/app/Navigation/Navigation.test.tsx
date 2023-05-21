import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import AppRoutes from '../../../@enums/AppRoutes';
import Navigation from './Navigation';

describe('components / app / Navigation', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[AppRoutes.Users]}>
        <Navigation />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
