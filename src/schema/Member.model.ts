
import mongoose, {Schema} from 'mongoose';
import { MemberStatus, MemberType } from '../libs/enums/member.enum';

// Schema larni qurish usullari => 1.Schema first / 2.Code first 
// Enum qiymatlar bu aniq qiymatni ishlatish uchun kerak bo'ladigan type hisoblanadi


const memberSchema = new Schema ({
    memberType: { 
        type: String,
        enum: MemberType,
        default: MemberType.USER
    },

    MemberStatus: {
        type: String,
        enum: MemberStatus,
        default:MemberStatus.ACTIVE,
    },

    memberNick: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },

    memberPhone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true,
    },

    memberPassword: {
        type: String,
        select: false,
        required: true,
    },

    memberAdress: {
        type: String,
    },

    memberDesc: {
        type: String,
    },

    memberImage: {
        type: String,
    },

    memberPoints: {
        type: Number,
        default: 0,
    },
},
{timestamps: true}         // updatedAt, createdAt
);

export default mongoose.model('Member', memberSchema);
