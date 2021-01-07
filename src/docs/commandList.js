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
                "command":{
                    "type":"string",
                    "default":"click",
                    "readOnly": true
                },
                "widget":{
                    "title":"",
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
                "command":{
                    "type":"string",
                    "default":"click",
                    "readOnly": true
                },
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
                "command":{
                    "type":"string",
                    "default":"sleep",
                    "readOnly": true
                },
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
                "command":{
                    "type":"string",
                    "default":"sleep",
                    "readOnly": true
                },
                "widget":{
                    "title":"",
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
                "command":{
                    "default":"assertEqual",
                    "type":"string",
                    "readOnly": true
                },
                "valueLhs":{
                    "title":"",
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
                "command":{
                    "type":"string",
                    "default":"isVisible",
                    "readOnly": true
                },
                "widget":{
                    "title":"",
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
                "command":{
                    "type":"string",
                    "default":"assert",
                    "readOnly": true
                },
                "value":{
                    "title":"",
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


