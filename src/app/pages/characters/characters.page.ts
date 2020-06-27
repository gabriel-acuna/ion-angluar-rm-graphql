import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/characters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  character: any = [];
  private querySubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCharacter(id);
  }

  getCharacter(id){
    this.querySubscription = this.characterService.watch ({
      id
    }).valueChanges
    .subscribe(({data}) => this.character = data.character
    );
  }
}
