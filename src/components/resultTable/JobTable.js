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
import {Tooltip} from "@material-ui/core";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';

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
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        { id: 'job_id', numeric: false, label: 'Job ID'}
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
            <IconButton
                color="inherit"
                onClick={()=>{
                    props.setResultStep(0)
                }}>
                <KeyboardArrowLeftIcon/>
            </IconButton>
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

export default function JobTable(props) {
    const {setResultStep, setJobData, jobData} = props

    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('job_id');
    const [filterCriteria, setFilterCriteria]= useState('')
    const [fetched, setFetched]= useState(false);
    const [result, setResult]= useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(()=>{
        //TODO: change to correct path
        fetch('/api/v2/job_batch/'+jobData.job_batch_id, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data.jobs)
            const array = []
            for(const value of data.jobs){
                array.push(value)
            }
            setResult(array)
            setFetched(true)
        });
    }, []);

    return (
        <div className={classes.root}>
            
            <ResultTableToolbar
                table= {"Job List / " + jobData.assignment_name}
                classes={classes}
                setFilterCriteria={setFilterCriteria}
                setResultStep={setResultStep}
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
                        />
                        <TableBody>
                            {stableSort(result, getComparator(order, orderBy))
                                .filter(e=>(e.job_id.toString().toLowerCase().includes(filterCriteria.toLowerCase())))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                            <TableRow
                                                hover
                                                style={{cursor:'pointer'}}
                                                tabIndex={-1}
                                                key={row.job_id}
                                            >
                                                <TableCell label={row.job_id}>
                                                    {row.job_id}
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
