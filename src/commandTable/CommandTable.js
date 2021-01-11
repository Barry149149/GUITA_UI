import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import React, {useState, useEffect} from "react";
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import {lighten, makeStyles} from "@material-ui/core/Styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import {PlaylistAdd} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export default function CommandTable(props){

    const classes = useStyles();

    const [selected,setSelected]=useState([])
    const [open,setOpen]=useState([])

    const handleRowClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    }

    const handleOpenClick=(event, id)=>{
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

    const deleteSelected=()=>{
        let newJsonId=[], newJson=[]
        for(let i=0; i <props.selectedCase.json_id.length;i++) {
            if(selected.indexOf(props.selectedCase.json_id[i].id)===-1) {
                newJsonId.push(props.selectedCase.json_id[i])
                newJson.push(props.selectedCase.json[i])
            }
        }
        props.setSelectedCase({
            ...props.selectedCase,
            json:newJson,
            json_id:newJsonId
        })
    }

    useEffect(() => {
        console.log(selected)
    })

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const isOpen = (id) =>open.indexOf(id) !== -1;
    const numSelected = selected.length;

        return (
        <Paper>
            <Toolbar  className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}>
                {(numSelected >0)?(
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>):
                    (<Typography className={classes.title}>
                    Command Table
                    </Typography>)
                }
                {!(numSelected > 0) ?(
                    <Tooltip title="Add">
                        <Grow in={!(props.formOpen||numSelected >0)}>
                            <Button onClick={() => {
                                props.setFormOpen(true)
                            }}>
                                <PlaylistAdd/>
                            </Button>
                        </Grow>
                    </Tooltip>
                    ):(
                    <Tooltip title="Delete">
                        <Button onClick={deleteSelected}>
                            <DeleteIcon/>
                        </Button>
                    </Tooltip>
                )
                }
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="checkbox"/>
                        <TableCell align="left"> Command </TableCell>
                        <TableCell align="Right" />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.selectedCase.json_id.map((row, index) => {
                        const isItemOpened = isOpen(row.id)
                        const isItemSelected = isSelected(row.id);

                        return (
                            <React.Fragment>
                                <TableRow
                                    hover
                                    key={row.id}
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => {
                                                props.setFormOpen(false)
                                                handleRowClick(event, row.id)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {row.command.command}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="expand row" size="small" onClick={(e) => handleOpenClick(e,row.id)}>
                                            {isItemOpened ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                                        <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Typography variant="h8" gutterBottom component="div">
                                                    Detail
                                                </Typography>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            {(row.command.widgetName === undefined) ? null :
                                                                <TableCell>WidgetName</TableCell>}
                                                            {(row.command.widget === undefined) ? null :
                                                                <TableCell>Widget</TableCell>}
                                                            {(row.command.setVariable === undefined) ? null :
                                                                <TableCell>SetVariable</TableCell>}
                                                            {(row.command.valueLhs === undefined) ? null :
                                                                <TableCell>ValueLhs</TableCell>}
                                                            {(row.command.valueRhs === undefined) ? null :
                                                                <TableCell>ValueRhs</TableCell>}
                                                            {(row.command.time === undefined) ? null :
                                                                <TableCell>Time</TableCell>}
                                                            {(row.command.value === undefined) ? null :
                                                                <TableCell>Value</TableCell>}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            {(row.command.widgetName === undefined) ? null :
                                                                <TableCell component="th"
                                                                           scope="row">{row.command.widgetName}</TableCell>}
                                                            {(row.command.widget === undefined) ? null :
                                                                <TableCell>{"Type:" + row.command.widget.type + " Value:" + row.command.widget.value}</TableCell>}
                                                            {(row.command.setVariable === undefined) ? null :
                                                                <TableCell>{row.command.setVariable}</TableCell>}
                                                            {(row.command.valueLhs === undefined) ? null :
                                                                <TableCell>{"Type: " + row.command.valueLhs.type + ", Value:" + row.command.valueLhs.value}</TableCell>}
                                                            {(row.command.valueRhs === undefined) ? null :
                                                                <TableCell>{row.command.valueRhs}</TableCell>}
                                                            {(row.command.time === undefined) ? null :
                                                                <TableCell>{row.command.time}</TableCell>}
                                                            {(row.command.value === undefined) ? null :
                                                                <TableCell><p>{"Type: " + row.command.value.type}</p>
                                                                    <p>{"Value:" + row.command.value.value}</p>
                                                                </TableCell>}
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        );
                    })}
                    <TableRow>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    )
}

/*const DraggableComponent = (id, index) => (props) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <TableRow
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}

                    {...props}
                >
                    {props.children}
                </TableRow>
            )}
        </Draggable>
    )
}

const DroppableComponent = (
    onDragEnd: (result, provided) => void) => (props) =>
{
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'1'} direction="vertical">
                {(provided) => {
                    return (
                        <TableBody ref={provided.innerRef} {...provided.droppableProps} {...props}>
                            {props.children}
                            {provided.placeholder}
                        </TableBody>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
}*/