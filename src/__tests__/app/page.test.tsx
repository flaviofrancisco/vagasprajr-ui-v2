import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/services/store';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';

describe('Home Component', () => {
  it('should render the Home screen correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const mainElement = container.querySelector('main');
    expect(mainElement).toHaveClass('container-job-index');
  });
});
