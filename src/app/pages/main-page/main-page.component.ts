import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MainPageDTO} from "../../@core/dtos/MainPageDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainPageService} from "../../@core/services/main-page.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  form!: FormGroup;
  editing: boolean = false;
  mainPage: MainPageDTO = new MainPageDTO();

  @ViewChild("greetingRef") greetingRef!: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private mainPageService: MainPageService,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(data?: MainPageDTO): void {
    this.form = this.formBuilder.group({
      firstName: [data && data.firstName ? data.firstName : '',
        [Validators.required, Validators.maxLength(20)]],
      lastName: [data && data.lastName ? data.lastName : '',
        [Validators.required, Validators.minLength(5)]],
      address: [data && data.address ? data.address : '',
        [Validators.required]],
      numberPhone: [data && data.numberPhone ? data.numberPhone : 0,
        [Validators.required]],
    })
  }

  mockMethod(): void {
    this.form?.get('firstName')
  }

  toggleEditing(event: any): boolean {
    this.editing = event.checked;
    return this.editing;
  }

  save(): void {
    this.editing = false;
    this.mainPage.firstName = this.form.get('firstName')?.value;
    this.mainPage.lastName = this.form.get('lastName')?.value;
    this.mainPage.address = this.form.get('address')?.value;
    this.mainPage.numberPhone = this.form.get('numberPhone')?.value;
    console.log(this.form);
    this.mainPageService.save(this.mainPage).subscribe(data => {
      console.log(data);
    });
  }

  cancel(): void {
    this.editing = false;
    this.form.get('firstName')?.setValue(this.mainPage.firstName);
    this.form.get('lastName')?.setValue(this.mainPage.lastName);
    this.form.get('address')?.setValue(this.mainPage.address);
    this.form.get('numberPhone')?.setValue(this.mainPage.numberPhone);
  }

  getError(controlName: string): string {
    // if (controlName === 'first_name') {
    //   return 'Please insert valid first_name with max length 30!';
    // } else if (controlName === 'last_name') {
    //   return 'Please insert valid last_name with max length 30!';
    // } else if (controlName === 'number_phone') {
    //   if (this.form.get('number_phone')?.value > 12) {
    //     return 'Please insert number_phone of 12 digits!';
    //   } else if (this.form.get('number_phone')?.value < 12) {
    //     return 'Please insert number_phone of 12 digits!';
    //   }
    // }
    return 'Please insert valid field!';
  }
  openGreeting(): void{
    // let dialogRef = this.dialog.open(this.greetingRef);
  }
}
