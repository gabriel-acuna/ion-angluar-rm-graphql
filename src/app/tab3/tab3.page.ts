import { Component, OnInit } from '@angular/core';
import { LocationsService } from '../services/locations.service';
import { Subscription } from 'rxjs';
import { Info, Location } from '../../environments/schema';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  private querySubscription: Subscription;
  loading: boolean = true;
  locations: any =  [];
  info: Info;

  constructor(
    private locationsService: LocationsService
  ) {}


  ngOnInit(): void {
   this.getLocations({});
  }

  getLocations({page = 1,  filter = {}}){
    this.querySubscription = this.locationsService.watch({
      page, filter
    }).valueChanges
    .subscribe(({data, loading}) => {
      this.loading = loading;
      this.locations = data.locations.results;
      this.info = data.locations.info;
    });
  }

}
