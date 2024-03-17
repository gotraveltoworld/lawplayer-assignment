import { Expose } from 'class-transformer';
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreatePostRequestBody {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  coverUrl!: string;
}
