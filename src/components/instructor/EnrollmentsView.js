import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {SERVER_URL} from "../../Constants";

// instructor view list of students enrolled in a section 
// use location to get section no passed from InstructorSectionsView
// fetch the enrollments using URL /sections/{secNo}/enrollments
// display table with columns
//   'enrollment id', 'student id', 'name', 'email', 'grade'
//  grade column is an input field
//  hint:  <input type="text" name="grade" value={e.grade} onChange={onGradeChange} />

const EnrollmentsView = (props) => {

    const location = useLocation();
    const {secNo, courseId, secId} = location.state;

    const [enrollments, setEnrollments] = useState([]);
    const headers = ['Enrollment ID', 'Student ID', 'Name', 'Email', 'Grade'];
    const [message, setMessage] = useState('');

    const fetchEnrollments = async () =>{
        try{
            const response = await fetch(`${SERVER_URL}/sections/${secNo}/enrollments`);
            if (response.ok){
                const enrollments = await response.json();
                setEnrollments(enrollments);
            }else{
                const json = await response.json();
                setMessage("Response error: "+json);
            }
        } catch (err){
            setMessage('Network Error: ' +err);
        }
    }

    const onGradeChange = async (enrollment) =>{
        try{
            const response = await fetch(`${SERVER_URL}/enrollments`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(enrollment)
                });
            if(response.ok){
                await fetchEnrollments();
            } else {
                const reply = await response.json();
                setMessage('Grade save error: ' + reply);
            }
        } catch (err){
            setMessage('Networking error: '+err);
        }
    }

    useEffect(() =>{
        fetchEnrollments();
    },[]);

    return(
        <> 
            <h3>Assignments</h3>
            <h4>{message}</h4>
            <table className={'Center'}>
                <thead>
                <tr>
                    {headers.map((h, idx) => <th key={idx}>{h}</th>)}
                </tr>
                </thead>
                <tbody>
                {enrollments.map((e) =>
                    <tr key={e.enrollmentId}>
                        <td>{e.enrollmentId}</td>
                        <td>{e.studentId}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td><input type={'text'} name={'grade'} value={e.grade} onChange={onGradeChange}/> </td>
                    </tr>

                )};
                </tbody>
            </table>
        </>
    );
}

export default EnrollmentsView;
