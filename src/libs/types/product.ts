import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";
import {ObjectId} from "mongoose";

export interface Product {
    _id: ObjectId;
    ProductStatus: ProductStatus;
    productCollection:ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize: ProductSize;
    ProductVolume: number;
    productDesc?: string;
    productImages: string[];
    productViews: number;
} 


export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string;
}


export interface ProductInput {
    ProductStatus?: ProductStatus;
    productCollection:ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize?: ProductSize;
    ProductVolume?: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
}

export interface ProductUpdateInput {
    _id: ObjectId;
    ProductStatus?: ProductStatus;
    productCollection?:ProductCollection;
    productName?: string;
    productPrice?: number;
    productLeftCount?: number;
    productSize?: ProductSize;
    ProductVolume?: number;
    productDesc?: string;
    productImages?: string[];
    productViews?: number;
} 