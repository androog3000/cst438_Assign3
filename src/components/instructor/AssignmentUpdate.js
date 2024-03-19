import React, { useState } from 'react';
<<<<<<< HEAD
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
=======
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../../Constants';
>>>>>>> fb62db22fbe094540200ca828fb879a1f069c1bb

const AssignmentUpdate = (props) => {
    const [open, setOpen] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [assignment, setAssignment] = useState({
        id: '',
        title: '',
        dueDate: '',
        courseId: '',
        secId: '',
        secNo: '',
    });

    /*
     *  dialog for edit assignment
     */
    const editOpen = () => {
        setEditMessage('');
        setAssignment({
            id: '',
            title: '',
            dueDate: '',
            courseId: '',
            secId: '',
            secNo: '',
        });
        setOpen(true);
        setAssignment(props.assignment);
    };

<<<<<<< HEAD
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
=======
    const editClose = () => {
        setOpen(false);
        props.onClose();
    };

    const editChange = (event) => {
        setAssignment({ ...assignment, [event.target.name]: event.target.value });
    };

    const onSave = () => {
        saveAssignment(assignment);
    };

    const saveAssignment = async (assignment) => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignment),
            });
            if (response.ok) {
                setEditMessage('Assignment saved');
            } else {
                const rc = await response.json();
                setEditMessage(rc.message);
            }
        } catch (err) {
            setEditMessage('Network error: ' + err);
        }
    };

    return (
        <div>
            <Button onClick={editOpen}>Edit</Button>
            <Dialog open={open}>
                <DialogTitle>Edit Assignment</DialogTitle>
                <DialogContent style={{ paddingTop: 20 }}>
                    <h4>{editMessage}</h4>
                    <TextField
                        style={{ padding: 10 }}
                        fullWidth
                        label="id"
                        name="id"
                        value={assignment.id}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        style={{ padding: 10 }}
                        autoFocus
                        fullWidth
                        label="title"
                        name="title"
                        value={assignment.title}
                        onChange={editChange}
                    />
                    <TextField
                        style={{ padding: 10 }}
                        fullWidth
                        label="dueDate"
                        name="dueDate"
                        value={assignment.dueDate}
                        onChange={editChange}
                    />
                    <TextField
                        style={{ padding: 10 }}
                        fullWidth
                        label="courseId"
                        name="courseId"
                        value={assignment.courseId}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        style={{ padding: 10 }}
                        fullWidth
                        label="secId"
                        name="secId"
                        value={assignment.secId}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        style={{ padding: 10 }}
                        fullWidth
                        label="secNo"
                        name="secNo"
                        value={assignment.secNo}
                        InputProps={{ readOnly: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={editClose}>
                        Close
                    </Button>
                    <Button color="primary" onClick={onSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
>>>>>>> fb62db22fbe094540200ca828fb879a1f069c1bb

export default AssignmentUpdate;