import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ProgressIndicatorService } from '../services/progress-indicator/progress-indicator.service';
import { StorageService } from '../services/storage/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewChecked, OnDestroy {

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  username: string = "";
  docUrl: string = environment.apiUrl + '/swagger-ui.html';

  constructor(private changeDetectorRef: ChangeDetectorRef, private storageService: StorageService,
    private media: MediaMatcher, public progressIndicatorService: ProgressIndicatorService) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1279px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.username = this.storageService.get('user').user;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
