import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, RoleEnum, StatusEnum, User } from '@prisma/client';

import { MediaEntity } from './media.entity';

export class UserEntity implements User {
  @ApiProperty({
    type: Number,
    description: 'The unique identifier for the user',
    example: 123,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'The name of the user',
    example: 'Admin',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user',
    example: 'x@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    example: '123456',
  })
  password: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The refresh token of the user',
    example: 'dkifja7fa89s7fa9sdf',
  })
  refreshToken: string | null;

  @ApiPropertyOptional({
    type: String,
    description: 'The recovery password token of the user',
    example: 'dkifja7fa89s7fa9sdf',
  })
  recoveryPasswordToken: string;

  @ApiPropertyOptional({
    type: Date,
    description: 'The delete date of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  deletedAt: Date | null;

  @ApiProperty({
    type: Date,
    description: 'The created date of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiPropertyOptional({
    type: Date,
    description: 'The updated date of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date | null;

  @ApiProperty({
    description: 'The status of the user',
    example: 'ACTIVE',
  })
  status: StatusEnum;

  @ApiPropertyOptional({ type: MediaEntity })
  Media: MediaEntity | null;

  @ApiPropertyOptional({
    type: Number,
    description: 'The unique identifier for the media',
    example: 123,
  })
  mediaId: number | null;

  @ApiPropertyOptional({
    type: String,
    example: 'ADMIN',
  })
  role: RoleEnum;
}
