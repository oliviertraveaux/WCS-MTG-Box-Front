import {ForeignName} from "./card-api-foreign-name.model";
import {CardRarity} from "@shared";

export interface CardApi {
  cardIdApi: string;
  name: string;
  foreignNames: ForeignName[];
  imageUrl: string;
  manaCost: string;
  rarity: CardRarity;
  set: string;
  setName: string;
  artist: string;
  text: string;
}
