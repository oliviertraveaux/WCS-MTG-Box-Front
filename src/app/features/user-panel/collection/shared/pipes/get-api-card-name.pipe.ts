import { Pipe, PipeTransform } from '@angular/core';
import { ApiCard } from '../../models/card-api.model';
@Pipe({
    standalone: true,
    name: 'getApiCardName',
})
export class GetApiCardNamePipe implements PipeTransform {
    transform(card: ApiCard, language: string): string {
        switch (language) {
            case 'French':
                const frenchCard = card.foreignNames?.find((card) => card.language === 'French');
                return frenchCard?.name ?? card.name;
            case 'English':
                return card.name;
            default:
                return card.name;
        }
    }
}
