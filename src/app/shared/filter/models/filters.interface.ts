import { BasicFilter } from './basic-filter.interface';
import { QualityFilter } from './quality-filter.interface';
import { SetFilter } from './set-filter.interface';

export interface Filters {
    types: string[];
    qualities: QualityFilter[];
    rarities: BasicFilter[];
    languages: BasicFilter[];
    sets: SetFilter[];
}
