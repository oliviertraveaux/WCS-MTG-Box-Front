import { Pipe, PipeTransform } from '@angular/core';
import { CardRarity } from '../enums/card-rarity.enum';

@Pipe({
    standalone: true,
    name: 'getRarityClass',
})
export class GetRarityClassPipe implements PipeTransform {
    transform(rarity: CardRarity): string {
        switch (rarity) {
            case CardRarity.unCommon:
                return 'text-gray-500';
            case CardRarity.common:
                return 'text-black';
            case CardRarity.rare:
                return 'text-yellow-400';
            case CardRarity.mythicRare:
                return 'text-yellow-600';
            case CardRarity.basicLand:
                return '';
            case CardRarity.special:
                return '';
            default:
                return '';
        }
    }
}
