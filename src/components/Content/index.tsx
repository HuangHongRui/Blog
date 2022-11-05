import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  maxWidth: 1000,
  minHeight: 400
}));

export default function Elevation() {
  const mockList = [1,2,3,4,5,6,7];
  return (
    <Box>
      {mockList.map(item =>
        <Item key={item} elevation={24} sx={{ my: 2, mx: 'auto', p: 2 }}>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>ABCD</Typography>
          </Grid>
        </Item>
      )}
    </Box>
  );
}