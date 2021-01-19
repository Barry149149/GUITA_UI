import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { courseOption , dataCategories, dataOrders, dataProducts } from '../../../docs/data';
import {Select, MenuItem}from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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
        order: null,
        orders: dataOrders,
        products: dataProducts
    });

    const categoryChange = (event) => {
        console.log(state.products);
        console.log(state.orders);
        const category = event.target.value;
        const products = dataProducts.filter(product => product.categoryId === category.categoryId);
        console.log(state.products);
        setState({
            ...state,
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
            ...state,
            product: product,
            orders: orders,
            order: null
        });
    }

    const orderChange = (event) => {
        setState({ 
            ...state,
            order: event.target.value 
        });
    }

    const category = state.category;
    const product = state.product;
    const order = state.order;

    const hasCategory = category && category !== 'None';
    const hasProduct = product && product !== 'None';
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
                    {dataCategories.map(({index,value,label}) => {
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
                    {dataProducts.map(({index,value,label}) => {
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
                    Others
                </InputLabel>
                <Select
                    disabled={!hasProduct}
                    onChange={orderChange}
                    >
                    <InputLabel>
                        Orders
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {dataOrders.map(({index,value,label}) => {
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
