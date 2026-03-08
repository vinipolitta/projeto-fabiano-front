import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormSubmissionRequest,
  FormTemplate,
  FormTemplateService,
} from '../../../../service/form-template/form-template.service';
import { UserService } from '../../../../service/user/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: true,
  templateUrl: './client-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class ClientFormComponent implements OnInit {
  templates: FormTemplate[] = [];
  selectedTemplate: FormTemplate | null = null;
  formGroup: FormGroup = new FormGroup({});

  clientId = 2; // ID do cliente logado (exemplo)
  userRole: string | null = null; 

  constructor(
    private service: FormTemplateService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    console.log("[AQUIIIII NESSA PORRA]", this.userRole)
    this.loadTemplates();
  }

  loadTemplates() {
    if (this.userService.getRole() === "ROLE_CLIENT") {
      this.service.getTemplatesByClient(this.clientId).subscribe((res) => {
        this.templates = res;
        console.log('[CARREGANDO TEMPLATE]', this.templates);
  
        this.cdr.detectChanges();
      });
    }
      else if (this.userService.getRole() === "ROLE_ADMIN") {
        this.service.getTemplatesByAdmin(this.clientId).subscribe((res) => {
        this.templates = res;
        console.log('[CARREGANDO ESSA BDEGA]', this.templates);
  
        this.cdr.detectChanges();
      });
      }
  }

  selectTemplate(template: FormTemplate) {
    this.selectedTemplate = template;

    const group: any = {};
    template.fields.forEach((f) => {
      group[f.label] = new FormControl('');
    });

    this.formGroup = new FormGroup(group);
  }

  submit() {
    if (!this.selectedTemplate) return;

    const payload: FormSubmissionRequest = {
      templateId  : this.selectedTemplate.id,
      values: this.formGroup.value,
    };

    this.service.submitForm(payload).subscribe({
      next: () => {
        alert('Formulário enviado com sucesso!');
        this.formGroup.reset();
      },
      error: (err: any) => {
        console.error(err);
        alert('Erro ao enviar formulário');
      },
    });
  }
}
