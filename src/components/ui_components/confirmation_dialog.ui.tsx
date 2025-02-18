import React, { createContext, useState, useContext, ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type ConfirmationDialogContextType = {
  openDialog: (message: string, title?: string) => Promise<boolean>;
};

const ConfirmationDialogContext = createContext<ConfirmationDialogContextType | undefined>(undefined);

export const useConfirmationDialog = (): ConfirmationDialogContextType => {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error('useConfirmationDialog must be used within a ConfirmationDialogProvider');
  }
  return context;
};

interface ConfirmationDialogProviderProps {
  children: ReactNode;
}

export const ConfirmationDialogProvider: React.FC<ConfirmationDialogProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [title, setTitle] = useState<string>('Confirm');
  const [resolve, setResolve] = useState<((value: boolean) => void) | null>(null);

  const openDialog = (message: string, title: string = 'Confirm'): Promise<boolean> => {
    return new Promise((resolve) => {
      setMessage(message);
      setTitle(title);
      setResolve(() => resolve);
      setOpen(true);
    });
  };

  const closeDialog = () => {
    setOpen(false);
    setMessage('');
    setTitle('Confirm');
  };

  const handleConfirm = () => {
    resolve?.(true);
    closeDialog();
  };

  const handleCancel = () => {
    resolve?.(false);
    closeDialog();
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      {children}
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" >
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="warning">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationDialogContext.Provider>
  );
};
