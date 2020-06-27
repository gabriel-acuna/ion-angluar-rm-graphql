import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Info,  Character } from '../../environments/schema';



export interface CharactersResponse {
  info: Info;
  characters: [Character];
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService extends Query<CharactersResponse>{

  document = gql`
    query ($page: Int, $filter: FilterCharacter){
      characters (page:$page, filter: $filter){
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        image
        gender
        species

      }
    }
  }
    `;


}
export interface CharacterResponse{
   character: Character;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends Query<CharacterResponse>{

  document = gql`
    query($id:ID){
      character(id: $id) {
        id
        name
        status
        image
        species
        gender
        type
        origin {
          name
          type
          dimension
        }
        location {
          name
          type
          dimension
        }
        episode {
          episode
        }
        created
      }
    }
  `;
}
