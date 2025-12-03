// src/components/Dashboard.tsx
import React from 'react'
import { useGetRandomQuoteQuery } from '../features/quotes/quotesApiSlice'
import { useGetProductsQuery } from '../features/products/productsApiSlice'

export default function Dashboard() {
  // Query 1: Zufälliges Zitat
  const { data: quote, isLoading: quoteLoading, isError: quoteError } = useGetRandomQuoteQuery()

  // Query 2: Produktliste
  const { data: products, isLoading: productsLoading, isError: productsError } = useGetProductsQuery()

  if (quoteLoading || productsLoading) return <div>Lade Daten…</div>
  if (quoteError || productsError) return <div>Fehler beim Laden</div>

  return (
    <div className="dashboard">
      <h2>Inspirierendes Zitat</h2>
      {quote && <blockquote>{quote.text} — {quote.author}</blockquote>}

      <h2>Produkte</h2>
      <ul>
        {products?.map((p: any) => (
          <li key={p.id}>
            {p.name} – {p.price} €
          </li>
        ))}
      </ul>
    </div>
  )
}
