import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import React, {useState, useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

export default function CommandTable(props){

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

    useEffect(() => {
        console.log(selected)
    })

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const isOpen = (id) =>open.indexOf(id) !== -1;

        return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="30"/>
                        <TableCell align="left"> Command </TableCell>
                        <TableCell align="center"/>
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
                                            onChange={(event) => handleRowClick(event, row.id)}
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