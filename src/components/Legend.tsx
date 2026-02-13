import {
  ACTOR_COLORS,
  ACTOR_LABELS,
  STATUS_LABELS,
  STATUS_ICONS,
} from '../types/process';
import type { Actor, Status } from '../types/process';

export function Legend() {
  const actors = Object.entries(ACTOR_LABELS) as [Actor, string][];
  const statuses = Object.entries(STATUS_LABELS) as [Status, string][];

  return (
    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3 z-10 text-xs">
      <div className="font-bold text-gray-700 mb-2 uppercase tracking-wide">Legenda</div>

      {/* Actors */}
      <div className="mb-3">
        <div className="text-gray-500 font-medium mb-1">Aktéři</div>
        <div className="flex flex-col gap-1">
          {actors.map(([actor, label]) => (
            <div key={actor} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: ACTOR_COLORS[actor] }}
              />
              <span className="text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Statuses */}
      <div>
        <div className="text-gray-500 font-medium mb-1">Stav implementace</div>
        <div className="flex flex-col gap-1">
          {statuses.map(([status, label]) => (
            <div key={status} className="flex items-center gap-2">
              <span className="w-3 text-center shrink-0">{STATUS_ICONS[status]}</span>
              <span className="text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
