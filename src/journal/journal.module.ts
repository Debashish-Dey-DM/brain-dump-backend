import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Journal } from './journal.entity';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  providers: [JournalService],
  controllers: [JournalController],
})
export class JournalModule {}
