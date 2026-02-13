import type { Node, Edge } from '@xyflow/react';

export type Actor = 'customer' | 'platform' | 'partner' | 'bankid' | 'payment';
export type Phase = 'reservation' | 'validation' | 'handover';
export type Status = 'planned' | 'in-progress' | 'done' | 'blocked';

export interface ProcessNodeData extends Record<string, unknown> {
  label: string;
  actor: Actor;
  phase: Phase;
  status: Status;
  description?: string;
  dependencies?: string[];
  notes?: string;
}

export interface DecisionNodeData extends Record<string, unknown> {
  label: string;
  actor: Actor;
  phase: Phase;
  status: Status;
  description?: string;
  notes?: string;
}

export interface NoteNodeData extends Record<string, unknown> {
  label: string;
  text: string;
  phase: Phase;
}

export interface ActorNodeData extends Record<string, unknown> {
  label: string;
  actor: Actor;
}

export type ProcessNode = Node<ProcessNodeData, 'process'>;
export type DecisionNode = Node<DecisionNodeData, 'decision'>;
export type NoteNode = Node<NoteNodeData, 'note'>;
export type ActorNode = Node<ActorNodeData, 'actor'>;

export type AppNode = ProcessNode | DecisionNode | NoteNode | ActorNode;
export type AppEdge = Edge;

export const ACTOR_COLORS: Record<Actor, string> = {
  customer: '#3B82F6',
  platform: '#10B981',
  partner: '#F59E0B',
  bankid: '#8B5CF6',
  payment: '#EF4444',
};

export const ACTOR_LABELS: Record<Actor, string> = {
  customer: 'Zákazník',
  platform: 'Platforma BTR',
  partner: 'Partner',
  bankid: 'BankID',
  payment: 'Platební brána',
};

export const PHASE_LABELS: Record<Phase, string> = {
  reservation: 'Fáze 1: Rezervace',
  validation: 'Fáze 2: Digitální validace',
  handover: 'Fáze 3: Fyzické předání',
};

export const STATUS_LABELS: Record<Status, string> = {
  planned: 'Plánováno',
  'in-progress': 'V realizaci',
  done: 'Hotovo',
  blocked: 'Blokováno',
};

export const STATUS_ICONS: Record<Status, string> = {
  planned: '○',
  'in-progress': '◐',
  done: '●',
  blocked: '✕',
};
