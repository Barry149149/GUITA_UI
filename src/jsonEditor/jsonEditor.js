import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import Box from "@material-ui/core/Box";
import UploadFiles from "../components/upload-files.component";
import Container from "@material-ui/core/Container";
import React from "react";
import {makeStyles} from "@material-ui/core/Styles";
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
    const classes = useStyles();
    return (
        <Container className={classes.container}>
        <JSONInput
            id     = 'a_unique_id'
            locale = { locale }
            width  = "100%"
            height = "550px"
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
                    props.selectedCase.json = e.jsObject;
                }
            }
            }
        />
        <Box pt={2}>
            <Copyright />
        </Box>
        <Box pt={4}>
            <UploadFiles />
        </Box>
    </Container>)
}