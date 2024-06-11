import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class InsertPostDTO {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsNotEmpty()
    url: string
}