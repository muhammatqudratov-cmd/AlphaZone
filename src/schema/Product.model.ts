import mongoose, { Schema } from "mongoose";
import {
    ProductCollection,
    ProductWeight,
    ProductStatus,
    ProductVolume,
    ProductSize,
    ProductCount,
} from "../libs/enums/product.enum";

const productSchema = new Schema(
    {
        productStatus: {
            type: String,
            enum: Object.values(ProductStatus),
            default: ProductStatus.PAUSE,
        },
        productCollection: {
            type: String,
            enum: Object.values(ProductCollection),
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productLeftCount: {
            type: Number,
            required: true,
        },
        productWeight: {
            type: String,
            enum: Object.values(ProductWeight),
        },
        productVolume: {
            type: String,
            enum: Object.values(ProductVolume),
        },
        productSize: {
            type: String,
            enum: Object.values(ProductSize),
        },
        productCount: {
            type: String,
            enum: Object.values(ProductCount),  
        },
        productDesc: {
            type: String,
        },
        productImages: {
            type: [String],
            default: [],
        },
        productViews: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

productSchema.index(
    { productName: 1, productCollection: 1 },
    { unique: true },
);

export default mongoose.model("Product", productSchema);