import { useCallback } from 'react';
import { useSnackbarContext } from '../state/snackbar/context';

export function useSnackbar() {
  const { addAlert } = useSnackbarContext();

  const enqueueSnackbar = useCallback((message, txid) => {
    addAlert({
      key: txid,
      message,
    });
  }, [addAlert]);

  return { enqueueSnackbar };
}
