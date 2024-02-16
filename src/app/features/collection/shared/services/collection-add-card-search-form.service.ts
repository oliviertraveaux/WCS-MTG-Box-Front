import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import { SearchQuery } from '../../models/search-querry.model';

@Injectable({
    providedIn: 'root',
})
export class CollectionAddCardSearchFormService {
    private _fb = inject(FormBuilder);
    private _destroyRef = inject(DestroyRef);

    searchForm: FormGroup = this._fb.group({
        name: [null, this.nameValidator()],
        language: [''],
        set: [''],
        convertedManaCost: [''],
        rarity: [''],
        type: [''],
        color: [''],
        text: [''],
        artist: [''],
    });

    allControlsExceptName = Object.keys(this.searchForm.controls).filter(
        (control) => control !== 'name'
    );

    get nameControl() {
        return this.searchForm.get('name')?.value;
    }

    get languageControl() {
        return this.searchForm.get('language')?.value;
    }

    get setControl() {
        return this.searchForm.get('set')?.value;
    }

    get convertedManaCostControl() {
        return this.searchForm.get('convertedManaCost')?.value;
    }

    get rarityControl() {
        return this.searchForm.get('rarity')?.value;
    }

    get typeControl() {
        return this.searchForm.get('type')?.value;
    }

    get colorControl() {
        return this.searchForm.get('color')?.value;
    }

    get textControl() {
        return this.searchForm.get('text')?.value;
    }

    get artistControl() {
        return this.searchForm.get('artist')?.value;
    }

    getSearch(): SearchQuery {
        return {
            name: this.nameControl || '',
            language: this.languageControl || '',
            set: this.setControl || '',
            cmc: this.convertedManaCostControl || '',
            rarity: this.rarityControl || '',
            type: this.typeControl || '',
            colors: this.colorControl || '',
            text: this.textControl || '',
            artist: this.artistControl || '',
        };
    }

    reset(): void {
        this.searchForm.reset();
    }

    updateNameValidityWhenFormValueChanges(): void {
        this.allControlsExceptName.forEach((controlName) => {
            this.searchForm
                .get(controlName)
                ?.valueChanges.pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => {
                    this.searchForm.get('name')?.updateValueAndValidity();
                });
        });
    }

    nameValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const nameValue = control.value;

            const otherControlsHaveValues =
                this.searchForm &&
                this.allControlsExceptName.some((controlName) => {
                    const controlValue = this.searchForm.get(controlName)?.value;
                    return controlValue !== null && controlValue !== '';
                });

            if (!otherControlsHaveValues && (nameValue === null || nameValue.length < 3)) {
                return { invalidName: true };
            }

            return null;
        };
    }
}
