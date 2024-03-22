import { Pipe, PipeTransform } from '@angular/core';
import { UserCard } from '../../../../../shared/collection/models/user-card.model';

@Pipe({
    standalone: true,
    name: 'getUserCardImg',
})
export class GetUserCardImgPipe implements PipeTransform {
    transform(card: UserCard): string {
        return card.userInfo.languageName === 'English'
            ? card.cardInfo.imageUrl
            : card.cardInfo.frenchImageUrl;
    }
}
