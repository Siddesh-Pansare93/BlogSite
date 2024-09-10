import { Client , Account , ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
     Client = new Client() ;  
     account ; 

     constructor(){
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId) ; 
        this.account(Client)
     }

     async createAccount({name , email , password}){
            try {
                const userAccount = await this.account.create(ID.unique(),  name ,email , password)
                if (userAccount) {
                    // call login function 
                     return this.login({email, password})
                } else {
                    return userAccount
                }

            } catch (error) {
                throw  error
            }
     }

     async login({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            throw error 
        }
     }

     async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error 
        }
        return null 
     }

     async logout(){
        try {
            await this.account.deleteSessions('current')
        } catch (error) {
            throw error 
            
        }
     }
}

const  authService  = new AuthService()

export default authService