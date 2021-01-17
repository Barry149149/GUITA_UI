import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { courseOption , dataCategories, dataOrders, dataProducts } from '../../../docs/data';
import {Select, MenuItem}from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const defaultItemCategory = { categoryName: 'Select Category' };
const defaultItemProduct = { productName: 'Select Product' };
const defaultItemOrder = { orderName: 'Select Order' };


export default function CourseSelect(props) {
    const classes = useStyles();

    const [state, setState] = useState({
        category: null,
        product: null,
        order: null,
        orders: dataOrders,
        products: dataProducts
    });

    const categoryChange = (event) => {
        const category = event.target.value;
        const products = dataProducts.filter(product => product.categoryId === category.categoryId);

        setState({
            category: category,
            products: products,
            product: null,
            order: null
        });
    }

    const productChange = (event) => {
        const product = event.target.value;
        const orders = dataOrders.filter(order => order.productId === product.productId);

        setState({
            product: product,
            orders: orders,
            order: null
        });
    }

    const orderChange = (event) => {
        setState({ order: event.target.value });
    }

    const category = state.category;
    const product = state.product;
    const order = state.order;

    const hasCategory = category && category !== defaultItemCategory;
    const hasProduct = product && product !== defaultItemProduct;
    /*
    const classes = useStyles();

    const [course, setCourse] = useState(null);
    const [assign, setAssign] = useState(null);
    const [assignList, setAssignList] = useState([]);

    // handle change event of the country dropdown
    const handleCourseChange = (obj) => {
        console.log(obj);
        setCourse(obj);
        setAssignList(obj.assignments);
        setAssign(null);
    };

    // handle change event of the language dropdown
    const handleAssignChange = (obj) => {
        setAssign(obj);
    };

    // generate the link when both dropdowns are selected
    useEffect(() => {
        if (course && assign) {
            
        }
        }, [course, assign]);
        */

    return(
        <div>
            
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Course
                </InputLabel>
                <Select
                    onChange={categoryChange}
                    defaultItem={defaultItemCategory}
                    >
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {dataCategories.map(({index,value,label,id}) => {
                        return (
                            <MenuItem key={index} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <Select
                    disabled={!hasCategory}
                    onChange={productChange}
                    defaultItem={defaultItemProduct}
                    >
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {dataProducts.map(({index,value,label,id1, id2}) => {
                        return (
                            <MenuItem key={index} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
                <Select
                    disabled={!hasProduct}
                    onChange={orderChange}
                    defaultItem={defaultItemOrder}>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {dataOrders.map(({index,value,label,id1, id2}) => {
                        return (
                            <MenuItem key={index} value={value}>
                                {label}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
            </FormControl>
        </div>
    )
}
