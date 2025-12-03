import { useState } from "react"
import styles from "./Quotes.module.css"
import { useGetQuotesQuery } from "./quotesApiSlice"

const options = [5, 10, 20, 30]

export const Quotes = (): React.ReactElement | null => {
  const [numberOfQuotes, setNumberOfQuotes] = useState(10)
  const { data, isError, isLoading, isSuccess } =
    useGetQuotesQuery(numberOfQuotes)

  if (isError)
    return <p style={{ color: "red" }}>Fehler beim Laden der Zitate.</p>
  if (isLoading) return <p>Lade Zitate...</p>

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <label htmlFor="quoteSelect">
          Select the Quantity of Quotes to Fetch:
        </label>
        <select
          id="quoteSelect"
          className={styles.select}
          value={numberOfQuotes}
          onChange={e => setNumberOfQuotes(Number(e.target.value))}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {data.quotes.length === 0 && <p>Keine Zitate gefunden.</p>}
        {data.quotes.map(({ author, quote, id }) => (
          <blockquote key={id}>
            &ldquo;{quote}&rdquo;
            <footer>
              <cite>{author}</cite>
            </footer>
          </blockquote>
        ))}
      </div>
    )
  }

  return null
}
