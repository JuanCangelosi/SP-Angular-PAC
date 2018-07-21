import { Component, OnInit } from '@angular/core';
import { UIRouter } from '@uirouter/core';
import { SpService } from './sp-services/sp-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public esAdmin: boolean;

  constructor(public uiRouter: UIRouter, public spService: SpService) {

  }

  ngOnInit() {
    this.esAdmin = false;
    if (this.esAdmin) {
      this.uiRouter.stateService.go('admin-view');
    } else {
      this.uiRouter.stateService.go('user-view');
    }
  }
}
