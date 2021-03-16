import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { classes, order, orderBy, taskNumber, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    /*let headCell_tasks=[]

    for(let i=0;i<taskNumber;i++) {
        headCell_tasks.push({ id:(i+1),numeric: false, label:'Task '+(i+1)});
    }*/

    const headCells = [
        // { id: 'name', numeric: false,  label: 'Student Name' },
        // { id: 'id', numeric: false,  label: 'Student ID' },
        // { id: 'scoresSum', numeric: false,  label: 'Total Score' },
        { id: 'job_batch_id', numeric: false,  label: 'Job Batch ID' },
        { id: 'assignment_name', numeric: false, label: 'Assignment Name'},
        { id: 'created_at', numeric: false, label: 'Created At'},
        { id: 'job_config_name', numeric: false, label: 'Job Config Name'},
        { id: 'zip_filename', numeric: false, label: 'Submission Batch'}
    ];

    return (
        <TableHead >
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        padding: '10px',
    },
    table: {
        minWidth: 450,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    title: {
        flex: '1 1 100%',
    },
    container: {
        maxHeight: 650,
    },
}));

function ResultTableToolbar(props){
    const {classes,table, setFilterCriteria}=props

    return(
        <Toolbar>
            <Typography className={classes.title} color="primary" variant="h6" >{table}</Typography>
            <TextField
                label="Search"
                onChange={(e)=>{
                    setFilterCriteria(e.target.value)
                }
                }/>
        </Toolbar>
    )
}

export default function ResultTable(props) {
    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('jobBatchId');
    const [filterCriteria, setFilterCriteria]= useState('')
    const [table, setTable] = useState('');
    const [fetched, setFetched]= useState(false);
    const [result, setResult]= useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(()=>{
        //TODO: change to correct path
        fetch('/api/v2/job_batch?assignment=true&job_config=true&submission_batch=true', {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data)
            const array = []
            for(const value of data){
                array.push(value)
            }
            setResult(array)
            setFetched(true)
        });
    }, []);

    return (
        <div className={classes.root}>
            <ResultTableToolbar
                table= "Job Batch List"
                classes={classes}
                setFilterCriteria={setFilterCriteria}
            />
            <TableContainer className={classes.container}>
                {(fetched)?
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                        stickyHeader
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            taskNumber={props.resultData.taskNumber}
                        />
                        <TableBody>
                            {stableSort(result, getComparator(order, orderBy))
                                .filter(e=>(e.job_batch_id.toString().toLowerCase().includes(filterCriteria.toLowerCase())))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    /*
                                    let cell_taskScore=[]
                                    for(let i=0;i<row.reports.length;i++){
                                        cell_taskScore.push(<TableCell>{row.reports[i].status}</TableCell>)
                                    }*/
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.job_batch_id}
                                        >
                                            <TableCell id={labelId} >
                                                {row.job_batch_id}
                                            </TableCell>
                                            <TableCell>
                                                {row.assignment.assignment_name}
                                            </TableCell>
                                            <TableCell>
                                                {row.created_at}
                                            </TableCell>
                                            <TableCell>
                                                {row.job_config.job_config_name}
                                            </TableCell>
                                            <TableCell>
                                                {row.submission_batch.zip_filename}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                :null} 
                </TableContainer>
        </div>
    );
}
