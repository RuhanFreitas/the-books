import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [AdminModule, ReviewModule],
  controllers: [AdminController],
  providers: [],
})
export class AppModule {}
