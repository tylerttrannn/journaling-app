import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './CheckboxList.css';

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // adds a task to the the tasks state 
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue(''); // Clear the input field
    }
  };

  const handleDeleteTask = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  return (
    <div>
      {/* text filed to add tasks in */}
      <TextField
        label="New Task"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button variant="contained" onClick={handleAddTask}>
        Add Task
      </Button>
      
      {/* leaving bgcolor blank so that the text flows well wit hthe container in the dashboard*/}
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: '' }}>
        {tasks.map((task, index) => {
          const labelId = `checkbox-list-label-${index}`;

          return (
            <ListItem key={index} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(task)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(task) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText 
                  id={labelId} 
                  primary={task} 
                  className="list-item-text" 
                />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
