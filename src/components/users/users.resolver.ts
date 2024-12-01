import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

//Propios
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { ROLES } from '../../config';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { PaginationArgs } from '../../common';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], {
    name: 'allUser',
    description: 'Devolver todos los usuarios',
  })
  public async findAll(
    @CurrentUser([ROLES.USER_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return await this.usersService.findAll(paginationArgs, user);
  }

  @Query(() => User, {
    name: 'findUser',
    description: 'Devolver todos los usuarios',
  })
  public async findOne(
    @CurrentUser([ROLES.USER_VIEW]) user: User,
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Con este query actualiza el usuario',
  })
  public async updateUser(
    @CurrentUser([ROLES.USER_UPDATE]) user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
}
