// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
/* eslint-disable @typescript-eslint/naming-convention */
import { LcdClient } from "./lcdclient";

interface SlashingSigningInfo {
  readonly address: string;
  readonly start_height: string;
  readonly index_offset: string;
  readonly jailed_until: string;
  readonly tombstoned: boolean;
  readonly missed_blocks_counter: string;
}

export interface SlashingSigningInfosResponse {
  readonly height: string;
  readonly result: readonly SlashingSigningInfo[];
}

export interface SlashingParametersResponse {
  readonly height: string;
  readonly result: {
    readonly signed_blocks_window: string;
    readonly min_signed_per_window: string;
    readonly downtime_jail_duration: string;
    readonly slash_fraction_double_sign: string;
    readonly slash_fraction_downtime: string;
  };
}

export interface SlashingExtension {
  readonly slashing: {
    readonly signingInfos: () => Promise<SlashingSigningInfosResponse>;
    readonly parameters: () => Promise<SlashingParametersResponse>;
  };
}

export function setupSlashingExtension(base: LcdClient): SlashingExtension {
  return {
    slashing: {
      signingInfos: async () => {
        return base.get(`/slashing/signing_infos`);
      },
      parameters: async () => {
        return base.get(`/slashing/parameters`);
      },
    },
  };
}
