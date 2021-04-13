const valTypeStruct = (title) => {
  return {
    title: '',
    type: 'object',
    required: ['value', 'type'],
    properties: {
      value: {
        type: 'string',
        title: title + ' Value'
      },
      type: {
        type: 'string',
        title: title + ' Type'
      }
    }
  }
}

const stringStruct = (title) => {
  return {
    title: title,
    type: 'string'
  }
}

const intStruct = (title) => {
  return {
    title: title,
    type: 'number'
  }
}

const arrayStruct = (title) => {
  return {
    title: title,
    type: 'array',
    items: {
      type: 'string'
    }
  }
}

const arrayStructInt = (title) => {
  return {
    title: title,
    type: 'array',
    items: {
      type: 'number'
    }
  }
}

const driverStruct = (title) => {
  return {
    title: title,
    type: 'string',
    enum: [null, 'CV', 'DOM'],
    default: 'DOM'
  }
}

export const commandDescription = (command) => {
  try {
    switch (command.command) {
      case 'click':
        return (
          'Click on ' +
          command.widget.value.toString().toUpperCase() +
          ' that in type ' +
          command.widget.type.toString().toUpperCase()
        )
      case 'locateByWidgetName':
        return (
          'Locate Name ' +
          command.widgetName.toString().toUpperCase() +
          ' and set as ' +
          command.setVariable.toString().toUpperCase()
        )
      case 'locateByWidgetText':
        return (
          'Locate Text ' +
          command.widgetName.toString().toUpperCase() +
          ' and set as ' +
          command.setVariable.toString().toUpperCase()
        )
      case 'locateByWidgetClass':
        return (
          'Locate Class ' +
          command.widgetName.toString().toUpperCase() +
          ' {Value: ' +
          command.widget.value.toString().toUpperCase() +
          ', Type: ' +
          command.widget.type.toString().toUpperCase() +
          ' }' +
          ' and set as ' +
          command.setVariable.toString().toUpperCase()
        )
      case 'sleep':
        return 'Sleep for ' + command.time + 'ms'
      case 'getText':
        return (
          'Get text from ' +
          command.widget.value.toString().toUpperCase() +
          ' in type ' +
          command.widget.type.toString().toUpperCase() +
          ' and assigned to ' +
          command.setVariable.toString().toUpperCase()
        )
      case 'assertEqual':
        return (
          'Check if ' +
          command.valueLhs.value.toString().toUpperCase() +
          ' in type ' +
          command.valueLhs.type.toString().toUpperCase() +
          ' is equal to ' +
          command.valueRhs.toString().toUpperCase()
        )
      case 'assertImageSimilar':
        return (
          'Check if ' +
          command.widget.value.toString().toUpperCase() +
          ' in type ' +
          command.widget.type.toString().toUpperCase() +
          ' is equal to ' +
          command.expected.toString().toUpperCase()
        )
      case 'isVisible':
        return (
          'Check if ' +
          command.widget.value.toString().toUpperCase() +
          ' in type ' +
          command.widget.type.toString().toUpperCase() +
          ' is Visible and assigned to ' +
          command.setVariable.toString().toUpperCase()
        )
      case 'assert':
        return (
          'Assert ' +
          command.value.value.toString().toUpperCase() +
          ' in type ' +
          command.value.type.toString().toUpperCase()
        )
      case 'typeHotkeys':
        return 'Press Key ' + command.key.toString().toUpperCase()
      case 'typeText':
        return 'Input Text: ' + command.text
    }
  } catch (e) {
    return 'Command incomplete'
  }
}

export const commandList = [
  {
    command: 'None',
    schema: {
      type: 'object'
    }
  },
  {
    command: 'assert',
    schema: {
      type: 'object',
      properties: {
        weight: intStruct('Weight'),
        value: valTypeStruct('Asserted Value'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'assertEqual',
    schema: {
      type: 'object',
      required: ['valueRhs'],
      properties: {
        weight: intStruct('Weight'),
        valueLhs: valTypeStruct('Value Lhs'),
        valueRhs: stringStruct('Value Rhs'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'assertImageSimilar',
    schema: {
      type: 'object',
      required: ['widget', 'expected'],
      properties: {
        weight: intStruct('Weight'),
        widget: valTypeStruct('Widget'),
        expected: stringStruct('Path to expected image')
      }
    }
  },
  {
    command: 'click',
    schema: {
      type: 'object',
      properties: {
        weight: intStruct('Weight'),
        driver: driverStruct('Driver'),
        widget: valTypeStruct('Widget'),
        offsetByRatio: arrayStructInt('Offset'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'getText',
    schema: {
      type: 'object',
      required: ['widget', 'setVariable'],
      properties: {
        weight: intStruct('Weight'),
        widget: valTypeStruct('Widget'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'isVisible',
    schema: {
      type: 'object',
      required: ['widget', 'setVariable'],
      properties: {
        weight: intStruct('Weight'),
        widget: valTypeStruct('Widget'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'locateByWidgetClass',
    schema: {
      type: 'object',
      required: ['widgetName', 'setVariable'],
      properties: {
        weight: intStruct('Weight'),
        widgetName: stringStruct('Widget Name'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'locateByWidgetName',
    schema: {
      type: 'object',
      required: ['widgetName', 'setVariable'],
      properties: {
        weight: intStruct('Weight'),
        widgetName: stringStruct('Widget Name'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'locateByWidgetText',
    schema: {
      type: 'object',
      required: ['widgetName', 'setVariable'],
      properties: {
        weight: intStruct('Weight'),
        driver: driverStruct('Driver'),
        widgetName: stringStruct('Widget Name'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'sleep',
    schema: {
      type: 'object',
      required: ['time'],
      properties: {
        time: intStruct('Sleep Time'),
        description: stringStruct('Description')
      }
    }
  },
  {
    command: 'typeHotkeys',
    schema: {
      type: 'object',
      required: ['keys'],
      properties: {
        weight: intStruct('Weight'),
        keys: arrayStruct('The text to type')
      }
    }
  },
  {
    command: 'typeText',
    schema: {
      type: 'object',
      required: ['text'],
      properties: {
        weight: intStruct('Weight'),
        text: stringStruct('The text to type')
      }
    }
  }
]
