import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useModal, { useModalProps } from '@/hooks/useModal';
import LoginModal from '../LoginModal';
import { useNavigate } from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const modalProps: useModalProps = useModal();
  const fnLogin = () => modalProps.toggle(true);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Leo's Blog
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* <Button sx={{ color: '#fff' }}>About</Button> */}
            <Button sx={{ color: '#fff' }} onClick={() => navigate('/')}>Home</Button>
            <Button sx={{ color: '#fff' }} onClick={fnLogin}>Login</Button>
          </Box>
        </Toolbar>
        <LoginModal {...modalProps} />
      </AppBar>
    </Box>
  );
}