import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findMe(@Req() req, @Res() res) {
    if(req.user){
      res.json({first_name: req.user.first_name, last_name: req.user.last_name, avatar: req.user.avatar});
    }else{
      res.json({});
    }
  }
}
