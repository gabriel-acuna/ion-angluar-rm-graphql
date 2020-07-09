import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/locations.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  location: any = [];
  private loading: boolean = true;
  private querySubscription: Subscription;
  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getLocation(id);
  }

  getLocation(id) {
    this.querySubscription = this.locationService.watch(
      {
        id
      }
    ).valueChanges
      .subscribe(({ data, loading }) => {
        this.location = data.location;
        this.loading = loading;
        }
        );
  }
}
