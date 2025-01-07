import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showHeaderandFooter = true;
  faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;

        if (
          currentRoute.includes('/login') ||
          currentRoute.includes('/signup')
        ) {
          this.showHeaderandFooter = false;
        } else {
          this.showHeaderandFooter = true;
        }
      });
  }

  ngOnInit(): void {
    this.initAwesomeFonts();
  }

  initAwesomeFonts() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}
