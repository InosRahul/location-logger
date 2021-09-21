import { firebaseService } from 'service';
import { useAuth, useLogEntries } from 'hooks';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const LogEntry = ({ location, onClose }) => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    try {
      setLoading(true);
      if (authUser) {
        firebaseService.firestore.collection('users').add({
          userId: authUser.uid,
          longitude: location.longitude,
          latitude: location.latitude,
          title: data.title,
          description: data.description,
          visitDate: data.visitDate,
          comments: data.comments,
        });
      }
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" required {...register('title')} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} {...register('comments')}></textarea>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        rows={3}
        {...register('description')}
      ></textarea>
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required {...register('visitDate')} />
      <button disabled={loading}>
        {loading ? 'Loading...' : 'Create Entry'}
      </button>
    </form>
  );
};