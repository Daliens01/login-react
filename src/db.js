import moongoose from "mongoose"

const connectDB = async () => {
   
    try {
        await moongoose.connect("mongodb+srv://ortizbarahona2:PASSwrd5618@cluster0.b7yn7et.mongodb.net/?retryWrites=true&w=majority")
        console.log("DB CONNECTED");
        
    } catch (error) {
        console.log(error);
        
    }
   
}

export {connectDB}