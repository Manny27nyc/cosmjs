// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
import { CosmosFeeTable, GasLimits, GasPrice } from "@cosmjs/launchpad";

import { TokenConfiguration } from "./tokenmanager";
import { parseBankTokens } from "./tokens";

export const binaryName = "cosmos-faucet";
export const memo: string | undefined = process.env.FAUCET_MEMO;
export const gasPrice = GasPrice.fromString(process.env.FAUCET_GAS_PRICE || "0.025ucosm");
export const gasLimits: GasLimits<CosmosFeeTable> = {
  send: parseInt(process.env.FAUCET_GAS_LIMIT || "80000", 10),
};
export const concurrency: number = Number.parseInt(process.env.FAUCET_CONCURRENCY || "", 10) || 5;
export const port: number = Number.parseInt(process.env.FAUCET_PORT || "", 10) || 8000;
export const mnemonic: string | undefined = process.env.FAUCET_MNEMONIC;
export const addressPrefix = process.env.FAUCET_ADDRESS_PREFIX || "cosmos";
export const tokenConfig: TokenConfiguration = {
  bankTokens: parseBankTokens(process.env.FAUCET_TOKENS || "ucosm, ustake"),
};
