import React, {useState} from 'react';
import MuiTreeView from 'material-ui-treeview';
import Button from '@material-ui/core/Button';



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

    const [numcases,setNumCases]= useState(2);

    const handleLeafClick=e=>setSelect(e.value);

    return (
        <div>
            <p>Selected Case is {select}</p>
            <p>No. of Test Cases: {numcases}</p>
            <MuiTreeView
                tree={tree}
                onLeafClick={handleLeafClick}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={()=>{
                    tree[0].nodes.push({value: 'Test ' + (tree[0].nodes.length+1)});
                    setTree(tree);
                    setNumCases(numcases+1);
                }
            }>Add</Button>
        </div>
    )
}