import { Module } from '@nestjs/common';
import { GeminiService } from './providers/gemini.service';
import { AiService } from './ai.service';

@Module({
  providers: [
    {
      provide: AiService,
      useClass: GeminiService
    }
  ],
  exports: [
    AiService
  ]
})
export class AiModule {}
