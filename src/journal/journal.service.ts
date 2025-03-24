// import { JournalInterface } from './interfaces/journalInterface';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journal } from './journal.entity';
import { CreateJournalDto, UpdateJournalDto } from './journal.dto';
@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private journalRepository: Repository<Journal>,
  ) {}
  async createJournal(journal: CreateJournalDto): Promise<Journal> {
    try {
      const newJournal = this.journalRepository.create(journal);
      console.log(newJournal);
      const respinse = await this.journalRepository.save(newJournal);
      console.log(respinse);
      return newJournal;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getJournals(): Promise<Journal[]> {
    try {
      const journals = await this.journalRepository.find();
      if (!journals) {
        throw new BadRequestException('No journals found');
      }
      return journals;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getJournalById(id: number): Promise<Journal | null> {
    try {
      const journal = await this.journalRepository.findOne({ where: { id } });
      if (!journal) {
        throw new BadRequestException('Journal not found');
      }
      return journal;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async updateJournal(
    id: number,
    journal: UpdateJournalDto,
  ): Promise<Journal | null> {
    try {
      const JournalToUpdate = await this.journalRepository.findOne({
        where: { id },
      });
      if (!JournalToUpdate) {
        throw new BadRequestException('Journal not found');
      }
      await this.journalRepository.update(id, journal);
      return await this.journalRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async deleteJournal(id: number): Promise<void> {
    try {
      const journalToDelete = await this.journalRepository.findOne({
        where: { id },
      });
      if (!journalToDelete) {
        throw new BadRequestException('Journal not found');
      }
      await this.journalRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
