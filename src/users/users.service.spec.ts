import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { IUserRepository, USER_REPOSITORY } from './user.repository.interface';
import { User, UserRole } from './users.entity';
import { NotFoundException } from '@nestjs/common';
import { errorMessages } from 'src/global/error';

describe('UsersService', () => {
    let userService: UsersService;
    let mockUserRepository: jest.Mocked<IUserRepository>;

    beforeEach(async () => {
        mockUserRepository = {
            findOne: jest.fn(),
            findOneByName: jest.fn(),
            findAll: jest.fn(),
            createUser: jest.fn(),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: USER_REPOSITORY,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        userService = module.get<UsersService>(UsersService);
    });

    describe('findOne', () => {
        it('should return a user when found by id', async () => {
            const mockUser = {
                id: 1,
                name: 'John Doe',
                password: 'password',
                role: [UserRole.USER],
                hasId: jest.fn(),
                save: jest.fn(),
                remove: jest.fn(),
                softRemove: jest.fn(),
                recover: jest.fn(),
                reload: jest.fn(),
            } as User;
            mockUserRepository.findOne.mockResolvedValue(mockUser);

            const result = await userService.findOne(1);

            expect(result).toEqual(mockUser);
            expect(mockUserRepository.findOne).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException when user is not found', async () => {
            mockUserRepository.findOne.mockResolvedValue(null);

            await expect(userService.findOne(1)).rejects.toThrow(
                new NotFoundException(errorMessages.userNotFound),
            );
            expect(mockUserRepository.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('findOneByName', () => {
        it('should return a user when found by name', async () => {
            const mockUser = {
                id: 1,
                name: 'John Doe',
                password: 'password',
                role: [UserRole.USER],
                hasId: jest.fn(),
                save: jest.fn(),
                remove: jest.fn(),
                softRemove: jest.fn(),
                recover: jest.fn(),
                reload: jest.fn(),
            } as User;
            mockUserRepository.findOneByName.mockResolvedValue(mockUser);

            const result = await userService.findOneByName(mockUser.name);

            expect(result).toEqual(mockUser);
            expect(mockUserRepository.findOneByName).toHaveBeenCalledWith(
                mockUser.name,
            );
        });

        it('should throw NotFoundException when user is not found', async () => {
            mockUserRepository.findOneByName.mockResolvedValue(null);

            await expect(userService.findOneByName('test')).rejects.toThrow(
                new NotFoundException(errorMessages.userNotFound),
            );
            expect(mockUserRepository.findOneByName).toHaveBeenCalledWith(
                'test',
            );
        });
    });
});
