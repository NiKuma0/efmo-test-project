import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

describe('AppController', () => {
  let userController: UserController;
  let userService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                id: 1,
                fullname: 'Full Name 1',
                username: 'username 1',
              },
              {
                id: 2,
                fullname: 'Full Name 2',
                username: 'username 2',
              },
              {
                id: 2,
                fullname: 'Full Name 2',
                username: 'username 2',
              },
            ]),
          },
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should be find all users', () => {
      userController.findAll();
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should create the user', () => {
      userController.create({ fullname: 'Full name', username: 'username' });
      expect(userService.create).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    it('should update the user', () => {
      userController.update(1, { fullname: 'Full name', username: 'username' });
      expect(userService.update).toHaveBeenCalled();
    });
  });
});
