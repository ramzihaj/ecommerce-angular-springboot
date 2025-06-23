export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "beige", label: "Beige" },
      { value: "blue", label: "Blue" },
      { value: "black", label: "Black" },
      { value: "red", label: "Red" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "xxl", label: "XXL" },
    ],
  },
  {
    id: "discount",
    name: "DISCOUNT RANGE",
    options: [
      { value: "0-10", label: "0% - 10%" },
      { value: "10-20", label: "10% - 20%" },
      { value: "20-30", label: "20% - 30%" },
      { value: "30-50", label: "30% - 50%" },
      { value: "50+", label: "50% +" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out of Stock" },
    ],
  },
  {
    id: "price",
    name: "Price Range",
    options: [
      { value: "0-50", label: "$0 - $50" },
      { value: "50-100", label: "$50 - $100" },
      { value: "100-200", label: "$100 - $200" },
      { value: "200+", label: "$200 +" },
    ],
  },
];

export const sortOptions = [
  { name: "Price: Low to High", query: "price_low", current: false },
  { name: "Price: High to Low", query: "price_high", current: false },
];
export const singleFilterData = [
  {
    id: "gender",
    name: "Gender",
    options: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" }
    ]
  }
];
