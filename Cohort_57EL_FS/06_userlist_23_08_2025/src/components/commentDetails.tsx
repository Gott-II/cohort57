import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState<Comment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      axios.get<Comment>(`https://jsonplaceholder.typicode.com/comments/${id}`)
        .then(response => {
          setComment(response.data);
        })
        .catch(error => {
          console.error(t('errorLoadingComment'), error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, t]);

  return (
    <div className="container mt-4">
      <h2>{t('commentDetails')}</h2>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">{t('loadingComment')}</p>
        </div>
      ) : comment ? (
        <>
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{comment.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{comment.email}</h6>
              <p className="card-text">{comment.body}</p>
            </div>
          </div>

          <div className="text-end">
            <Link to="/comments/" className="btn btn-outline-primary">
              ← {t('backToComments')}
            </Link>
          </div>
        </>
      ) : (
        <div className="alert alert-warning">{t('commentNotFound')}</div>
      )}
    </div>
  );
};

export default CommentDetails;

