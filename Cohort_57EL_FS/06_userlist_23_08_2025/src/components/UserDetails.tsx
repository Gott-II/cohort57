import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          setError(t('errorLoadingUser') + ': ' + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, t]);

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">{t('loadingUser')}</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : user ? (
        <>
          <h2 className="mb-4">{user.name}</h2>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
              <p className="card-text"><strong>{t('email')}:</strong> {user.email}</p>
              <p className="card-text"><strong>{t('phone')}:</strong> {user.phone}</p>
              <p className="card-text"><strong>{t('website')}:</strong> {user.website}</p>
              <p className="card-text"><strong>{t('company')}:</strong> {user.company.name} – {user.company.catchPhrase}</p>
              <p className="card-text">
                <strong>{t('address')}:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </div>
          <div className="text-end">
            <Link to="/users" className="btn btn-outline-primary">
              ← {t('backToUserList')}
            </Link>
          </div>
        </>
      ) : (
        <div className="alert alert-warning text-center">{t('userNotFound')}</div>
      )}
    </div>
  );
};

export default UserDetails;




