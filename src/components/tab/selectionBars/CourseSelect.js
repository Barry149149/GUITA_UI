import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { dataYear, dataCategories, dataOrders, dataProducts } from '../../../docs/data';
import {Select, MenuItem} from '@material-ui/core';

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
        year: null,
        category: null,
        product: null,
        categories: dataCategories,
        orders: dataOrders,
        products: dataProducts,
    });

    const yearChange = (event) => {
        if(event.target.value){
            let year = event.target.value;
            let categories = dataCategories.filter(category =>
                category.yearId ===
                dataYear.find(x=>x.value===year).yearId);
            console.log(categories);
            setState({
                ...state,
                year: year,
                categories: categories,
                category: null,
            });
        }
    }

    const categoryChange = (event) => {
        if(event.target.value){
            let category = event.target.value;
            let products = dataProducts.filter(product =>
                product.categoryId ===
                dataCategories.find(x=>x.value===category).categoryId);
            console.log(products);
            setState({
                ...state,
                category: category,
                products: products,
                product: null,
            });
        }
    }

    const productChange = (event) => {
        if(event.target.value){
            let product = event.target.value;
            let orders = dataOrders.filter(order =>
                order.productId ===
                dataProducts.find(x=>x.value===product).productId);
            console.log(orders);
            setState({
                ...state,
                product: event.target.value,
                orders: orders,
            });

        }
    }

    const year = state.year;

    const category = state.category;

    const hasYear = year && year !== 'None';
    
    const hasCategory = category && category !== 'None';

    return(
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Years
                </InputLabel>
                <Select
                    onChange={yearChange}
                    >
                    <InputLabel>
                        Years
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {dataYear.map(({index,value,label,yearId}) => {
                        return (
                            <MenuItem key={label} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Courses
                </InputLabel>
                <Select
                    disabled={!hasYear}
                    onChange={categoryChange}
                    >
                    <InputLabel>
                        Categories
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {state.categories.map(({index,value,label,categoryId}) => {
                        return (
                            <MenuItem key={label} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
            </FormControl>
            <br/>
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
                    {state.products.map(({index,value,label,productId}) => {
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
