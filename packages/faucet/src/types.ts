// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
import { Account, Coin } from "@cosmjs/launchpad";

export interface SendJob {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: Coin;
}

export type MinimalAccount = Pick<Account, "address" | "balance">;
