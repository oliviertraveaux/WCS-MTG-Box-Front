import { Pipe, PipeTransform } from '@angular/core';
import { UserCard } from '@shared';
@Pipe({
    standalone: true,
    name: 'getUserCardImg',
})
export class GetUserCardImgPipe implements PipeTransform {
    transform(card: UserCard): string {
        return card.userInfo.languageId === 1
            ? card.cardInfo.imageUrl
            : card.cardInfo.frenchImageUrl;
    }
}
