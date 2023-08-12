//import React from 'react';
//import logo from './logo.svg';
import './App.scss';
import Navbar from './Component/ReusableComponent/Navbar';
import { Page1 } from './Page/Page1/Page1.index';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <div className='header'>
          <Navbar/>
        </div>
        <div className='page-name'>
          <span>Historical Currency</span>
        </div>
        <div>
          <Page1/>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
