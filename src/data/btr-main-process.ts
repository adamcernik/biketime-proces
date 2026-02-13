import type { AppNode, AppEdge } from '../types/process';

// Layout constants
const COL_W = 280;
const ROW_H = 100;
const PHASE_GAP = 60;

// Column X positions by actor
const X = {
  customer: 0,
  platform: COL_W,
  partner: COL_W * 2,
  bankid: COL_W * 3,
  payment: COL_W * 4,
};

// Starting Y offsets per phase
const PHASE_Y = {
  reservation: 80,
  validation: 80 + 5 * ROW_H + PHASE_GAP,
  handover: 80 + 5 * ROW_H + PHASE_GAP + 14 * ROW_H + PHASE_GAP,
};

export const initialNodes: AppNode[] = [
  // ─── PHASE LABELS (note nodes) ───
  {
    id: 'phase-reservation',
    type: 'note',
    position: { x: -220, y: PHASE_Y.reservation },
    data: { label: 'FÁZE 1', text: 'Rezervace', phase: 'reservation' },
  },
  {
    id: 'phase-validation',
    type: 'note',
    position: { x: -220, y: PHASE_Y.validation },
    data: { label: 'FÁZE 2', text: 'Digitální validace', phase: 'validation' },
  },
  {
    id: 'phase-handover',
    type: 'note',
    position: { x: -220, y: PHASE_Y.handover },
    data: { label: 'FÁZE 3', text: 'Fyzické předání', phase: 'handover' },
  },

  // ─── ACTOR HEADERS ───
  {
    id: 'actor-customer',
    type: 'actor',
    position: { x: X.customer, y: 0 },
    data: { label: 'Zákazník', actor: 'customer' },
  },
  {
    id: 'actor-platform',
    type: 'actor',
    position: { x: X.platform, y: 0 },
    data: { label: 'Platforma BTR', actor: 'platform' },
  },
  {
    id: 'actor-partner',
    type: 'actor',
    position: { x: X.partner, y: 0 },
    data: { label: 'Partner', actor: 'partner' },
  },
  {
    id: 'actor-bankid',
    type: 'actor',
    position: { x: X.bankid, y: 0 },
    data: { label: 'BankID', actor: 'bankid' },
  },
  {
    id: 'actor-payment',
    type: 'actor',
    position: { x: X.payment, y: 0 },
    data: { label: 'Platební brána', actor: 'payment' },
  },

  // ─── PHASE 1: RESERVATION ───
  {
    id: 'reservation-1',
    type: 'process',
    position: { x: X.customer, y: PHASE_Y.reservation },
    data: {
      label: 'Otevření odkazu / QR kódu',
      actor: 'customer',
      phase: 'reservation',
      status: 'planned',
      description: 'Zákazník otevře odkaz nebo naskenuje QR kód partnera.',
    },
  },
  {
    id: 'reservation-2',
    type: 'process',
    position: { x: X.platform, y: PHASE_Y.reservation + ROW_H },
    data: {
      label: 'Zobrazení flotily partnera',
      actor: 'platform',
      phase: 'reservation',
      status: 'planned',
      description: 'Platforma zobrazí dostupná elektrokola daného partnera.',
    },
  },
  {
    id: 'reservation-3',
    type: 'process',
    position: { x: X.customer, y: PHASE_Y.reservation + ROW_H * 2 },
    data: {
      label: 'Výběr kola a období',
      actor: 'customer',
      phase: 'reservation',
      status: 'planned',
      description: 'Zákazník vybere konkrétní kolo a období pronájmu.',
    },
  },
  {
    id: 'reservation-4',
    type: 'process',
    position: { x: X.platform, y: PHASE_Y.reservation + ROW_H * 3 },
    data: {
      label: 'Cenový souhrn a balíček',
      actor: 'platform',
      phase: 'reservation',
      status: 'planned',
      description: 'Platforma zobrazí cenový souhrn včetně pojištění a příslušenství.',
    },
  },
  {
    id: 'reservation-5',
    type: 'process',
    position: { x: X.customer, y: PHASE_Y.reservation + ROW_H * 4 },
    data: {
      label: 'Potvrzení rezervace',
      actor: 'customer',
      phase: 'reservation',
      status: 'planned',
      description: 'Zákazník potvrdí svou rezervaci a přechází k validaci.',
    },
  },

  // ─── PHASE 2: VALIDATION ───
  {
    id: 'validation-decision',
    type: 'decision',
    position: { x: X.platform, y: PHASE_Y.validation },
    data: {
      label: 'Český rezident s BankID?',
      actor: 'platform',
      phase: 'validation',
      status: 'planned',
      description: 'Rozhodovací bod: má zákazník české BankID?',
    },
  },

  // BankID path
  {
    id: 'validation-bankid-redirect',
    type: 'process',
    position: { x: X.bankid, y: PHASE_Y.validation + ROW_H },
    data: {
      label: 'Přesměrování na BankID',
      actor: 'bankid',
      phase: 'validation',
      status: 'planned',
      description: 'Zákazník je přesměrován na BankID bránu.',
    },
  },
  {
    id: 'validation-bankid-select',
    type: 'process',
    position: { x: X.customer, y: PHASE_Y.validation + ROW_H * 2 },
    data: {
      label: 'Výběr banky',
      actor: 'customer',
      phase: 'validation',
      status: 'planned',
      description: 'Zákazník vybere svou banku ze seznamu.',
    },
  },
  {
    id: 'validation-bankid-auth',
    type: 'process',
    position: { x: X.customer, y: PHASE_Y.validation + ROW_H * 3 },
    data: {
      label: 'Autentizace (MFA)',
      actor: 'customer',
      phase: 'validation',
      status: 'planned',
      description: 'Zákazník se autentizuje v bankovní aplikaci pomocí MFA.',
    },
  },
  {
    id: 'validation-bankid-data',
    type: 'process',
    position: { x: X.bankid, y: PHASE_Y.validation + ROW_H * 4 },
    data: {
      label: 'Vrácení ověřených dat (IDENTIFY)',
      actor: 'bankid',
      phase: 'validation',
      status: 'planned',
      description: 'BankID vrátí ověřená data: jméno, adresa, IBAN.',
      notes: 'OIDC scope: openid profile birthdate address email phone payment_accounts',
    },
  },
  {
    id: 'validation-age-check',
    type: 'process',
    position: { x: X.platform, y: PHASE_Y.validation + ROW_H * 5 },
    data: {
      label: 'Validace věku (18+)',
      actor: 'platform',
      phase: 'validation',
      status: 'planned',
      description: 'Platforma ověří, že zákazník je starší 18 let.',
    },
  },
  {
    id: 'validation-contract-gen',
    type: 'process',
    position: { x: X.platform, y: PHASE_Y.validation + ROW_H * 6 },
    data: {
      label: 'Generování PDF smlouvy',
      actor: 'platform',
      phase: 'validation',
      status: 'planned',
      description: 'Platforma generuje PDF nájemní smlouvy s ověřenými daty z BankID.',
    },
  },
  {
    id: 'validation-bankid-sign',
    type: 'process',
    position: { x: X.bankid, y: PHASE_Y.validation + ROW_H * 7 },
    data: {
      label: 'Podpis smlouvy (BankID SIGN)',
      actor: 'bankid',
      phase: 'validation',
      status: 'planned',
      description: 'Zákazník podepíše smlouvu přes BankID SIGN (hash-based).',
      notes: 'SHA-256 hash PDF → BankID API → digitální podpis',
    },
  },
  {
    id: 'validation-store-sig',
    type: 'process',
    position: { x: X.platform, y: PHASE_Y.validation + ROW_H * 8 },
    data: {
      label: 'Uložení podpisu + audit trail',
      actor: 'platform',
      phase: 'validation',
      status: 'planned',
      description: 'Platforma uloží podpis, hash dokumentu a timestamp.',
      notes: 'Audit trail: signature_id, document_hash, timestamp, LoA',
    },
  },

  // Fallback path
  {
    id: 'validation-fallback-upload',
    type: 'process',
    position: { x: X.customer, y: PHASE_Y.validation + ROW_H * 10 },
    data: {
      label: 'Nahrání foto dokladu',
      actor: 'customer',
      phase: 'validation',
      status: 'planned',
      description: 'Zákazník bez BankID nahraje fotku dokladu totožnosti.',
    },
  },
  {
    id: 'validation-fallback-verify',
    type: 'process',
    position: { x: X.partner, y: PHASE_Y.validation + ROW_H * 11 },
    data: {
      label: 'Ověření při předání',
      actor: 'partner',
      phase: 'validation',
      status: 'planned',
      description: 'Partner ověří totožnost zákazníka při fyzickém předání.',
    },
  },
  {
    id: 'validation-fallback-deposit',
    type: 'process',
    position: { x: X.platform, y: PHASE_Y.validation + ROW_H * 12 },
    data: {
      label: 'Zvýšená kauce',
      actor: 'platform',
      phase: 'validation',
      status: 'planned',
      description: 'Platforma nastaví zvýšenou kauci pro neověřeného zákazníka.',
    },
  },

  // Payment (both paths merge)
  {
    id: 'validation-payment',
    type: 'process',
    position: { x: X.payment, y: PHASE_Y.validation + ROW_H * 9 },
    data: {
      label: 'Platba přes platební bránu',
      actor: 'payment',
      phase: 'validation',
      status: 'planned',
      description: 'Zákazník provede platbu přes platební bránu.',
    },
  },
  {
    id: 'validation-confirmation',
    type: 'process',
    position: { x: X.platform, y: PHASE_Y.validation + ROW_H * 13 },
    data: {
      label: 'Odeslání potvrzení + notifikace',
      actor: 'platform',
      phase: 'validation',
      status: 'planned',
      description: 'Platforma odešle potvrzení zákazníkovi a notifikaci partnerovi.',
    },
  },

  // ─── PHASE 3: HANDOVER ───
  {
    id: 'handover-notify',
    type: 'process',
    position: { x: X.partner, y: PHASE_Y.handover },
    data: {
      label: 'Notifikace o ověřené rezervaci',
      actor: 'partner',
      phase: 'handover',
      status: 'planned',
      description: 'Partner obdrží notifikaci o nové ověřené rezervaci.',
    },
  },
  {
    id: 'handover-prepare',
    type: 'process',
    position: { x: X.partner, y: PHASE_Y.handover + ROW_H },
    data: {
      label: 'Příprava kola + příslušenství',
      actor: 'partner',
      phase: 'handover',
      status: 'planned',
      description: 'Partner připraví elektrokolo a příslušenství k předání.',
    },
  },
  {
    id: 'handover-arrive',
    type: 'process',
    position: { x: X.customer, y: PHASE_Y.handover + ROW_H * 2 },
    data: {
      label: 'Příchod na výdejní místo',
      actor: 'customer',
      phase: 'handover',
      status: 'planned',
      description: 'Zákazník se dostaví na výdejní místo partnera.',
    },
  },
  {
    id: 'handover-deliver',
    type: 'process',
    position: { x: X.partner, y: PHASE_Y.handover + ROW_H * 3 },
    data: {
      label: 'Předání kola',
      actor: 'partner',
      phase: 'handover',
      status: 'planned',
      description: 'Partner předá kolo — minimální administrativa, vše hotovo digitálně.',
    },
  },
  {
    id: 'handover-start',
    type: 'process',
    position: { x: X.platform, y: PHASE_Y.handover + ROW_H * 4 },
    data: {
      label: 'Zahájení pronájmu (GPS tracking)',
      actor: 'platform',
      phase: 'handover',
      status: 'planned',
      description: 'Platforma aktivuje pronájem a zapne GPS tracking elektrokola.',
    },
  },
];

