import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectProducts, selectError, selectLoading } from './selectors'
import { deleteProduct, loadProducts } from './productsSlice'

export default function ProductsList(): JSX.Element {
  const products = useAppSelector(selectProducts)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

  return (
    <div>
      <h1>Products List</h1>
      {loading && <p>Lade Produkte...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title}
            <button
              type="button"
              onClick={() => {
                if (confirm('Produkt wirklich löschen?')) {
                  dispatch(deleteProduct(product.id))
                }
              }}
            >
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
