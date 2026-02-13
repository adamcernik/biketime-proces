import { useReactFlow } from '@xyflow/react';

export function Toolbar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute top-4 right-4 flex gap-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-1 z-10">
      <button
        onClick={() => zoomIn()}
        className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-lg cursor-pointer"
        title="Přiblížit"
      >
        +
      </button>
      <button
        onClick={() => zoomOut()}
        className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-lg cursor-pointer"
        title="Oddálit"
      >
        −
      </button>
      <div className="w-px bg-gray-200" />
      <button
        onClick={() => fitView({ padding: 0.1 })}
        className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-xs font-bold cursor-pointer"
        title="Zobrazit vše"
      >
        ⊞
      </button>
    </div>
  );
}
