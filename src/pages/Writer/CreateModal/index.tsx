import { Box, Button, Modal, ModalProps, TextField, Typography } from "@mui/material"
import { useModalProps } from '@/hooks/useModal';
import { fetchLogin } from "@/service/users";
import { FormControlUnstyled } from "@mui/base";

interface loginModalProps extends useModalProps, Omit<ModalProps, 'children'> {
  onCreate: Function
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default (props: loginModalProps) => {
  const { open, toggle, onCreate } = props;
  const fnClose = () => toggle(false);
  const fnSubmit = async (evt: any) => {
    evt.preventDefault();
    const [title] = evt.target
    onCreate(title.value)
  }

  return (
    <Modal open={open} onClose={fnClose} container={document.getElementById("root")}>
      <Box sx={style} component="form" onSubmit={fnSubmit}>
        <TextField className="w-full mb-4" color="secondary" label="请输入标题" required />
        <Button fullWidth type="submit" variant="contained" color="primary">确认创建</Button>
      </Box>
    </Modal>
  );
}