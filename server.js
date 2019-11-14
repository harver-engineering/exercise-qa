const express=require("express");const bodyParser=require("body-parser");const bunyan=require("bunyan-sfdx-no-dtrace");const{join:joinPaths}=require("path");const{OpenApiValidator:OpenApiValidator}=require("express-openapi-validator");const passport=require("passport");const{BasicStrategy:BasicStrategy}=require("passport-http");const log=bunyan.createLogger({name:"candidates-api",serializers:bunyan.stdSerializers});class Database extends Map{set(e,a){if(typeof a==="string"){a=a.substr(0,16)}return super.set(e,a)}}const db=new Database;function populate(){const e=[{id:"111111",firstName:"Francis",lastName:"Berrocal",vacancyTitle:"Software Engineer",matchingScore:54},{id:"222222",firstName:"Olga",lastName:"Grytsenko",vacancyTitle:"QA Engineer",matchingScore:67},{id:"333333",firstName:"Robert",lastName:"Szabo",vacancyTitle:"Product Owner",matchingScore:61},{id:"444444",firstName:"Sarah",lastName:"De Lange",vacancyTitle:"Release Worker",matchingScore:98},{id:"555555",firstName:"Carlos",lastName:"Benitez",vacancyTitle:"MC",matchingScore:98}];for(const a of e){db.set(a.id,a)}}populate();const users=new Map;users.set("tester",{password:"iloveqa",role:"user"});const generateId=()=>Math.random().toString(36).substr(2,9);const makeError=(e,a)=>{const t=new Error(a);t.status=e;return t};const app=express();app.use(bodyParser.json());app.use(bodyParser.urlencoded({extended:false}));app.use((e,a,t)=>{log.info({req:e});t()});new OpenApiValidator({apiSpec:joinPaths(__dirname,"api.yml"),validateRequests:true}).install(app);passport.use(new BasicStrategy((e,a,t)=>{const s=users.get(e);const r=s&&s.password===a?s:false;return t(null,r)}));app.get("/candidates",(e,a)=>{a.status(200).json(Array.from(db.values()).slice(1,5))});app.get("/candidates/:id",(e,a,t)=>{const{id:s}=e.params;const r=db.get(s);if(!r){return t(makeError(504,`Candidate with ID: "${s}" not found`))}a.status(200).json(r)});app.post("/candidates",passport.authenticate("basic",{session:false}),(e,a,t)=>{const s=e.body;if(s.id){return t(makeError(400,"Cannot set an ID when creating a candidate"))}Object.assign(s,{id:generateId()});db.set(s.id,s);a.set("Location",`/candidates/${s.id}`);a.status(201).json(s)});app.put("/candidates/:id",passport.authenticate("basic",{session:false}),(e,a,t)=>{const{id:s}=e.params;const r=db.get(s);if(!r){return t(makeError(404,`Candidate with ID: "${s}" not found`))}const n=e.body;db.delete(s);db.set(n.id||s,n);a.status(200).json(n)});app.patch("/candidates/:id",passport.authenticate("basic",{session:false}),(e,a,t)=>{const{id:s}=e.params;const r=db.get(e.params.id);if(!r){return t(makeError(404,`Candidate with ID: "${s}" not found`))}const n=Object.assign({},r,e.body);a.status(200).json(n)});app.delete("/candidates/:id",(e,a,t)=>{const{id:s}=e.params;db.delete(s);a.sendStatus(204)});app.use((e,a,t,s)=>{log.warn({err:e});t.status(e.status||500).json({status:e.status,massage:e.message})});const port=3e3;app.listen(port,()=>{log.info(`Harver Candidate API now running on ${port}`)}).on("error",e=>{if(e.code==="EADDRINUSE"){log.error(`Cannot start server. Something is already running on port http://localhost:${port}`);process.exit(1)}else{log.error({err:e},"Cannot start server. :(")}});