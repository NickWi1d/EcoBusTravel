'use client';
import React from 'react'
import Filter from '@/components/Filter'
import { usePathname } from 'next/navigation';

const SearchResults = () => {
  const pathname = usePathname();
  return (
    <div>
        <Filter/>
        {pathname}
    </div>
  )
}

export default SearchResults