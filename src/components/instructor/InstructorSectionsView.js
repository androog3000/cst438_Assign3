import React, {useState, useEffect} from 'react';
import SectionUpdate from "../admin/SectionUpdate";
import Button from "@mui/material/Button";
import SectionAdd from "../admin/SectionAdd";
import {SERVER_URL} from "../../Constants";
import {Link} from "react-router-dom";

// instructor views a list of sections they are teaching 
// use the URL /sections?email=dwisneski@csumb.edu&year= &semester=
// the email= will be removed in assignment 7 login security
// The REST api returns a list of SectionDTO objects
// The table of sections contains columns
//   section no, course id, section id, building, room, times and links to assignments and enrollments
// hint:  
// <Link to="/enrollments" state={section}>View Enrollments</Link>
// <Link to="/assignments" state={section}>View Assignments</Link>

const InstructorSectionsView = (props) => {

    const headers = ['SecNo', 'CourseId', 'SecId', 'Building', 'Room', 'Times', '', ''];

    const [sections, setSections] = useState([]);

    const [message, setMessage] = useState('');

    const fetchSections = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/sections?email=dwisneski@csumb.edu&year= &semester= `);
            if (response.ok) {
                const data = await response.json();
                setSections(data);
            } else {
                const rc = await response.json();
                setMessage(rc.message);
            }
        } catch(err) {
            setMessage("network error: "+err);
        }
    }

    return(
        <div>
            <h3>Sections</h3>

            <h4>{message}</h4>
            <h4>Your current sections</h4>
            <table className="Center" >
                <thead>
                <tr>
                    {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                </tr>
                </thead>
                <tbody>
                {sections.map((s) => (
                    <tr key={s.secNo}>
                        <td>{s.secNo}</td>
                        <td>{s.courseId}</td>
                        <td>{s.secId}</td>
                        <td>{s.building}</td>
                        <td>{s.room}</td>
                        <td>{s.times}</td>
                        <td><Link to="/enrollments" state={s}>View Enrollments</Link></td>
                        <td><Link to="/assignments" state={s}>View Assignments</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <SectionAdd  onClose={fetchSections} />
        </div>
    );
}

export default InstructorSectionsView;

