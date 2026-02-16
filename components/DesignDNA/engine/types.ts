// Vibe Mixer Configuration Types

import type { PresetName, CursorMode, ClickMode } from '../presets';

export interface DesignDNAConfig {
  // Selected preset
  preset: PresetName;

  // Vibe sliders (0-1)
  energy: number;      // calm ↔ amped (speed, count, opacity animation)
  connection: number;  // loose ↔ connected (links, link distance, link opacity)
  magic: number;       // clean ↔ sparkly (glow, size animation, opacity variance)
  chaos: number;       // stable ↔ wild (direction spread, random movement, bounce)

  // Interaction modes
  cursor: CursorMode;
  click: ClickMode;
}

export const DEFAULT_CONFIG: DesignDNAConfig = {
  preset: 'moonlight',
  energy: 0.4,
  connection: 0.5,
  magic: 0.3,
  chaos: 0.3,
  cursor: 'repel',
  click: 'burst',
};

// Re-export preset types for convenience
export type { PresetName, CursorMode, ClickMode };
