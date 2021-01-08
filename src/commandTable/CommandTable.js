import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Row from "./TableRow";
import Table from "@material-ui/core/Table";
import React from "react";
import Paper from '@material-ui/core/Paper';

export default function CommandTable(props){
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left"> Command </TableCell>
                        <TableCell align="center"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.selectedCase.json.map(row=>(
                        <Row key={row.command} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}