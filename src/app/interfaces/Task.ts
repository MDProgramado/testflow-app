export interface Task {
    id?: number;
    title?: string;
    description?: string;
    priority: 'Baixa' | 'Média' | 'Alta';
    status?: 'Pendente' | 'Em andamento' | 'Concluída';
    dueDate: string;
    responsible: string;
}