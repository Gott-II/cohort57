export default function App(): JSX.Element {
  return (
    <div className="app-container">
      <header>
        <h1>Meine App</h1>
        <nav>
          <a href="/">Startseite</a>
          <a href="/tasks">Aufgaben</a>
          <a href="/counter">Zähler</a>
          <a href="/sandwich">Sandwich</a>
          <a href="/kontakt">Kontakt</a>
        </nav>
      </header>

      <main>
        <section className="task-section">
          <TaskCreation />
          <Tasks />
        </section>

        <section className="other-section">
          <Counter />
          <Sandwich />
        </section>

        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="alcohol" element={<Alcohol />} />
            <Route path="carshop" element={<CarShop />} />
            <Route path="counter" element={<Counter />} />
            <Route path="userspage" element={<UsersPage />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="sandwich" element={<Sandwich />} />
            <Route path="kontakt" element={<ContactForm />} />
            <Route path="*" element={<div>Seite nicht gefunden</div>} />
          </Route>
        </Routes>
      </main>

      <footer>
        <p>&copy; 2025 Meine App</p>
      </footer>
    </div>
  );
}
import { Routes, Route } from 'react-router-dom';
import TaskCreation from './components/tasks/taskCreation';
import Tasks from './components/tasks/Tasks';
import Counter from './components/Counter/Counter';
import Sandwich from './components/Sandwich/Sandwich';
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home';
import Alcohol from './components/Alcohol/Alcohol';
import CarShop from './components/CarShop/CarShop';
import UsersPage from './components/UsersPage/UsersPage';
import UserDetail from './components/UsersPage/UserDetail';
import ContactForm from './components/ContactForm/ContactForm';
import type { JSX } from 'react';

