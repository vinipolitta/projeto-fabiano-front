import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormTemplateService, FormTemplateRequest } from '../../../service/form-template/form-template.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-template',
  standalone: true,
  templateUrl: './create-template.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateTemplateComponent implements OnInit {
  templateForm: FormGroup;
  clients: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private service: FormTemplateService,
    private cdr: ChangeDetectorRef
  ) {
    this.templateForm = this.fb.group({
      name: ['', Validators.required],
      clientId: [null, Validators.required],
      fields: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  get fields(): FormArray {
    return this.templateForm.get('fields') as FormArray;
  }

  addField() {
    const fieldGroup = this.fb.group({
      label: ['', Validators.required],
      type: ['text', Validators.required],
      required: [false],
    });
    this.fields.push(fieldGroup);
  }

  removeField(index: number) {
    this.fields.removeAt(index);
  }

  loadClients() {
    this.service.getClients().subscribe(res => {
      this.clients = res;
      this.cdr.detectChanges();
    });
  }

  submit() {
    if (this.templateForm.invalid) return;

    const clientId = this.templateForm.value.clientId;
    const payload: FormTemplateRequest = {
      name: this.templateForm.value.name,
      fields: this.templateForm.value.fields
    };

    this.service.createTemplate(clientId, payload).subscribe({
      next: () => {
        alert('Template criado com sucesso!');
        this.templateForm.reset();
        this.fields.clear();
      },
      error: (err: any) => {
        console.error(err);
        alert('Erro ao criar template');
      },
    });
  }
}