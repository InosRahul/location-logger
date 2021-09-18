import { useState, useEffect } from 'react';

export const useResolved = (...values) => {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(values.every(value => value !== undefined));
  }, [values]);

  return resolved;
};
