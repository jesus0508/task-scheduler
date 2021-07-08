import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from 'src/app/interfaces/Task';
import { JobGroup } from 'src/app/interfaces/JobGroup';
import { JobDetailInfo } from 'src/app/interfaces/JobDetailInfo';
import { GroupService } from 'src/app/services/group/group.service';
import { TaskService } from 'src/app/services/task/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() title!: string;
  @Input() data!: Observable<JobDetailInfo>;
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  tasks: Array<Task>;
  jobGroups: Array<JobGroup>;
  selectedValue: number;
  id: number;

  constructor(private fb: FormBuilder, private taskService: TaskService, private jobGroupService: GroupService) {
    this.form = this.fb.group({
      taskId: ['', Validators.required],
      groupId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', ''],
      cronExpression: ['', Validators.required],
      additions: this.fb.group({
        entity: ['', ''],
        office: [true, ''],
        agent: [false, ''],
        atm: [false, '']
      })
    });
    this.tasks = [];
    this.jobGroups = [];
    this.selectedValue = 0;
    this.id = 0;
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadJobGroups();
    if (this.data) {
      console.log(this.data);
      this.data.subscribe(result => {
        this.fillForm(result);
      });
    }
  }

  isBatchJob(): boolean {
    return this.selectedValue == 2;
  }

  fillForm(jobDetailInfo :JobDetailInfo) {

    const office = jobDetailInfo.additions.office == "true";
    const agent = jobDetailInfo.additions.agent == "true";
    const atm = jobDetailInfo.additions.atm == "true";

    this.form.patchValue({
      taskId: jobDetailInfo.task.id,
      groupId: jobDetailInfo.jobGroup.id,
      name: jobDetailInfo.name,
      description: jobDetailInfo.description,
      cronExpression: jobDetailInfo.triggers[0].cronExpression,
      additions: {
        entity: jobDetailInfo.additions.entity,
        office: office,
        agent: agent,
        atm: atm
      }
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    } else {
      console.error('Form is invalid')
    }
  }

  cancel(): void {
    this.onCancel.emit();
  }

  private loadTasks(): void {
    this.taskService.getAll()
      .subscribe((result: Task[]) => {
        this.tasks = result;
      });
  }

  private loadJobGroups(): void {
    this.jobGroupService.getAll()
      .subscribe((result: JobGroup[]) => {
        this.jobGroups = result;
      });
  }

}
