import {Component, inject, OnInit} from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Breadcrumb {
  label: string;
  url: string;
  number?: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    NgIf,
    MatButtonModule,
    NgForOf
  ],
})
export class BreadcrumbComponent implements OnInit {

private _router = inject (Router);
private _translate = inject (TranslateService);


  breadcrumbs: Breadcrumb[] = [];
  shouldHideBreadcrumb: boolean = true;


  ngOnInit() {
    this._router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.breadcrumbs = this.createBreadcrumbs(event.urlAfterRedirects);
      this.shouldHideBreadcrumb = this.breadcrumbs.length < 1;
    });
  }
// Method to create breadcrumbs based on the current URL
  private createBreadcrumbs(url: string): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];
    const parts = url.split('/').filter(part => part && !['user-panel'].includes(part));
    let breadcrumbUrl = '';
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      breadcrumbUrl += `/${part}`;

      // Special case to handle 'card-ad' without showing the number in the label
      if (part === 'card-ad' && i + 1 < parts.length) {
        const cardAdNumber = parts[i + 1];
        const cardAdUrl = `/card-ad/${cardAdNumber}`;
        this._translate.get('BreadCrumb.card_ad').subscribe(label => {
          breadcrumbs.push({ label, url: cardAdUrl });
        });
        i++;
      } else {
        // Get the translation key for the current URL segment
        const labelKey = this.getBreadcrumbLabelKey(part);
        this._translate.get(labelKey).subscribe(label => {
          breadcrumbs.push({ label, url: breadcrumbUrl });
        });
      }
    }

    return breadcrumbs;
  }

  private getBreadcrumbLabelKey(segment: string): string {
    return `BreadCrumb.${segment}`;
  }
}
