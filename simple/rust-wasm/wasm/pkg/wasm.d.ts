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
* @param {number} width
* @param {number} height
*/
  constructor(x: number, y: number, vx: number, vy: number, width: number, height: number);
/**
*/
  update(): void;
/**
* @returns {number}
*/
  x(): number;
/**
* @returns {number}
*/
  y(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_ball_free: (a: number) => void;
  readonly ball_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly ball_update: (a: number) => void;
  readonly ball_x: (a: number) => number;
  readonly ball_y: (a: number) => number;
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
