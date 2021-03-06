export const resultSample = {
  summary: {
    score: 9,
    maxScore: 10
  },
  breakdown: [
    {
      commandId: 1,
      command: 'locateByWidgetText',
      parameters: {
        widgetName: 'About / Settings'
      },
      driver: 'CV',
      setVariable: 'settingsButton',
      result: {
        value: [227, 373],
        candidates: [
          {
            text: 'Settings',
            rect: [
              [197, 366],
              [257, 366],
              [257, 380],
              [197, 380]
            ],
            center: [227, 373],
            similarity: 67
          },
          {
            text: 'About/',
            rect: [
              [142, 366],
              [191, 366],
              [191, 378],
              [142, 378]
            ],
            center: [166, 372],
            similarity: 55
          }
        ]
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: '1-locateByWidgetText.png'
    },
    {
      commandId: 2,
      command: 'click',
      parameters: {
        widget: [227, 373]
      },
      driver: 'CV',
      setVariable: null,
      result: {
        value: 'success',
        point: [227, 373]
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: '2-click.png'
    },
    {
      commandId: 3,
      command: 'locateByWidgetText',
      parameters: {
        widgetName: 'Return'
      },
      driver: 'DOM',
      setVariable: 'returnButton',
      result: {
        candidates:
          '[Button@2b768f4b[styleClass=button big-button]\'Return\', Text[text="Return", x=0.0, y=0.0, alignment=LEFT, origin=BASELINE, boundsType=LOGICAL_VERTICAL_CENTER, font=Font[name=System Regular, family=System, style=Regular, size=15.0], fontSmoothingType=LCD, fill=0x333333ff]]',
        position: '[119.99999713897705, 40.000000953674316]',
        value: 'javafx.scene.control.Button@2b768f4b'
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: '3-locateByWidgetText.png'
    },
    {
      commandId: 4,
      command: 'getText',
      parameters: {
        widget: 'javafx.scene.control.Button@2b768f4b'
      },
      driver: 'DOM',
      setVariable: 'returnButtonText',
      result: {
        value: 'Return'
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: '4-getText.png'
    },
    {
      commandId: 5,
      command: 'assertEqual',
      parameters: {
        valueLhs: 'Return',
        valueRhs: 'Return'
      },
      driver: null,
      setVariable: null,
      result: {
        value: 'PASSED'
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: null
    },
    {
      commandId: 6,
      command: 'click',
      parameters: {
        widget: 'javafx.scene.control.Button@2b768f4b'
      },
      driver: 'DOM',
      setVariable: null,
      result: {
        position: '[119.99999809265137, 40.0]',
        value: 'success'
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: '6-click.png'
    },
    {
      commandId: 7,
      command: 'locateByWidgetText',
      parameters: {
        widgetName: 'Play'
      },
      driver: 'CV',
      setVariable: 'playButton',
      result: {
        value: [199, 253],
        candidates: [
          {
            text: 'Play',
            rect: [
              [185, 246],
              [214, 246],
              [214, 260],
              [185, 260]
            ],
            center: [199, 253],
            similarity: 100
          }
        ]
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: '7-locateByWidgetText.png'
    },
    {
      commandId: 8,
      command: 'click',
      parameters: {
        widget: [199, 253]
      },
      driver: 'CV',
      setVariable: null,
      result: {
        value: 'success',
        point: [199, 253]
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: '8-click.png'
    },
    {
      commandId: 9,
      command: 'locateByWidgetText',
      parameters: {
        widgetName: 'Choose map directory'
      },
      driver: 'DOM',
      setVariable: 'mapButton',
      result: {
        candidates:
          '[Button@638b23bb[styleClass=button big-button]\'Choose map directory\', Text[text="Choose map directory", x=0.0, y=0.0, alignment=LEFT, origin=BASELINE, boundsType=LOGICAL_VERTICAL_CENTER, font=Font[name=System Regular, family=System, style=Regular, size=15.0], fontSmoothingType=LCD, fill=0x333333ff]]',
        position: '[144.0, 93.0]',
        value: 'javafx.scene.control.Button@638b23bb'
      },
      errors: [],
      maxScore: 1,
      score: 1,
      screenshotPath: '9-locateByWidgetText.png'
    },
    {
      commandId: 10,
      command: 'click',
      parameters: {
        widget: 'javafx.scene.control.Button@638b23bb'
      },
      driver: 'DOM',
      setVariable: null,
      result: {
        position: '[143.99999809265137, 92.5]',
        value: 'success'
      },
      errors: [
        {
          message:
            'GuitaDriverError: Caught stderr originated from driver DOM ',
          detail:
            '-----DOM STDERR-----\n\n(java:1): dconf-WARNING **: 05:43:44.635: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.663: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.674: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.687: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.703: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.721: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.738: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.754: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.771: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.788: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.804: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.822: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.837: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.853: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.870: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n\n(java:1): dconf-WARNING **: 05:43:44.886: failed to commit changes to dconf: Failed to execute child process \u201cdbus-launch\u201d (No such file or directory)\n'
        }
      ],
      maxScore: 1,
      score: 0,
      screenshotPath: '10-click.png'
    }
  ]
}
