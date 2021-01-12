import {FormControl, MenuItem, Select} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import {commandList} from "../../docs/commandList";
import Form from "@rjsf/material-ui";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme)=>({
    formControl: {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(2.5),
        minWidth: 120,
    },
    form:{
        minHeight: 180,
        marginTop:0,
        width: 300,
    },
}));

export default function CommandForm(props){
    const classes = useStyles();

    useEffect(()=>{
        console.log(props.selectedCase.json_id);
    })

    return (

            <div>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Command
                </InputLabel>
                <Select
                    onChange={e=>{
                        //Should be update through this onChange
                        props.setCmdSchema({
                            ...props.cmdSchema,
                            command: e.target.value,
                            schema: commandList.find(x => x.command === e.target.value).schema,
                        });
                    }}
                    value={props.cmdSchema.command}
                >
                    {commandList.map(({index,command})=>{
                        return(
                            <MenuItem key={index} value={command}>
                                {command}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <div style={{paddingLeft:24,paddingRight:24,paddingBottom:24}}>
                <Form
                    classes={classes.form}
                    schema={props.cmdSchema.schema}
                    formData={props.formData}
                    onChange={(e)=>{
                        props.setFormData(e.formData)
                    }}
                    onSubmit={(e)=>{
                        if(props.cmdSchema.command==='None'){
                            return ;
                        }
                        props.setSelectedCase({
                            ...props.selectedCase,
                            json:[...props.selectedCase.json,e.formData],
                            json_id:[...props.selectedCase.json_id,{
                                id:(props.selectedCase.json.length+1),
                                command:e.formData
                            }]
                        })
                        let newNodes=[
                            ...props.tree[0].nodes,
                        ]
                        newNodes.find(x=>x.id===props.selectedCase.id).json=[...props.selectedCase.json,e.formData]
                        newNodes.find(x=>x.id===props.selectedCase.id).json_id=[
                            ...props.selectedCase.json_id,
                            {
                                id:(props.selectedCase.json.length+1),
                                command:e.formData
                            }
                        ]
                        props.setTree([
                            {
                                value: 'Test Cases',
                                nodes: newNodes
                            }
                        ])
                    }}
                />
            </div>
            </div>
    )
}