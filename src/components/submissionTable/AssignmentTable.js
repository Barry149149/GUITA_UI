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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useForm} from "react-hook-form";
import {PlaylistAdd} from "@material-ui/icons";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from 'react-router-dom';


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
    editButton:{
        maxWidth:30,
        height:20
    }
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
        { id: 'assignment_name', numeric: false, label: 'Assignment Name'},
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
                <TableCell align="left">
                    Configuration
                </TableCell>
                <TableCell/>
            </TableRow>
        </TableHead>
    );
}

function TableToolbar(props){
    const {classes,table, setFilterCriteria, setFetched}=props
    const { register, handleSubmit } = useForm();
    const [createAssignment, setCreateAssignment] = useState(false);

    const handleCreateAssignmentOpen=()=>{
        setCreateAssignment(true);
    }
    const handleCreateAssignmentCancelClose=()=>{
        setCreateAssignment(false);
    }
    const handleCreateAssignmentClose=()=>{
        setCreateAssignment(false);
        setFetched(false);
    }

    const handleCreateAssignment=(data)=>{
        fetch('/api/v2/assignment', {
            method: 'POST',
            body: JSON.stringify({"assignment_name": data.assignmentName}),
            headers: {
              'content-type': 'application/json'
            }
          }).then(result => console.log(result)).catch(error => console.log(error));
        handleCreateAssignmentClose();
    }

    return(
        <Toolbar>
            <Typography className={classes.title} color="primary" variant="h6" >{table}</Typography>
            <Button
                onClick={handleCreateAssignmentOpen}>
                <PlaylistAdd/>
            </Button>
            <Dialog open={createAssignment}>
                <DialogTitle>Create Assignment</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Enter assignment name.
                </DialogContentText>
                <form onSubmit={handleSubmit(handleCreateAssignment)}>
                    <input name="assignmentName" ref={register({ required: true })} />
                </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCreateAssignmentCancelClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(handleCreateAssignment)} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </Toolbar>
    )
}

