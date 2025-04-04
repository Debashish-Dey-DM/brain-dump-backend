import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
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
  // Get journals by tags
  @Get('tags/:tag')
  async getJournalsByTags(@Param('tag') tag: string) {
    console.log('tag', tag);
    return await this.journalService.getJournalByTag(tag);
  }
  @Get('tags')
  async getAllTags() {
    return await this.journalService.getAllTags();
  }

  @Get('recent')
  async getRecentJournals() {
    try {
      return await this.journalService.getRecentJournals();
    } catch (error) {
      console.error('Error fetching recent journals:', error);
      throw error; // rethrow or return a response with error message
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.journalService.getJournalById(id);
  }

  @Get(':id/related')
  async getRelatedJournals(
    @Param('id') id: number,
    @Query('tags') tags: string,
  ) {
    const tagArray = tags.split(','); // Convert comma string to array
    return await this.journalService.getJournalsByTagsExcludingId(tagArray, id);
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updateJournalDto: UpdateJournalDto,
  ) {
    return await this.journalService.updateJournal(id, updateJournalDto);
  }
}
