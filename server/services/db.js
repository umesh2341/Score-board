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
        
    }
