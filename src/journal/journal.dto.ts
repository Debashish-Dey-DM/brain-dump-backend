export class CreateJournalDto {
  title: string;
  content: string;
  tags: string[];
  description: string;
  createdAt: Date;

  constructor() {
    this.title = '';
    this.content = '';
    this.tags = [];
    this.description = '';
    this.createdAt = new Date();
  }
}

export class UpdateJournalDto {
  id: number;
  title?: string;
  content?: string;
  updatedAt?: Date;

  constructor() {
    this.id = 0;
    this.updatedAt = new Date();
  }
}
