import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsers, selectLoading } from "./usersSlice";
import type { RootState, AppDispatch } from "../../app/store";
import styles from "./UsersList.module.css"; // 

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector((state: RootState) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>⏳ Lade Benutzer...</p>;
  if (error) return <p>❌ Fehler: {error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Benutzerliste</h2>
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id} className={styles.card}>
            <strong>{user.name.firstname} {user.name.lastname}</strong><br />
            📧 {user.email}<br />
            📞 {user.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;


