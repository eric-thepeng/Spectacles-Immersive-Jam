/**
 * BeatScale.ts
 * Scales the Scene Object between minScale and maxScale
 * according to the live amplitude of an assigned Audio Component.
 * Attach this script to the object you want to pulse.
 */

@component
export class BeatScale extends BaseScriptComponent {
    // ──────‑‑‑‑‑‑‑ INPUTS (exposed in the Inspector) ‑‑‑‑‑‑‑──────
    @input private readonly minScale: number = 0.9;
    @input private readonly maxScale: number = 1.2;
    @input private readonly bpm: number = 120;   // “tempo” to fake
    @input private readonly smoothing: number = 0.15;

    private _current = 1.0;

    onAwake() {
        this._current = this.getSceneObject().getTransform().getLocalScale().x;
    }

    onUpdate() {
        // Synthesise a repeating [0,1] envelope
        const t = getTime() * (this.bpm / 60);   // convert to beats
        const amp = 0.5 * (1 + Math.sin(2 * Math.PI * t)); // simple sine “beat”

        const target = this.minScale + (this.maxScale - this.minScale) * amp;
        this._current += (target - this._current) * this.smoothing;

        const s = this._current;
        this.getSceneObject().getTransform().setLocalScale(new vec3(s, s, s));
    }
}