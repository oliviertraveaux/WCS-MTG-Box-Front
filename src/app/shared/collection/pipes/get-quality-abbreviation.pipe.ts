import { Pipe, PipeTransform } from '@angular/core';
import { CardQuality } from '../enums/cardQuality';

@Pipe({
    standalone: true,
    name: 'getQualityAbbreviation',
})
export class GetQualityAbbreviationPipe implements PipeTransform {
    transform(quality: CardQuality | undefined): string {
        switch (quality) {
            case CardQuality.mint:
                return 'MN';
            case CardQuality.nearMint:
                return 'NM';
            case CardQuality.excellent:
                return 'EX';
            case CardQuality.good:
                return 'GD';
            case CardQuality.lightPlayed:
                return 'LP';
            case CardQuality.played:
                return 'PL';
            case CardQuality.poor:
                return 'PO';
            default:
                return '';
        }
    }
}
