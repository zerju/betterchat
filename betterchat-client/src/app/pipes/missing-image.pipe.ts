import { environment } from './../../environments/environment.prod';
import { Pipe, PipeTransform } from '@angular/core';

const API_URL = environment.apiUrl;

@Pipe({
  name: 'missingImage'
})
export class MissingImagePipe implements PipeTransform {
  transform(value: string): string {
    let image =
      'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4256ef737a6b7fb0ee2533bee81980b9515a927f.jpg';
    if (value && !value.includes('http')) {
      image = `${API_URL}/${value}`;
    }
    return image;
  }
}
