import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-notification-config-form',
  templateUrl: './notification-config-form.component.html',
  styleUrls: ['./notification-config-form.component.css']
})
export class NotificationConfigFormComponent implements OnInit {

  notificationConfigForm!: FormGroup;
  @Input() required: boolean = false;
  @Output() onPrevSubmit = new EventEmitter<void>();
  
  constructor(private rootFormGroup: FormGroupDirective, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.notificationConfigForm = this.rootFormGroup.control.get('notificationConfigForm') as FormGroup;
  }

  get cc(): FormArray {
    return this.notificationConfigForm.get('cc') as FormArray;
  }

  addCc(): void {
    this.cc.push(this.fb.control(['', [Validators.email, Validators.maxLength(50)]]));
  }

  deleteCc(index: number): void {
    this.cc.removeAt(index);
  }

  createJobDetailRequestPreview(): void {
    this.onPrevSubmit.emit();
  }
}
