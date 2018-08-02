import { Component, OnInit } from '@angular/core';
import { PACRequest } from '../../models/PACRequest';
import { AdminViewService } from '../admin-view.service';
import { PACResponse } from '../../models/PACResponse';
import { UIRouter } from '@uirouter/core';
/**
 * Component that represent the manager response to request view.
 * This component will show the request and will have a reponse field and buttons of the decition to make.
 */
@Component({
  selector: 'app-request-response',
  templateUrl: './request-response.component.html',
  styleUrls: ['./request-response.component.css']
})
export class RequestResponseComponent implements OnInit {

  public requestToRespond: PACRequest;
  // Response of the request
  public response: PACResponse;

  /**
   * @param uiRouter router to move between the components
   * @param adminViewService service that comunicates the manager view with the backend and other views
   */
  constructor(private uiRouter: UIRouter, private adminViewService: AdminViewService) {
    // We assign the selected request to the model and create a new response model
    this.requestToRespond = this.adminViewService.SelectedRequest;
    this.response = new PACResponse();
    this.response.PACRequest = this.requestToRespond;
  }

  ngOnInit() {
  }

  public approve() {
    this.response.PACResponse = 'Approved';
    this.sendRequest();
  }

  public deny() {
    this.response.PACResponse = 'Denied';
    this.sendRequest();
  }

  public sendBack() {
    this.response.PACResponse = 'Send Back';
    this.sendRequest();
  }

  /**
   * Sends the request to the backend and if successful, it changes the state to admin view.
   */
  private async sendRequest() {
    await this.adminViewService.sendResponseToRequest(this.response);
    this.uiRouter.stateService.go('admin-view');
  }
}
