import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html'
})

export class MenuBarComponent {

  constructor(private translate: TranslateService) {
  }

}
