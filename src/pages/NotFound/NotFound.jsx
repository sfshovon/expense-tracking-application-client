import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../Components/PageTitle/PageTitle';

const NotFound = () => {
  return (
    <section className="bg-gray-200 flex items-center min-h-screen p-16">
      <PageTitle title="Not Found"/>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <Link rel="noopener noreferrer" to="/" className="mt-10 btn px-8 py-3 font-semibold rounded">Back to homepage</Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;