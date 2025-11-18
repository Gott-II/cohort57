import { useEffect, useState } from "react";
import "./App.css";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Fehler beim Laden der Benutzerdaten");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Daten konnten nicht geladen werden.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>📋 Benutzerliste</h2>
      {loading && <p>Lade Benutzerdaten...</p>}
      {error && <p className="error">{error}</p>}
      <div className="user-list">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <h3>{user.name}</h3>
            <p><strong>Benutzername:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Telefon:</strong> {user.phone}</p>
            <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
            <p><strong>Adresse:</strong> {user.address.street}, {user.address.city}</p>
            <p><strong>Firma:</strong> {user.company.name}</p>
            <p><em>{user.company.catchPhrase}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
