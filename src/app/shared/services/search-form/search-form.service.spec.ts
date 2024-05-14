import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { CardRarity } from '../../collection/enums/card-rarity.enum';
import { SearchFormService } from './search-form.service';

describe('SearchFormService', () => {
    let searchFormServiceMock: SearchFormService;
    let formBuilderMock: FormBuilder;

    beforeEach(() => {
        formBuilderMock = new FormBuilder();
        TestBed.configureTestingModule({
            providers: [
                SearchFormService,
                {
                    provide: FormBuilder,
                    useValue: formBuilderMock,
                },
            ],
        });

        searchFormServiceMock = TestBed.inject(SearchFormService);
        formBuilderMock = TestBed.inject(FormBuilder);
    });

    describe('allControlsExcept', () => {
        it('should return all controls except one', () => {
            const expected = [
                'language',
                'set',
                'cmc',
                'rarity',
                'type',
                'colors',
                'text',
                'artist',
            ];
            const result = searchFormServiceMock.allControlsExcept(['name']);

            expect(result).toEqual(expected);
        });
        it('should return all controls if controlNames is empty', () => {
            const expected = [
                'name',
                'language',
                'set',
                'cmc',
                'rarity',
                'type',
                'colors',
                'text',
                'artist',
            ];
            const result = searchFormServiceMock.allControlsExcept([]);

            expect(result).toEqual(expected);
        });
    });
    describe('getSearch', () => {
        it('should return empty SearchQuery object', () => {
            const searchForm = formBuilderMock.group({
                name: [''],
                language: [''],
                set: [''],
                cmc: [''],
                rarity: [''],
                type: [''],
                colors: [''],
                text: [''],
                artist: [''],
            });

            searchFormServiceMock.searchForm = searchForm;
            const result = searchFormServiceMock.getSearch();

            expect(result).toEqual({});
        });
        it('should return SearchQuery object', () => {
            const searchForm = formBuilderMock.group({
                name: ['Card1'],
                language: [{ name: 'English' }],
                set: [''],
                cmc: [3],
                rarity: [CardRarity.rare],
                type: [''],
                colors: [''],
                text: [''],
                artist: [''],
            });
            const expected = {
                cmc: 3,
                language: 'English',
                name: 'Card1',
                rarity: CardRarity.rare,
            };

            searchFormServiceMock.searchForm = searchForm;
            const result = searchFormServiceMock.getSearch();

            expect(result).toEqual(expected);
        });
    });
    describe('reset', () => {
        it('should reset form', () => {
            const searchForm = formBuilderMock.group({
                name: ['Card1'],
                language: [{ name: 'English' }],
                set: [''],
                cmc: [3],
                rarity: [CardRarity.rare],
                type: [''],
                colors: [''],
                text: [''],
                artist: [''],
            });

            const expected = {
                name: null,
                language: '',
                set: '',
                cmc: '',
                rarity: '',
                type: '',
                colors: '',
                text: null,
                artist: null,
            };

            searchFormServiceMock.searchForm = searchForm;
            searchFormServiceMock.reset();

            expect(searchFormServiceMock.searchForm.value).toEqual(expected);
        });
    });
    describe('initForm', () => {
        it('should check validity when name and set have no value', () => {
            searchFormServiceMock.initForm();
            searchFormServiceMock.searchForm.get('artist')?.patchValue('bbb');
            searchFormServiceMock.searchForm.get('rarity')?.patchValue(CardRarity.rare);
            searchFormServiceMock.searchForm.get('cmc')?.patchValue(1);

            expect(searchFormServiceMock.searchForm.get('language')?.disabled).toBe(true);
            expect(searchFormServiceMock.searchForm.get('rarity')?.valid).toBe(false);
            expect(searchFormServiceMock.searchForm.get('cmc')?.valid).toBe(false);
            expect(searchFormServiceMock.searchForm.get('artist')?.valid).toBe(true);
        });
        it('should check validity when name has value', () => {
            searchFormServiceMock.initForm();
            searchFormServiceMock.searchForm.get('name')?.patchValue('aa');
            searchFormServiceMock.searchForm.get('rarity')?.patchValue(CardRarity.rare);
            searchFormServiceMock.searchForm.get('cmc')?.patchValue(1);

            expect(searchFormServiceMock.searchForm.get('rarity')?.valid).toBe(true);
            expect(searchFormServiceMock.searchForm.get('name')?.valid).toBe(false);
            expect(searchFormServiceMock.searchForm.get('cmc')?.valid).toBe(true);
        });
    });
});