export const initialEdges: AppEdge[] = [
  // Phase 1: Reservation flow
  { id: 'e-r1-r2', source: 'reservation-1', target: 'reservation-2', animated: true },
  { id: 'e-r2-r3', source: 'reservation-2', target: 'reservation-3' },
  { id: 'e-r3-r4', source: 'reservation-3', target: 'reservation-4' },
  { id: 'e-r4-r5', source: 'reservation-4', target: 'reservation-5' },

  // Reservation → Validation
  { id: 'e-r5-vd', source: 'reservation-5', target: 'validation-decision', animated: true },

  // BankID path (Ano)
  {
    id: 'e-vd-bankid',
    source: 'validation-decision',
    target: 'validation-bankid-redirect',
    label: 'Ano — BankID',
    type: 'labeled',
  },
  { id: 'e-bid-sel', source: 'validation-bankid-redirect', target: 'validation-bankid-select' },
  { id: 'e-sel-auth', source: 'validation-bankid-select', target: 'validation-bankid-auth' },
  { id: 'e-auth-data', source: 'validation-bankid-auth', target: 'validation-bankid-data' },
  { id: 'e-data-age', source: 'validation-bankid-data', target: 'validation-age-check' },
  { id: 'e-age-contract', source: 'validation-age-check', target: 'validation-contract-gen' },
  { id: 'e-contract-sign', source: 'validation-contract-gen', target: 'validation-bankid-sign' },
  { id: 'e-sign-store', source: 'validation-bankid-sign', target: 'validation-store-sig' },
  { id: 'e-store-pay', source: 'validation-store-sig', target: 'validation-payment' },

  // Fallback path (Ne)
  {
    id: 'e-vd-fallback',
    source: 'validation-decision',
    target: 'validation-fallback-upload',
    label: 'Ne — Fallback',
    type: 'labeled',
  },
  { id: 'e-fb-upload-verify', source: 'validation-fallback-upload', target: 'validation-fallback-verify' },
  { id: 'e-fb-verify-deposit', source: 'validation-fallback-verify', target: 'validation-fallback-deposit' },
  { id: 'e-fb-deposit-pay', source: 'validation-fallback-deposit', target: 'validation-payment' },

  // After payment → confirmation
  { id: 'e-pay-confirm', source: 'validation-payment', target: 'validation-confirmation' },

  // Validation → Handover
  { id: 'e-confirm-notify', source: 'validation-confirmation', target: 'handover-notify', animated: true },
  { id: 'e-notify-prepare', source: 'handover-notify', target: 'handover-prepare' },
  { id: 'e-prepare-arrive', source: 'handover-prepare', target: 'handover-arrive' },
  { id: 'e-arrive-deliver', source: 'handover-arrive', target: 'handover-deliver' },
  { id: 'e-deliver-start', source: 'handover-deliver', target: 'handover-start' },
];
