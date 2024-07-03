import { Component, OnInit } from '@angular/core';
import { ApiCowsService } from '../services/api-productos.service';
import { Cow } from '../../utils/cow';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  cowsByBreed: { raza: string, cows: Cow[] }[] = [];

  constructor(private apiCowsService: ApiCowsService) {}

  ngOnInit() {
    this.apiCowsService.getData().subscribe((cows: Cow[]) => {
      this.cowsByBreed = this.groupCowsByBreed(cows);
    });
  }

  groupCowsByBreed(cows: Cow[]): { raza: string, cows: Cow[] }[] {
    const grouped = cows.reduce((acc, cow) => {
      if (!acc[cow.raza]) {
        acc[cow.raza] = [];
      }
      acc[cow.raza].push(cow);
      return acc;
    }, {} as { [key: string]: Cow[] });

    return Object.keys(grouped).sort().map(raza => ({ raza, cows: grouped[raza] }));
  }
}