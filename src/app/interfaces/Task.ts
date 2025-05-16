export interface Task {
    id?: string;
    title?: string;
    description?: string;
    priority: 'Baixa' | 'Média' | 'Alta';
    status?: 'Pendente' | 'Em andamento' | 'Concluída';
    sector: 'Produção' | 'Manutenção';
    dueDate: string;
    responsible: string;
}