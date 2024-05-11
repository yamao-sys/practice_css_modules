import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create_todo.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';
import { CreateTodoResponseDto } from './dto/create_todo_response.dto';
import { format_validation_errors } from '../lib/format_validation_errors';
import { FetchAllTodosResponseDto } from './dto/find_all_todos_response.dto';
import { FetchTodoResponseDto } from './dto/fetch_todo_response.dto';
import { UpdateTodoResponseDto } from './dto/update_todo_response.dto';
import { DeleteTodoResponseDto } from './dto/delete_todo_response.dto';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiCreatedResponse({
    type: FetchAllTodosResponseDto,
    description: 'ログインユーザのTODO一覧取得',
  })
  async index(@Request() req: { user: JwtPayload }) {
    return await this.todosService.findAll(req.user.userId);
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateTodoResponseDto,
    description: 'ログインユーザのTODO作成成功',
  })
  async create(
    @Request() req: { user: JwtPayload },
    @Body() dto: CreateTodoDto,
  ) {
    const todo = await this.todosService.buildNewTodo(dto, req.user.userId);
    const validationErrors = await this.todosService.validate(todo);
    if (!!validationErrors.length) {
      return { errors: format_validation_errors(validationErrors) };
    }

    try {
      const savedTodo = await this.todosService.save(todo);
      return { title: savedTodo.title, content: savedTodo.content };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: FetchTodoResponseDto,
    description: 'ログインユーザの指定したTODOの取得',
  })
  async show(@Request() req: { user: JwtPayload }, @Param('id') id: string) {
    const todo = await this.todosService.read(id, req.user.userId);
    if (!todo) {
      throw new NotFoundException({
        statusCode: 404,
        message: '該当するTODOがありません。',
      });
    }
    return { id: todo.id, title: todo.title, content: todo.content };
  }

  @Put(':id')
  @ApiCreatedResponse({
    type: UpdateTodoResponseDto,
    description: 'ログインユーザの指定したTODOの更新',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
    @Request() req: { user: JwtPayload },
  ) {
    const todo = await this.todosService.read(id, req.user.userId);
    if (!todo) {
      throw new NotFoundException({
        statusCode: 404,
        message: '該当するTODOがありません。',
      });
    }

    const assignedAttributesTodo =
      await this.todosService.assignUpdateAttribute(todo, dto);
    const validationErrors = await this.todosService.validate(
      assignedAttributesTodo,
    );
    if (!!validationErrors.length) {
      return { errors: format_validation_errors(validationErrors) };
    }

    try {
      const updatedTodo = await this.todosService.save(assignedAttributesTodo);

      return { title: updatedTodo.title, content: updatedTodo.content };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiCreatedResponse({
    type: DeleteTodoResponseDto,
    description: 'ログインユーザの指定したTODOの削除',
  })
  async delete(@Request() req: { user: JwtPayload }, @Param('id') id: string) {
    const todo = await this.todosService.read(id, req.user.userId);
    if (!todo) {
      throw new NotFoundException({
        statusCode: 404,
        message: '該当するTODOがありません。',
      });
    }
    try {
      await this.todosService.delete(todo);

      return { message: 'TODOの削除に成功しました。' };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
