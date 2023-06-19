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
export interface User{
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    mobile: string,
    password: string,
    createdAt: string,
    modifiedAt: string    
}

export interface Review{
    id:number,
    user:User,
    product:Product,
    review:string,
    cretedAt: string
}

//Para el componente cart
export interface Cart{
    id:number,
    user:User,
    cartItems:CartItem[],
    ordered:boolean,
    orderedon:string
}
export interface CartItem{
    id:number,
    product:Product
}