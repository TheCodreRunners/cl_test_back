import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Param, 
  UseGuards,
  Request 
} from '@nestjs/common';
import { MeService } from './me.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('me')
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get('books')
  getMyBooks(@Request() req) {
    return this.meService.getUserBooks(req.user.id);
  }

  @Post('books/:bookId')
  addBookToMyList(@Request() req, @Param('bookId') bookId: string) {
    return this.meService.addBookToUser(req.user.id, bookId);
  }

  @Delete('books/:bookId')
  removeBookFromMyList(@Request() req, @Param('bookId') bookId: string) {
    return this.meService.removeBookFromUser(req.user.id, bookId);
  }
}
