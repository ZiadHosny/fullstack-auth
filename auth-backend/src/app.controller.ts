import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Protected Route' })
  @ApiResponse({ status: 200, description: 'Valid token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProtectedData(@Request() req) {
    return { message: 'This is a protected route', user: req.user };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
