import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Setting } from '../shared/interfaces/Setting';
import { SettingService } from '../shared/services/setting.service';

@Component({
  selector: 'app-setting-show-and-edit',
  templateUrl: './setting-show-and-edit.component.html',
  styleUrls: ['./setting-show-and-edit.component.css']
})
export class SettingShowAndEditComponent implements OnInit {

  settingForm: FormGroup;
  setting$!: Observable<Setting>;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private settingService: SettingService) {
    this.settingForm = this.fb.group({
      sender: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      subject: ['', [Validators.required, Validators.maxLength(50)]],
      diff: [1, [Validators.required, Validators.min(1)]],
      recipientName: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {
    this.settingService.getSettingById(1).subscribe(setting => this.fillForm(setting));
  }

  fillForm(setting: Setting) {
    this.settingForm.patchValue({ ...setting });
  }

  updateSetting() {
    this.settingService.update(1, this.settingForm.value).subscribe(result => {
      this.snackBar.open("Datos actualizados con exito", '', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    });
  }
}
