import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useModal, { useModalProps } from '@/hooks/useModal';
import LoginModal from '../LoginModal';

export default () => {
  const modalProps: useModalProps = useModal();
  const fnLogin = () => modalProps.toggle(true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Leo's Blog
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }}>Home</Button>
            <Button sx={{ color: '#fff' }}>About</Button>
            <Button sx={{ color: '#fff' }} onClick={fnLogin}>Login</Button>
          </Box>
        </Toolbar>
        <LoginModal {...modalProps} />
      </AppBar>
    </Box>
  );
}