import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto, UpdateJournalDto } from './journal.dto';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  async create(@Body() createJournalDto: CreateJournalDto) {
    return await this.journalService.createJournal(createJournalDto);
  }
  @Get()
  async findAll() {
    return await this.journalService.getJournals();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.journalService.getJournalById(id);
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updateJournalDto: UpdateJournalDto,
  ) {
    return await this.journalService.updateJournal(id, updateJournalDto);
  }
}
