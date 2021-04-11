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
            return 'Click on '+command.widget.value.toString().toUpperCase()+" that in type "+command.widget.type.toString().toUpperCase()
        case"locateByWidgetName":
            return 'Locate '+command.widgetName.toString().toUpperCase()+' and set as '+command.setVariable.toString().toUpperCase()
        case"sleep":
            return 'Sleep for '+command.time+'ms'
        case"getText":
            return 'Get text from '+command.widget.value.toString().toUpperCase()+' in type '+command.widget.type.toString().toUpperCase()+' and assigned to '+command.setVariable.toString().toUpperCase()
        case"assertEqual":
            return 'Check if '+command.valueLhs.value.toString().toUpperCase()+' in type '+command.valueLhs.type.toString().toUpperCase()+' is equal to '+command.valueRhs.toString().toUpperCase()
        case"isVisible":
            return 'Check if '+command.widget.value.toString().toUpperCase()+' in type '+command.widget.type.toString().toUpperCase()+' is Visible and assigned to '+command.setVariable.toString().toUpperCase()
        case"assert":
            return 'Assert '+command.value.value.toString().toUpperCase()+' in type '+command.value.type.toString().toUpperCase()
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