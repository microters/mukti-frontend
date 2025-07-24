'use client';
import { useEffect, useState } from 'react';
import Button from './Component/Shared/Buttons/Button';

// Use environment variables for BASE_URL and API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_URL = `${BASE_URL}/api/error-page`;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'caf56e69405fe970f918e99ce86a80fbf0a7d728cca687e8a433b817411a6079';

const NotFound = () => {
  const cachedImage = typeof window !== 'undefined' ? localStorage.getItem('errorImage') : null;
  const [errorImage, setErrorImage] = useState(cachedImage || '/default-404.png');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchErrorImage = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          const newImageUrl = data[0].imageUrl;
          setErrorImage(newImageUrl);
          localStorage.setItem('errorImage', newImageUrl);
        } else {
          throw new Error('No error images found');
        }
      } catch (err) {
        console.error('Error fetching error image:', err);
        setError(err.message);
      }
    };
    fetchErrorImage();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center py-6">
        {/* Error Image */}
        <div>
          {error ? (
            <p className="text-red-400 text-xl">Error: {error}</p>
          ) : (
            <img
              src={errorImage.startsWith('/Uploads') ? `${BASE_URL}${errorImage}` : errorImage}
              alt="Error 404"
              className="mx-auto max-w-[500px] w-full rounded-lg"
              loading="lazy"
              onError={() => {
                setError('Failed to load image');
                setErrorImage('/default-404.png');
              }}
            />
          )}
        </div>
        {/* 404 Message */}
        <h1 className="text-3xl sm:text-6xl">Oops! Page not found.</h1>
        <p className="text-xl mb-6">The page you're looking for was not found.</p>
        <Button
          linkHref="/"
          buttonText="Back To Home Page"
          buttonColor="bg-M-secondary-color"
          textColor="text-white"
          borderColor="border-M-secondary-color"
          alignment="text-center"
          padding="py-3 px-8"
          fontSize="text-lg"
          icons="iconamoon:arrow-right-2-light"
        />
      </div>
    </div>
  );
};

export default NotFound;