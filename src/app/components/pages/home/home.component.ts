import { MomentService } from 'src/app/services/moment.service';
import { Component, OnInit } from '@angular/core';
import { IMoment } from 'src/app/IMoment';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  apiUrl = environment.baseApiUrl;
  allMoments: IMoment[] = [];
  searchResults: IMoment[] = [];

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((response) => {
      const data = response.data;
      data.map((moment) => {
        moment.created_at = new Date(moment.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });
      this.allMoments = data;
      this.searchResults = data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.searchResults = this.allMoments.filter((moment) =>
      moment.title?.toLowerCase().includes(value)
    );
  }
}
