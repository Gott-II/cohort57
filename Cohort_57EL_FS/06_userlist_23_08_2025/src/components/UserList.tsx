import { useEffect, useState, type JSX } from 'react';
import axios from 'axios';
import User from './User';
import { useTranslation } from 'react-i18next';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserList = (): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        setError(t('errorLoadingUsers') + ': ' + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [t]);

  const containerClass = darkMode
    ? 'container-fluid bg-dark text-light min-vh-100 py-4'
    : 'container-fluid bg-light text-dark min-vh-100 py-4';

  const cardClass = darkMode
    ? 'card bg-secondary text-light h-100 shadow'
    : 'card bg-white text-dark h-100 shadow';

  return (
    <div className={containerClass}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{t('userList')}</h2>
        <button
          className={
            darkMode ? 'btn btn-outline-light' : 'btn btn-outline-dark'
          }
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? t('lightMode') : t('darkMode')}
        </button>
      </div>

      {loading && (
        <div className="d-flex justify-content-center mb-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">{t('loadingUsers')}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row g-4">
          {users.map((user) => (
            <User key={user.id} user={user} cardClass={cardClass} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
