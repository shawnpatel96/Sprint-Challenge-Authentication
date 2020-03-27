const server = require('../api/server');
const request = require('supertest');
const db = require ('../database/dbConfig');

describe('authentication', ()=>{
    describe('POST /register',()=>{
    it('should return new user', ()=>{
        return request(server).post('/api/auth/register')
            .send({username: 'shawn12', password: '1234'})
            .then(res=>{
                expect(res.status).toBe(201);
            })
    })
        it('should fail if provided no username OR a already existing user', ()=>{
            return request(server).post('/api/auth/register')
                .send({username: ''})
                .then(res=>{
                    expect(res.status).toBe(500);
                })
        })
})
    
    describe('POST /login', ()=>{
        it('should log in ', ()=>{
                return request(server).post('/api/auth/login')
                    .send({username: 'shawn1', password: '1234'})
                    .then(res=>{
                        expect(res.status).toBe(200);
                    })
            })
        it('should not log in', ()=>{
                return request(server).post('/api/auth/login')
                    .send({username: 'thegreatwall', password: ''})
                    .then(res=>{
                        expect(res.status).toBe(401);
                    })
                })
            })
})