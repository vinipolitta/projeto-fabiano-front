import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormSubmissionRequest, FormTemplate, FormTemplateService } from '../../../../service/form-template/form-template.service';

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

  constructor(private service: FormTemplateService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates() {
    this.service.getTemplatesByClient(this.clientId).subscribe(res => {
      this.templates = res;
      console.log("[CARREGANDO TEMPLATE]", this.templates);
      
      this.cdr.detectChanges();
    });
  }

  selectTemplate(template: FormTemplate) {
    this.selectedTemplate = template;

    const group: any = {};
    template.fields.forEach(f => {
      group[f.label] = new FormControl('');
    });

    this.formGroup = new FormGroup(group);
  }

  submit() {
    if (!this.selectedTemplate) return;

    const payload: FormSubmissionRequest = {
      formTemplateId: this.selectedTemplate.id,
      data: this.formGroup.value
    };

    this.service.submitForm(payload).subscribe({
      next: () => {
        alert('Formulário enviado com sucesso!');
        this.formGroup.reset();
      },
      error: (err: any) => {
        console.error(err);
        alert('Erro ao enviar formulário');
      }
    });
  }
}