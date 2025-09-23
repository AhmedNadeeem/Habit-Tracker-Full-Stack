const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    refreshToken: {
        type: String,
    }
},
{
    timestamps: true
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) next();
    const saltValue = parseInt(process.env.SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, saltValue);
})

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = model("User", userSchema)