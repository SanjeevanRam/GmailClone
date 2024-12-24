import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import React from 'react'

const Body = () => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar className='w-1/4' role="navigation" />
      <div className='w-3/4'>
        <ErrorBoundary fallback={<div>Something went wrong!</div>}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Body;
