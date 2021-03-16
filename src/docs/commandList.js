const valTypeStruct=(title)=> {
    return ({
        "title": "",
        "type": "object",
        "required": [
            "value",
            "type",
        ],
        "properties": {
            "value": {
                "type": "string",
                "title": title+" Value"
            },
            "type": {
                "type": "string",
                "title": title+" Type"
            }
        }
    })
}

const stringStruct=(title)=>{
    return({
        "title":title,
        "type":"string"
    })
}

const intStruct=(title)=>{
    return({
        "title":title,
        "type":"number"
    })
}

export const commandList=[
    {
        command:"None",
        schema: {
            "type":"object",
        }
    },
    {
        command:"click",
        schema: {
            "type": "object",
            "properties":{
                "widget":valTypeStruct("widget"),
                "description":stringStruct("Description"),
            }
        }
    },
    {
        command:"locateByWidgetName",
        schema: {
            "type":"object",
            "required":[
              "widgetName",
              "setVariable",
            ],
            "properties":{
                "widgetName":stringStruct("Widget Name"),
                "setVariable":stringStruct("set Variable"),
                "description":stringStruct("Description"),
            }

        }
    },
    {
        command:"sleep",
        schema: {
            "type":"object",
            "required":[
                "time"
            ],
            "properties":{
                "time":intStruct("Sleep Time"),
                "description":stringStruct("Description"),
            }
        }
    },
    {
        command:"getText",
        schema: {
            "type": "object",
            "required":[
                "widget",
                "setVariable",
            ],
            "properties":{
                "widget":valTypeStruct("widget"),
                "setVariable":stringStruct("set Variable"),
                "description":stringStruct("Description"),
            }
        }
    },
    {
        command:"assertEqual",
        schema: {
            "type":"object",
            "required":[
                "valueRhs",

            ],
            "properties":{
                "valueLhs":valTypeStruct("Value Lhs"),
                "valueRhs":stringStruct("Value Rhs"),
                "description":stringStruct("Description"),
            }
        }
    },
    {
        command:"isVisible",
        schema: {
            "type": "object",
            "required":[
                "widget",
                "setVariable",
            ],
            "properties":{
                "widget":valTypeStruct("widget"),
                "setVariable":stringStruct("set Variable"),
                "description":stringStruct("Description"),
            }
        }
    },
    {
        command:"assert",
        schema: {
            "type": "object",
            "properties":{
                "value":valTypeStruct("Asserted Value"),
                "description":stringStruct("Description"),
            }
        }
    },
]