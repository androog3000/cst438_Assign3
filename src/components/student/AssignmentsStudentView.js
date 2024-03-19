import React, {useState, useEffect} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Button from '@mui/material/Button';
import {SERVER_URL} from '../../Constants';

// student views a list of assignments and assignment grades 
// use the URL  /assignments?studentId= &year= &semester=
// The REST api returns a list of SectionDTO objects
// Use a value of studentId=3 for now. Until login is implemented in assignment 7.

// display a table with columns  Course Id, Assignment Title, Assignment DueDate, Score

function AssignmentsStudentView(props){
    // variables and constants
    const headers = ['Course', 'Section', 'Assignment Title', 'Due Date', 'Score'];
    const [assignments, setAssignments] = useState([]);
    const [search, setSearch] = useState({studentId:'3', year:'', semester:''});
    const [message, setMessage] = useState('');

    // receive student assignments from database (i think)
    const fetchAssignments = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments?studentId=${search.studentId}&year=${search.year}&semester=${search.semester}`);
            if (response.ok) {
                const data = await response.json();
                setAssignments(data);
            } else {
                const json = await response.json();
                setMessage("response error: "+json.message);
            }
        } catch (err) {
            setMessage("network error: "+err);
        }
    }
    useEffect( () => {
        fetchAssignments();
    }, []);

    const editChange = (event) => {
        setSearch({...search,  [event.target.name]:event.target.value});
    }

    // return to display
    return(
        <> 
            <h3>Student Assignments</h3>
            <h4>{message}</h4>

            //prompt
            <h4>Enter year and semester. Example: 2024 Spring</h4>
            <table className="Center">
                <tbody>
                    <tr>
                        <td>Year:</td>
                        <td><input type="text" id="ayear" name="year" value={search.year} onChange={editChange} /></td>
                    </tr>
                    <tr>
                        <td>Semester:</td>
                        <td><input type="text" id="asemester" name="semester" value={search.semester} onChange={editChange} /></td>
                    </tr>
                </tbody>
            </table>
            <br/>

            <button type="submit" id="search" onClick={fetchAssignments} >Search for Assignments</button>
            <br/>
            <br/>

            {
            //student assignment table list
            //define "s" but with student assignments}
            }
            <table className="Center" >
                <thead>
                <tr>
                    {headers.map((a, idx) => (<th key={idx}>{a}</th>))}
                </tr>
                </thead>
                <tbody>
                {assignments.map((a) => (
                    <tr key={a.assignmentId}>
                        <td>{a.courseId}</td>
                        <td>{a.sectionId}</td>
                        <td>{a.title}</td>
                        <td>{a.dueDate}</td>
                        <td>{a.score}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}
export default AssignmentsStudentView;
