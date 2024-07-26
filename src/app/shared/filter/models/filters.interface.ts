import { BasicFilter } from './basic-filter.interface';
import { QualityFilter } from './quality-filter.interface';
import { SetFilter } from './set-filter.interface';
import { TypeFilter } from './type-filter.interface';

export interface Filters {
    types: TypeFilter[];
    qualities: QualityFilter[];
    rarities: BasicFilter[];
    languages: BasicFilter[];
    sets: SetFilter[];
}
