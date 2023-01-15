import { useState } from 'react';

export type useModalProps = { open: boolean, toggle: (e: boolean) => void }

const useModal = (props = {}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }

  return {
    open,
    toggle,
    ...props
  }
};

export default useModal;