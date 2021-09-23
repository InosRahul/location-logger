import { firebaseService } from 'service';
import { useAuth } from 'hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const EditLogEntry = ({ doc, onClose }) => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    try {
      setLoading(true);
      if (authUser) {
        firebaseService.firestore.collection('users').doc(doc.id).update({
          title: data.title,
          description: data.description,
          visitDate: data.visitDate,
          comments: data.comments,
          image: data.image,
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
      <input
        name="title"
        required
        {...register('title')}
        defaultValue={doc.title}
      />
      <label htmlFor="comments">Comments</label>
      <textarea
        name="comments"
        rows={3}
        {...register('comments')}
        defaultValue={doc.comments}
      ></textarea>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        rows={3}
        {...register('description')}
        defaultValue={doc.description}
      ></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" {...register('image')} defaultValue={doc.image} />
      <label htmlFor="visitDate">Visit Date</label>
      <input
        name="visitDate"
        type="date"
        required
        {...register('visitDate')}
        defaultValue={doc.visitDate}
      />
      <button disabled={loading}>
        {loading ? 'Loading...' : 'Update Entry'}
      </button>
    </form>
  );
};
