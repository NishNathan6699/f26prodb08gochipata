
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// LAB 13 PART 2 - Passport Local Mongoose
const passportLocalMongooseModule = require('passport-local-mongoose');

const passportLocalMongoose =
    passportLocalMongooseModule.default ||
    passportLocalMongooseModule;

const accountSchema = new Schema({
    username: String
});

// Add Passport authentication to the account model
accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
