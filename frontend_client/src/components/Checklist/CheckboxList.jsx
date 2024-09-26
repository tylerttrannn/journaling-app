import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { db } from '../../firebase'; 

import './CheckboxList.css';

export default function CheckboxList() {
  const [checked, setChecked] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;


  // Fetch tasks from Firestore when the component loads
  // This just takes a snapshot of the data and then we map it 
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'todo'));
      const fetchedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, [user]);


  // adding a item to the array in firebase 
  const handleAddTask = async () => {
    if (inputValue.trim() !== '') {
      const newTask = { label: inputValue, checked: false };
      const docRef = await addDoc(collection(db, 'users', user.uid, 'todo'), newTask);
      setTasks([...tasks, { id: docRef.id, ...newTask }]);
      setInputValue(''); // Clear the input field
    }
  };

  // updating the checked status in firebase
  const handleToggle = (task) => async () => {
    const updatedChecked = !task.checked;
    const taskRef = doc(db, 'users', user.uid, 'todo', task.id);
    // updating the checked value to be the opposite
    await updateDoc(taskRef, { checked: updatedChecked });
    // should look over this again 
    setTasks(tasks.map(t => (t.id === task.id ? { ...t, checked: updatedChecked } : t)));
  };

  // deleting task from firebase 
  const handleDeleteTask = async (task) => {
    const taskRef = doc(db, 'users', user.uid, 'todo', task.id);
    await deleteDoc(taskRef);
    // likewise 
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className = "checkbox-container">


      <List sx={{ width: '100%', maxWidth: 400, bgcolor: '' }}>
        {tasks.map((task) => {
          const labelId = `checkbox-list-label-${task.id}`;

          return (
            <ListItem key={task.id} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(task)} dense>
                <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.checked}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  sx={{
                    color: 'var(--text-color)', // Default color when unchecked
                    '&.Mui-checked': {
                      color: 'var(--primary-color)', // Color when checked
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: 'var(--accent-color)', // Optional for indeterminate state
                    },
                  }}
                />

                </ListItemIcon>
                <ListItemText id={labelId} primary={task.label} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>


      <div className = "todo-fields"> 
      <TextField
        label="New Task"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{
          marginBottom: 2,
          '& label.Mui-focused': {
            color: 'var(--text-color)', // Text color for label when focused
          },
          '& label': {
            color: 'var(--text-color)', // Default label color
          },
          '& .MuiOutlinedInput-root': {
            color: 'var(--text-color)', // Input text color
            '& fieldset': {
              borderColor: 'var(--secondary-text)', // Border color when not focused
            },
            '&:hover fieldset': {
              borderColor: 'var(--accent-color)', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--text-color)', // Border color when focused
            },
          },
          '& .MuiInputBase-input': {
            color: 'var(--text-color)', // Input text color
          },
        }}
      />



        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>

    </div>
  );
}
