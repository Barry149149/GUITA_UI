import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Box from "@material-ui/core/Box";
import UploadFiles from "../components/upload-files.component";
import Container from "@material-ui/core/Container";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) =>({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),

    },
}));

export default function JsonEditor(props){

    return (
        <React.Fragment >
        <JSONInput
            id     = 'a_unique_id'
            locale = { locale }
            width  = "100%"
            height = "100%"
            placeholder = {props.selectedCase.json}
            colors = {(props.style.darkTheme)?{
                    default: '#D4D4D4',
                    background: '#1E1E1E',
                    background_warning: '#1E1E1E',
                    string: '#CE8453',
                    number: '#B5CE9F',
                    colon: '#49B8F7',
                    keys: '#9CDCFE',
                    keys_whiteSpace: '#AF74A5',
                    primitive: '#6392C6'
                }:
                {
                    default: '#000000',
                    background: '#FFFFFF',
                    background_warning: '#FEECEB',
                    string: '#FA7921',
                    number: '#70CE35',
                    colon: '#49B8F7',
                    keys: '#59A5D8',
                    keys_whiteSpace: '#835FB6',
                    primitive: '#386FA4'
                }
            }
            style = {{
                body: {
                    fontSize: props.style.fontSize,
                    fontWeight: 800,
                }
            }}
            onChange = {(e)=>{
                if(!e.error) {
                    let new_json_id=[]
                    if(e.jsObject.length===undefined) {return}
                    for(let i=0;i<e.jsObject.length;i++) {
                        new_json_id.push({
                            id:(i+1),
                            command:e.jsObject[i]
                        })
                    }
                    props.setSelectedCase({
                        ...props.selectedCase,
                        json: e.jsObject,
                        json_id: new_json_id
                    })
                    let newNodes=[
                        ...props.tree[0].nodes,
                    ]
                    newNodes.find(x=>x.id===props.selectedCase.id).json=e.jsObject
                    newNodes.find(x=>x.id===props.selectedCase.id).json_id=new_json_id
                    props.setTree([
                        {
                            value: 'Test Cases',
                            nodes:newNodes,
                        }
                    ])
                }
            }
            }
        />
        <Box pt={2}>
            <Copyright />
        </Box>
    </React.Fragment>)

}