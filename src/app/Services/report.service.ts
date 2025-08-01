import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  /**
   * Gera um relatório em PDF a partir de uma lista de tarefas e uma imagem de gráfico.
   * @param tasks - Array de tarefas a serem exibidas na tabela.
   * @param chartImage - Imagem do gráfico em formato base64. Pode ser uma string vazia se não houver gráfico.
   */
  public generateTaskReport(tasks: any[], chartImage: string): void {
    const doc = new jsPDF();

    // Título do relatório
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Relatório de Tarefas - TaskFlow', 14, 20);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30);
    
  
    const tableColumn = ["Título", "Descrição", "Status", "Responsável", "Prazo"];
    const tableRows = tasks.map((task) => [
      task.title,
      task.description,
      task.status,
      task.responsible,
      task.deadline ? new Date(task.deadline).toLocaleDateString('pt-BR') : 'Não Definido'
    ]);

    // Criação da Tabela 
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [54, 162, 235], textColor: 255 },
      bodyStyles: { fontSize: 9 },
      margin: { top: 10, bottom: 20 },
      columnStyles: {
        0: { halign: 'left', cellWidth: 30 },
        1: { halign: 'left', cellWidth: 'auto' },
        2: { halign: 'center', cellWidth: 25 },
        3: { halign: 'center', cellWidth: 30 },
        4: { halign: 'center', cellWidth: 25 }
      },
      
     
      didDrawPage: (data) => {
       
        if (chartImage && data.cursor) {
          doc.addImage(chartImage, 'PNG', data.settings.margin.left, data.cursor.y + 15, 180, 100);
          
        }
      }
    });

    // Rodapé
    const pageCount = (doc as any).internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text('TaskFlow - Sistema de Gestão de Tarefas', 14, doc.internal.pageSize.height - 10);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 35, doc.internal.pageSize.height - 10);
    }
    
    // Salvar o arquivo PDF
    doc.save('relatorio-tarefas.pdf');
  }
}