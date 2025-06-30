// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
export interface HashFunction {
  readonly blockSize: number;
  readonly update: (_: Uint8Array) => HashFunction;
  readonly digest: () => Uint8Array;
}
