import React, {useState} from 'react';
import MuiTreeView from 'material-ui-treeview';
import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box';

const styleSmallText={
    fontSize: 'small',
    color: 'gainsboro',
    lineHeight: 0.8,
}

export default function CaseTree(){

     const [tree,setTree] = useState([
        {
            value: 'Test Cases',
            nodes: [
                { value: 'Test 1' },
                { value: 'Test 2' }
            ],
        },
    ]);

    const [select,setSelect] = useState(0);

    const [createdCases,setCreatedCases] = useState(2);

    const [noOfCases,setNoOfCases] = useState(2)

    const handleLeafClick=e=>setSelect(e.value);

    return (
        <div>
            <Box>
                <Button
                    variant= 'outlined'
                    color= 'primary'
                    size= 'small'
                    onClick={()=>{
                        tree[0].nodes.push({value: 'Test ' + (createdCases+1)});
                        setTree(tree);
                        setCreatedCases(createdCases+1);
                        setNoOfCases(noOfCases+1)
                    }
                    }>Add</Button>
                <Button
                    variant= 'outlined'
                    color= 'primary'
                    size= 'small'
                    onClick={()=>{
                        for(let i=0; i < tree[0].nodes.length; i++) {

                            if(tree[0].nodes[i].value===select){
                                tree[0].nodes.splice(i,1);
                                i--;
                                setNoOfCases(noOfCases-1)
                            }
                        }
                    }}>
                    Delete
                </Button>
            </Box>

            <Box
                component="div"
                overflow="visible"
            >
            <MuiTreeView
                tree={tree}
                onLeafClick={handleLeafClick}
            />
            </Box>

            <p style={styleSmallText}>Selected Case is {select}</p>
            <p style={styleSmallText}>No. of Created Test Cases: {createdCases}</p>
            <p style={styleSmallText}>No. of Test Cases: {noOfCases}</p>


        </div>

    )
}