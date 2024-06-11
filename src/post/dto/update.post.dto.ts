import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdatePostDTO {
    @IsString()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    url: string
}