export default function AssignmentTable(props) {
    const {
        jobBatch,
        setJobBatch,
        setSelectedAssignment,
        setSelectedAssignmentName,
        setSelectedJobConfigName,
        setSelectedJobConfig,
        selectedConfig,
        setSelectedConfig,
        assignData,
        setAssignData,
        configData,
        setConfigData
    } = props
    const classes = useStyles();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('assignment_id');
    const [filterCriteria, setFilterCriteria] = useState('')
    const [fetched, setFetched] = useState(false)

    const [selected, setSelected] = useState('')
    const [testcases, setTestcases] = useState({
        assignment_id: [],
        testcase: []

    })



    //this one is for temp use


    const {register, handleSubmit} = useForm();
    const [createJobConfig, setCreateJobConfig] = useState(false);

    const [open, setOpen] = useState({
        id: -1,
        anchor: null
    })

    const handleOpenClick = (event, id) => {
        setOpen({
            id: id,
            anchor: event.currentTarget
        })
    }
    const handleEditClick = (event, id, name) => {
        setSelectedAssignment(id);
        setSelectedAssignmentName(name);
        handleCloseClick(event, id);
    }

    const handleCloseClick = () => {
        setOpen({
            ...open,
            id: -1
        })
    }

    const handleCreateJobConfigOpen = () => {
        setCreateJobConfig(true);
    }
    const handleCreateJobConfigCancelClose = () => {
        setCreateJobConfig(false);
    }
    const handleCreateJobConfigClose = () => {
        setCreateJobConfig(false);
        setFetched(false);
    }

    const handleCreateJobConfig = (data) => {
        fetch('/api/v2/job_config', {
            method: 'POST',
            body: JSON.stringify({"job_config_name": data.jobConfigName}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(result => console.log(result)).catch(error => console.log(error));
        handleCreateJobConfigClose();
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleCellClick = (assignment_id) => {
        console.log(assignment_id);
        setSelectedAssignment(assignment_id);
    }

    useEffect(() => {
        //TODO: change to correct path
        const url = '/api/v2/assignment';

        fetch('/api/v2/assignment', {
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            setAssignData(data)
            let emptyConfig = [];
            for (let i = 0; i < data.length; i++) {
                emptyConfig.push({
                    id: -1,
                    name: ""
                })
            }
            setSelectedConfig([...emptyConfig])
            
            return fetch('/api/v2/job_config', {
                headers: {
                    'content-type': 'application/json'
                }
            });
        })
        .then(response => response.json()).then(data => {
            const array = []
            for (const value of data) {
                array.push(value)
            }
            setConfigData(array)
            setFetched(true)
        });

    }, [fetched]);

    return (

        <div className={classes.root}>
            <TableToolbar
                table="Assignments"
                classes={classes}
                setFilterCriteria={setFilterCriteria}
                setFetched={setFetched}
            />

            <TableContainer className={classes.container}>
                {(fetched) ?
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
                                .filter(e => (e.assignment_id.toString().toLowerCase().includes(filterCriteria.toLowerCase())))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    let cell_testcase = [];
                                    cell_testcase.push(
                                        <TableCell>
                                            <Button
                                                id='button_commandSave'
                                                color='primary'
                                                component={Link}
                                                path={'/testcase'}
                                                onClick={(e) => {
                                                    handleCellClick(row.assignment_id)
                                                }}>
                                                <AddCircleOutlineIcon/>
                                            </Button>
                                        </TableCell>)
                                    /*
                            if(testcases[row.assignment_id-1].length){
                                cell_testcase.push(
                                    <TableCell>Total: {testcases.testcase[testcases.assignment_id.indexOf(row.assignment_id)]}</TableCell>
                                    )
                            } else {
                            cell_testcase.push(
                            <TableCell>
                            <Button
                                id='button_commandSave'
                                variant= 'outlined'
                                color= 'primary'
                                onClick={() => {

                                }}>
                                    Create New Test Cases
                                </Button>
                                </TableCell>)
                            }*/
                                    const isItemOpened = (open.id === row.assignment_id)
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.assignment_id}
                                        >
                                            <TableCell>
                                                <Radio
                                                    color='primary'
                                                    checked={selected === row.assignment_id}
                                                    onChange={(e) => {
                                                        setSelectedAssignment(row.assignment_id)
                                                        setSelected(row.assignment_id)
                                                        setJobBatch({
                                                            ...jobBatch,
                                                            assignment_id: row.assignment_id,
                                                            assignment_name: row.assignment_name,
                                                            job_config_id: selectedConfig[index].id
                                                        })
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {row.assignment_name}
                                            </TableCell>
                                            <TableCell>
                                                <FormControl>
                                                    <Select
                                                        native
                                                        value={(typeof selectedConfig[index].id === 'undefined' || !selectedConfig[index].id) ? 0 : selectedConfig[index].id}
                                                        onChange={(event, property) => {
                                                            if (event.target.value < -1) {
                                                                handleCreateJobConfigOpen()
                                                            } else {

                                                                const entry = index;
                                                                let newSelectedConfig = [...selectedConfig];
                                                                newSelectedConfig[entry] = {
                                                                    id: event.target.value,
                                                                    name: (event.target.value != -1) ? configData.find(x => x.job_config_id == event.target.value).job_config_name : ''
                                                                }
                                                                setSelectedConfig([...newSelectedConfig])

                                                                if (jobBatch.assignment_id === row.assignment_id) {
                                                                    setJobBatch({
                                                                        ...jobBatch,
                                                                        job_config_id: event.target.value,
                                                                        job_config_name: (event.target.value != -1) ? configData.find(x => x.job_config_id == event.target.value).job_config_name : ""
                                                                    })
                                                                }
                                                                setSelectedJobConfig(event.target.value);
                                                            }
                                                        }}
                                                    >
                                                        <option aria-label="None" value={-1}/>
                                                        {configData.map((row, index) => {
                                                            return (
                                                                <option key={row.job_config_id}
                                                                        value={row.job_config_id}>{row.job_config_name}</option>
                                                            )
                                                        })}
                                                        <Divider/>
                                                        <option aria-label="Create New Config" value={-2}>Create new
                                                            Config
                                                        </option>
                                                    </Select>
                                                    <Button
                                                        component={Link}
                                                        path={'/config/'+selectedConfig[index].id+'/'+selectedConfig[index].name}
                                                        onClick={() => {
                                                            setSelectedJobConfigName(selectedConfig[index].name)
                                                            props.setLastEditedJobConfig({id:selectedConfig[index].id, name:selectedConfig[index].name})
                                                        }}
                                                        className={classes.editButton}
                                                        disabled={selectedConfig[index].id === -1}>
                                                        <Typography variant="h8" color='primary'>Edit</Typography>
                                                    </Button>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    onClick={(e) => {
                                                        handleOpenClick(e, row.assignment_id)
                                                    }}
                                                >
                                                    <MoreVertIcon/>
                                                </IconButton>
                                                <Menu
                                                    open={isItemOpened}
                                                    keepMounted
                                                    anchorEl={open.anchor}
                                                    onClose={(e) => handleCloseClick(e, row.assignment_id)}
                                                >
                                                    <MenuItem
                                                        onClick={(e) => handleEditClick(e, row.assignment_id, row.assignment_name)}
                                                        component={Link}
                                                        to={'/testcase/' +row.assignment_id+'/'+ row.assignment_name}
                                                    >
                                                        Edit Test
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={(e) => handleCloseClick(e, row.assignment_id)}>Submit</MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    : null}
            </TableContainer>
            <Dialog open={createJobConfig}>
                <DialogTitle>Create Job Config</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Job Config name.
                    </DialogContentText>
                    <form onSubmit={handleSubmit(handleCreateJobConfig)}>
                        <input name="jobConfigName" ref={register({required: true})}/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateJobConfigCancelClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit(handleCreateJobConfig)} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}