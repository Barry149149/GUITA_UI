import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { resultSample, dataYear, dataCategories, dataOrders, dataProducts } from '../../../docs/data';
import {Select, MenuItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ResultRequest from '../../resultTable/ResultRequest';

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
        taskNumber: null,
        categories: dataCategories,
        orders: dataOrders,
        products: dataProducts,
    });

    const [semester, setSemester] = useState(null);
    const [course, setCourse] = useState(null);
    const [courseList, setCourseList] = useState([]);
    const [assignment, setAssignment] = useState(null);
    const [assignmentList, setAssignmentList] = useState([]);

    const handleSemesterChange = (event) => {
    };

    const yearChange = (event) => {
        if(event.target.value){
            let year = event.target.value;
            let categories = dataCategories.filter(category =>
                category.yearId ===
                dataYear.find(x=>x.value===year).yearId);
            setState({
                ...state,
                year: year,
                categories: categories,
                category: null,
                product:null,
            });
        }
    }

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
        if(event.target.value){
            let product = event.target.value;
            let orders = dataOrders.filter(order =>
                order.productId ===
                dataProducts.find(x=>x.value===product).productId);
            let taskNumber = dataProducts.find(x=>x.value===product).taskNumber;
            setState({
                ...state,
                product: event.target.value,
                taskNumber: taskNumber,
                orders: orders,
            });
        }
    }

    const handleShow=()=>{
        let result = [];
        for( const i in state.orders){
            result.push({
                name: state.orders[i].value,
                id: state.orders[i].id,
                scores: state.orders[i].scores,
            })
        };
        props.setResultData({
            ...props.resultData,
            year: state.year,
            course: state.category,
            assignment: state.product,
            taskNumber: state.taskNumber,
            result: result,
        })
    }

    React.useEffect(() => {
        console.log(semesterOption);
    })

    const semesterOption = Array.from(new Set(resultSample.map(result => result.semester)));

    const year = state.year;

    const category = state.category;
    
    const product = state.product;

    const hasYear = year && year !== 'None';
    
    const hasCategory = category && category !== 'None';

    const hasProduct = product && product !== 'None';

    return(
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    TestSemesters
                </InputLabel>
                <Select
                    onChange={handleSemesterChange}
                    >
                    <InputLabel>
                        TestSemesters
                    </InputLabel>
                    <MenuItem key="" value="">
                        <em>None</em>
                    </MenuItem>
                    {semesterOption.map((semester) => {
                        return (
                            <MenuItem key={semester} value={semester}>
                                {semester}
                            </MenuItem>
                        )
                    })
                    }
                </Select>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
                <InputLabel>
                    Semesters
                </InputLabel>
                <Select
                    onChange={yearChange}
                    >
                    <InputLabel>
                        Semesters
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
                        Courses
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
                        Assignments
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
            <br/>
            <Button 
                variant= 'outlined'
                component='label'
                color= 'primary'
                disabled={!hasProduct}
                onClick={handleShow}    
            >
                Show
            </Button>
            <br/>
            <ResultRequest/>
        </React.Fragment>
    )
}
