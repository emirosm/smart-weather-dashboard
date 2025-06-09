import { create } from 'zustand';
import type { Unit, ChartType } from '../types/weather';

interface PreferencesStore {
  unit: Unit;
  chartType: ChartType;
  setUnit: (unit: Unit) => void;
  setChartType: (type: ChartType) => void;
}

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  unit: 'metric',
  chartType: 'temp',
  setUnit: (unit) => set({ unit }),
  setChartType: (type) => set({ chartType: type }),
})); 