import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Group } from '../../interfaces/Group';
import { GroupService } from '../../services/group/group.service';
import { Task } from '../../interfaces/Task';
import { TaskService } from '../../services/task/task.service';
import { JsonValidator } from '../../validators/JsonValidator';
import { JobDetailDTO } from '../../interfaces/JobDetailDTO';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { JobDetailRequest } from '../../interfaces/JobDetailRequest';
import { CronValidator } from '../../validators/CronValidator';

const HTTP_REQUEST_FORM_VALIDATIORS = {
  'httpMethod': [Validators.required],
  'url': [Validators.required, Validators.maxLength(100)],
  'httpHeaders': [JsonValidator.isJson, Validators.maxLength(1024)],
  'httpBody': [JsonValidator.isJson, Validators.maxLength(1024)]
}

const NOTIFICATION_FORM_VALIDATIORS = {
  'executionLimit': [Validators.required, Validators.min(2)],
  'mainRecipients': [Validators.required, Validators.maxLength(1024)],
  'secondaryRecipients': [Validators.maxLength(1024)],
}

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnInit {

  @Input() title: string = "Titulo";
  @Input() jobDetailDTO!: Observable<JobDetailDTO>;
  @Output() onSubmit = new EventEmitter();

  jobForm: FormGroup;
  tasks: Array<Task>;
  groups: Array<Group>;
  stepperOrientation: Observable<StepperOrientation>;
  jobDetailRequest!: JobDetailRequest;
  enableHttpRequestConfig: boolean = false;
  enableNotificationConfig: boolean = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private jobGroupService: GroupService, private router: Router, breakpointObserver: BreakpointObserver) {
    this.jobForm = this.fb.group({
      jobDetailForm: this.fb.group({
        taskId: ['', Validators.required],
        groupId: ['', Validators.required],
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', Validators.maxLength(200)],
        cronExpression: ['', [Validators.required, CronValidator.isValid, Validators.maxLength(50)]],
        enableNotifications: [0, Validators.required],
      }),
      httpRequestConfigForm: this.fb.group({
        httpMethod: 0,
        url: '',
        httpHeaders: '',
        httpBody: '',
      }),
      notificationConfigForm: this.fb.group({
        executionLimit: 5,
        mainRecipients: null,
        secondaryRecipients: null,
      })
    });

    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));

    this.tasks = [];
    this.groups = [];

  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadJobGroups();
    if (this.jobDetailDTO) {
      this.jobDetailDTO.subscribe(result => {
        this.fillForm(result);
      });
    }
  }

  submit(): void {
    this.onSubmit.emit(this.jobDetailRequest);
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }

  private stringToArray(items: string): Array<string> {
    return items ? items.toLocaleLowerCase().split(';').filter(item => item != '') : new Array<string>();
  }

  private arrayToString(items: Array<string>): string {
    return items ? items.join(";") : "";
  }

  private notificationConfigIsRequired(): boolean {
    return this.jobDetailForm.get('enableNotifications')?.value;
  }

  private httpRequestConfigIsRequired(): boolean {
    return this.jobDetailForm.get('taskId')?.value === 3;
  }

  private isEmpty(value: string): boolean {
    return value ? value.trim().length === 0 : true;
  }

  private fillForm(jobDetail: JobDetailDTO) {
    const taskId = jobDetail.task.id;
    console.log(jobDetail);
    this.jobDetailForm?.patchValue({
      taskId: taskId,
      groupId: jobDetail.group.id,
      name: jobDetail.name,
      description: jobDetail.description,
      cronExpression: jobDetail.cronTriggers[0].cronExpression,
      enableNotifications: jobDetail.enableNotifications
    });
    this.jobDetailForm?.get('groupId')?.disable();
    this.jobDetailForm?.get('taskId')?.disable();
    const httpRequestConfig = jobDetail.httpRequestConfig;
    if (httpRequestConfig != null) {
      const httpHeaders = httpRequestConfig.httpHeaders && JSON.stringify(httpRequestConfig.httpHeaders, null, '\t');
      const httpBody = httpRequestConfig.httpBody && JSON.stringify(httpRequestConfig.httpBody, null, '\t');
      this.httpRequestConfigForm.patchValue({
        httpMethod: httpRequestConfig.httpMethod,
        url: httpRequestConfig.url,
        httpHeaders: httpHeaders,
        httpBody: httpBody,
      });
    }
    const notificationConfig = jobDetail.notificationConfig;
    if (notificationConfig != null) {
      const executionLimit = notificationConfig.executionLimit;
      const mainRecipients = notificationConfig.mainRecipients && this.arrayToString(notificationConfig.mainRecipients);
      const secondaryRecipients = notificationConfig.secondaryRecipients && this.arrayToString(notificationConfig.secondaryRecipients);
      this.notificationConfigForm.patchValue({
        enableNotifications: 1,
        executionLimit,
        mainRecipients,
        secondaryRecipients
      })
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
        this.groups = result;
      });
  }

  get jobDetailForm(): FormGroup {
    return this.jobForm.get('jobDetailForm') as FormGroup;
  }

  get httpRequestConfigForm(): FormGroup {
    return this.jobForm.get('httpRequestConfigForm') as FormGroup;
  }

  get notificationConfigForm(): FormGroup {
    return this.jobForm.get('notificationConfigForm') as FormGroup;
  }

  enableNotification(checked: boolean) {
    this.enableNotificationConfig = checked;
    if (this.enableNotificationConfig) {
      this.addValidators(this.notificationConfigForm, NOTIFICATION_FORM_VALIDATIORS);
    } else {
      this.removeValidators(this.notificationConfigForm);
    }
  }

  enableHttpRequest(selected: boolean) {
    this.enableHttpRequestConfig = selected;
    if (this.enableHttpRequestConfig) {
      this.addValidators(this.httpRequestConfigForm, HTTP_REQUEST_FORM_VALIDATIORS);
    } else {
      this.removeValidators(this.httpRequestConfigForm);
    }
  }

  createJobDetailRequestPreview() {
    if (this.jobForm.valid) {
      const job = this.jobForm.getRawValue();
      this.jobDetailRequest = { ...job.jobDetailForm };
      if (this.httpRequestConfigIsRequired()) {
        const { httpHeaders, httpBody } = job.httpRequestConfigForm;
        const httpHeadersParse = !this.isEmpty(httpHeaders) ? JSON.parse(httpHeaders) : null;
        const httpBodyParse = !this.isEmpty(httpBody) ? JSON.parse(httpBody) : null;
        const httpRequestConfig = { ...job.httpRequestConfigForm, httpHeaders: httpHeadersParse, httpBody: httpBodyParse };
        this.jobDetailRequest.httpRequestConfigRequest = httpRequestConfig;
      }
      if (this.notificationConfigIsRequired()) {
        const executionLimit = job.notificationConfigForm.executionLimit;
        const mainRecipients = this.stringToArray(job.notificationConfigForm.mainRecipients);
        const secondaryRecipients = this.stringToArray(job.notificationConfigForm.secondaryRecipients);
        this.jobDetailRequest.notificationConfigRequest = { executionLimit, mainRecipients, secondaryRecipients };
      }
    } else {
      console.error('Form is invalid')
    }
  }

  private removeValidators(form: FormGroup) {
    for (const key in form.controls) {
      form.get(key)?.clearValidators();
      form.get(key)?.updateValueAndValidity();
    }
  }

  private addValidators(form: FormGroup, validatiors: any) {
    for (const key in form.controls) {
      form.get(key)?.setValidators(validatiors[key]);
      form.get(key)?.updateValueAndValidity();
    }
  }

}
