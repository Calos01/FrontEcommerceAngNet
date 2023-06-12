export interface Categories{
    id: number;
    category: string;
    subCategory: string;
}

export interface ListaProducts{
    bannerimage: string,
    categories: Categories;
}

export interface HeaderCategories{
    categories: string,
    subcategories: string[];
}

//Este es para la navigation Categories Header
export interface Category{
    id: number;
    category: string;
    subCategory: string;
}

//Para los productos
export interface Offer{
    id: number;
    title: string;
    discount: number;
}

export interface Category{
    id: number;
    category: string;
    subCategory: string;
}

export interface Product{
    id:number,
    title: string,
    description: string,
    productCategory:Category,
    offer: Offer,
    price: number,
    quantity: number,
    imageName: string,
}