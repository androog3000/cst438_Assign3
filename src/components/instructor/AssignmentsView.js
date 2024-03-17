import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import {useLocation} from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'
import {confirmAlert} from "react-confirm-alert";
import AssignmentUpdate from "./AssignmentUpdate";
import {SERVER_URL} from "../../Constants";


// instructor views assignments for their section
// use location to get the section value 
// 
// GET assignments using the URL /sections/{secNo}/assignments
// returns a list of AssignmentDTOs
// display a table with columns 
// assignment id, title, dueDate and buttons to grade, edit, delete each assignment

const AssignmentsView = (props) => {

    const location = useLocation();
    const {secNo, courseId, secId} = location.state;
    /*
    const [assignments, setAssignments] = useState([
        {assignmentId: '9' , title: 'Assignment 1', dueDate: '2023-5-08'},
        {assignmentId: '10' , title: 'Assignment 2', dueDate: '2023-5-09'},
        {assignmentId: '1' , title: 'Assignment 3', dueDate: '2023-5-10',}]
    );*/
    const [assignments, setAssignments] = useState([]);
    const headers = ['Assignment ID', 'Title', 'Due Date', '', ''];
    const [message, setMessage] = useState('');
    const fetchAssignments = async () =>{
        try{
            const response = await fetch(`${SERVER_URL}/sections/8/assignments`);
            if (response.ok){
                const assignments = await response.json()
                setAssignments(assignments);
            } else {
                const json = await response.json();
                setMessage('Response error: '+json);
            }
        } catch(err) {
            setMessage('Network Error: ' +err);
        }
    }

    useEffect( () =>{
        fetchAssignments();
    }, []);

    const deleteAlert = (event) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Do you really want to delete',
            buttons:[
                {
                    label: 'Yes',
                    onClick: () => doDelete(event)
                },
        {
            label: 'No',
        }
            ]
        })
    }

    const doDelete= (event) => {
        const row_index =event.target.parentNode.parentNode.rowIndex -1;
        deleteAssignment(assignments[row_index].id);

    }

    const deleteAssignment = async (assignmentId) =>{
        try {
            const response = await fetch (`${SERVER_URL}/assignments/${assignmentId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            if(response.ok) {
                setMessage('Assignment deleted');
                fetchAssignments();
            } else {
                const rc = await response.json();
                setMessage('Deleted failed: ' + rc.message);
            }
        } catch (err) {
            setMessage('Network error: ' + err);
        }
    }

    /*const onSave= (assignment) => {
        const assignmentsCopy = assignments.map((a) =>(a.assignmentId===assignment.assignmentId) ? assignment : a);
        setAssignments(assignmentsCopy);
    }*/

    const onSave = async (assignment) =>{
        try {
            const response = await fetch(`${SERVER_URL}/assignments`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(assignment),
                });
            if (response.ok){
                setMessage('Assignment added');
                fetchAssignments();
            } else {
                const rc = await response.json();
                setMessage('Save error: ' + rc.message);
            }
        } catch(err) {
            setMessage('Network error: ' + err);
        }
    }
     
    return(
        <>
            <h3>Assignments</h3>
            <h4>{message}</h4>
            <table className = 'Center'>
                <thead>
                <tr>
                    {headers.map((h,idx) => <th key={idx}>{h} </th>)}
                </tr>
                </thead>
                <tbody>
                {assignments.map((a) =>
                    <tr key={a.id}>
                        <td>{a.id}</td>
                        <td>{a.title}</td>
                        <td>{a.dueDate}</td>
                        <td><AssignmentUpdate assignment={a} save={onSave} /></td>
                        <td><Button onClick={deleteAlert}>Delete</Button></td>
                    </tr>
                )}
                </tbody>
            </table>
            Add an assignment
        </>
    );
}

export default AssignmentsView;
