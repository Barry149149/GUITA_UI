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

const WeightStruct = {
  title: 'Weight',
  type: 'number',
  default: 1
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

export const TOKEN_TYPE = {
  VARIABLE: 'variable',
  NORMAL: 'normal',
  STUB: 'stub' // For formatting UNKNOWN
}

export function getCommandDescription(command) {
  const parseAssertImageSimilar = (command) => {
    return [
      ['Assert', TOKEN_TYPE.NORMAL],
      [command.widget.value, TOKEN_TYPE.VARIABLE],
      ['looks similar to', TOKEN_TYPE.NORMAL],
      [command.expected, TOKEN_TYPE.VARIABLE]
    ]
  }

  const parseClick = (command) => {
    return [
      ['Click on', TOKEN_TYPE.NORMAL],
      [command.widget.value, TOKEN_TYPE.VARIABLE]
    ]
  }

  const parseLocateByWidgetProperty = (command, property) => {
    const propertyString =
      property === 'text' ? `"${command.widgetName}"` : command.widgetName
    return [
      [`Locate widget with ${property}`, TOKEN_TYPE.NORMAL],
      [propertyString, TOKEN_TYPE.VARIABLE],
      ['then assign result to', TOKEN_TYPE.NORMAL],
      [command.setVariable, TOKEN_TYPE.VARIABLE]
    ]
  }

  const parseSleep = (command) => {
    return [
      ['Sleep for', TOKEN_TYPE.NORMAL],
      [command.time, TOKEN_TYPE.VARIABLE],
      ['second(s)', TOKEN_TYPE.NORMAL]
    ]
  }

  const parseTypeHotKeys = (command) => {
    return [
      ['Press', TOKEN_TYPE.NORMAL],
      [command.keys.join(' + '), TOKEN_TYPE.VARIABLE]
    ]
  }

  const parseUnknown = (_) => {
    return [
      ['No default description', TOKEN_TYPE.STUB]
      // ["/", TOKEN_TYPE.STUB]
    ]
  }

  const get_parse_func = (commandName) => {
    const parserMap = {
      assertImageSimilar: parseAssertImageSimilar,
      click: parseClick,
      locateByWidgetClass: (command) =>
        parseLocateByWidgetProperty(command, 'class'),
      locateByWidgetName: (command) =>
        parseLocateByWidgetProperty(command, 'ID'),
      locateByWidgetText: (command) =>
        parseLocateByWidgetProperty(command, 'text'),
      sleep: parseSleep,
      typeHotkeys: parseTypeHotKeys
    }
    const parser = parserMap[commandName]
    return parser ? parser : parseUnknown
  }

  const parse_func = get_parse_func(command.command)
  const stringAndFormatList: Array = parse_func(command)
  return {
    stringAndFormatList: stringAndFormatList,
    plainText: stringAndFormatList.map(([string, _]) => string).join(' ')
  }
}

export const commandSchema = {
  // {
  //   command: 'None',
  //   schema: {
  //     type: 'object'
  //   }
  // },
  assert: {
    command: 'assert',
    schema: {
      type: 'object',
      properties: {
        weight: WeightStruct,
        value: valTypeStruct('Asserted Value'),
        description: stringStruct('Description')
      }
    }
  },
  assertEqual: {
    command: 'assertEqual',
    schema: {
      type: 'object',
      required: ['valueRhs'],
      properties: {
        weight: WeightStruct,
        valueLhs: valTypeStruct('Value Lhs'),
        valueRhs: stringStruct('Value Rhs'),
        description: stringStruct('Description')
      }
    }
  },
  assertImageSimilar: {
    command: 'assertImageSimilar',
    schema: {
      type: 'object',
      required: ['widget', 'expected'],
      properties: {
        weight: WeightStruct,
        widget: valTypeStruct('Widget'),
        expected: stringStruct('Path to expected image')
      }
    }
  },
  click: {
    command: 'click',
    schema: {
      type: 'object',
      properties: {
        weight: WeightStruct,
        driver: driverStruct('Driver'),
        widget: valTypeStruct('Widget'),
        offsetByRatio: arrayStructInt('Offset'),
        description: stringStruct('Description')
      }
    }
  },
  getText: {
    command: 'getText',
    schema: {
      type: 'object',
      required: ['widget', 'setVariable'],
      properties: {
        weight: WeightStruct,
        widget: valTypeStruct('Widget'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  isVisible: {
    command: 'isVisible',
    schema: {
      type: 'object',
      required: ['widget', 'setVariable'],
      properties: {
        weight: WeightStruct,
        widget: valTypeStruct('Widget'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  locateByWidgetClass: {
    command: 'locateByWidgetClass',
    schema: {
      type: 'object',
      required: ['widgetName', 'setVariable'],
      properties: {
        weight: WeightStruct,
        widgetName: stringStruct('Widget Name'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  locateByWidgetName: {
    command: 'locateByWidgetName',
    schema: {
      type: 'object',
      required: ['widgetName', 'setVariable'],
      properties: {
        weight: WeightStruct,
        widgetName: stringStruct('Widget Name'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  locateByWidgetText: {
    command: 'locateByWidgetText',
    schema: {
      type: 'object',
      required: ['widgetName', 'setVariable'],
      properties: {
        weight: WeightStruct,
        driver: driverStruct('Driver'),
        widgetName: stringStruct('Widget Name'),
        setVariable: stringStruct('Set Variable'),
        description: stringStruct('Description')
      }
    }
  },
  sleep: {
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
  typeHotkeys: {
    command: 'typeHotkeys',
    schema: {
      type: 'object',
      required: ['keys'],
      properties: {
        weight: WeightStruct,
        keys: arrayStruct('The text to type')
      }
    }
  },
  typeText: {
    command: 'typeText',
    schema: {
      type: 'object',
      required: ['text'],
      properties: {
        weight: WeightStruct,
        text: stringStruct('The text to type')
      }
    }
  }
}
