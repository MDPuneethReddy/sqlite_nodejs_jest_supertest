import * as express from "express"
import db from "../sqlitedb/db";
const usersRouter = express.Router();
//get all users
usersRouter.get("/",(req,res)=>{
    const getQuery="SELECT * FROM users"
    db.all(getQuery, (err:any, rows:any) => {
        console.log(rows)
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
})
//get individual user
usersRouter.get("/user",(req,res)=>{
    const id=req.body.userId
    console.log("id",id)
    const getQuery="SELECT * FROM users WHERE id=?"
    const params=[id]
    db.get(getQuery,params, (err:any, row:any) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if(typeof row==="undefined"){
            res.status(404).send({
                "message":"User NotFound"
            })
            return
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
})
usersRouter.post("/",(req,res)=>{
    const data = {
      name: req.body.name,
      email: req.body.email
    }
    console.log(data)
    const sql ="INSERT INTO users (name, email) VALUES (?,?)";
    const params =[data.name, data.email]
    db.run(sql, params, (err:any, result:any)=>{
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
      })
    })
})
usersRouter.put("/",(req,res)=>{
  const data = {
    id:req.body.id,
    name: req.body.name,
    email: req.body.email
  }
  console.log(data)
  const sql ="UPDATE users SET name=?,email=? WHERE id=? ";
  const params =[data.name, data.email,data.id]
  db.run(sql, params, (err:any, result:any)=>{
    if (err){
        res.status(400).json({"error": err.message})
        return;
    }
    res.json({
        "message": "success",
    })
  })
})
usersRouter.delete("/",(req,res)=>{
  const data = {
    id: req.body.id
  }
  console.log(data)
  //check the user
  const getQuery="SELECT * FROM users WHERE id=?"
    const params=[data.id]
    db.get(getQuery,params, (err:any, row:any) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        if(typeof row==="undefined"){
            res.status(404).send({
                "message":"User NotFound"
            })
            return
        }
        const sql ="DELETE FROM users WHERE id=?";
        const params1 =[data.id]
        db.run(sql, params1, (err:any, result:any)=>{
          if (err){
              res.status(400).json({
                "message":err.message
              })
              return;
          }
          res.json({
              "message": "success",
          })
        })
      })
})
export default usersRouter