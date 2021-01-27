export const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

export const flavourOptions = [
    { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
    { value: 'chocolate', label: 'Chocolate', rating: 'good' },
    { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
    { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];

export const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'GU', label: 'Guam' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VI', label: 'Virgin Islands' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
];

export const optionLength = [
    { value: 1, label: 'general' },
    {
        value: 2,
        label:
            'Evil is the moment when I lack the strength to be true to the Good that compels me.',
    },
    {
        value: 3,
        label:
            "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
    },
];

export const dogOptions = [
    { id: 1, label: 'Chihuahua' },
    { id: 2, label: 'Bulldog' },
    { id: 3, label: 'Dachshund' },
    { id: 4, label: 'Akita' },
];

// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export const groupedOptions = [
    {
        label: 'Colours',
        options: colourOptions,
    },
    {
        label: 'Flavours',
        options: flavourOptions,
    },
];

export const languageOption = [
    {
        value: 'cpp',
        label: 'C++'
    },
    {
        value: 'java',
        label: 'Java'
    }
]

export const frameworkOption = [
    {
        value: 'qt',
        label: 'Qt'
    },
    {
        value: 'javafx',
        label: 'JavaFX'
    }
]

export const driverOption = [
    {
        value: 'qtDriver',
        label: 'DOM for Qt Driver'
    },
    {
        value: 'computerVision',
        label: 'Computer Vision'
    }
]

export const backupdriverOption = [
    {
        value: 'qtDriver',
        label: 'DOM for Qt Driver'
    },
    {
        value: 'computerVision',
        label: 'Computer Vision'
    }
]


export const dataYear = [
    {value: "2020S", label: "2020S", yearId: 1 },
    {value: "2020F", label: "2020F", yearId: 2 },
]

export const dataCategories = [
    { value: "COMP2012", label: "COMP2012", categoryId: 1 , yearId: 1 },
    { value: "COMP3021", label: "COMP3021", categoryId: 2 , yearId: 1 },
    { value: "COMP1022P", label: "COMP1022P", categoryId: 3 , yearId: 1},
    { value: "COMP2012", label: "COMP2012", categoryId: 4 , yearId: 2 },
    { value: "COMP1022P", label: "COMP1022P", categoryId: 5 , yearId: 2},
];

export const dataProducts = [
    { value: "Assignment #1", label: "Assignment #1",productId: 1, categoryId: 1, taskNumber: 4 },
    { value: "Assignment #2", label: "Assignment #2", productId: 2, categoryId: 1, taskNumber: 4  },
    { value: "Assignment #1", label: "Assignment #1", productId: 3, categoryId: 2, taskNumber: 4  },
    { value: "Assignment #2", label: "Assignment #2", productId: 4, categoryId: 2, taskNumber: 4  },
    { value: "Homework #1", label: "Homework #1", productId: 5, categoryId: 3, taskNumber: 4  },
    { value: "Homework #2", label: "Homework #2", productId: 6, categoryId: 3, taskNumber: 4  },
    { value: "Assignment #1", label: "Assignment #1", productId: 7, categoryId: 4, taskNumber: 4  },
    { value: "Assignment #2", label: "Assignment #2", productId: 8, categoryId: 4, taskNumber: 4  },
    { value: "Assignment #3", label: "Assignment #3", productId: 9, categoryId: 4, taskNumber: 4  },
    { value: "Homework #1", label: "Homework #1", productId: 10, categoryId: 5, taskNumber: 4  },
];

export const dataOrders = [
    { value: "Cunewalde", label: "Cunewalde", orderId: 1, productId: 1 , id: 32153221, scores: [20,20,30,40]},
    { value: "Albuquerque", label: "Albuquerque", orderId: 2, productId: 1, id: 32155421, scores: [20,10,23,42]},
    { value: "Geneva", label: "Geneva", orderId: 3, productId: 2, id: 32156421,scores: [20,22,30,42]},
    { value: "Graz", label: "Graz", orderId: 4, productId: 2, id: 32155861,scores: [30,22,30,42]},
    { value: "London", label: "London", orderId: 5, productId: 3, id: 32167521,scores: [20,50,30,23] },
    { value: "I. de Margarita", label: "I. de Margarita", orderId: 6, productId: 3, id: 32155599,scores: [30,20,32,43] },
    { value: "Barquisimeto", label: "Barquisimeto", orderId: 7, productId: 4 , id: 32785521,scores: [20,20,23,34]},
    { value: "Brandenburg", label: "Brandenburg", orderId: 8, productId: 4, id: 36755521,scores: [63,23,30,40] },
    { value: "Cunewalde", label: "Cunewalde", orderId: 9, productId: 5 , id: 36755521,scores: [63,23,30,40]},
    { value: "Mexico D.F.", label: "Mexico D.F.", orderId: 10, productId: 5 , id: 36755521,scores: [63,23,30,40]},
    { value: "Mexico D.F.", label: "Mexico D.F.", orderId: 11, productId: 6, id: 36755521,scores: [63,23,30,40] },
    { value: "Rio de Janeiro", label: "Rio de Janeiro", orderId: 12, productId: 6, id: 36755521,scores: [63,23,30,40] },
    { value: "Chan Tai Man", label: "Chan Tai Man", orderId: 13, productId: 7, id: 36755521,scores: [63,23,30,40] },
    { value: "Brandenburg", label: "Brandenburg", orderId: 14, productId: 7, id: 36755521,scores: [63,23,30,40] },
    { value: "Cunewalde", label: "Cunewalde", orderId: 15, productId: 7, id: 36755521,scores: [63,23,30,40] },
    { value: "Mexico D.F.", label: "Mexico D.F.", orderId: 16, productId: 8, id: 36755521,scores: [63,23,30,40] },
    { value: "Geneva", label: "Geneva", orderId: 17, productId: 8, id: 36755521,scores: [63,23,30,40] },
    { value: "Graz", label: "Graz", orderId: 18, productId: 9, id: 36755521,scores: [63,23,30,40] },
    { value: "Rio de Janeiro", label: "Rio de Janeiro", orderId: 19, productId: 10, id: 36755521,scores: [63,23,30,40] },
    { value: "Chan Tai Man", label: "Chan Tai Man", orderId: 20, productId: 10, id: 36755521,scores: [63,23,30,40] },
];

export const resultSample = [
    {
        year: '2020S',
        courseName: 'COMP2012',
        assignment: 'Assignment #1',
        taskNumber: 4,
        results: [
            {
                value: '', id: 30544728, scores: [],
            },
        ]
    },
    {
        year: '2020S',
        courseName: 'COMP2012',
        assignment: 'Assignment #2',
        taskNumber: 5,
        results: [
            {
                value: '', id: 30544728, scores: [],
            },
        ]
    },
    {
        year: '2020S',
        courseName: 'COMP2012',
        assignment: 'Assignment #3',
        taskNumber: 5,
        results: [
            {
                value: '', id: 30544728, scores: [],
            },
        ]
    },
    {
        year: '2020S',
        courseName: 'COMP2012',
        assignment: 'Assignment #4',
        taskNumber: 4,
        results: [
            {
                value: '', id: 30544728, scores: [],
            },
        ]
    },
    {
        year: '2020S',
        courseName: 'COMP1022P',
        assignment: 'Assignment #1',
        taskNumber: 5,
        results: [
            {
                value: '', id: 30544728, scores: [],
            },
        ]
    },
    {
        year: '2020S',
        courseName: 'COMP1022P',
        assignment: 'Assignment #2',
        taskNumber: 4,
        results: [
            {
                value: '', id: 30544728, scores: [],
            },
        ]
    },
    {
        year: '2020S',
        courseName: 'COMP1022P',
        assignment: 'Assignment #3',
        taskNumber: 4,
        results: [
            {
                value: '', id: 30544728, scores: [],
            },
        ]
    },
    {
        year: '2020S',
        courseName: 'COMP3021',
    },
    {
        year: '2020F',
        courseName: 'COMP2012',
    },
    {
        year: '2020F',
        courseName: 'COMP1022P',
    },

]