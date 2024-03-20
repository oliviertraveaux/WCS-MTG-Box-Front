import { Pipe, PipeTransform } from '@angular/core';
import { UserCard } from "../../../../../shared/collection/models/user-card.model";

@Pipe({
  standalone: true,
  name: 'getCardName',
})
export class GetCardNamePipe implements PipeTransform {
  transform(card: UserCard, language: string): string {
    switch (language) {
      case 'French':
        if (card.userInfo?.languageName === 'French') {
          return card.cardInfo.frenchName;
        } else {
          return card.cardInfo.name;
        }
      case 'English':
        return card.cardInfo.name;
      default:
        return card.cardInfo.name;
    }
  }
}
