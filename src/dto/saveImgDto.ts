import { IsNotEmpty } from "class-validator";

export class SaveImgDto {

    @IsNotEmpty()
    imageScryFallUrl: string;
    @IsNotEmpty()
    illustration_id: string;
    
}