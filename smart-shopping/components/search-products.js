"use client";

import React, { useState, useCallback, useRef } from 'react';
import { Search, Loader2, X } from "lucide-react";

export function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  const debouncedSearch = useCallback((value) => {
    setIsLoading(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("search-products", {
          detail: value,
        })
      );
      setIsLoading(false);
    }, 300);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    window.dispatchEvent(
      new CustomEvent("search-products", {
        detail: '',
      })
    );
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm">
      <Search 
        className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" 
        aria-hidden="true"
      />
      
      <input
        value={searchTerm}
        placeholder="Search products..."
        className="w-full rounded-md border border-input bg-background px-3 py-2 pl-8 pr-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={handleSearch}
        type="search"
        aria-label="Search products"
      />
      
      {isLoading ? (
        <Loader2 
          className="absolute right-2 top-2.5 h-4 w-4 animate-spin text-muted-foreground" 
          aria-hidden="true"
        />
      ) : searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-2 top-2.5 hover:text-foreground text-muted-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}