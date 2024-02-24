import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    standalone: true,
    name: 'getLanguageAbbreviation',
})
export class GetLanguageAbbreviationPipe implements PipeTransform {
    transform(language: string): string {
        switch (language) {
            case 'French':
                return 'FR';
            case 'English':
                return 'EN';
            default:
                return '';
        }
    }
}
