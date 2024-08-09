import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import React from 'react';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import Search from './Search';
import Details from './Details';
import { Provider } from 'react-redux';
import store from './store';

const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:Infinity,
      cacheTime:Infinity,
    }
  }
});


const App = () => {
  // const adoptedPet=useState(null);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/"> Adopt Me! </Link>
          </header>
          {/* <AdoptedPetContext.Provider value={adoptedPet}> */}
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<Search />} />
          </Routes>
          {/* </AdoptedPetContext.Provider> */}
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
};
const container = document.getElementById('root');
const root = createRoot(container);
// root.render(React.createElement(App));
root.render(<App />);
