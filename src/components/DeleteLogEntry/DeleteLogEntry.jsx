import { firebaseService } from 'service';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export const DeleteLogEntry = ({ entry, id, onClose }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const deleteLogEntry = () => {
    setLoading(true);
    try {
      if (window.confirm(`Are you sure you want to delete ${entry.title}`)) {
        firebaseService.firestore.collection('users').doc(id).delete();
      }
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(true);
    }
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit(deleteLogEntry)}>
      {error ? <h3 className="error">{error}</h3> : null}
      <button {...register('delete')} disabled={loading}>
        {loading ? 'Loading...' : 'Delete Entry'}
      </button>
    </form>
  );
};
