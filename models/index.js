const mongoose = require("mongoose");
const adminSchema = require("./schemas/admin.schema");
const bookSchema = require("./schemas/book.schema");
const rentSchema = require("./schemas/rent.schema");
const userSchema = require("./schemas/user.schema");

module.exports={
    Book:mongoose.model('book',bookSchema),
    User:mongoose.model('user',userSchema),
    Admin:mongoose.model('admin',adminSchema),
    BookRent:mongoose.model('rent',rentSchema)
}