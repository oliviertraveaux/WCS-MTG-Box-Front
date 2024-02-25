import { Pipe, PipeTransform } from '@angular/core';
import { ApiCard } from '../../models/card-api.model';
@Pipe({
    standalone: true,
    name: 'getApiCardImg',
})
export class GetApiCardImgPipe implements PipeTransform {
    transform(card: ApiCard, language: string): string {
        switch (language) {
            case 'French':
                const frenchCard = card.foreignNames?.find((card) => card.language === 'French');
                return frenchCard?.imageUrl ?? card.imageUrl;
            case 'English':
                return card.imageUrl;
            default:
                return card.imageUrl;
        }
    }
}
