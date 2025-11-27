import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;

export type BloodInventory = {
  id: number;
  blood_type: string;
  units: number;
  status: 'critical' | 'low' | 'adequate' | 'high';
  updated_at: string;
};

export type DonationRequest = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  blood_type: string;
  address: string;
  preferred_date: string;
  request_type: 'donate' | 'receive';
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  created_at?: string;
};

// Blood Inventory Functions
export async function getBloodInventory(): Promise<BloodInventory[]> {
  if (!supabase) {
    // Return fallback data when Supabase isn't configured
    return [
      { id: 1, blood_type: "A+", units: 45, status: "adequate", updated_at: new Date().toISOString() },
      { id: 2, blood_type: "A-", units: 12, status: "low", updated_at: new Date().toISOString() },
      { id: 3, blood_type: "B+", units: 67, status: "high", updated_at: new Date().toISOString() },
      { id: 4, blood_type: "B-", units: 8, status: "critical", updated_at: new Date().toISOString() },
      { id: 5, blood_type: "AB+", units: 34, status: "adequate", updated_at: new Date().toISOString() },
      { id: 6, blood_type: "AB-", units: 5, status: "critical", updated_at: new Date().toISOString() },
      { id: 7, blood_type: "O+", units: 78, status: "high", updated_at: new Date().toISOString() },
      { id: 8, blood_type: "O-", units: 15, status: "low", updated_at: new Date().toISOString() },
    ];
  }
  const { data, error } = await supabase
    .from('blood_inventory')
    .select('*')
    .order('blood_type');
  
  if (error) throw error;
  return data as BloodInventory[];
}

export async function updateBloodInventory(bloodType: string, units: number) {
  let status: BloodInventory['status'] = 'high';
  if (units < 10) status = 'critical';
  else if (units < 20) status = 'low';
  else if (units < 50) status = 'adequate';

  const { data, error } = await supabase
    .from('blood_inventory')
    .update({ units, status, updated_at: new Date().toISOString() })
    .eq('blood_type', bloodType)
    .select();
  
  if (error) throw error;
  return data;
}

// Donation Request Functions
export async function createDonationRequest(request: Omit<DonationRequest, 'id' | 'created_at' | 'status'>) {
  if (!supabase) {
    // Store in localStorage when Supabase isn't configured
    const newRequest = { ...request, id: Date.now(), status: 'pending' as const, created_at: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('donation_requests') || '[]');
    existing.push(newRequest);
    localStorage.setItem('donation_requests', JSON.stringify(existing));
    return [newRequest];
  }
  const { data, error } = await supabase
    .from('donation_requests')
    .insert([{ ...request, status: 'pending' }])
    .select();
  
  if (error) throw error;
  return data;
}

// Get requests from localStorage (for admin page)
export function getLocalRequests(): DonationRequest[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('donation_requests') || '[]');
}

export async function getDonationRequests(type?: 'donate' | 'receive') {
  if (!supabase) throw new Error('Supabase not configured');
  let query = supabase.from('donation_requests').select('*').order('created_at', { ascending: false });
  
  if (type) {
    query = query.eq('request_type', type);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data as DonationRequest[];
}

