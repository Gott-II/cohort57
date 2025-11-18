import { useEffect, useState, type JSX } from 'react';
import { NavLink } from 'react-router-dom';
import type User from './types/User';
import style from './UsersPage.module.css';

export default function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  async function loadUsers(): Promise<void> {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/users");
      if (!res.ok) {
        throw new Error(`Serverfehler: ${res.status}`);
      }
      const arr = await res.json();
      setUsers(arr);
    } catch (error) {
      console.error("Fehler beim Laden der Benutzer:", error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
console.log("Benutzer geladen:", users);
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Benutzerliste</h1>
      <input
        type="text"
        placeholder="🔍 Suche nach Name oder E-Mail..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={style.search}
      />
      <ul className={style.list}>
        {filteredUsers.map(user => (
          <li key={user.id} className={style.item}>
            <NavLink to={`/users/${user.id}`} className={style.link}>
              <img src={user.avatar} alt={user.name} width="60" style={{ borderRadius: '50%' }} />
              <strong>{user.name}</strong><br />
              📧 {user.email}<br />
              🧑‍💼 {user.role}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}


