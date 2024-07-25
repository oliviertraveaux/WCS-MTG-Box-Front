import { FormControl } from '@angular/forms';

export interface UserForm {
    email: FormControl<string | null>;
    department: FormControl<string | null>;
    city: FormControl<string | null>;
    isActive: FormControl<boolean | null>;
}
