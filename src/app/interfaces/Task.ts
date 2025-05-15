export interface Task {
    id?: number;
    title?: string;
    description?: string;
    priority: 'Baixa' | 'Média' | 'Alta';
    status?: 'Pendente' | 'Em andamento' | 'Concluída';
    sector: 'Produção' | 'Manutenção';
    dueDate: string;
    responsible: string;
}