import { Pipe, PipeTransform } from '@angular/core';
import {CardQuality} from "../enums/cardQuality";

@Pipe({
    standalone: true,
    name: 'getQualityClass',
})
export class GetQualityClassPipe implements PipeTransform {
  transform(quality: CardQuality): string {
    switch (quality) {
      case CardQuality.mint:
        return 'text-yellow-600';
      case CardQuality.nearMint:
        return 'text-yellow-400';
      case CardQuality.excellent:
        return 'text-green-600';
      case CardQuality.good:
        return 'text-green-600';
      case CardQuality.lightPlayed:
        return 'text-green-400';
      case CardQuality.played:
        return 'text-gray-600';
      case CardQuality.poor:
        return 'text-gray-400';
      default:
        return '';
    }
  }
}



