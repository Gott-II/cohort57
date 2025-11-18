import { useEffect, useState, type JSX } from 'react';
import { useParams } from 'react-router-dom';
import type User from './types/User';
import style from './UserDetail.module.css';

export default function UserDetail(): JSX.Element {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Fehler beim Laden:', err));
  }, [id]);

  if (!user) return <div className={style.wrapper}>Benutzer wird geladen...</div>;

  return (
    <div className={style.wrapper}>
      <h1>{user.name}</h1>
      <img src={user.avatar} alt={user.name} width="100" style={{ borderRadius: '50%' }} />
      <p>📧 {user.email}</p>
      <p>🧑‍💼 {user.role}</p>
    </div>
  );
}


