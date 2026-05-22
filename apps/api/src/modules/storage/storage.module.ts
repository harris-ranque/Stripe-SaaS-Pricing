import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../common/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [PrismaModule, JwtModule],
  providers: [StorageService, JwtAuthGuard],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule {}
