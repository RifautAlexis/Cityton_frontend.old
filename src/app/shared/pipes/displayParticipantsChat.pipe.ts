import { IUserMinimal as UserMinimal } from '@shared/models/UserMinimal';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayParticipantsChat'
})
export class DisplayParticipantsChatPipe implements PipeTransform {

  transform(participants: UserMinimal[], args?: any): string {

    if (participants === null || typeof participants === undefined || participants.length === 0) return "";

    let toDisplay: string = "";

    participants.forEach((user: UserMinimal, index) => {

      if(index === participants.length - 1){
        toDisplay += user.username;
      } else {
        toDisplay += user.username + ", ";
      }

    });

    return toDisplay;
  }

}
