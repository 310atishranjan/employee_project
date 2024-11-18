const express=require("express");
const app=express();
const connectDB=require('./config/db');
connectDB();
const cors=require("cors");
// app.use(cors());
// app.use(cors({
//         origin:['http://localhost:5173'],
//         methods:["POST","GET"],
//         credentials:true,
//     })
// )
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials

    if (req.method === "OPTIONS") {
        return res.status(200).end(); // Pre-flight response
    }

    next();
});
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>');
})
const port=3000;
app.use('/api/v1/admin',require("./routes/adminRoutes"));

app.listen(port,()=>{
    console.log(`server is listening ${port}`);
})