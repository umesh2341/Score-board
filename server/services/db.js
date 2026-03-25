import { dbService } from "../thridpartyServices.js";

export const database={
    async saveUser(id,name,role,email){
        const {data,error}=await dbService.from('usrs').insert(({id,name,role,email})).select();
        return  data;
        },
    async loginUser(email,password){
        try{
            const {data,error}=await dbService.auth.signInWithPassword({
            email,password
        })
        if(error) throw error;
        return data;
     }
        catch(error){
            return "error"
        }
    }
    ,
    async getuser(token){
    const {data,error}=await dbService.auth.getUser(token);
    if(error) throw error;
    return data.user.id;
    }
    ,
    async findName(id){
        const {data,error}=await dbService.from('usrs').select('name').eq('id',id);
        if(error) throw error;
        return data[0].name;
    }
        
    }
// const datas=await database.getuser("eyJhbGciOiJFUzI1NiIsImtpZCI6ImIzNGM2NWFhLWQ3NTUtNDY4MS1hYmQwLWExMzQ1NTYzNGMxZiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3V5d2VkdnNyamJvbWtncHl4cHd5LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI2Mzg0ZmQzMy03YmMyLTQ1MTgtODg1OS0wZGYzOWFiMTYzZmIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc0NDE1NDcxLCJpYXQiOjE3NzQ0MTE4NzEsImVtYWlsIjoiYmdtaW9wMTM5QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzc0NDExODcxfV0sInNlc3Npb25faWQiOiIyNTFjZDg4NC1hYjkzLTRhNjEtYjU2ZC1kOWE4YmJhODEwMzAiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.aZd-8c6z9zX-Nx6rXHXZWSdMAMHSdgr6Vtx3_0QXhu_YQO4MsxThPwRj4qPaRtG--8EUQPc2n6nzo14LP6tmXQ")
// console.log(datas);
 const datas=await database.findName('6384fd33-7bc2-4518-8859-0df39ab163fb');
 console.log(datas)
