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
import { Router } from '@angular/router';

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
  selectedTemplateId!: number;

  clientId = 2; // ID do cliente logado (exemplo)
  userRole: string | null = null;

  constructor(
    private service: FormTemplateService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    console.log('[ClientFormComponent - $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$]', this.userRole);
    this.loadTemplates();
  }

  loadTemplates() {
    if (this.userService.getRole() === 'ROLE_CLIENT') {
      this.service.getTemplatesByClient(this.clientId).subscribe((res) => {
        this.templates = res;
        console.log('[CARREGANDO TEMPLATE]', this.templates);

        // ⚡ armazenar o templateId do primeiro template por exemplo
        if (this.templates.length > 0) {
          this.selectedTemplateId = this.templates[0].id;
          console.log('[TEMPLATE SELECIONADO]', this.selectedTemplateId);
        }

        this.cdr.detectChanges();
      });
    }
  }

  goToList() {
    this.router.navigate(['/list-templates'], {
      queryParams: { templateId: this.selectedTemplateId },
    });
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
      templateId: this.selectedTemplate.id,
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
