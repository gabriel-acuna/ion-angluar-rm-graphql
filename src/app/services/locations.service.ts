import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Info } from 'src/environments/schema';

interface LocationsResponse {
  locations: {
    info: Info;
    results: [Location];
  };
}

@Injectable({
  providedIn: 'root'
})
export class LocationsService extends Query<LocationsResponse> {

  document = gql`
    query ($page:Int, $filter: FilterLocation){
      locations (page: $page, filter: $filter) {
        info{
          count
          next
          prev
          pages
        }
        results{
        id
        name
        type
        dimension
      }
    }
    }`;
}

interface LocationResponse{
  location: Location;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService extends Query<LocationResponse> {

  document = gql`
    query ($id:ID){
      location (id: $id) {
        id
        name
        type
        dimension
        residents{
          name
        }
      }
    }`;
}
