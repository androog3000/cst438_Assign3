import React, {useState } from 'react';
import {Link} from 'react-router-dom';

const InstructorHome = () => {

    const [term, setTerm] = useState({year:'', semester:''});
    const [message, setMessage] = useState("");

    const onChange = (event) => {
    setTerm({...term, [event.target.name]:event.target.value});
    }

    const validateSemester = (e) => {
        if(term.year===""){
            setMessage("What year?")
            e.preventDefault();
        }
        if(term.semester===""){
            setMessage("What semester?")
            e.preventDefault();
        }
    }

    return (
        <>
            <h4>{message}</h4>
            <table className="Center">
            <tbody>
            <tr>
                <td>Year:</td>
                <td><input type="text" id="year" name="year" value={term.year} onChange={onChange} /></td>
            </tr>
            <tr>
                <td>Semester:</td>
                <td><input type="text" id="semester" name="semester" value={term.semester} onChange={onChange} /></td>
            </tr>
            </tbody>
            </table>
            <Link to='/sections' state={term} onClick={validateSemester}>Show Sections</Link>
        </>
    )
};

export default InstructorHome;
