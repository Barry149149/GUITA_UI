import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {resultSample} from "../../../docs/resultSample";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

/*function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const headCells = [
        { id: 'job_batch_id', numeric: false, label: "Job Batch ID"},
        { id: 'assignment_name', numeric: false, label: 'Assignment Name'},
        { id: 'created_at', numeric: false, label: 'Submitted At'},
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
}*/

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
    }
}));

function ReportTableToolbar(props){
    const {classes,table, result}=props

    return(
        <Toolbar>
            <Typography className={classes.title} color="primary" variant="h6" >{table}</Typography>
            <Typography variant="h7" >{result.summary.score+"/"+result.summary.maxScore}</Typography>
        </Toolbar>
    )
}

export default function ReportTable(props) {

    const classes = useStyles();

    const [fetched, setFetched] = useState(true);
    const [result, setResult] = useState(resultSample);
    const [open, setOpen] = useState([])

    const handleOpenClick = (event, id) => {
        const openedIndex = open.indexOf(id);
        let newSelected = [];

        if (openedIndex === -1) {
            newSelected = newSelected.concat(open, id);
        } else if (openedIndex === 0) {
            newSelected = newSelected.concat(open.slice(1));
        } else if (openedIndex === open.length - 1) {
            newSelected = newSelected.concat(open.slice(0, -1));
        } else if (openedIndex > 0) {
            newSelected = newSelected.concat(
                open.slice(0, openedIndex),
                open.slice(openedIndex + 1),
            );
        }
        setOpen(newSelected);
    }

    const openAll = () => {
        let newSelected = []
        if (open.length > 0) {
            setOpen([]);
            return
        }
        for (let i = 0; i < result.breakdown.length; i++) {
            newSelected.push(i + 1)
        }
        setOpen(newSelected)
    }

    const isOpen = (id) => open.indexOf(id) !== -1;

    return (
        <div className={classes.root}>
            <ReportTableToolbar
                table="ResultTable"
                classes={classes}
                result={result}
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
                        <TableHead>
                            <TableCell>Command ID</TableCell>
                            <TableCell>Command</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell align="right">
                                <IconButton id="button_expandRow" size="small"
                                            onClick={(e) => openAll()}>
                                    {(result.breakdown.length > 0 && result.breakdown.length === open.length) ?
                                        <KeyboardArrowUpIcon/> :
                                        <KeyboardArrowDownIcon/>}
                                </IconButton>
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {result.breakdown.map((row, index) => {
                                const isItemOpened = isOpen(row.commandId)

                                return (
                                    <React.Fragment>
                                        <TableRow
                                            hover
                                            style={{cursor: 'pointer'}}
                                            tabIndex={-1}
                                            key={row.commandId}

                                        >
                                            <TableCell>
                                                {row.commandId}
                                            </TableCell>
                                            <TableCell>
                                                {row.command}
                                            </TableCell>
                                            <TableCell>
                                                {row.score + "/" + row.maxScore}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton id="button_expandRow" size="small"
                                                            onClick={(e) => handleOpenClick(e, row.commandId)}>
                                                    {isItemOpened ? <KeyboardArrowUpIcon/> :
                                                        <KeyboardArrowDownIcon/>}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                                                <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
                                                    <Box margin={1}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            Detail:
                                                        </Typography>
                                                        {(row.parameters) ?
                                                            <React.Fragment>
                                                                <Typography variant="h8" gutterBottom component="div">
                                                                    Parameters:
                                                                </Typography>
                                                                <Box border={1}
                                                                     borderColor="grey.500"
                                                                     style={{
                                                                         minHeight: 60,
                                                                         width: '100%',
                                                                     }}>
                                                                    <pre style={{textAlign: 'left', padding:5 ,'white-space': 'pre-wrap'}}>
                                                                    {JSON.stringify(row.parameters, null, 2)}
                                                                    </pre>
                                                                </Box>
                                                                <Divider/>
                                                            </React.Fragment>
                                                            : null
                                                        }
                                                        {(row.driver) ?
                                                            <React.Fragment>
                                                                <Typography variant="h8" gutterBottom component="div">
                                                                    Driver: {row.driver}
                                                                </Typography>
                                                                <Divider/>
                                                            </React.Fragment>
                                                            : null
                                                        }
                                                        {(row.setVariable) ?
                                                            <React.Fragment>
                                                                <Typography variant="h8" gutterBottom component="div">
                                                                    setVariable: {row.setVariable}
                                                                </Typography>
                                                                <Divider/>
                                                            </React.Fragment>
                                                            : null
                                                        }
                                                        {(row.result) ?
                                                            <React.Fragment>
                                                                <Typography variant="h8" gutterBottom component="div">
                                                                    result:
                                                                </Typography>
                                                                <Box border={1} borderColor="grey.500"
                                                                     style={{
                                                                         minHeight: 60,
                                                                         width: '100%',
                                                                     }}>
                                                                    <pre style={{textAlign: 'left', padding:5 ,'white-space': 'pre-wrap'}}>
                                                                    {JSON.stringify(row.result, null, 2)}
                                                                    </pre>
                                                                </Box>
                                                                <Divider/>
                                                            </React.Fragment>
                                                            : null
                                                        }
                                                        {(row.errors.length) ?
                                                            <React.Fragment>
                                                                <Typography variant="h8" gutterBottom component="div">
                                                                    errors:
                                                                </Typography>
                                                                <Box border={1} borderColor="grey.500"
                                                                     style={{
                                                                         minHeight: 60,
                                                                         width: '100%',
                                                                     }}>
                                                                    <pre style={{textAlign: 'left', padding:5 ,'white-space': 'pre-wrap'}}>
                                                                    {JSON.stringify(row.errors, null, 2)}
                                                                    </pre>
                                                                </Box>
                                                                <Divider/>
                                                            </React.Fragment>
                                                            : null
                                                        }
                                                        {(row.screenshotPath) ?
                                                            <React.Fragment>
                                                                <Typography variant="h8" gutterBottom component="div">
                                                                    Screenshot Path: {row.screenshotPath}
                                                                </Typography>
                                                                <Divider/>
                                                            </React.Fragment>
                                                            : null
                                                        }
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                    : null}
            </TableContainer>
        </div>
    );
}
