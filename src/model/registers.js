const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        maxlenght: 10
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

studentSchema.methods.genrateAuthToken = async function () {

    try {
        // console.log("id..", this._id);
        const token = jwt.sign({ _id: this._id }, "abcmdcashfhsjfsdfsdfnfmgnfmgnfff");

        this.tokens = this.tokens.concat({ token: token })
        console.log("token", token);
        return token;
    } catch (error) {
        console.log("token error", error);
    }

}



studentSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 9)
        console.log("password   ...", this.password);
        next();
    }

})


const StudentRegis = new mongoose.model("StudentRegis", studentSchema);


module.exports = StudentRegis;