import { supabase } from './supabase';
import { getUserIdentifier } from './fingerprint';
import type { ToolType } from '../types';

const DAILY_LIMIT = 5;

export async function checkUsageLimit(): Promise<{ allowed: boolean; remaining: number; isPremium: boolean }> {
  const userIdentifier = getUserIdentifier();

  const { data: premiumUser } = await supabase
    .from('premium_users')
    .select('*')
    .eq('user_identifier', userIdentifier)
    .eq('subscription_status', 'active')
    .maybeSingle();

  if (premiumUser) {
    const now = new Date();
    const endDate = premiumUser.subscription_end ? new Date(premiumUser.subscription_end) : null;

    if (!endDate || endDate > now) {
      return { allowed: true, remaining: -1, isPremium: true };
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: usageLogs, error } = await supabase
    .from('usage_logs')
    .select('*')
    .eq('user_identifier', userIdentifier)
    .gte('created_at', today.toISOString());

  if (error) {
    console.error('Error checking usage:', error);
    return { allowed: false, remaining: 0, isPremium: false };
  }

  const usageCount = usageLogs?.length || 0;
  const remaining = Math.max(0, DAILY_LIMIT - usageCount);

  return {
    allowed: usageCount < DAILY_LIMIT,
    remaining,
    isPremium: false
  };
}

export async function logUsage(toolType: ToolType, fileSize: number = 0): Promise<boolean> {
  const userIdentifier = getUserIdentifier();

  const { error } = await supabase
    .from('usage_logs')
    .insert({
      user_identifier: userIdentifier,
      tool_type: toolType,
      file_size: fileSize
    });

  if (error) {
    console.error('Error logging usage:', error);
    return false;
  }

  return true;
}
