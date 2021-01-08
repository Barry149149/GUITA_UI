import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/Styles";

const useStyles = makeStyles((theme) => ({
    table:{
        '& > *': {
            borderBottom: 'unset',
            backgroundColor: '#FFFFFF',
            borderRadius: 0,
            padding: '0 30px',
            tableLayout: 'fixed'
        },
    },
    })
);

export default function Row(props){
    const {row} =props;
    const [open ,setOpen] = useState(false);
    const classes = useStyles();

    return(
        <React.Fragment className={classes.table}>
            <TableRow >
                <TableCell component="th" scope="row"  align="left">
                    {row.command}
                </TableCell>
                <TableCell align="right">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom:0 ,paddingTop:0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h8" gutterBottom component="div">
                                Detail
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {(row.widgetName===undefined)?null:<TableCell>WidgetName</TableCell>}
                                        {(row.widget===undefined)?null:<TableCell>Widget</TableCell>}
                                        {(row.setVariable===undefined)?null:<TableCell>SetVariable</TableCell>}
                                        {(row.valueLhs===undefined)?null:<TableCell>ValueLhs</TableCell>}
                                        {(row.valueRhs===undefined)?null:<TableCell>ValueRhs</TableCell>}
                                        {(row.time===undefined)?null:<TableCell>Time</TableCell>}
                                        {(row.value===undefined)?null:<TableCell>Value</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {(row.widgetName===undefined)?null:<TableCell component="th" scope="row">{row.widgetName}</TableCell>}
                                        {(row.widget===undefined)?null:<TableCell>{"Type:"+row.widget.type +" Value:"+row.widget.value}</TableCell>}
                                        {(row.setVariable===undefined)?null:<TableCell>{row.setVariable}</TableCell>}
                                        {(row.valueLhs===undefined)?null:<TableCell>{"Type: "+row.valueLhs.type+", Value:"+row.valueLhs.value}</TableCell>}
                                        {(row.valueRhs===undefined)?null:<TableCell>{row.valueRhs}</TableCell>}
                                        {(row.time===undefined)?null:<TableCell>{row.time}</TableCell>}
                                        {(row.value===undefined)?null:<TableCell><p>{"Type: "+row.value.type}</p><p>{"Value:"+row.value.value}</p></TableCell>}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )

}
