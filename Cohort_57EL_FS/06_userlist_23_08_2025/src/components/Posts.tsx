import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=20')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Fehler beim Laden der Beiträge:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Beiträge</h2>
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="row g-3">
          {posts.map(post => (
            <div className="col-md-6" key={post.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body.slice(0, 100)}...</p>
                  <Link to={`/posts/${post.id}`} className="btn btn-sm btn-outline-primary">
                    Details anzeigen
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
