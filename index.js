const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const pack = require('../package.json');
const port = 5000;

const app = express();
const apiRoot = '/api';
const router = express.Router();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin:/http:\/\/localhost/}));
app.options('*', cors());
router.get('/', (request, response)=>{
    response.send(`${pack.description} - v ${pack.version}`)
});
app.use(apiRoot, router);
const db = {
    "sample":{
        name:"janghl",
        age:22,
        gender:"straightMale"
    }
};
router.get('/getMethod/:gotThis',(request,response) => {
    const reqName = request.params.gotThis;
    const dbparam = db[reqName];
    if(!dbparam){
        return response.status(404).json({error:"WRONG NAME!"});
    }
    return response.json(dbparam);
}); 
router.post("/postMethod/", (request,response) => {
    const body = request.body;
    if(!body.attr || !body.age){
        return response.status(400).json({error: "need attr and age!"});
    }
    if(db[body.attr]){
        return response.status(400).json({error: "info exists!"});
    }
    let age = body.age;
    if(age && typeof(age) !== 'number'){
        age = parseFloat(age);
        if(isNaN(age)){
            return response.status(400).json({error: "age should be a number!"});
        }
    }
    //create an item
    const newItem = {
        user: body.attr,
        age: age,
        name: "newlyCreated"
    };

    db[newItem.user] = newItem;

    return response.status(201).json(newItem)
});
router.put('/putMethod/:param', (request, response) => {
    const body = request.body;
    const param = request.params.param;
    const content = db[param];
    if(!content){
        return response.status(404).json({error: "Wrong Name!"});
    }
    if(body.attr || body.name){
        return response.status(400).json({error: "Only age is editable!"});
    }
    let age = body.age;
    if(age && typeof(age)!=='number'){
        age = parseFloat(age);
        if(isNaN(age)){
            return response.status(400).json({error: 'not a valid number!'});
        }
    }
    if(body.age){
        content.age = age;
    }
    return response.status(200).json(db)
});
router.delete('/deleteMethod/:toBeDeleted', (request, response) => {
    const body = request.body;
    const param = request.params.toBeDeleted;
    content =  db[param];
    if(!content){
        return response.status(404).json({error: "cannot find the item!"});
    }
    delete db[param];
    return response.status(204);
});
app.listen(port,() => {
    console.log("start a server!");
})
