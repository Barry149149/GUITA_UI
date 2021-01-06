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
                "widget":{
                    "type":"object",
                    "required":[
                        "value",
                        "type",
                    ],
                    "properties": {
                        "value":{
                            "type":"string",
                            "title":"Widget Value"
                        },
                        "type":{
                            "type":"string",
                            "title":"Widget Type"
                        }
                    }
                }
            }
        }
    },
    {
        command:"locateByWidgetName",
        schema: {
            "type":"object",
            "properties":{
                "widgetName":{
                    "type":"string",
                    "title":"Widget Name"
                },
                "setVariable":{
                    "type":"string",
                    "title":"set Variable"
                }
            }

        }
    },
    {
        command:"sleep",
        schema: {
            "type":"object",
            "properties":{
                "time":{
                    "type":"number",
                    "title":"Sleep Time"
                }
            }
        }
    },
    {
        command:"getText",
        schema: {
            "type": "object",
            "properties":{
                "widget":{
                    "type":"object",
                    "required":[
                        "value",
                        "type",
                    ],
                    "properties": {
                        "value":{
                            "type":"string",
                            "title":"Value"
                        },
                        "type":{
                            "type":"string",
                            "title":"Type"
                        }
                    }
                },
                "setVariable":{
                    "type":"string",
                    "title":"Set Variable"
                }
            }
        }
    },
    {
        command:"assertEqual",
        schema: {
            "type":"object",
            "properties":{
                "valueLhs":{
                    "type":"object",
                    "required":[
                        "value",
                        "type",
                    ],
                    "properties": {
                        "value":{
                            "type":"string",
                            "title":"value LHS Value"
                        },
                        "type":{
                            "type":"string",
                            "title":"value LHS Type"
                        }
                    }
                },
                "valueRhs":{
                    "type":"string",
                    "title":"value RHS"
                }
            }
        }
    },
    {
        command:"isVisible",
        schema: {
            "type": "object",
            "properties":{
                "widget":{
                    "type":"object",
                    "required":[
                        "value",
                        "type",
                    ],
                    "properties": {
                        "value":{
                            "type":"string",
                            "title":"Widget Value"
                        },
                        "type":{
                            "type":"string",
                            "title":"Widget Type"
                        }
                    }
                },
                "setVariable":{
                    "type":"string",
                    "title":"Set Variable"
                }
            }
        }
    },
    {
        command:"assert",
        schema: {
            "type": "object",
            "properties":{
                "value":{
                    "type":"object",
                    "required":[
                        "value",
                        "type",
                    ],
                    "properties": {
                        "value":{
                            "type":"string",
                            "title":"Widget Value"
                        },
                        "type":{
                            "type":"string",
                            "title":"Widget Type"
                        }
                    }
                }
            }
        }
    },
]

