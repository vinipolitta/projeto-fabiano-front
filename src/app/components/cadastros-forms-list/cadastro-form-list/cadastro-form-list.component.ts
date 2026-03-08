// cadastro-form-list.component.ts
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {
  FormSubmission,
  FormTemplateService,
} from '../../../service/form-template/form-template.service';
import { DatePipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-form-list',
  templateUrl: './cadastro-form-list.component.html',
  imports: [DatePipe, CommonModule],
  styleUrls: ['./cadastro-form-list.component.css'],
})
export class CadastroFormListComponent implements OnInit {
  @Input() templateId!: number; // ⚡ receber templateId do template selecionado
  submissions: FormSubmission[] = [];
  tableHeaders: string[] = []; // ⚡ campos dinâmicos da tabela
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private submissionService: FormTemplateService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // ⚡ pega templateId da query param
    this.route.queryParams.subscribe((params) => {
      const tId = params['templateId'];
      console.log('AQUI AGORA VAI NESSA PORRA', tId);

      if (tId) {
        this.templateId = +tId; // converte para number
        this.loadSubmissions(); // carrega os formulários do template
      }
    });
  }

  loadSubmissions() {
    this.loading = true;
    this.submissionService.getSubmissionsByTemplate(this.templateId).subscribe({
      next: (res) => {
        this.submissions = res;
        console.log('[SUBMISSIONS DO TEMPLATE]', this.submissions);

        // ⚡ gerar headers dinamicamente com base nos campos de todas as submissões
        this.generateTableHeaders();

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erro ao carregar submissões.';
        this.loading = false;
      },
    });
  }

  // ⚡ gerar cabeçalhos da tabela de forma dinâmica
  generateTableHeaders() {
    const allKeys = new Set<string>();
    this.submissions.forEach(sub => {
      Object.keys(sub.values).forEach(key => allKeys.add(key));
    });
    this.tableHeaders = Array.from(allKeys);
    console.log('[TABLE HEADERS]', this.tableHeaders);
  }

  // ⚡ manter método antigo caso queira usar para listas separadas
  submissionValuesKeys(submission: FormSubmission): string[] {
    return Object.keys(submission.values);
  }
}