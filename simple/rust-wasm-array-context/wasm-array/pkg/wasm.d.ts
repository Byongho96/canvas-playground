/* tslint:disable */
/* eslint-disable */
/**
*/
export class Ball {
  free(): void;
/**
* @param {number} x
* @param {number} y
* @param {number} vx
* @param {number} vy
*/
  constructor(x: number, y: number, vx: number, vy: number);
/**
* @param {number} width
* @param {number} height
*/
  update(width: number, height: number): void;
/**
* @returns {number}
*/
  x(): number;
/**
* @returns {number}
*/
  y(): number;
}
/**
*/
export class Balls {
  free(): void;
/**
* @param {number} cnt
* @param {number} width
* @param {number} height
* @param {CanvasRenderingContext2D} ctx
*/
  constructor(cnt: number, width: number, height: number, ctx: CanvasRenderingContext2D);
/**
*/
  update(): void;
/**
* @returns {number}
*/
  length(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_ball_free: (a: number) => void;
  readonly __wbg_balls_free: (a: number) => void;
  readonly ball_new: (a: number, b: number, c: number, d: number) => number;
  readonly ball_update: (a: number, b: number, c: number) => void;
  readonly ball_x: (a: number) => number;
  readonly ball_y: (a: number) => number;
  readonly balls_new: (a: number, b: number, c: number, d: number) => number;
  readonly balls_update: (a: number) => void;
  readonly balls_length: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
