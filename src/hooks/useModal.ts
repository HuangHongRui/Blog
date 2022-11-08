import { useState } from 'react';

export type useModalProps = { open: boolean, toggle: (e: boolean) => void }

const useModal = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }

  return {
    open,
    toggle,
  }
};

export default useModal;