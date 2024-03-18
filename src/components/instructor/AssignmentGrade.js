import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../../Constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AssignmentGrade = (props) => {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/assignments/${props.assignmentId}/grades`);
            if (response.ok) {
                const data = await response.json();
                setGrades(data);
            } else {
                console.error('Error fetching grades');
            }
        } catch (err) {
            console.error('Network error:', err);
        }
    };

    const onChange = (event, gradeId) => {
        const updatedGrades = grades.map((grade) => {
            if (grade.gradeId === gradeId) {
                return { ...grade, score: event.target.value };
            }
            return grade;
        });
        setGrades(updatedGrades);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Grade ID</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Student Email</TableCell>
                        <TableCell>Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {grades.map((grade) => (
                        <TableRow key={grade.gradeId}>
                            <TableCell>{grade.gradeId}</TableCell>
                            <TableCell>{grade.studentName}</TableCell>
                            <TableCell>{grade.studentEmail}</TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    name="score"
                                    value={grade.score || ''}
                                    onChange={(e) => onChange(e, grade.gradeId)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AssignmentGrade;