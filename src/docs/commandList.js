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

export const commandDescription=(command)=>{
    try{
     switch (command.command){
        case"click":
            return 'Click on '+command.widget.value+" that in type "+command.widget.type
        case"locateByWidgetName":
            return 'Locate '+command.widgetName+' and set as '+command.setVariable
        case"sleep":
            return 'Sleep for '+command.time+'ms'
        case"getText":
            if(command.widget.value||command.widget.type||command.setVariable)
            return 'Get text from '+command.widget.value+' in type '+command.widget.type+' and assigned to '+command.setVariable
        case"assertEqual":
            return 'Check if '+command.valueLhs.value+' in type '+command.valueLhs.type+' is equal to '+command.valueRhs
        case"isVisible":
            return 'Check if '+command.widget.value+' in type '+command.widget.type+' is Visible and assigned to '+command.setVariable
        case"assert":
            return 'Assert '+command.value.value+' in type '+command.value.type
    }
    }catch(e){
        return 'Command incomplete'
    }

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