const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");
const UserModel = require("./models/users.js");
const PostModel = require("./models/post.js");

let app = Express();

app.use(Express.json());
app.use(Cors());

Mongoose.connect("mongodb://akshara:Akak4812@ac-kaukwea-shard-00-00.dz9thle.mongodb.net:27017,ac-kaukwea-shard-00-01.dz9thle.mongodb.net:27017,ac-kaukwea-shard-00-02.dz9thle.mongodb.net:27017/blogappdb?ssl=true&replicaSet=atlas-9gt2a1-shard-0&authSource=admin&appName=Cluster0");


//sign in

app.post("/signin", async (req, res) => {

    let input = req.body
    let result=UserModel.find({email:req.body.email}).then(
        (items)=>{
            if (items.length>0){

                const passwordValidator=Bcrypt.compareSync(req.body.password,items[0].password)
                if (passwordValidator){

                    jwt.sign({email:req.body.email},"blogapp",{expiresIn:"1d"},
                        (error,token)=>{
                            if (error){
                                res.json({"status":"error","errorMessage":error})
                            } else {
                                res.json({"status":"success","token":token,"userId":items[0]._id})
                            }
                        }
                    )

                }else{
                    res.json({
                        "status":"error",
                        "errorMessage":"Invalid password"
                    })
                }

            } else {
                res.json({
                    "status":"error",
                    "errorMessage":"Invalid email id"
                })

            }
        }
).catch()

});

//create api

app.post("/create", async (req, res) => {

    let input = req.body;

    let token = req.headers.token

    jwt.verify(token, "blogapp", async (error, decoded) => {

        if (decoded && decoded.email){

            let result = new PostModel(input)
            await result.save()
            res.json({"status":"success"})

        }else{
            res.json({"status":"invalid authentication"})
        }

})

})


//sign out
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

app.listen(7500, () => {
    console.log("server started");
});