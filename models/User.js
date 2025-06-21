import mongooes from 'mongoose';

const userSchema = mongooes.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = mongooes.model("User", userSchema);
export default User;