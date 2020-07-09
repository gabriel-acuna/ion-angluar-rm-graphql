import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { Subscription } from 'rxjs';
import { Info, Character } from '../../environments/schema';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  private querySubscription: Subscription;
  loading: boolean = true;
  characters: Character [];
  info: Info;
  constructor(
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.getCharacters({});
  }

  getCharacters({page = 1, filter = {}}){
    this.querySubscription =  this.charactersService.watch({
      page,
      filter
    }).valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.characters = data.characters['results'];
      this.info = data.characters['info'];
    });
  }
}
