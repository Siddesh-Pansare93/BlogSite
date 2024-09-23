import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client();
    database;
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost(slug , { title, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId, slug,
                {
                    title , content , featuredImage , status 
                })
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error :" , error)

        }
    }

    async updatePost ({ title, slug, content, featuredImage, status, userId } ){
        try {
            return await this.database.updateDocument(conf.appwriteDatabaseId,
                 conf.appwriteCollectionId, slug,
                {
                    title , content , featuredImage , status , userId
                })
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error :" , error)

        }
    }

    async deletePost (slug){
        try {
            await this.database.deleteDocument(conf.appwriteDatabaseId , conf.appwriteCollectionId , slug )
            return true 
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error :" , error)
            return false 
        }
    }

    async getPost(slug){
        try {
            return await this.database.getDocument(conf.appwriteDatabaseId , conf.appwriteCollectionId , slug )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error :" , error)
            return false 
        }
    }


    async getAllPosts(){
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId , 
                conf.appwriteCollectionId ,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("Appwrite Service :: getALlPosts :: error :" , error)
            return false 
        }
    }


    //Storage Service ---------------- have to be separated later 

    async uploadfile (file){
        try {
            return await  this.bucket.createFile(
                conf.appwriteBucketId ,
                ID.unique() , 
                file 
            )
        }
        catch (error) {
            console.log("Appwrite Service :: Uploadfile :: error :" , error)
            return false 
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId , 
                fileId
            ) 
            return true
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error :" , error)
            return false 
            
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId ,
            fileId
        )
    }
}

const service = new Service()

export default service