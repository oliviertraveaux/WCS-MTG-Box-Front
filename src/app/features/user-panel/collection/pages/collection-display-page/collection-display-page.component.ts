import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CollectionDisplayImageComponent
} from "../../../../../shared/collection/components/collection-display-image/collection-display-image.component";
import {
  CollectionDisplayListComponent
} from "../../../../../shared/collection/components/collection-display-list/collection-display-list.component";
import {
  CollectionSearchResultComponent
} from "../../components/collection/collection-add-card-search-result/collection-search-result.component";
import {map, Observable, of} from "rxjs";
import {UserCard} from "../../../../../shared/collection/models/user-card.model";



@Component({
  selector: 'app-collection-page',
  standalone: true,
  imports: [CommonModule, CollectionDisplayImageComponent, CollectionDisplayListComponent, CollectionSearchResultComponent],
  templateUrl: './collection-display-page.component.html',
  styleUrls: ['./collection-display-page.component.scss']
})
export class CollectionDisplayPageComponent implements OnInit{

  protected switchView = false;
  private _allCards$: Observable<any> = of([]);


  ngOnInit(): void {


  }

  changeview(): void {
    this.switchView = !this.switchView;
  }

  handleCardDeleted(deletedCardId: number) {
    this._allCards$ = this._allCards$.pipe(
      map((cards: UserCard[]) => cards.filter(card => card.userInfo.userCardId !== deletedCardId))
    );

  }

}
