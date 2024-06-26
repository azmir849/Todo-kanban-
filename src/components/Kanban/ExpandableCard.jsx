import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, List, ListItem, ListItemText, IconButton, Button, Menu, MenuItem, Typography } from '@mui/material';
import { ExpandMore, ExpandLess, MoreVert } from '@mui/icons-material';

const ExpandableCard = ({title, items,onMoveItem, handleOpen}) => {
  const [expanded, setExpanded] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleExpandClick = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index]
    }));
  };

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handleMenu =(item, type)=>{
    onMoveItem(item,type)
    handleMenuClose()
  }

  return (
    <Card>
      <CardHeader
        title={title}
        titleTypographyProps={{ align: 'center' }}
      />
      <CardContent>
        <List>
          {items.map((item, index) => {
            const isLongDescription = item.description.length > 50;
            const showDescription = expanded[index] || !isLongDescription;
            const description = showDescription ? item.description : item.description.substring(0, 50) + '...';

            // for on going checking due or not
            const isDue = (dueDateString) => {
              const now = new Date();
              const dueDate = new Date(dueDateString);
              return dueDate < now;
            };

            var dueStatus = false
            if(title ==='Ongoing' && item.dueDate !==null){
              const dueDateString = item.dueDate;
              if(isDue(dueDateString) ===true){
                dueStatus = true
              }
            }


            return (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      <>
                        {title ==='New' && <Typography style={{ color: 'blue' }}>{item.title}</Typography>}
                        {title ==='Ongoing' &&
                          <Typography style={{ color: 'orange' }}>{item.title} {dueStatus === true && <><Button sx={{ml:0.5}} style={{ color: 'red' }}>(Overdue)</Button></>}</Typography>
                        }
                        {title ==='Done' && <Typography style={{ color: 'green' }}>{item.title}</Typography>}
                      </>
                    }
                    secondary={
                      <>
                        {description}
                        {isLongDescription && (
                          <IconButton onClick={() => handleExpandClick(index)} size="small">
                            {expanded[index] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        )}
                      </>
                    }
                  />
                  <IconButton onClick={(event) => handleMenuClick(event, index)}>
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuIndex === index}
                    onClose={handleMenuClose}
                  >
                    {title !== 'New' && <MenuItem onClick={(e)=>handleMenu(item,'New')}>New</MenuItem>}
                    {title !=='Ongoing' && <MenuItem onClick={(e)=>handleMenu(item,'Ongoing')}>Ongoing</MenuItem>}
                    {title !=='Done' && <MenuItem onClick={(e)=>handleMenu(item,'Done')}>Done</MenuItem>}
                  </Menu>
                </ListItem>
              </div>
            );
          })}
        </List>
      </CardContent>
      {title === 'New' && 
        <CardActions>
            <Button variant="contained" color="primary" fullWidth onClick={(e)=> handleOpen()}>
                 Add
            </Button>
        </CardActions>
      }
    </Card>
  );
};

export default ExpandableCard;
