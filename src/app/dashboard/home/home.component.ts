import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string = "";

  constructor(private storageService: StorageService) {

  }

  ngOnInit(): void {
    this.name = this.storageService.get('user').name;
  }

}
