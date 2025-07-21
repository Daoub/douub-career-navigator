import { useState, useEffect, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

type AsyncFunction<T> = () => Promise<T>;

export const useAsync = <T>(asyncFunction: AsyncFunction<T>, dependencies: any[] = []) => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
      throw error;
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  return {
    ...state,
    retry,
    execute
  };
};