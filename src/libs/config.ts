export const  AUTRH_TIMER =24;
export const MORGAN_FORMAT = `:method :url :response-time [:status] \n`;


// Kirib kelayotgan paramni tyepe tekshirib agar string bo'lsa uni object qilib olamiz!
import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
    return typeof target === 'string' ? new mongoose.Types.ObjectId(target): target;
}

