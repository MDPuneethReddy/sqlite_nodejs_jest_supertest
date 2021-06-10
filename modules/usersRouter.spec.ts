import {app} from '../index' // Link to your server file
import request from 'supertest'
describe("test users endpoints",()=>{
    it("test get all users",async()=>{
        const value=3
        expect(value*2).toBe(6)
        const res = await request(app)
                    .get('/api/users')
        expect(res.status).toBe(200)
    })
    it("post user",async()=>{
        const res = await request(app)
                    .post('/api/users')
                    .send({
                        name:"puneeth",
                        email:"puneeth@gmail.com"
                    })
        expect(res.status).toBe(200)
      
    })
    it("post user gives error for unique email",async()=>{
        const res = await request(app)
                    .post('/api/users')
                    .send({
                        name:"puneeth",
                        email:"puneeth@gmail.com"
                    })
        expect(res.status).toBe(400)
      
    })
    it("test get single user",async()=>{
        const res = await request(app)
                    .get('/api/users/user')
                    .send({
                        userId:1
        })
        expect(res.status).toBe(200)
      
    })
    it("fail test get single user",async()=>{
        const res = await request(app)
                    .get('/api/users/user')
                    .send({
                        userId:100
                    })
        expect(res.status).toBe(404)
    })
    
})
