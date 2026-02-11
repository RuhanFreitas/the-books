import sanitizeHtml from "sanitize-html";
import { SanitizerService } from "./sanitizer.service";

export class SanitizeHtmlService extends SanitizerService {
    clean(dirtyContent: string): string {
        const cleanContent = sanitizeHtml(dirtyContent)

        return cleanContent
    }
}