import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography, Box } from '@mui/material';
// components


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> Todo List Application (Kanban) </title>
      </Helmet>

      <Container maxWidth="xl">
      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Todo List Application (Kanban)
        </Typography>
      </Box>
       

        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12}>Card 1</Grid>
          <Grid item lg={6} md={6} sm={12}>Card 2</Grid>
          <Grid item lg={6} md={6} sm={12}>Card 3</Grid>
        </Grid>
      </Container>
    </>
  );
}
