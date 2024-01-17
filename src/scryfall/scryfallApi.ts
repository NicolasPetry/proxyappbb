import axios from "axios"
import * as fs from 'fs';


export class ScryfallApi {


    /**
     * 
     * @param imageUrl scryfall url 
     * @param filePath where the application save the img
     * @returns 
     */
    async getImage(imageUrl: string, filePath: string) {

        try{

            const writer = fs.createWriteStream(filePath);

            const response = await axios.get(imageUrl, { responseType: 'stream' });

            response.data.pipe(writer);
   
            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
           } catch (error) {
            console.log(error);
           }

    }
    
}