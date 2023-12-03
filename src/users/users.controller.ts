import {
    Body, ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors
} from '@nestjs/common';
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        const {email, password} = body;
        return this.usersService.create(email, password);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(+id);
        if (!user) {
            throw new NotFoundException('User was not found');
        }

        return user
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Patch('/:id')
    updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
        return this.usersService.update(+id, body);
    }

}
