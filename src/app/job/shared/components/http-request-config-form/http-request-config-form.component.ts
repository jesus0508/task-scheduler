import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-http-request-config-form',
  templateUrl: './http-request-config-form.component.html',
  styleUrls: ['./http-request-config-form.component.css']
})
export class HttpRequestConfigFormComponent implements OnInit {

  httpRequestConfigForm!: FormGroup;
  httpMethods: Array<String> = ['POST', 'GET', 'PUT', 'DELETE', 'PATCH']
  @Input() required: boolean = false;

  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.httpRequestConfigForm = this.rootFormGroup.control.get('httpRequestConfigForm') as FormGroup;
  }

}
