import { Pipe, PipeTransform } from '@angular/core';
import { UserCard } from "../../../../../shared/collection/models/user-card.model";

@Pipe({
  standalone: true,
  name: 'getCardImg',
})
export class GetCardImgPipe implements PipeTransform {
  transform(card: UserCard, language: string): string {
    switch (language) {
      case 'French':
        if (card.userInfo?.languageName === 'French') {
          return card.cardInfo.frenchImageUrl;
        } else {
          return card.cardInfo.imageUrl;
        }
      case 'English':
        return card.cardInfo.imageUrl;
      default:
        return card.cardInfo.imageUrl;
    }
  }
}
