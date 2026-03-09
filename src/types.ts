export type ToolType = 'merge' | 'split' | 'compress' | 'pdf-to-word' | 'word-to-pdf' | 'jpg-to-pdf' | 'rotate';

export interface Tool {
  id: ToolType;
  name: string;
  description: string;
  icon: string;
  path: string;
  seoKeyword: string;
}

export interface UsageLog {
  id: string;
  user_identifier: string;
  tool_type: ToolType;
  created_at: string;
  file_size: number;
}

export interface PremiumUser {
  id: string;
  email: string;
  user_identifier: string;
  subscription_status: 'active' | 'expired' | 'cancelled';
  subscription_start: string;
  subscription_end: string | null;
}
