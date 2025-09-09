
export interface Task {
    id?: string;
    title?: string;
    description?: string;
    priority: 'Baixa' | 'Média' | 'Alta';
    status?: 'Pendente' | 'Em andamento' | 'Concluída';
    sector: 'Liberdade News' | 'Solucao Financeira' | 'Manutenção' | 'Administrativo' | 'Produção' ;
    creationDate?: string;
    dueDate: string;
    completionDate?: string;
    responsible: string;
  }
  
  export interface ReportFilters {
    dateRange?: { start: Date; end: Date };
    responsibles?: string[];
    status?: ('Pendente' | 'Em andamento' | 'Concluída')[];
    sectors?: string[];
  }