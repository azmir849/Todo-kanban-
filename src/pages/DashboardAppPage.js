import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography, Box } from '@mui/material';
import Column from 'src/components/Kanban/Column';
import { useState } from 'react';
import FormModal from 'src/components/Kanban/FormModal';
import DueTimeModal from 'src/components/Kanban/DueTimeModal';
// components


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [items, setItems] = useState([
    { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'New',createdAt:'2024-06-27T18:40',dueDate:null },
    { id: 2, title: 'Task 2', description: 'This is the description for item 1 which is longer than fifty characters to demonstrate the read more and read less functionality.', status: 'New',createdAt:'2024-06-27T17:40',dueDate:null },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'Ongoing',createdAt:'2024-06-27T16:40',dueDate:'2024-06-26T16:40' },
    { id: 4, title: 'Task 4', description: 'This is the description for item 1 which is longer than fifty characters to demonstrate the read more and read less functionality.', status: 'Done',createdAt:'2024-06-27T15:40',dueDate:null },
  ]);

  const getItemsByStatus = (status) => items.filter(item => item.status === status).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  //For item creation modal 
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  // for due date time modal
  const [modalDueOpen, setModalDueOpen] = useState(false);
  const [storeCurrentItem, setStoreCurrentItem] = useState(null)
  const openDueTimeModal = () => setModalDueOpen(true);
  const closeDueTimeModal = () => setModalDueOpen(false);


  const getCurrentDateTime = () => {
    const now = new Date();
    const isoString = now.toISOString();
    const date = isoString.split('T')[0]; // Extracts the date part
    const time = isoString.split('T')[1].split(':'); // Extracts the time part
    const formattedTime = `${time[0]}:${time[1]}`; // Formats as HH:MM
    return `${date}T${formattedTime}`;
  };
  
  //add item
  const handleSubmit = (task) => {
    const now = getCurrentDateTime()
    setItems([
      ...items,
      { id: Date.now(), title: task.title, description: task.description, status: task.status,createdAt: now},
    ]);
  };

  
  // move item
  const moveItem = (currentitem, newStatus) => {
    //check onGoing or not
    if(newStatus === 'Ongoing'){
      setStoreCurrentItem(currentitem)
      openDueTimeModal()
    }else{
      const now = getCurrentDateTime()
      console.log('now', now)
      setItems(items.map(item => item.id === currentitem.id ? { ...item, status: newStatus,createdAt: now } : item));
    }
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
      <DueTimeModal open={modalDueOpen} handleClose={closeDueTimeModal} items={items} setItems={setItems} storeCurrentItem={storeCurrentItem} getCurrentDateTime={getCurrentDateTime} />

    </>
  );
}
