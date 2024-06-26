// src/components/DueTimeModal.js
import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Box} from '@mui/material';

const DueTimeModal = ({ open, handleClose,items, setItems,storeCurrentItem,getCurrentDateTime}) => {
    const [selectedDateAndTime, setSelectedDateAndTime] = useState(getCurrentDateTime());
   
    const handleOngoing = () => {
      const now = getCurrentDateTime();
      setItems(items.map(item => item.id === storeCurrentItem.id ? { ...item, status: 'Ongoing', createdAt: now, dueDate:selectedDateAndTime } : item));
      setSelectedDateAndTime(getCurrentDateTime())
      handleClose();
    };

    console.log('selectedDateAndTime',selectedDateAndTime)

  return (
    <Dialog open={open}>
    <DialogTitle>Set Due Time</DialogTitle>
    <DialogContent>
      <Box component="form" noValidate autoComplete="off">
        <TextField type="datetime-local" value={selectedDateAndTime} onChange={(e)=> setSelectedDateAndTime(e.target.value)} />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleOngoing} color="primary">
        Submit
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default DueTimeModal;
