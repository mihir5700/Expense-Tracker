import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  public tabClass: string = "";
  constructor(private router: Router) {
  }

  public setActiveTabClass(route: string): boolean {
    let self = this;
    if(self.router.url == route)
      return true;
    else
      return false;
  }
}
