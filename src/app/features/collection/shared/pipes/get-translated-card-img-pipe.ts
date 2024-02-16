import { Pipe, PipeTransform } from '@angular/core';
import { CardApi } from '../../models/card-api.model';
@Pipe({
    standalone: true,
    name: 'getTranslatedCardImg',
})
export class GetTranslatedCardImgPipe implements PipeTransform {
    transform(card: CardApi, language: string): string {
        switch (language) {
            case 'French':
                const frenchCard = card.foreignNames.find((card) => card.language === 'French');
                return frenchCard?.imageUrl ?? card.imageUrl;
            case '':
                return card.imageUrl;
            default:
                return card.imageUrl;
        }
    }
}
