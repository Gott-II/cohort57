import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login, logout } from './authSlice'
import { selectIsAuthenticated, selectUser } from './selectors'

export default function Login(): JSX.Element {
  const [username, setUsername] = useState('')
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>Login</h1>
      {isAuthenticated ? (
        <div>
          <p>Willkommen, {user?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Benutzername eingeben"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  )
}
