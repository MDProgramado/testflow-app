// src/app/interfaces/task.interface.ts

// Sua interface Task, mantida como você enviou
export interface Task {
    id?: string;
    title?: string;
    description?: string;
    priority: 'Baixa' | 'Média' | 'Alta';
    status?: 'Pendente' | 'Em andamento' | 'Concluída';
    sector: 'Produção' | 'Manutenção';
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