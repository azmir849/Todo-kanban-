import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography, Box } from '@mui/material';
import Column from 'src/components/Kanban/Column';
import { useState } from 'react';
import FormModal from 'src/components/Kanban/FormModal';
// components


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [items, setItems] = useState([
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'New' },
    { id: 2, title: 'Task 2', description: 'This is the description for item 1 which is longer than fifty characters to demonstrate the read more and read less functionality.', status: 'New' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'Ongoing' },
    { id: 4, title: 'Task 4', description: 'This is the description for item 1 which is longer than fifty characters to demonstrate the read more and read less functionality.', status: 'Done' },
  ]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), title: newItemTitle, description: newItemDescription, status: 'New' },
    ]);
    setNewItemTitle('');
    setNewItemDescription('');
  };

  const moveItem = (id, newStatus) => {
    setItems(items.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const getItemsByStatus = (status) => items.filter(item => item.status === status);

  //For item creation modal 
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleSubmit = (task) => {
    setItems([
      ...items,
      { id: Date.now(), title: task.title, description: task.description, status: task.status },
    ]);
    
  };


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
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Column title="New"  items={getItemsByStatus('New')} handleOpen={handleOpen} onMoveItem={moveItem} />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Column title="Ongoing" items={getItemsByStatus('Ongoing')}  onMoveItem={moveItem} />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Column title="Done" items={getItemsByStatus('Done')}  onMoveItem={moveItem} />
          </Grid>
        </Grid>
      </Container>
      <FormModal open={modalOpen} handleClose={handleClose} handleSubmit={handleSubmit} />

    </>
  );
}
