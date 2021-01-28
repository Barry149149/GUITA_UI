import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { resultSample } from '../../../docs/data';
import {Select, MenuItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import ResultRequest from '../../resultTable/ResultRequest';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    }
}));


export default function CourseSelect(props) {
    const classes = useStyles();

    const [semester, setSemester] = useState(null);
    const [filterSemesterList, setFilterSemesterList] = useState([]);
    const [course, setCourse] = useState(null);
    const [courseOption, setCourseOption] = useState([]);
    const [filterCourseList, setFilterCourseList] = useState([]);
    const [assignment, setAssignment] = useState(null);
    const [filterResult, setFilterResult] = useState([]);
    const [assignmentOption, setAssignmentOption] = useState([]);

    const handleSemesterChange = (event) => {
        console.log(event.target.value);
        if(event.target.value){
            let semester = event.target.value;
            const filterSemesterList = resultSample.filter(result => 
                result.semester === semester);
            console.log(filterSemesterList);
            const courseOption = Array.from(new Set(filterSemesterList.map(result => result.courseName)));
                console.log(courseOption);

            setSemester(semester);
            setFilterSemesterList(filterSemesterList);
            setCourseOption(courseOption);
        } else {
            setSemester(null);
            setCourse(null);
            setAssignment(null);
        }
    };

    const handleCourseChange = (event) => {
        console.log(semester);
        console.log(filterSemesterList);
        if(event.target.value){
            let course = event.target.value;
            const filterCourseList = filterSemesterList.filter(result =>
                result.courseName === course);
            console.log(filterCourseList);
            const assignmentOption = Array.from(new Set(filterCourseList.map(result => result.assignment)));
            console.log(assignmentOption);

            setCourse(course);
            setFilterCourseList(filterCourseList);
            setAssignmentOption(assignmentOption);
        } else {
            setCourse(null);
            setAssignment(null);
        }

    };

    const handleAssignmentChange = (event) => {
        if(event.target.value){
            let assignment = event.target.value;
            const filterResult = filterCourseList.filter(result =>
                result.assignment === assignment);

            console.log(filterResult);

            setAssignment(assignment);
            setFilterResult(filterResult);
        } else {
            setAssignment(null);
        }
    }

    const handleResultShow=()=>{
        props.setResultData({
            ...props.resultData,
            semester: filterResult[0].semester,
            courseName: filterResult[0].courseName,
            assignment: filterResult[0].assignment,
            taskNumber: filterResult[0].taskNumber,
            result: filterResult[0].result,
        })
    }

    React.useEffect(() => {
    })

    const semesterOption = Array.from(new Set(resultSample.map(result => result.semester)));

    const hasSemester = semester && semester !== null;

    const hasCourse = course && course !== null;

    const hasAssignment = assignment && assignment !== null;

    return(
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Semesters
                </InputLabel>
                <Select
                    onChange={handleSemesterChange}
                    >
                    <InputLabel>
                        Semesters
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {semesterOption.map((semester) => {
                        return (
                            <MenuItem key={semester} value={semester}>
                                {semester}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <FormHelperText>Select Semester</FormHelperText>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Courses
                </InputLabel>
                <Select
                    disabled={!hasSemester}
                    onChange={handleCourseChange}
                    >
                    <InputLabel>
                        Courses
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {courseOption.map((courseName) => {
                        return (
                            <MenuItem key={courseName} value={courseName}>
                                {courseName}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <FormHelperText>Select Course</FormHelperText>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Assignments
                </InputLabel>
                <Select
                    disabled={!hasCourse}
                    onChange={handleAssignmentChange}
                    >
                    <InputLabel>
                        Assignments
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {assignmentOption.map((assignment) => {
                        return (
                            <MenuItem key={assignment} value={assignment}>
                                {assignment}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <FormHelperText>Select Assignment</FormHelperText>
            </FormControl>
            <br/>
            <Button 
                className={classes.button}
                variant= 'outlined'
                component='label'
                color= 'primary'
                disabled={!hasAssignment}
                onClick={handleResultShow}    
            >
                Show
            </Button>
        </React.Fragment>
    )
}
