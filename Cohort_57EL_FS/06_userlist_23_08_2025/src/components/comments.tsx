import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get<Comment[]>('https://jsonplaceholder.typicode.com/comments?_limit=20')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error(t('errorLoadingComments'), error);
      })
      .finally(() => setLoading(false));
  }, [t]);

  return (
    <div className="container mt-4">
      <h2>{t('comments')}</h2>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">{t('loadingComments')}</p>
        </div>
      ) : (
        <div className="row g-3">
          {comments.map(comment => (
            <div className="col-md-6 mb-3" key={comment.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{comment.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{comment.email}</h6>
                  <p className="card-text">{comment.body}</p>
                  <Link to={`/comments/${comment.id}`} className="btn btn-sm btn-primary">
                    {t('showDetails')}
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

export default Comments;



