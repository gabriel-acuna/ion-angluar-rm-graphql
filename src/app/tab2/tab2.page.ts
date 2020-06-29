import { Component, OnInit } from '@angular/core';
import { EpisodesService} from '../services/episodes.service';
import { Subscription } from 'rxjs';
import { Info, Episode } from '../../environments/schema';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  private querySubscription: Subscription;
  loading: boolean;
  episodes: Episode [];
  info: Info;

  constructor(
    private episodesService: EpisodesService
  ) {}


  ngOnInit(): void {
    this.getEpisodes({});
  }

  getEpisodes({page = 1, filter = {}}){
    this.querySubscription = this.episodesService.watch({
      page, filter
    }).valueChanges
    .subscribe(({data, loading}) => {
      this.loading = loading;
      this.episodes = data.episodes['results'];
      this.info = data.episodes['info'];
    });
  }

}
