import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'Hello World!';
  }
  api(): object {
    return { name: 'Riotly Happy Hour' };
  }
}
