export abstract class SanitizerService {
    abstract clean(dirtyContent: string): string
} 