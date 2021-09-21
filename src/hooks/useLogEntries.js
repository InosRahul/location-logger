import { firebaseService } from 'service';
import { useEffect, useState } from 'react';

export const useLogEntries = userId => {
  const [logEntries, setLogEntries] = useState();

  useEffect(() => {
    const unsubscribe = userId
      ? firebaseService.firestore
          .collection('users')
          .where('userId', '==', userId)
          .onSnapshot(snap => {
            const _logEntries = [];
            snap.forEach(s => {
              _logEntries.push({
                ...s.data(),
                id: s.id,
              });
            });
            setLogEntries(_logEntries);
          })
      : undefined;

    return unsubscribe;
  }, [userId]);

  return logEntries;
};
