import React from 'react';
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
    if(orderBy === 'name'||orderBy ==='id'){
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }else if(orderBy === 'scoresSum'){
        if (b.scores.reduce((a,b)=>a+b)< a.scores.reduce((a,b)=>a+b)) {
            return -1;
        }
        if (b.scores.reduce((a,b)=>a+b)> a.scores.reduce((a,b)=>a+b)) {
            return 1;
        }
    }else{
        if (b.scores[orderBy-1] < a.scores[orderBy-1]) {
            return -1;
        }
        if (b.scores[orderBy-1] > a.scores[orderBy-1]) {
            return 1;
        }
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

    let headCell_tasks=[]

    for(let i=0;i<taskNumber;i++) {
        headCell_tasks.push({ id:(i+1),numeric: false, label:'Task '+(i+1)});
    }

    const headCells = [
        { id: 'name', numeric: false,  label: 'Student Name' },
        { id: 'id', numeric: false,  label: 'Student ID' },
        { id: 'scoresSum', numeric: false,  label: 'Total Score' },
        ...headCell_tasks,
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

const useStyles = makeStyles((theme) => ({
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
    const {classes,course,semester, assignment, setFilterCriteria}=props
    return(
        <Toolbar>
            <Typography className={classes.title}>{semester+"-"+course+"-"+assignment}</Typography>
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
    /*
    const [data, setData] = React.useState({
        "semester":props.resultData.semester,
        "courseName": props.resultData.courseName,
        "assignment": props.resultData.assignment,
        "taskNumber": props.resultData.taskNumber,
        "result":props.resultData.result,
    });
    */
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [filterCriteria, setFilterCriteria]=React.useState('')

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    React.useEffect(() => {
        console.log(props.resultData);
        console.log(filterCriteria);
    })

    return (
        <div className={classes.root}>
            <ResultTableToolbar
                course={props.resultData.courseName}
                semester={props.resultData.semester}
                assignment={props.resultData.assignment}
                classes={classes}
                setFilterCriteria={setFilterCriteria}
            />
            <TableContainer className={classes.container}>
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
                            {stableSort(props.resultData.result, getComparator(order, orderBy))
                                .filter(e=>(e.name.toLowerCase().includes(filterCriteria.toLowerCase())||e.id.toString().toLowerCase().includes(filterCriteria.toLowerCase())))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    let cell_taskScore=[]
                                    for(let i=0;i<row.scores.length;i++){
                                        cell_taskScore.push(<TableCell>{row.scores[i]}</TableCell>)
                                    }
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell id={labelId} >
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                {row.id}
                                            </TableCell>
                                            <TableCell>
                                                {row.scores.reduce((a,b)=>a+b)}
                                            </TableCell>
                                            {cell_taskScore}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
}
