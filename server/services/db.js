import { dbService } from "../thridpartyServices";

const database={
    async saveUser(id,name,role,email){
        const {data,error}=dbService.from('usrs').insert(({id,name,role,email})).select();
        return  data;
        },
    async loginUser(email,password){
        const {data,error}=dbService.auth.signInWithPassword({
            email,password
        })
    }
}