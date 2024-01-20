import { Pipe, PipeTransform } from '@angular/core';
import { CardApi } from '../../models/card-api.model';
@Pipe({
    standalone: true,
    name: 'getTranslatedCardName',
})
export class GetTranslatedCardNamePipe implements PipeTransform {
    transform(card: CardApi, language: string): string {
        switch (language) {
            case 'French':
                const frenchCard = card.foreignNames.find((card) => card.language === 'French');
                return frenchCard?.name ?? card.name;
            case '':
                return card.name;
            default:
                return card.name;
        }
    }
}
