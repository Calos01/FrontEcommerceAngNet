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