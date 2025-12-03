import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectIsAuthenticated } from '../../features/auth/selectors'

interface ProtectedRouteProps {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    // Wenn der Nutzer nicht eingeloggt ist → weiterleiten zur Login-Seite
    return <Navigate to="/login" replace />
  }

  // Wenn eingeloggt → geschützte Komponente rendern
  return children
}
