import React, { useContext, type JSX } from 'react';
import { Link } from 'react-router-dom';
import type { IUser } from './UserList';
import { ThemeContext } from '../ThemeContext';
import { useTranslation } from 'react-i18next';

interface Props {
  user: IUser;
  cardClass: string;
}

const User: React.FC<Props> = ({ user, cardClass }): JSX.Element => {
  const { name, username, email, id } = user;
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const isDarkMode = theme === 'dark';

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div
        className={`${cardClass} ${
          isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'
        }`}
      >
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2">@{username}</h6>
          <p className="card-text">
            <strong>{t('email')}:</strong> {email}
          </p>
          <Link
            to={`/users/${id}`}
            className="btn btn-primary btn-sm"
            aria-label={`Details anzeigen für ${name}`}
          >
            {t('showDetails')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;
