import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import { CardColor, CardRarity } from '@shared';
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
        color: [''],
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

    get languageControl(): string {
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
        return this.searchForm.get('color')?.value;
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
                requestParams[control] = value;
            }
        }
        return requestParams;
    }

    reset(): void {
        this.searchForm.reset();
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
            const nameValue = control.value;
            const otherControlsHaveValues =
                this.searchForm &&
                this.allControlsExcept([controlName]).some((control) => {
                    const controlValue = this.searchForm.get(control)?.value;
                    return controlValue !== null && controlValue !== '';
                });

            if (!otherControlsHaveValues && (nameValue === null || nameValue.length < 3)) {
                return { invalidName: true };
            }

            return null;
        };
    }
}
