import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Info, Episode } from '../../environments/schema';

export interface EpisodesResponse{
  info: Info;
  episodes: [Episode];
}

@Injectable({
  providedIn: 'root'
})
export class EpisodesService extends Query<EpisodesResponse>{

  document = gql`
  query ($page: Int, $filter: FilterEpisode){
    episodes(page: $page, filter: $filter){
      info{
        count
        next
        prev
        pages
      }
      results{
        id
        name
        air_date
        episode
      }
    }
  }
  `;
}

export interface EpisodeResponse{
  episode: Episode;
}

@Injectable({
  providedIn: 'root'
})
export class EpisodeService extends Query<EpisodeResponse> {
  document = gql`
  query($id:ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        name
      }
      created
    }
  }`;
}
