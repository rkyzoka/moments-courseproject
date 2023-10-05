import { MessagesService } from './../../../services/messages.service';
import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { IMoment } from 'src/app/IMoment';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  apiUrl = environment.baseApiUrl;
  moment?: IMoment;

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: Number) {
    await this.momentService.deleteMoment(id).subscribe();
    this.messagesService.add('Moment deleted successfully!');
    this.router.navigate(['/']);
  }
}
