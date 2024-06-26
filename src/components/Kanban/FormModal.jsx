import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Select, MenuItem, InputLabel, FormControl, Box
} from '@mui/material';

const FormModal = ({ open, handleClose, handleSubmit , allItems,setItems}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('New');

  const handleFormSubmit = () => {
    handleSubmit({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('New');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
          />
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="New">
                <span style={{ color: 'blue' }}>New</span>
              </MenuItem>
              <MenuItem value="Ongoing">
                <span style={{ color: 'orange' }}>Ongoing</span>
              </MenuItem>
              <MenuItem value="Done">
                <span style={{ color: 'green' }}>Done</span>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
