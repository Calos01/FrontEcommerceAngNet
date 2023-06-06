export interface Categories{
    id: number;
    category: string;
    subcategory: string;
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