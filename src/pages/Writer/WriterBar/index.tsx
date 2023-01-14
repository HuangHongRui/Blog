import { AppBar, Box, Button, Container } from "@mui/material"

export default ({ onCreate }: any) => {
  return (
    <AppBar
      position="fixed"
      sx={{ top: 'auto', bottom: 0 }}
      className="h-8 bg-white"
    >
      <Container maxWidth="md" className="text-black flex items-center h-full text-xs">
        <Button size="small" variant="text">回到顶部</Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button size="small" variant="text" onClick={onCreate}>发布</Button>
      </Container>
    </AppBar>
  )
}