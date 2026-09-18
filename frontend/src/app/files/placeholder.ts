import { FileItem } from '../types/file-item';

export const PLACEHOLDER_FILES: FileItem[] = [
  { id: 1, name: 'relatorio-anual-2025.pdf', type: 'pdf',  uploadedAt: new Date('2025-03-12'), comments: 4,  desc: 'Relatório consolidado do ano fiscal de 2024.' },
  { id: 2, name: 'logo-principal.png',        type: 'png',  uploadedAt: new Date('2025-02-28'), comments: 0,  desc: 'Versão principal do logo em alta resolução.' },
  { id: 3, name: 'foto-equipe.jpg',           type: 'jpeg', uploadedAt: new Date('2025-02-14'), comments: 7,  desc: 'Foto oficial da equipe tirada no evento de janeiro.' },
  { id: 4, name: 'contrato-servicos.pdf',     type: 'pdf',  uploadedAt: new Date('2025-01-30'), comments: 2,  desc: '' },
  { id: 5, name: 'banner-promocional.png',    type: 'png',  uploadedAt: new Date('2025-01-22'), comments: 1,  desc: 'Banner para a campanha de fevereiro.' },
  { id: 6, name: 'screenshot-bug.jpg',        type: 'jpeg', uploadedAt: new Date('2025-01-10'), comments: 12, desc: '' },
];