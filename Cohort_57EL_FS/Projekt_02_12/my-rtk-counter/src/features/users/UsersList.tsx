// src/features/users/UsersList.tsx
import { useGetUsersQuery } from "./types/usersApi";
import styles from "./UsersList.module.css";

const UsersList = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <p className={styles.loading}>Lade Benutzer...</p>;
  if (error) return <p className={styles.error}>Fehler beim Laden</p>;

  if (!data || data.length === 0) {
    return <p className={styles.error}>Keine Benutzer gefunden.</p>;
  }

  return (
    <div className={styles.grid}>
      {data.map((user) => (
        <div key={user.id} className={styles.card}>
          <div className={styles.name}>
            {user.name.firstname} {user.name.lastname}
          </div>
          <div className={styles.field}>
            <span>Email:</span> {user.email}
          </div>
          <div className={styles.field}>
            <span>Username:</span> {user.username}
          </div>
          <div className={styles.address}>
            <span>Adresse:</span> {user.address.city}, {user.address.street}{" "}
            {user.address.number}, {user.address.zipcode}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
