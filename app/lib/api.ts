/**
 * api.ts
 * Typed API client for the MatTrack Python backend.
 * All components import from here — change the base URL in .env.local only.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ── Types ─────────────────────────────────────────────────────────────────────

export type MaterialStatus = "green" | "amber" | "red";

export interface PricePoint {
  date: string;
  price: number;
}

export interface Material {
  id: string;
  name: string;
  grade: string;
  unit: string;
  currentPrice: number;
  previousPrice?: number;
  supplierName: string;
  yourSupplierPrice: number;
  lastUpdated: string;
  status: MaterialStatus;
  signal: string;
  change7d: number;
  change30d: number;
  change90d: number;
  avg30d: number;
  avg90d: number;
  aiRecommendation: string;
  history?: PricePoint[];
}

export interface Alert {
  id: number;
  materialId: string;
  material: string;
  type: "buying_opportunity" | "price_surge" | "supplier_overprice";
  severity: "high" | "medium" | "low";
  message: string;
  action: string;
  timestamp: string;
  read: boolean;
}

export interface SavingsItem {
  material: string;
  action: string;
  saving: number;
}

export interface Summary {
  companyName: string;
  lastUpdated: string;
  stats: {
    materialsTracked: number;
    activeAlerts: number;
    pricesRising: number;
    pricesFalling: number;
  };
  monthlySavingsOpportunities: SavingsItem[];
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 300 }, // Cache for 5 minutes on server components
  });
  if (!res.ok) throw new Error(`API error ${res.status} on ${path}`);
  return res.json() as Promise<T>;
}

// ── Exported API functions ────────────────────────────────────────────────────

export async function fetchSummary(): Promise<Summary> {
  return apiFetch<Summary>("/api/summary");
}

export async function fetchMaterials(): Promise<Material[]> {
  return apiFetch<Material[]>("/api/materials");
}

export async function fetchMaterial(id: string, days = 90): Promise<Material> {
  return apiFetch<Material>(`/api/materials/${id}?days=${days}`);
}

export async function fetchAlerts(limit = 20): Promise<Alert[]> {
  return apiFetch<Alert[]>(`/api/alerts?limit=${limit}`);
}

export async function markAlertRead(id: number): Promise<void> {
  await fetch(`${API_URL}/api/alerts/${id}/read`, { method: "POST" });
}

export async function triggerRefresh(): Promise<void> {
  await fetch(`${API_URL}/api/refresh`, { method: "POST" });
}
