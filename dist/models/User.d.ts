/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import * as mongoose from "mongoose";
declare const _default: mongoose.Model<{
    type: string;
    name: string;
    email: string;
    status: string;
    email_verified: string;
    verification_token: string;
    phone: string;
    photo: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    verification_token_time?: Date;
    reset_password_token?: string;
    reset_password_token_time?: Date;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: string;
    name: string;
    email: string;
    status: string;
    email_verified: string;
    verification_token: string;
    phone: string;
    photo: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    verification_token_time?: Date;
    reset_password_token?: string;
    reset_password_token_time?: Date;
}> & {
    type: string;
    name: string;
    email: string;
    status: string;
    email_verified: string;
    verification_token: string;
    phone: string;
    photo: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    verification_token_time?: Date;
    reset_password_token?: string;
    reset_password_token_time?: Date;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    name: string;
    email: string;
    status: string;
    email_verified: string;
    verification_token: string;
    phone: string;
    photo: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    verification_token_time?: Date;
    reset_password_token?: string;
    reset_password_token_time?: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: string;
    name: string;
    email: string;
    status: string;
    email_verified: string;
    verification_token: string;
    phone: string;
    photo: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    verification_token_time?: Date;
    reset_password_token?: string;
    reset_password_token_time?: Date;
}>> & mongoose.FlatRecord<{
    type: string;
    name: string;
    email: string;
    status: string;
    email_verified: string;
    verification_token: string;
    phone: string;
    photo: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    verification_token_time?: Date;
    reset_password_token?: string;
    reset_password_token_time?: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export default _default;
