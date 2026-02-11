import { Module } from "@nestjs/common";
import { HashingService } from "./hashing/hashing.service";
import { BcryptHashingService } from "./hashing/bcrypt-hashing.service";
import { SanitizerService } from "./sanitizer/sanitizer.service";
import { SanitizeHtmlService } from "./sanitizer/sanitize-html.service";

@Module({
    providers: [
        {
            provide: HashingService,
            useClass: BcryptHashingService
        },
        {
            provide: SanitizerService,
            useClass: SanitizeHtmlService
        }
    ],
    exports: [HashingService, SanitizerService]
})
export class CommonModule {}