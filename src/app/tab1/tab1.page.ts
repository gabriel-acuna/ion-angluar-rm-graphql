import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Subscription } from 'rxjs';
import { Info, Location, Character, Episode } from '../../environments/schema';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  private querySubscription: Subscription;
  loading: boolean;
  characters: any [];
  info: any;
  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.getCharacters({});
  }

  getCharacters({page = 1, filters = {}}){
    this.querySubscription =  this.charactersService.watch({
      page,
      filters
    }).valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.characters = data.characters['results'];
      this.info = data.characters['info'];
    });
  }

  getCharacter(param){
    console.log(param);
  }
}
