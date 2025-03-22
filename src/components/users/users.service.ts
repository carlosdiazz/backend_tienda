import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { In, Repository, DataSource } from 'typeorm';

//Propias
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { MESSAGE } from '../../config';
import { Role } from '../role';
import { SignupInput } from '../../auth/dto/signup.input';
import { PaginationArgs } from 'src/common';
import { EmpresaService } from '../empleados';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepositoty: Repository<Role>,
    private readonly empleadoService: EmpresaService,
    private readonly dataSource: DataSource,
  ) {}

  private logger: Logger = new Logger('UsersService');

  async create(signupInput: SignupInput): Promise<User> {
    const { role, id_empleado, ...rest } = signupInput;

    await this.empleadoService.findOne(id_empleado);

    try {
      const roles = await this.roleRepositoty.findBy({
        id: In(role),
      });
      if (roles.length == 0) {
        throw new Error(MESSAGE.ESTOS_ID_DE_ROLES_NO_SON_Validos);
      }

      const newUser = this.userRepository.create({
        ...rest,
        empleado: {
          id: id_empleado,
        },
        token: null,
        role: roles,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(error?.message);
      throw new BadRequestException(error?.detail);
    }
  }

  public async updateToken(id: number, token: string): Promise<User> {
    const user = await this.findOneById(id);
    user.token = token;
    return await this.userRepository.save(user);
  }

  public async findAll(
    paginationArgs: PaginationArgs,
    user: User,
  ): Promise<User[]> {
    const { limit, offset, activo } = paginationArgs;
    const new_id_user: null | number = user.root === true ? null : user.id;
    // Aqui devulevo el finde si no me manda roles

    return this.userRepository.find({
      where: {
        activo,
      },
      take: limit,
      skip: offset,
    });
    // Aqui hago mi query en si
  }

  public async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(MESSAGE.MAIL_O_CONTRASENA_INCORRECTA);
    }
    return user;
  }

  public async findOneByEmailSinError(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        role: true,
      },
    });
    return user;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new NotFoundException(MESSAGE.MAIL_O_CONTRASENA_INCORRECTA);
    }
    return user;
  }

  public async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const { role, ...toUpdate } = updateUserInput;
    const user = await this.findOneById(id);

    // Verificar si la propiedad 'password' es null y eliminarla si es así
    if (toUpdate.password === null) {
      delete toUpdate.password;
    }

    //Si mando actualizar la contrasena borro el token
    if (toUpdate.password) {
      const newPassword = await bcrypt.hash(toUpdate.password, 10);
      toUpdate.password = newPassword;
      user.token = null;
    }
    this.userRepository.merge(user, toUpdate);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (role) {
        const roles = await this.roleRepositoty.find({
          where: { id: In(role) },
        });
        if (roles.length === 0) {
          throw new NotFoundException(MESSAGE.ESTOS_ID_DE_ROLES_NO_SON_Validos);
        }
        user.role = roles;
      }

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new UnprocessableEntityException(
        `${MESSAGE.COMUN_NO_SE_PUDO_ACTUALIZAR} => ${error?.message}`,
      );
    }
  }
}
