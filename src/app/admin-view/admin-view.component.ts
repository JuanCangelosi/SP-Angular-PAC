import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UIRouter } from '@uirouter/core';
import { AdminViewService } from './admin-view.service';
import { BehaviorSubject } from 'rxjs';
import { PACRequest } from '../models/PACRequest';
/**
 * Component that represent the manager view of the requests made to him waiting for a response
 * The request will be shown in a list.
 */
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  // Array used to select which columns will be shown in the material list
  public displayedColumns: string[] = ['id', /* 'fechaCreacion',*/ 'fechaInicio', 'horaInicio', 'fechaFin', 'horaFin', /* 'estado' */];

  // Data source of the material list
  public dataSource: BehaviorSubject<PACRequest[]>;

  // requests made to the manager
  public requests: PACRequest[];

  public resultsLength;

  // Sorter of the material list
  @ViewChild(MatSort) sort: MatSort;

  /**
   * @param uiRouter router used to move between screens
   * @param adminViewService service used to comunicate between screens of the manager view and to retrieve data from the backend
   */
  constructor(private uiRouter: UIRouter, private adminViewService: AdminViewService) {
    // Initialize the datasource with an empty array
    this.dataSource =  new BehaviorSubject(this.requests);
  }

  ngOnInit() {
    // Get the request made to the manager and after they are received update the list
    this.adminViewService.getRequestsMadeToUser().then((requests) => {
      this.requests = requests;
      this.dataSource.next(this.requests);
      this.resultsLength = this.requests.length;
    });
  }

  /**
   * Method called when a row representing a request is clicked, it sets the internal state of the service
   * With the selected request and the navigates to the response view.
   * @param request selected request to respond
   */
  public goToRequestResponse(request: PACRequest) {
    this.adminViewService.SelectedRequest = request;
    this.uiRouter.stateService.go('request-response');
  }

}
