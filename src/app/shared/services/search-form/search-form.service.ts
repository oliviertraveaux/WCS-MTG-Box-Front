import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { SearchQuery } from '../../../features/user-panel/collection/models/search-query.model';
import { CardRarity } from '../../collection/enums/card-rarity.enum';
import { CardColor } from '../../collection/models/card-color.model';
import { BasicFilter } from '../../filter/models/basic-filter.interface';

@Injectable({
    providedIn: 'root',
})
export class SearchFormService {
    private _fb = inject(FormBuilder);
    private _destroyRef = inject(DestroyRef);

    searchForm: FormGroup = this._fb.group({
        name: [null],
        language: [{ value: '', disabled: true }],
        set: [''],
        cmc: [''],
        rarity: [''],
        type: [''],
        colors: [''],
        text: [null],
        artist: [null],
    });

    allControlsExcept(controlNames: string[]): string[] {
        return (
            this.searchForm &&
            Object.keys(this.searchForm.controls).filter(
                (control: string) => !controlNames.includes(control)
            )
        );
    }

    get nameControl(): string {
        return this.searchForm.get('name')?.value;
    }

    get languageControl(): BasicFilter {
        return this.searchForm.get('language')?.value;
    }

    get setControl(): string {
        return this.searchForm.get('set')?.value;
    }

    get convertedManaCostControl(): number | string {
        return this.searchForm.get('convertedManaCost')?.value;
    }

    get rarityControl(): CardRarity | string {
        return this.searchForm.get('rarity')?.value;
    }

    get typeControl(): string {
        return this.searchForm.get('type')?.value;
    }

    get colorControl(): CardColor | string {
        return this.searchForm.get('colors')?.value;
    }

    get textControl(): string {
        return this.searchForm.get('text')?.value;
    }

    get artistControl(): string {
        return this.searchForm.get('artist')?.value;
    }

    getSearch(): SearchQuery {
        let requestParams: SearchQuery = {};
        for (let control of Object.keys(this.searchForm.controls)) {
            const value = this.searchForm.get(control)?.value;
            if (value !== null && value !== '') {
                // @ts-ignore
                requestParams[control] = control === 'language' ? value.name : value;
            }
        }
        return requestParams;
    }

    reset(): void {
        this.searchForm.get('name')?.patchValue(null);
        this.searchForm.get('language')?.patchValue('');
        this.searchForm.get('set')?.patchValue('');
        this.searchForm.get('cmc')?.patchValue('');
        this.searchForm.get('rarity')?.patchValue('');
        this.searchForm.get('type')?.patchValue('');
        this.searchForm.get('colors')?.patchValue('');
        this.searchForm.get('text')?.patchValue(null);
        this.searchForm.get('artist')?.patchValue(null);
        this.searchForm.markAsUntouched();
        this.searchForm.markAsPristine();
    }

    updateValidityWhenFormValueChanges(): void {
        for (let control of Object.keys(this.searchForm.controls)) {
            this.searchForm
                .get(control)
                ?.valueChanges.pipe(takeUntilDestroyed(this._destroyRef), distinctUntilChanged())
                .subscribe(() => {
                    for (let ctrl of this.allControlsExcept([control])) {
                        this.searchForm.get(ctrl)?.updateValueAndValidity();
                    }
                    this.searchForm.updateValueAndValidity();
                });
        }
    }

    oneControlHasValueValidator(controlNameList: string[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlList = controlNameList.map(
                (controlName) => this.searchForm.get(controlName)?.value
            );
            if (control.value && controlList.every((controlValue) => !controlValue)) {
                return { invalidOneControlHasValue: true };
            }
            return null;
        };
    }

    initForm(): FormGroup {
        this.searchForm.get('name')?.addValidators(Validators.minLength(3));
        this.searchForm.get('artist')?.addValidators(Validators.minLength(3));
        this.searchForm.get('text')?.addValidators(Validators.minLength(3));
        this.searchForm
            .get('rarity')
            ?.addValidators(this.oneControlHasValueValidator(['name', 'set']));
        this.searchForm
            .get('cmc')
            ?.addValidators(this.oneControlHasValueValidator(['name', 'set']));
        this.searchForm
            .get('type')
            ?.addValidators(this.oneControlHasValueValidator(['name', 'set']));
        this.searchForm
            .get('colors')
            ?.addValidators(this.oneControlHasValueValidator(['name', 'set']));
        this.searchForm.get('language')?.addValidators(this.oneControlHasValueValidator(['name']));
        return this.searchForm;
    }
}
