import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Group } from '../shared/interfaces/Group';
import { GroupService } from '../shared/services/group/group.service';
import { Task } from '../shared/interfaces/Task';
import { TaskService } from '../shared/services/task/task.service';
import { JsonValidator } from '../shared/validators/JsonValidator';
import { JobDetailInfoDTO } from '../shared/interfaces/JobDetailInfoDTO';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {

  @Input() title!: string;
  @Input() jobDetailInfoDTO!: Observable<JobDetailInfoDTO>;
  @Output() onSubmit = new EventEmitter();

  jobForm: FormGroup;
  tasks: Array<Task>;
  jobGroups: Array<Group>;
  httpMethods: Array<String> = ['POST', 'GET', 'PUT', 'DELETE', 'PATCH']

  constructor(private fb: FormBuilder, private taskService: TaskService, private jobGroupService: GroupService, private router: Router) {
    this.jobForm = this.fb.group({
      jobDetailInfo: this.fb.group({
        taskId: ['', Validators.required],
        groupId: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', ''],
        cronExpression: ['', Validators.required]
      }),
      jobSetting: this.fb.group({
        httpMethod: ['', Validators.required],
        url: ['', Validators.required],
        httpHeaders: [null, JsonValidator.isJson],
        httpBody: [null, JsonValidator.isJson],
      })
    });

    this.tasks = [];
    this.jobGroups = [];

  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadJobGroups();
    if (this.jobDetailInfoDTO) {
      this.jobDetailInfoDTO.subscribe(result => {
        this.fillForm(result);
      });
    }
  }

  createJobSettingForm(event: any) {
    const taskFormControl = this.jobForm.get('taskId');
    const selectedValue = taskFormControl && taskFormControl.value;
    if (selectedValue === 1 && !this.jobSetting) {
      this.jobForm.addControl('jobSetting', this.fb.group({
        httpMethod: ['', Validators.required],
        url: ['', Validators.required],
        httpHeaders: [null, JsonValidator.isJson],
        httpBody: [null, JsonValidator.isJson],
      }));
    }
  }

  fillForm(jobDetailInfo: JobDetailInfoDTO) {
    const taskId = jobDetailInfo.task.id;
    this.jobDetailInfo?.patchValue({
      taskId: taskId,
      groupId: jobDetailInfo.jobGroup.id,
      name: jobDetailInfo.name,
      description: jobDetailInfo.description,
      cronExpression: jobDetailInfo.cronTriggers[0].cronExpression,
    });

    if (taskId === 3 && this.jobSetting) {
      const restJobDetailInfo = jobDetailInfo.restJobDetailInfo;
      const httpHeaders = restJobDetailInfo.httpHeaders && JSON.stringify(restJobDetailInfo.httpHeaders, null, '\t');
      const httpBody = restJobDetailInfo.httpBody && JSON.stringify(restJobDetailInfo.httpBody, null, '\t');
      this.jobSetting?.patchValue({
        httpMethod: restJobDetailInfo.httpMethod,
        url: restJobDetailInfo.url,
        httpHeaders: httpHeaders,
        httpBody: httpBody,
      });
    }

    this.jobDetailInfo?.get('groupId')?.disable();
  }

  submit(): void {
    if (this.jobForm.valid) {
      const job = this.jobForm.getRawValue();
      const { httpHeaders, httpBody } = job.jobSetting;
      const httpHeadersParse = JSON.parse(httpHeaders);
      const httpBodyParse = JSON.parse(httpBody);
      const dto = { ...job.jobDetailInfo, ...job.jobSetting, httpHeaders: httpHeadersParse, httpBody: httpBodyParse };
      this.onSubmit.emit(dto);
    } else {
      console.error('Form is invalid')
    }
  }

  private loadTasks(): void {
    this.taskService.getAll()
      .subscribe(result => {
        this.tasks = result;
      });
  }

  private loadJobGroups(): void {
    this.jobGroupService.getAll()
      .subscribe(result => {
        this.jobGroups = result;
      });
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }

  get jobDetailInfo(): any {
    return this.jobForm.get('jobDetailInfo');
  }

  get jobSetting(): any {
    return this.jobForm.get('jobSetting');
  }

}
