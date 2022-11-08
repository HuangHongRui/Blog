import { Box, Button, Modal, ModalProps, TextField, Typography } from "@mui/material"
import { useModalProps } from '@/hooks/useModal';

interface loginModalProps extends useModalProps, Omit<ModalProps, 'children'> { }

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
  const { open, toggle, title = '登录' } = props;
  const fnClose = () => toggle(false);
  const fnSubmit = async (evt: any) => {
    evt.preventDefault();
    const [account, password] = evt.target
    console.log(account.value, password.value)
    // fetch API
    toggle(false);
  }

  return (
    <Modal open={open} onClose={fnClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h3">
          {title}
        </Typography>

        <Box component="form" onSubmit={fnSubmit}>
          <TextField
            id="standard-required"
            variant="standard"
            color="secondary"
            label="账号"
            required
          />
          <TextField
            id="standard-password-input"
            variant="standard"
            color="secondary"
            type="password"
            label="密码"
            required
          />
          <Button className="mt-10" fullWidth type="submit" variant="contained" color="primary">登录</Button>
        </Box>
      </Box>
    </Modal>
  );
}