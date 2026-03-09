import type { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: 'merge',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one document',
    icon: 'Combine',
    path: '/merge-pdf',
    seoKeyword: 'merge pdf online free'
  },
  {
    id: 'split',
    name: 'Split PDF',
    description: 'Extract pages from your PDF or split into multiple files',
    icon: 'Split',
    path: '/split-pdf',
    seoKeyword: 'split pdf online'
  },
  {
    id: 'compress',
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    icon: 'Minimize2',
    path: '/compress-pdf',
    seoKeyword: 'compress pdf online'
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF files to editable Word documents',
    icon: 'FileText',
    path: '/pdf-to-word',
    seoKeyword: 'pdf to word converter'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    icon: 'FileType',
    path: '/word-to-pdf',
    seoKeyword: 'word to pdf converter'
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert JPG images to PDF documents',
    icon: 'Image',
    path: '/jpg-to-pdf',
    seoKeyword: 'convert jpg to pdf'
  },
  {
    id: 'rotate',
    name: 'Rotate PDF',
    description: 'Rotate pages in your PDF document',
    icon: 'RotateCw',
    path: '/rotate-pdf',
    seoKeyword: 'rotate pdf online'
  }
];
