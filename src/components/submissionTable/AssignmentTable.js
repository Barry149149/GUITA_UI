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
import {Radio} from "@material-ui/core"

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

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        { id: 'assignment_id', numeric: false,  label: 'Assignment ID' },
        { id: 'assignment_name', numeric: false, label: 'Assignment Name'}
    ];

    return (
        <TableHead >
            <TableRow>
                <TableCell/>
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

function TableToolbar(props){
    const {classes,table, setFilterCriteria}=props

    return(
        <Toolbar>
            <Typography className={classes.title} color="primary" variant="h7" >{table}</Typography>
            <TextField
                label="Search"
                onChange={(e)=>{
                    setFilterCriteria(e.target.value)
                }
                }/>
        </Toolbar>
    )
}

export default function AssignmentTable(props) {
    const {jobBatch, setJobBatch} = props
    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('assignment_id');
    const [filterCriteria, setFilterCriteria]= useState('')
    const [fetched, setFetched]= useState(false)
    const [assignData, setAssignData]= useState([]);
    const [selected, setSelected]= useState('')

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(()=>{
        //TODO: change to correct path
        fetch('/api/v2/assignment', {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data)
            const array = []
            for(const value of data){
                array.push(value)
            }
            setAssignData(array)
            setFetched(true)
        });
    }, []);

    return (
        
        <div className={classes.root}>
            <TableToolbar
                table= "Assignments"
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
                        />
                        <TableBody>
                            {stableSort(assignData, getComparator(order, orderBy))
                                .filter(e=>(e.assignment_id.toString().toLowerCase().includes(filterCriteria.toLowerCase())))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.assignment_id}
                                        >
                                            <TableCell>
                                                <Radio
                                                    color='primary'
                                                    checked={selected===row.assignment_id}
                                                    onChange={(e)=>{
                                                        setSelected(row.assignment_id)
                                                        setJobBatch({
                                                            ...jobBatch,
                                                            assignment_id: row.assignment_id,
                                                            assignment_name: row.assignment_name
                                                        })
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {row.assignment_id}
                                            </TableCell>
                                            <TableCell>
                                                {row.assignment_name}
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