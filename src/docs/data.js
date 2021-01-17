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

export const courseOption = [
    {
        value: 'comp2012',
        label: 'COMP 2012',
        'assignments': [
            {
                value: 'pa1',
                label: 'Assignment #1'
            },
            {
                value: 'pa2',
                label: 'Assignment #2'
            },
            {
                value: 'pa3',
                label: 'Assignment #3'
            },
        ]
    },
    {
        value: 'comp3021',
        label: 'COMP 3021',
        'assignments': [
            {
                value: 'pa1',
                label: 'Assignment #1'
            },
            {
                value: 'pa2',
                label: 'Assignment #2'
            }
        ]
    },
]

export const dataCategories = [
    { value: "Beverages", label: "Beverages", categoryId: 1 },
    { value: "Condiments", label: "Condiments", categoryId: 2 },
    { value: "Seafood", label: "Seafood", categoryId: 3 }
];

export const dataProducts = [
    { productName: "Chai", productId: 1, categoryId: 1 },
    { productName: "Chang", productId: 2, categoryId: 1 },
    { productName: "Aniseed Syrup", productId: 3, categoryId: 2 },
    { productName: "Genen Shouyu", productId: 4, categoryId: 2 },
    { productName: "Ikura", productId: 5, categoryId: 3 },
    { productName: "Konbu", productId: 6, categoryId: 3 }
];

export const dataOrders = [
    { orderName: "Cunewalde", orderId: 1, productId: 1 },
    { orderName: "Albuquerque", orderId: 2, productId: 1 },
    { orderName: "Geneva", orderId: 3, productId: 2 },
    { orderName: "Graz", orderId: 4, productId: 2 },
    { orderName: "London", orderId: 5, productId: 3 },
    { orderName: "I. de Margarita", orderId: 6, productId: 3 },
    { orderName: "Barquisimeto", orderId: 7, productId: 4 },
    { orderName: "Brandenburg", orderId: 8, productId: 4 },
    { orderName: "Cunewalde", orderId: 9, productId: 5 },
    { orderName: "Mexico D.F.", orderId: 10, productId: 5 },
    { orderName: "Mexico D.F.", orderId: 11, productId: 6 },
    { orderName: "Rio de Janeiro", orderId: 12, productId: 6 }
];