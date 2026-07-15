const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");
const UserModel = require("./models/users.js");

let app = Express();

app.use(Express.json());
app.use(Cors());

Mongoose.connect("mongodb://akshara:Akak4812@ac-kaukwea-shard-00-00.dz9thle.mongodb.net:27017,ac-kaukwea-shard-00-01.dz9thle.mongodb.net:27017,ac-kaukwea-shard-00-02.dz9thle.mongodb.net:27017/blogappdb?ssl=true&replicaSet=atlas-9gt2a1-shard-0&authSource=admin&appName=Cluster0");

app.post("/signup", async (req, res) => {

    let input = req.body;
    let hashedPassword = Bcrypt.hashSync(req.body.password, 10);
    console.log(hashedPassword);
    req.body.password = hashedPassword;

    const check = await UserModel.find({ email: req.body.email });

    if (check.length > 0) {

        return res.json({
            "Status": "email id already exists"
        });

    } else {

        let result = new UserModel(input);

        await result.save();

        return res.json({
            "Status": "Success"
        });

    }

});

app.listen(3000, () => {
    console.log("server started");
});