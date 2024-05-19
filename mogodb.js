import mongoose from "mongoose"
import 'dotenv/config'

  export async  function connectDB(){
     try {
        
        const res= await mongoose.connect(`${process.env.MONGO_URL}`)
        if(res){
          console.log("Mongodb connected");
        }
         
     } catch (error) {
         console.log("Error in connecting database")
     }
    
    }

  
    
   