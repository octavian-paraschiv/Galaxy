import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public language: string;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en-US');
    this.translate.currentLang = 'en-US';
  }

  ngOnInit(): void {
    this.translate.onLangChange
      .pipe(untilDestroyed(this))
      .subscribe(langChanged => {
        this.language = langChanged.lang;
      });
  }
}
