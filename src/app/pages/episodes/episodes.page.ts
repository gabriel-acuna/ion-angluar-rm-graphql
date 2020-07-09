import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from 'src/app/services/episodes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
})
export class EpisodesPage implements OnInit {
  private episode: any = [];
  private loading: boolean = true;
  private querySubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getEpisode(id);

  }

  getEpisode(id){
    this.querySubscription = this.episodeService.watch({
      id
    }).valueChanges
    .subscribe( ({ data, loading }) => {
      this.episode = data.episode;
      this.loading = loading;
      });
  }
}
