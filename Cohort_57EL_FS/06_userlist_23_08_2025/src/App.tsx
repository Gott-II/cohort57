import React, { useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import Comments from './components/comments';
import CommentDetails from './components/commentDetails';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';

const App: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const isDark = theme === 'dark';

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: isDark ? '#333' : '#8b8282ff',
        color: isDark ? '#c4b7b7ff' : '#000',
        minHeight: '100vh',
      }}
    >
      <nav className={`navbar navbar-expand-lg ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} mb-4`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {t('welcome')}
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/users">{t('userList')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/comments">{t('comments')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts">{t('posts')}</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              <button
               className="btn btn-outline-secondary"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
              >
                {t('themeToggle')}
              </button>

              <select
                className="form-select form-select-sm"
                style={{ width: '100px' }}
                value={i18n.language}
                onChange={handleLanguageChange}
              >
                <option value="de">Deutsch</option>
                <option value="en">English</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<h1>{t('welcome')}</h1>} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/comments/:id" element={<CommentDetails />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="*" element={<h1>{t('notFound')}</h1>} />
      </Routes>
    </div>
  );
};

export default App;



