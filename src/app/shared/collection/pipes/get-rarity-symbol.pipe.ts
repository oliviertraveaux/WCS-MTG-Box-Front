import { Pipe, PipeTransform } from '@angular/core';
import {CardRarity} from "@shared";
@Pipe({
  standalone: true,
  name: 'getRaritySymbol'
})
export class GetRaritySymbolPipe implements PipeTransform {
  transform(rarity: CardRarity): string {
    switch (rarity) {
      case CardRarity.unCommon:
        return "U";
      case CardRarity.common:
        return "C";
      case CardRarity.rare:
        return "R";
      case CardRarity.mythicRare:
        return "M";
      case CardRarity.basicLand:
        return "";
      case CardRarity.special:
        return "";
      default:
        return "";
    }
  }
}
