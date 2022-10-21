import { filters_data, IFilterObject } from "../filters";

export const initialProductState = {
  allProducts: [],
  products: [],
  searchText: "",
  filters: filters_data,
  filterState: {
    colour: [],
    price: [],
    gender: [],
    type: [],
  },
};

type State = {
  allProducts: Product[];
  products: Product[];
  searchText: string;
  filters: IFilterObject[];
  filterState: {
    [key: string]: string[];
  };
};

type Action = {
  type: string;
  payload?: any;
};

export const productReducer = (
  state: State = initialProductState,
  { type, payload }: Action
) => {
  switch (type) {
    case "GET_PRODUCTS": {
      return { ...state, products: payload, allProducts: payload };
    }

    case "SET_SEARCH_VALUE": {
      const products = getProducts(
        state.allProducts as [],
        payload,
        state.filterState
      );
      return { ...state, products };
    }

    case "FILTER_VALUE": {
      const { value, category } = payload;

      let filters = state.filterState;
      let updatedFilterList = updateFiltersCheckbox(state.filters, payload);

      let isPresent = filters[category].find((item: string) => item === value);

      if (isPresent) {
        let data = filters[category].filter((item: any) => item !== value);
        filters = { ...filters, [category]: data };
      } else {
        filters = { ...filters, [category]: [...filters[category], value] };
      }
      const products = getProducts(
        state.allProducts,
        state.searchText,
        filters
      );
      return {
        ...state,
        filterState: filters,
        products,
        filters: updatedFilterList,
      };
    }

    default:
      return state;
  }
};

const updateFiltersCheckbox = (filters: IFilterObject[], payload: any) => {
  const { value, category, checked } = payload;

  return filters.map((categ) => {
    if (categ.id === category) {
      const items = categ.items.map((item) => {
        if (item.id === value) {
          return { ...item, checked: checked };
        } else return item;
      });
      return { ...categ, items };
    } else return categ;
  });
};

const getProducts = (
  products: Product[],
  searchText: string,
  filters: any
): Product[] | [] => {
  let filteredProducts = products;
  const { colour, price, gender, type } = filters;

  if (colour.length) {
    filteredProducts = filteredProducts.filter((product: Product) => {
      return colour.includes(product.color);
    });
  }

  if (gender.length) {
    filteredProducts = filteredProducts.filter((product: Product) => {
      return gender.includes(product.gender);
    });
  }

  if (type.length) {
    filteredProducts = filteredProducts.filter((product: Product) => {
      return type.includes(product.type);
    });
  }

  if (price.length) {
    let min: string, max: string;
    price.forEach((range: string) => {
      let rangeArray = range.split("-");
      min = rangeArray[0];
      max = rangeArray[1];
    });

    filteredProducts = filteredProducts.filter((product: Product) => {
      let productPrice: number = +product.price;
      let status = false;

      if (max.trim().length !== 0) {
        status = +productPrice >= +min && +productPrice <= +max;
      } else {
        status = +productPrice >= +min;
      }

      return status;
    });
  }

  if (searchText) {
    filteredProducts = filteredProducts.filter((item: Product) => {
      return (
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.color.toLowerCase().includes(searchText.toLowerCase()) ||
        item.type.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  return filteredProducts;
};
