import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Group } from '../../interfaces/Group';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-job-detail-form',
  templateUrl: './job-detail-form.component.html',
  styleUrls: ['./job-detail-form.component.css']
})
export class JobDetailFormComponent implements OnInit {

  jobDetailForm!: FormGroup;
  @Input() groups: Array<Group> = [];
  @Input() tasks: Task[] = [];
  @Output() onChangeNotification = new EventEmitter<boolean>();
  @Output() onChangeHttpRequest = new EventEmitter<boolean>();

  constructor(private rootFormGroup: FormGroupDirective) {
  }

  ngOnInit(): void {
    this.jobDetailForm = this.rootFormGroup.control.get('jobDetailForm') as FormGroup;
  }

  toggle(event: MatSlideToggleChange) {
    this.onChangeNotification.emit(event.checked);
  }

  change(event: MatSelectChange) {
    this.onChangeHttpRequest.emit(event.value === 3)
  }

}


