import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    standalone: true,
    name: 'getTruncateText',
})
export class GetTruncateTextPipe implements PipeTransform {
    transform(text: string, maxLength: number): string {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
}
