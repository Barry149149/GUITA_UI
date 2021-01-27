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

/*
 for my reference
    2020s
        comp2012
            a1,a2,a3
        comp1022p
            h1
        comp3021
            a1,a2
    2020f
        comp2012
            a1,a2
        comp1022p
            h1,h2
*/
export const resultSample = [
    {
        semester: '2020S',
        courseName: 'COMP2012',
        assignment: 'Assignment #1',
        taskNumber: 4,
        result: [
        {
            name: "Christy Lynn",
            id: 32588376,
            scores: [
            72,
            54,
            68,
            94
            ]
        },
        {
            name: "Elsa Edwards",
            id: 32316148,
            scores: [
            66,
            71,
            66,
            52
            ]
        },
        {
            name: "Dale Mcknight",
            id: 34566275,
            scores: [
            98,
            95,
            78,
            71
            ]
        },
        {
            name: "Dominique Jimenez",
            id: 35175974,
            scores: [
            50,
            80,
            95,
            75
            ]
        },
        {
            name: "Jenny Ayala",
            id: 38361542,
            scores: [
            84,
            94,
            99,
            57
            ]
        },
        {
            name: "Wallace Austin",
            id: 30738450,
            scores: [
            81,
            51,
            72,
            51
            ]
        },
        {
            name: "Althea Chang",
            id: 32014067,
            scores: [
            70,
            87,
            63,
            62
            ]
        },
        {
            name: "Charmaine Dominguez",
            id: 37113290,
            scores: [
            52,
            64,
            87,
            67
            ]
        },
        {
            name: "Celia Swanson",
            id: 36364118,
            scores: [
            93,
            67,
            60,
            75
            ]
        },
        {
            name: "Robyn Salas",
            id: 34923558,
            scores: [
            89,
            76,
            68,
            90
            ]
        },
        {
            name: "Phyllis Ruiz",
            id: 30510451,
            scores: [
            61,
            62,
            95,
            79
            ]
        },
        {
            name: "Robles Crosby",
            id: 32410350,
            scores: [
            54,
            62,
            58,
            86
            ]
        }
        ]
    },
    {
        semester: '2020S',
        courseName: 'COMP2012',
        assignment: 'Assignment #2',
        taskNumber: 4,
        result: [
        {
            name: "Kane Lane",
            id: 30298609,
            scores: [
            90,
            89,
            77,
            90
            ]
        },
        {
            name: "Barnett Lott",
            id: 37173359,
            scores: [
            78,
            97,
            66,
            93
            ]
        },
        {
            name: "Lott Riggs",
            id: 36930924,
            scores: [
            66,
            89,
            71,
            69
            ]
        },
        {
            name: "Cecile Summers",
            id: 35316796,
            scores: [
            79,
            82,
            92,
            98
            ]
        },
        {
            name: "Maxwell Hebert",
            id: 34370648,
            scores: [
            54,
            79,
            52,
            51
            ]
        },
        {
            name: "Gilmore Noble",
            id: 39062059,
            scores: [
            83,
            74,
            89,
            82
            ]
        },
        {
            name: "Nadia Sherman",
            id: 36008322,
            scores: [
            89,
            70,
            81,
            100
            ]
        },
        {
            name: "Powers Kennedy",
            id: 38456127,
            scores: [
            63,
            83,
            58,
            97
            ]
        },
        {
            name: "Valencia Bowen",
            id: 37241757,
            scores: [
            57,
            62,
            64,
            60
            ]
        },
        {
            name: "Katina Long",
            id: 31048162,
            scores: [
            79,
            63,
            65,
            80
            ]
        },
        {
            name: "Dana Rodriquez",
            id: 35714844,
            scores: [
            54,
            64,
            93,
            92
            ]
        },
        {
            name: "Clay Barrett",
            id: 31690247,
            scores: [
            82,
            64,
            54,
            83
            ]
        }
        ]
    },
    {
        semester: '2020S',
        courseName: 'COMP2012',
        assignment: 'Assignment #3',
        taskNumber: 4,
        result: [
        {
            name: "Schultz Gay",
            id: 35034869,
            scores: [
            56,
            61,
            59,
            77
            ]
        },
        {
            name: "Bobbi Mcconnell",
            id: 32116080,
            scores: [
            79,
            86,
            58,
            67
            ]
        },
        {
            name: "Clayton Richard",
            id: 35608849,
            scores: [
            75,
            80,
            53,
            65
            ]
        },
        {
            name: "Kris Gilbert",
            id: 36347354,
            scores: [
            53,
            94,
            72,
            78
            ]
        },
        {
            name: "Mae Skinner",
            id: 37867949,
            scores: [
            62,
            77,
            72,
            73
            ]
        },
        {
            name: "Cummings Ingram",
            id: 34397868,
            scores: [
            51,
            82,
            70,
            71
            ]
        },
        {
            name: "House Leon",
            id: 39770183,
            scores: [
            64,
            70,
            60,
            94
            ]
        },
        {
            name: "Ines Cohen",
            id: 39378037,
            scores: [
            52,
            58,
            98,
            77
            ]
        },
        {
            name: "Pope Wiggins",
            id: 36470946,
            scores: [
            50,
            56,
            92,
            60
            ]
        },
        {
            name: "Noble Compton",
            id: 31058465,
            scores: [
            55,
            73,
            72,
            79
            ]
        },
        {
            name: "Dudley Torres",
            id: 34982415,
            scores: [
            63,
            100,
            78,
            70
            ]
        },
        {
            name: "Imogene Armstrong",
            id: 35616784,
            scores: [
            95,
            68,
            87,
            98
            ]
        }
        ]
    },
    {
        semester: '2020S',
        courseName: 'COMP1022P',
        assignment: 'Homework #1',
        taskNumber: 4,
        result: [
        {
            name: "Odessa Conley",
            id: 31659042,
            scores: [
            79,
            70,
            92,
            64
            ]
        },
        {
            name: "Carter Ramirez",
            id: 31894678,
            scores: [
            68,
            87,
            60,
            95
            ]
        },
        {
            name: "Shelly Haney",
            id: 32628546,
            scores: [
            78,
            72,
            50,
            56
            ]
        },
        {
            name: "Hooper Bernard",
            id: 39571668,
            scores: [
            67,
            51,
            72,
            51
            ]
        },
        {
            name: "Watkins Duran",
            id: 35729619,
            scores: [
            98,
            99,
            71,
            64
            ]
        },
        {
            name: "Snow Terrell",
            id: 33273590,
            scores: [
            81,
            52,
            85,
            59
            ]
        },
        {
            name: "Berry Shields",
            id: 36920679,
            scores: [
            90,
            100,
            97,
            54
            ]
        },
        {
            name: "Stacie Burt",
            id: 38105637,
            scores: [
            54,
            51,
            58,
            67
            ]
        },
        {
            name: "Byers Mosley",
            id: 36675382,
            scores: [
            59,
            59,
            94,
            97
            ]
        },
        {
            name: "Nicholson Cain",
            id: 33898701,
            scores: [
            84,
            93,
            69,
            88
            ]
        },
        {
            name: "Michelle Ballard",
            id: 39151380,
            scores: [
            75,
            83,
            56,
            74
            ]
        },
        {
            name: "Opal Soto",
            id: 30299286,
            scores: [
            50,
            77,
            61,
            85
            ]
        }
        ]
    },
    {
        semester: '2020S',
        courseName: 'COMP3021',
        assignment: 'Assignment #1',
        taskNumber: 4,
        result: [
        {
            name: "Paula Rivers",
            id: 37293758,
            scores: [
            85,
            66,
            99,
            79
            ]
        },
        {
            name: "Lupe Martin",
            id: 35634816,
            scores: [
            73,
            87,
            72,
            87
            ]
        },
        {
            name: "Burns Little",
            id: 37422635,
            scores: [
            66,
            92,
            86,
            55
            ]
        },
        {
            name: "Kayla Simmons",
            id: 33466571,
            scores: [
            95,
            56,
            98,
            91
            ]
        },
        {
            name: "Marquez Clark",
            id: 33139383,
            scores: [
            62,
            98,
            90,
            91
            ]
        },
        {
            name: "Bauer Riddle",
            id: 30487885,
            scores: [
            51,
            52,
            75,
            78
            ]
        },
        {
            name: "Alvarado Stanley",
            id: 36863551,
            scores: [
            62,
            75,
            63,
            90
            ]
        },
        {
            name: "Hilary Parker",
            id: 34010056,
            scores: [
            54,
            98,
            83,
            85
            ]
        }
        ]
    },
    {
        semester: '2020S',
        courseName: 'COMP3021',
        assignment: 'Assignment #2',
        taskNumber: 4,
        result: [
        {
            name: "Melinda Slater",
            id: 39463756,
            scores: [
            66,
            91,
            90,
            72
            ]
        },
        {
            name: "Flossie Castaneda",
            id: 32260550,
            scores: [
            96,
            81,
            75,
            100
            ]
        },
        {
            name: "Compton Oneill",
            id: 35922348,
            scores: [
            53,
            87,
            100,
            78
            ]
        },
        {
            name: "Franks Waller",
            id: 35368072,
            scores: [
            72,
            87,
            68,
            60
            ]
        },
        {
            name: "Diann Benson",
            id: 39247396,
            scores: [
            71,
            77,
            79,
            78
            ]
        },
        {
            name: "Joseph Shepard",
            id: 35186636,
            scores: [
            69,
            88,
            52,
            50
            ]
        },
        {
            name: "Ruthie Beasley",
            id: 33688676,
            scores: [
            58,
            73,
            72,
            91
            ]
        },
        {
            name: "Walls Young",
            id: 34223430,
            scores: [
            57,
            54,
            95,
            75
            ]
        }
        ]
    },
    {
        semester: '2020F',
        courseName: 'COMP2012',
        assignment: 'Assignment #1',
        taskNumber: 4,
        result: [
        {
            name: "Witt Hebert",
            id: 35134087,
            scores: [
            77,
            58,
            60,
            91
            ]
        },
        {
            name: "Workman Phelps",
            id: 32244950,
            scores: [
            67,
            89,
            65,
            55
            ]
        },
        {
            name: "Nolan Bruce",
            id: 36816010,
            scores: [
            52,
            98,
            57,
            68
            ]
        },
        {
            name: "Blankenship Richards",
            id: 37287801,
            scores: [
            52,
            78,
            61,
            95
            ]
        },
        {
            name: "Nina Olson",
            id: 34126798,
            scores: [
            90,
            56,
            100,
            76
            ]
        },
        {
            name: "Maryann Velez",
            id: 35102162,
            scores: [
            80,
            61,
            96,
            56
            ]
        },
        {
            name: "Hensley Schultz",
            id: 37972646,
            scores: [
            92,
            80,
            66,
            65
            ]
        },
        {
            name: "Moss Barnett",
            id: 34308152,
            scores: [
            87,
            92,
            97,
            91
            ]
        }
        ]
    },
    {
        semester: '2020F',
        courseName: 'COMP2012',
        assignment: 'Assignment #2',
        taskNumber: 4,
        result: [
        {
            name: "Luz Howard",
            id: 34858379,
            scores: [
            67,
            58,
            77,
            82
            ]
        },
        {
            name: "Krystal Nolan",
            id: 39199682,
            scores: [
            56,
            100,
            71,
            50
            ]
        },
        {
            name: "Concepcion Hood",
            id: 34270017,
            scores: [
            64,
            53,
            67,
            70
            ]
        },
        {
            name: "Collins Payne",
            id: 34363226,
            scores: [
            82,
            97,
            71,
            92
            ]
        },
        {
            name: "Blankenship Aguirre",
            id: 35852410,
            scores: [
            94,
            69,
            100,
            57
            ]
        },
        {
            name: "Alana Dean",
            id: 32836490,
            scores: [
            80,
            89,
            53,
            88
            ]
        },
        {
            name: "Lynn Spears",
            id: 32457409,
            scores: [
            85,
            94,
            53,
            94
            ]
        },
        {
            name: "Rhodes Conrad",
            id: 33785909,
            scores: [
            70,
            68,
            56,
            98
            ]
        }
        ]
    },
    {
        semester: '2020F',
        courseName: 'COMP1022P',
        assignment: 'Homework #1',
        taskNumber: 4,
        result: [
        {
            name: "Browning Welch",
            id: 37516397,
            scores: [
            93,
            50,
            83,
            64
            ]
        },
        {
            name: "Cynthia Reed",
            id: 35234284,
            scores: [
            96,
            72,
            54,
            71
            ]
        },
        {
            name: "Antonia Nicholson",
            id: 35512247,
            scores: [
            55,
            57,
            92,
            96
            ]
        },
        {
            name: "Williamson Avery",
            id: 33668418,
            scores: [
            100,
            58,
            98,
            79
            ]
        },
        {
            name: "Merritt Marquez",
            id: 32280110,
            scores: [
            90,
            98,
            95,
            62
            ]
        },
        {
            name: "Alyson Wiggins",
            id: 33625555,
            scores: [
            81,
            63,
            67,
            79
            ]
        },
        {
            name: "Enid Francis",
            id: 36348347,
            scores: [
            52,
            52,
            52,
            80
            ]
        },
        {
            name: "Marylou Rodriguez",
            id: 36838384,
            scores: [
            52,
            72,
            90,
            64
            ]
        }
        ]
    },
    {
        semester: '2020F',
        courseName: 'COMP1022P',
        assignment: 'Homework #2',
        taskNumber: 4,
        result: [
        {
            name: "Keri Tate",
            id: 30120192,
            scores: [
            53,
            66,
            87,
            55
            ]
        },
        {
            name: "Felecia Leonard",
            id: 37706702,
            scores: [
            78,
            98,
            100,
            95
            ]
        },
        {
            name: "Tracie Butler",
            id: 34701774,
            scores: [
            52,
            57,
            86,
            76
            ]
        },
        {
            name: "Guerrero Fowler",
            id: 33834461,
            scores: [
            67,
            92,
            97,
            67
            ]
        },
        {
            name: "Love Rutledge",
            id: 36284920,
            scores: [
            97,
            67,
            97,
            70
            ]
        },
        {
            name: "Richard Rowland",
            id: 30753526,
            scores: [
            86,
            93,
            67,
            67
            ]
        },
        {
            name: "Salazar Sanford",
            id: 38935267,
            scores: [
            60,
            95,
            94,
            62
            ]
        },
        {
            name: "Constance Marsh",
            id: 34058600,
            scores: [
            64,
            98,
            78,
            56
            ]
        }
        ]
    },
]