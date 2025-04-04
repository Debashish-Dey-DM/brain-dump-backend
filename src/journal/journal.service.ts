// import { JournalInterface } from './interfaces/journalInterface';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
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
  async getJournalsByTagsExcludingId(tags: string[], excludeId: number) {
    const queryBuilder = this.journalRepository.createQueryBuilder('journal');
    queryBuilder.where('journal.id != :excludeId', { excludeId });
    queryBuilder.andWhere(
      new Brackets((qb) => {
        tags.forEach((tag, i) => {
          qb.orWhere(`journal.tags @> :tag${i}`, { [`tag${i}`]: [tag] });
        });
      }),
    );
    queryBuilder.orderBy('journal.createdAt', 'DESC');
    queryBuilder.take(5);
    return await queryBuilder.getMany();
  }
  // Get recent 3 journals
  async getRecentJournals(): Promise<Journal[]> {
    try {
      console.log('Fetching recent journals');

      const recentJournals = await this.journalRepository
        .createQueryBuilder('journal')
        .orderBy('journal.createdAt', 'DESC')
        .take(3)
        .getMany();

      if (!recentJournals || recentJournals.length === 0) {
        throw new BadRequestException('No recent journals found');
      }

      return recentJournals;
    } catch (error) {
      console.error('Error in getRecentJournals:', error);
      throw new InternalServerErrorException('Failed to fetch recent journals');
    }
  }
  async getAllTags(): Promise<string[]> {
    try {
      const journals = await this.journalRepository.find();
      if (!journals) {
        throw new BadRequestException('No journals found');
      }
      const tags = journals
        .map((journal) => journal.tags)
        .flat()
        .filter((tag, index, self) => self.indexOf(tag) === index);
      return tags;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getJournalByTag(tag: string): Promise<Journal[]> {
    try {
      const journals = await this.journalRepository
        .createQueryBuilder('journal')
        .where(':tag = ANY(journal.tags)', { tag })
        .getMany();
      if (!journals) {
        throw new BadRequestException('No journals found');
      }
      return journals;
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
