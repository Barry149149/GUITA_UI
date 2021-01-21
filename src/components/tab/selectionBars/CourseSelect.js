import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { dataCategories, dataOrders, dataProducts } from '../../../docs/data';
import {Select, MenuItem}from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function CourseSelect(props) {
    const classes = useStyles();

    const [state, setState] = useState({
        category: null,
        product: null,
        orders: dataOrders,
        products: dataProducts
    });

    const categoryChange = (event) => {
        if(event.target.value){
            let category = event.target.value;
            let products = dataProducts.filter(product =>
                product.categoryId ===
                dataCategories.find(x=>x.value===category).categoryId);
            setState({
                ...state,
                category: category,
                products: products,
                product: null,
            });
        }
    }

    const productChange = (event) => {
        setState({
            ...state,
            product: event.target.value,
        });
    }

    const category = state.category;

    const hasCategory = category && category !== 'None';

    return(
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Courses
                </InputLabel>
                <Select
                    onChange={categoryChange}
                    >
                    <InputLabel>
                        Categories
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {dataCategories.map(({index,value,label,categoryId}) => {
                        return (
                            <MenuItem key={label} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Assignments
                </InputLabel>
                <Select
                    disabled={!hasCategory}
                    onChange={productChange}
                    >
                    <InputLabel>
                        Products
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {state.products.map(({index,value,label}) => {
                        return (
                            <MenuItem key={label} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
            </FormControl>
        </React.Fragment>
    )
}
