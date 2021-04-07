
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
import {Radio, TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {PlaylistAdd} from "@material-ui/icons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useForm} from "react-hook-form";

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
        { id: 'job_config_id', numeric: false,  label: 'Job Config ID' },
        { id: 'job_config_name', numeric: false, label: 'Job Config Name'},
        { id: 'created_at', numeric: false, label: 'Created at'}
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
    const {classes,table, setFilterCriteria, setFetched}=props
    const { register, handleSubmit } = useForm();
    const [createJobConfig, setCreateJobConfig] = useState(false);

    const handleCreateJobConfigOpen=()=>{
        setCreateJobConfig(true);
    }
    const handleCreateJobConfigClose=()=>{
        setCreateJobConfig(false);
        setFetched(false);
    }

    const handleCreateJobConfig=(data)=>{
        fetch('/api/v2/job_config',{
            method: 'POST',
            body: JSON.stringify({"job_config_name": data.jobConfigName}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(result => console.log(result)).catch(error => console.log(error));
        handleCreateJobConfigClose();
    }

    return(
        <Toolbar>
            <Typography className={classes.title} color="primary" variant="h7" >{table}</Typography>
            <Button
                onClick={()=>{
                    props.setDrawerValue(2);
                }}>
                    <PlaylistAdd/>
            </Button>
            <Dialog open={createJobConfig} onClose={handleCreateJobConfigClose}>
                <DialogTitle>Create Job Config</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Enter config name.
                </DialogContentText>
                <form onSubmit={handleSubmit(handleCreateJobConfig)}>
                    <input name="jobConfigName" ref={register({ required: true })} />
                </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCreateJobConfigClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(handleCreateJobConfig)} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog> 
            <TextField
                label="Search"
                onChange={(e)=>{
                    setFilterCriteria(e.target.value)
                }
                }/>
        </Toolbar>
    )
}

export default function JobConfigTable(props) {
    const {jobBatch, setJobBatch, drawerValue, setDrawerValue, handleDrawerChange}=props

    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('job_config_id');
    const [filterCriteria, setFilterCriteria]= useState('')
    const [fetched, setFetched]= useState(false)
    const [configData, setConfigData]= useState([]);
    const [selected,setSelected]=useState('')

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(()=>{
        //TODO: change to correct path
        fetch('/api/v2/job_config', {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            console.log(data)
            const array = []
            for(const value of data){
                array.push(value)
            }
            setConfigData(array)
            setFetched(true)
        });
    }, []);

    return (
        <div className={classes.root}>
            <TableToolbar
                table= "Job Configurations"
                classes={classes}
                setFilterCriteria={setFilterCriteria}
                setFetched={setFetched}
                drawerValue={drawerValue}
                setDrawerValue={setDrawerValue}
                handleDrawerChange={handleDrawerChange}
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
                            {stableSort(configData, getComparator(order, orderBy))
                                .filter(e=>(e.job_config_id.toString().toLowerCase().includes(filterCriteria.toLowerCase())))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.job_config_id}
                                        >
                                            <TableCell>
                                                <Radio
                                                    color='primary'
                                                    checked={selected===row.job_config_id}
                                                    onChange={(e)=>{
                                                        setSelected(row.job_config_id)
                                                        setJobBatch({
                                                            ...jobBatch,
                                                            job_config_id: row.job_config_id,
                                                            job_config_name: row.job_config_name
                                                        })
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {row.job_config_id}
                                            </TableCell>
                                            <TableCell>
                                                {row.job_config_name}
                                            </TableCell>
                                            <TableCell>
                                                {row.created_at}
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