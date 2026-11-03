// descriptions --------------------------------------------------------
const PCID1 = {
    ram: "16 GB",
    cpu: "core i7",
    hard: "1 TB",
    size: "13 inch",
    graphic: "Nvidia 2030m",
}
const PCID2 = {
    ram: "32 GB",
    cpu: "core i9",
    hard: "2 TB",
    size: "14 inch",
    graphic: "Nvidia 2050m",

}

const PCAID3 = {
    type: "laser mouse",
    series: "gaming",
    weight: "230 g",
    DPI: "5000",
}

const PCAID4 = {
    type: "keyboard",
    series: "gaming",
    weight: "330 g",
}

const PCAID5 = {
    type: "Speaker",
    series: "Soundbalster",
    power: "40 W",
    subwoofer: "yes",
}

const PCPID6 = {
    ram: "4 GB",
    processor: "1050",
    pcie: "5",
    power: "130 W",
}
// Producst ---------------------------------------------------------------
export const products = [{
    id: 1,
    name: "Dell laptop 2030",
    price: 3000000000,
    category: "personal computer",
    description: PCID1,
    image: "products/Dell laptop 2030.svg",
    quantity: 50,
    supplier: 'Tehran inc',
},
{
    id: 2,
    name: "Dell laptop 2050",
    price: 3200000000,
    category: "personal computer",
    description: PCID2,
    image: "products/Dell laptop 2050.svg",
    quantity: 30,
    supplier: 'Tehran inc',
},
{
    id: 3,
    name: "Logitech mouse 510",
    price: 50000000,
    category: "computer accessories",
    description: PCAID3,
    image: "products/Logitech mouse 510.svg",
    quantity: 50,
    supplier: "Avajang",
},
{
    id: 4,
    name: "Logitech keyboard g10",
    price: 10000000,
    category: "computer accessories",
    description: PCAID4,
    image: "products/Logitech keyboard g10.svg",
    quantity: 40,
    supplier: "Avajang",
},
{
    id: 5,
    name: "Creative speaker soundblaster",
    price: 200000000,
    category: "computer accessories",
    description: PCAID5,
    image: "products/Creative speaker soundblaster.svg",
    quantity: 30,
    supplier: "Avajang",
},
{
    id: 6,
    name: "Nvidia graphic card 1050TI",
    price: 200000000,
    category: "computer parts",
    description: PCPID6,
    image: "products/Nvidia graphic card 1050TI.svg",
    quantity: 20,
    supplier: "Matrix",
}
];
