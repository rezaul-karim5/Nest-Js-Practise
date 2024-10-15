import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository, USER_REPOSITORY } from './user.repository.interface';
import { extname, join } from 'path';
import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class UsersService {
    private readonly uploadFolder = './uploads';
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: IUserRepository,
    ) {}

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOne(id);
    }

    async findOneByName(name: string): Promise<User | undefined> {
        return this.userRepository.findOneByName(name);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }

    async saveFile(
        uploadFile: UploadFileDto,
        file: Express.Multer.File,
    ) {
        const fileExt = extname(file.originalname);
        const fileName = `${uuid()}-${uploadFile.name}${fileExt}`;
        const filePath = join(this.uploadFolder, fileName);
        try {
            await fs.mkdir(this.uploadFolder, { recursive: true });
            await fs.writeFile(filePath, file.buffer);

            return {
                message: 'File uploaded successfully',
                filename: fileName,
                originalname: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
            };
        } catch (error) {
            throw new BadRequestException(error);
        }
    }
}
