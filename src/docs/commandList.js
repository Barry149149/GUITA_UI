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
                "widget":valTypeStruct("widget")
            }
        }
    },
    {
        command:"locateByWidgetName",
        schema: {
            "type":"object",
            "properties":{
                "widgetName":stringStruct("Widget Name"),
                "setVariable":stringStruct("set Variable")
            }

        }
    },
    {
        command:"sleep",
        schema: {
            "type":"object",
            "properties":{
                "time":intStruct("Sleep Time")
            }
        }
    },
    {
        command:"getText",
        schema: {
            "type": "object",
            "properties":{
                "widget":valTypeStruct("widget"),
                "setVariable":stringStruct("set Variable")
            }
        }
    },
    {
        command:"assertEqual",
        schema: {
            "type":"object",
            "properties":{
                "valueLhs":valTypeStruct("Value Lhs"),
                "valueRhs":stringStruct("Value Rhs")
            }
        }
    },
    {
        command:"isVisible",
        schema: {
            "type": "object",
            "properties":{
                "widget":valTypeStruct("widget"),
                "setVariable":stringStruct("set Variable")
            }
        }
    },
    {
        command:"assert",
        schema: {
            "type": "object",
            "properties":{
                "value":valTypeStruct("Asserted Value")
            }
        }
    },
]