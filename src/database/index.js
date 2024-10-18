const { default: mongoose } = require("mongoose")

const connectToDB = async () => {
    const url = "mongodb://127.0.0.1:27017/ServerDataTest"
    mongoose.connect(url).then(() => console.log("Database connection successful"))
    .catch((err) => console.log(err)
    )
}
export default connectToDB