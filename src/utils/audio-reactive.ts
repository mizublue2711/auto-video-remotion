import { random } from 'remotion';

/**
 * Audio Spectrum Analyzer helpers for audio-reactive motion animations.
 */
export interface AudioSpectrumOptions {
  bands?: number;
  sensitivity?: number;
}

export const getSpectrumData = (
  frame: number,
  options: AudioSpectrumOptions = {}
): number[] => {
  const bands = options.bands ?? 16;
  const sensitivity = options.sensitivity ?? 1;

  const spectrum: number[] = [];
  for (let i = 0; i < bands; i++) {
    const rawVal = random(`spectrum-${i}-${Math.floor(frame / 2)}`);
    const val = Math.min(1, Math.max(0.1, rawVal * sensitivity));
    spectrum.push(val);
  }
  return spectrum;
};

export const getBeatPulse = (frame: number, bpm: number = 120, fps: number = 60): number => {
  const framesPerBeat = (60 / bpm) * fps;
  const beatProgress = (frame % framesPerBeat) / framesPerBeat;
  return Math.max(0, 1 - beatProgress * 2);
};
