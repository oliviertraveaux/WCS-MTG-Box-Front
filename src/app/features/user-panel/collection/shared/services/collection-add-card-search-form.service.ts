import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import { BasicFilter, CardColor, CardRarity } from '@shared';
import { debounceTime } from 'rxjs';
import { SearchQuery } from '../../models/search-query.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardSearchFormService {
    private _fb = inject(FormBuilder);
    private _destroyRef = inject(DestroyRef);

    searchForm: FormGroup = this._fb.group({
        name: [null, this.textValidator('name')],
        language: [''],
        set: [''],
        cmc: [''],
        rarity: [''],
        type: [''],
        colors: [''],
        text: [null, this.textValidator('text')],
        artist: [null, this.textValidator('artist')],
    });

    allControlsExcept(controlNames: string[]): string[] {
        return (
            this.searchForm &&
            Object.keys(this.searchForm.controls).filter(
                (control) => !controlNames.includes(control)
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
            if (value !== null && value !== '' && value.name !== 'English') {
                // @ts-ignore
                requestParams[control] = control === 'language' ? value.name : value;
            }
        }
        return requestParams;
    }

    reset(): void {
        this.searchForm.get('name')?.patchValue(null),
            this.searchForm.get('language')?.patchValue(''),
            this.searchForm.get('set')?.patchValue(''),
            this.searchForm.get('cmc')?.patchValue(''),
            this.searchForm.get('rarity')?.patchValue(''),
            this.searchForm.get('type')?.patchValue(''),
            this.searchForm.get('colors')?.patchValue(''),
            this.searchForm.get('text')?.patchValue(null),
            this.searchForm.get('artist')?.patchValue(null);
        this.searchForm.markAsUntouched();
        this.searchForm.markAsPristine();
    }

    updateValidityWhenFormValueChanges(): void {
        for (let control of Object.keys(this.searchForm.controls)) {
            this.searchForm
                .get(control)
                ?.valueChanges.pipe(takeUntilDestroyed(this._destroyRef), debounceTime(300))
                .subscribe(() => {
                    for (let ctrl of this.allControlsExcept([control])) {
                        this.searchForm.get(ctrl)?.updateValueAndValidity();
                    }
                });
        }
    }

    textValidator(controlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const otherControlsHaveValues =
                this.searchForm &&
                this.allControlsExcept([controlName]).some((otherControl) => {
                    const otherControlValue = this.searchForm.get(otherControl)?.value;
                    return otherControlValue !== null && otherControlValue !== '';
                });

            if (!otherControlsHaveValues && (value === null || value.length < 3)) {
                return { invalidName: true };
            }
            return null;
        };
    }
}
