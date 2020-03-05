import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(text: string, legnthAuthorized: number = 4, elipse: string = "..."): string {

    if (typeof text === "undefined" || text === null || text === "") return "Error truncate pipe => text given";
    if (legnthAuthorized <= 0) return "Error truncate pipe => length authorized given";
    if (legnthAuthorized - elipse.length <= 0) return "Error truncate pipe => (length authorized + elipse length) given";

    let truncatedText = text.slice(0, legnthAuthorized - elipse.length);

    return truncatedText + elipse;
  }

}
