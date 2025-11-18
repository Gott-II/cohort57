import React, { type JSX } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

export default function LayOut(): JSX.Element {
  return (
    <div>
        <NavBar />
        <Outlet />
        <footer>
        <p>© 2025 My Application. All rights reserved.</p>
        </footer>
    </div>
  )
}
