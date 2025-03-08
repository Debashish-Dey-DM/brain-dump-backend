export class CreateJournalDto {
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;

  constructor() {
    this.title = '';
    this.content = '';
    this.tags = [];
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
