import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//  instructor updates assignment title, dueDate 
//  use an mui Dialog
//  issue PUT to URL  /assignments with updated assignment

const AssignmentUpdate = (props)  => {

    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [assignment, setAssignment] = useState({assignmentId: '', title: '', dueDate: ''});

    const editOpen = () => {
        setOpen(true);
        setMessage('');
        setAssignment(props.assignment);
    }
    const editChange = (event) => {
        setAssignment({...assignment,[event.target.name]:event.target.value})
    }
    const editClose = () => {
        setOpen(false);
    }
    const onSave = () => {
        props.save(assignment);
        setOpen(false);
    }

    return (
        <>
            <Button onClick={editOpen}>Edit</Button>
            <Dialog open={isOpen}>
                <DialogTitle>Edit Assignment</DialogTitle>
                <DialogContent style={{paddingTop:20}}>
                    <h4>{message}</h4>
                    <TextField style={{padding:10}} fullWidth label='assignmentId' name='assignmentId' value={assignment.assignmentId} InputProps={{readOnly: true,}} />
                    <TextField style={{padding:10}} autoFocus fullWidth label='title' name='title' value={assignment.title} onChange={editChange} />
                    <TextField style={{padding:10}} fullWidth label='dueDate' name='dueDate' value={assignment.dueDate} onChange={editChange} />
                </DialogContent>
                <DialogActions>
                    <Button color='secondary' onClick={editClose}>Close</Button>
                    <Button color='primary' onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssignmentUpdate;
