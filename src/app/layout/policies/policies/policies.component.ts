import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, TranslateModule],
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent {

}
