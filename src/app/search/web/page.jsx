import WebSearchResults from '@/components/WebSearchResults';
import React from 'react';

async function getData(query) {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${query}`,
    {
      next: { revalidate: 86400 }, // 1 day
    }
  );
  if (!response.ok) {
    throw new Error('Oops! something went wrong.');
  }
  const data = await response.json();
  return data;
}

export default async function WebSearchPage({ searchParams }) {
  const results = await getData(searchParams.searchTerm);
  // console.log(searchParams);
  if (!results) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">No results found</h1>
        <p>Try searching something else...</p>
      </div>
    );
  }
  return (
    <main className="p-6 text-gray-700">
      {results && <WebSearchResults results={results} />}
    </main>
  );
}
