import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => setPost(response.data))
        .catch(error => console.error('Fehler beim Laden des Beitrags:', error))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Beitragsdetails</h2>
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : post ? (
        <>
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
            </div>
          </div>
          <div className="text-end">
            <Link to="/posts" className="btn btn-outline-primary">
              ← Zurück zur Übersicht
            </Link>
          </div>
        </>
      ) : (
        <div className="alert alert-warning">Beitrag nicht gefunden.</div>
      )}
    </div>
  );
};

export default PostDetails;
