// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
/* eslint-disable @typescript-eslint/naming-convention */
import { encodeBech32Pubkey } from "@cosmjs/amino";
import { fromBase64 } from "@cosmjs/encoding";
import { coin, coins } from "@cosmjs/proto-signing";
import { MsgMultiSend, MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
} from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import Long from "long";

import {
  AminoMsgBeginRedelegate,
  AminoMsgCreateValidator,
  AminoMsgDelegate,
  AminoMsgEditValidator,
  AminoMsgFundCommunityPool,
  AminoMsgMultiSend,
  AminoMsgSend,
  AminoMsgSetWithdrawAddress,
  AminoMsgTransfer,
  AminoMsgUndelegate,
  AminoMsgWithdrawDelegatorReward,
  AminoMsgWithdrawValidatorCommission,
} from "./aminomsgs";
import { AminoTypes } from "./aminotypes";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgSend", () => {
      const msg: MsgSend = {
        fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coins(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: msg,
      });
      const expected: AminoMsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coins(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgMultiSend", () => {
      const msg: MsgMultiSend = {
        inputs: [
          { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: coins(1234, "ucosm") },
          { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: coins(5678, "ucosm") },
        ],
        outputs: [
          { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: coins(6000, "ucosm") },
          { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: coins(912, "ucosm") },
        ],
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: msg,
      });
      const expected: AminoMsgMultiSend = {
        type: "cosmos-sdk/MsgMultiSend",
        value: {
          inputs: [
            { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: coins(1234, "ucosm") },
            { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: coins(5678, "ucosm") },
          ],
          outputs: [
            { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: coins(6000, "ucosm") },
            { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: coins(912, "ucosm") },
          ],
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgFundCommunityPool", async () => {
      const msg: MsgFundCommunityPool = {
        amount: coins(1234, "ucosm"),
        depositor: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
        value: msg,
      });
      const expected: AminoMsgFundCommunityPool = {
        type: "cosmos-sdk/MsgFundCommunityPool",
        value: {
          amount: coins(1234, "ucosm"),
          depositor: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgSetWithdrawAddress", async () => {
      const msg: MsgSetWithdrawAddress = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        withdrawAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
        value: msg,
      });
      const expected: AminoMsgSetWithdrawAddress = {
        type: "cosmos-sdk/MsgModifyWithdrawAddress",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          withdraw_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgWithdrawDelegatorReward", async () => {
      const msg: MsgWithdrawDelegatorReward = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: msg,
      });
      const expected: AminoMsgWithdrawDelegatorReward = {
        type: "cosmos-sdk/MsgWithdrawDelegationReward",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgWithdrawValidatorCommission", async () => {
      const msg: MsgWithdrawValidatorCommission = {
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
        value: msg,
      });
      const expected: AminoMsgWithdrawValidatorCommission = {
        type: "cosmos-sdk/MsgWithdrawValidatorCommission",
        value: {
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgBeginRedelegate", () => {
      const msg: MsgBeginRedelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorSrcAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        validatorDstAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        amount: coin(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
        value: msg,
      });
      const expected: AminoMsgBeginRedelegate = {
        type: "cosmos-sdk/MsgBeginRedelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_src_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          validator_dst_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          amount: coin(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgCreateValidator", () => {
      const msg: MsgCreateValidator = {
        description: {
          moniker: "validator",
          identity: "me",
          website: "valid.com",
          securityContact: "Hamburglar",
          details: "...",
        },
        commission: {
          rate: "0.2",
          maxRate: "0.3",
          maxChangeRate: "0.1",
        },
        minSelfDelegation: "123",
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        pubkey: {
          typeUrl: "/cosmos.crypto.secp256k1.PubKey",
          value: fromBase64("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"),
        },
        value: coin(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
        value: msg,
      });
      const expected: AminoMsgCreateValidator = {
        type: "cosmos-sdk/MsgCreateValidator",
        value: {
          description: {
            moniker: "validator",
            identity: "me",
            website: "valid.com",
            security_contact: "Hamburglar",
            details: "...",
          },
          commission: {
            rate: "0.2",
            max_rate: "0.3",
            max_change_rate: "0.1",
          },
          min_self_delegation: "123",
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          pubkey: encodeBech32Pubkey(
            { type: "tendermint/PubKeySecp256k1", value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ" },
            "cosmos",
          ),
          value: coin(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgDelegate", () => {
      const msg: MsgDelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: msg,
      });
      const expected: AminoMsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgEditValidator", () => {
      const msg: MsgEditValidator = {
        description: {
          moniker: "validator",
          identity: "me",
          website: "valid.com",
          securityContact: "Hamburglar",
          details: "...",
        },
        commissionRate: "0.2",
        minSelfDelegation: "123",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
        value: msg,
      });
      const expected: AminoMsgEditValidator = {
        type: "cosmos-sdk/MsgEditValidator",
        value: {
          description: {
            moniker: "validator",
            identity: "me",
            website: "valid.com",
            security_contact: "Hamburglar",
            details: "...",
          },
          commission_rate: "0.2",
          min_self_delegation: "123",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgUndelegate", () => {
      const msg: MsgUndelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: msg,
      });
      const expected: AminoMsgUndelegate = {
        type: "cosmos-sdk/MsgUndelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgTransfer", () => {
      const msg: MsgTransfer = {
        sourcePort: "testport",
        sourceChannel: "testchannel",
        token: coin(1234, "utest"),
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        timeoutHeight: {
          revisionHeight: Long.fromString("123", true),
          revisionNumber: Long.fromString("456", true),
        },
        timeoutTimestamp: Long.fromString("789", true),
      };
      const aminoMsg = new AminoTypes().toAmino({
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: msg,
      });
      const expected: AminoMsgTransfer = {
        type: "cosmos-sdk/MsgTransfer",
        value: {
          source_port: "testport",
          source_channel: "testchannel",
          token: coin(1234, "utest"),
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          timeout_height: {
            revision_height: "123",
            revision_number: "456",
          },
          timeout_timestamp: "789",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works with custom type url", () => {
      const msg = {
        foo: "bar",
      };
      const aminoMsg = new AminoTypes({
        additions: {
          "/my.CustomType": {
            aminoType: "my-sdk/CustomType",
            toAmino: ({
              foo,
            }: {
              readonly foo: string;
            }): { readonly foo: string; readonly constant: string } => ({
              foo: `amino-prefix-${foo}`,
              constant: "something-for-amino",
            }),
            fromAmino: () => {},
          },
        },
      }).toAmino({ typeUrl: "/my.CustomType", value: msg });
      expect(aminoMsg).toEqual({
        type: "my-sdk/CustomType",
        value: {
          foo: "amino-prefix-bar",
          constant: "something-for-amino",
        },
      });
    });

    it("works with overridden type url", () => {
      const msg: MsgDelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes({
        additions: {
          "/cosmos.staking.v1beta1.MsgDelegate": {
            aminoType: "my-override/MsgDelegate",
            toAmino: (m: MsgDelegate): { readonly foo: string } => ({
              foo: m.delegatorAddress ?? "",
            }),
            fromAmino: () => {},
          },
        },
      }).toAmino({
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: msg,
      });
      const expected = {
        type: "my-override/MsgDelegate",
        value: {
          foo: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("throws for unknown type url", () => {
      expect(() => new AminoTypes().toAmino({ typeUrl: "/xxx.Unknown", value: { foo: "bar" } })).toThrowError(
        /Type URL does not exist in the Amino message type register./i,
      );
    });
  });

  describe("fromAmino", () => {
    it("works for MsgSend", () => {
      const aminoMsg: AminoMsgSend = {
        type: "cosmos-sdk/MsgSend",
        value: {
          from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coins(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes().fromAmino(aminoMsg);
      const expectedValue: MsgSend = {
        fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coins(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: expectedValue,
      });
    });

    it("works for MsgMultiSend", () => {
      const aminoMsg: AminoMsgMultiSend = {
        type: "cosmos-sdk/MsgMultiSend",
        value: {
          inputs: [
            { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: coins(1234, "ucosm") },
            { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: coins(5678, "ucosm") },
          ],
          outputs: [
            { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: coins(6000, "ucosm") },
            { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: coins(912, "ucosm") },
          ],
        },
      };
      const msg = new AminoTypes().fromAmino(aminoMsg);
      const expectedValue: MsgMultiSend = {
        inputs: [
          { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: coins(1234, "ucosm") },
          { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: coins(5678, "ucosm") },
        ],
        outputs: [
          { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: coins(6000, "ucosm") },
          { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: coins(912, "ucosm") },
        ],
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: expectedValue,
      });
    });

    it("works for MsgBeginRedelegate", () => {
      const aminoMsg: AminoMsgBeginRedelegate = {
        type: "cosmos-sdk/MsgBeginRedelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_src_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          validator_dst_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          amount: coin(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes().fromAmino(aminoMsg);
      const expectedValue: MsgBeginRedelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorSrcAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        validatorDstAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        amount: coin(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
        value: expectedValue,
      });
    });

    it("works for MsgCreateValidator", () => {
      const aminoMsg: AminoMsgCreateValidator = {
        type: "cosmos-sdk/MsgCreateValidator",
        value: {
          description: {
            moniker: "validator",
            identity: "me",
            website: "valid.com",
            security_contact: "Hamburglar",
            details: "...",
          },
          commission: {
            rate: "0.2",
            max_rate: "0.3",
            max_change_rate: "0.1",
          },
          min_self_delegation: "123",
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          pubkey: encodeBech32Pubkey(
            { type: "tendermint/PubKeySecp256k1", value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ" },
            "cosmos",
          ),
          value: coin(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes().fromAmino(aminoMsg);
      const expectedValue: MsgCreateValidator = {
        description: {
          moniker: "validator",
          identity: "me",
          website: "valid.com",
          securityContact: "Hamburglar",
          details: "...",
        },
        commission: {
          rate: "0.2",
          maxRate: "0.3",
          maxChangeRate: "0.1",
        },
        minSelfDelegation: "123",
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        pubkey: {
          typeUrl: "/cosmos.crypto.secp256k1.PubKey",
          value: fromBase64("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"),
        },
        value: coin(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
        value: expectedValue,
      });
    });

    it("works for MsgDelegate", () => {
      const aminoMsg: AminoMsgDelegate = {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes().fromAmino(aminoMsg);
      const expectedValue: MsgDelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: expectedValue,
      });
    });

    it("works for MsgEditValidator", () => {
      const aminoMsg: AminoMsgEditValidator = {
        type: "cosmos-sdk/MsgEditValidator",
        value: {
          description: {
            moniker: "validator",
            identity: "me",
            website: "valid.com",
            security_contact: "Hamburglar",
            details: "...",
          },
          commission_rate: "0.2",
          min_self_delegation: "123",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      const msg = new AminoTypes().fromAmino(aminoMsg);
      const expectedValue: MsgEditValidator = {
        description: {
          moniker: "validator",
          identity: "me",
          website: "valid.com",
          securityContact: "Hamburglar",
          details: "...",
        },
        commissionRate: "0.2",
        minSelfDelegation: "123",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
        value: expectedValue,
      });
    });

    it("works for MsgUndelegate", () => {
      const aminoMsg: AminoMsgUndelegate = {
        type: "cosmos-sdk/MsgUndelegate",
        value: {
          delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes().fromAmino(aminoMsg);
      const expectedValue: MsgUndelegate = {
        delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        amount: coin(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: expectedValue,
      });
    });

    it("works for MsgTransfer", () => {
      const aminoMsg: AminoMsgTransfer = {
        type: "cosmos-sdk/MsgTransfer",
        value: {
          source_port: "testport",
          source_channel: "testchannel",
          token: coin(1234, "utest"),
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          timeout_height: {
            revision_height: "123",
            revision_number: "456",
          },
          timeout_timestamp: "789",
        },
      };
      const msg = new AminoTypes().fromAmino(aminoMsg);
      const expectedValue: MsgTransfer = {
        sourcePort: "testport",
        sourceChannel: "testchannel",
        token: coin(1234, "utest"),
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        timeoutHeight: {
          revisionHeight: Long.fromString("123", true),
          revisionNumber: Long.fromString("456", true),
        },
        timeoutTimestamp: Long.fromString("789", true),
      };
      expect(msg).toEqual({
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: expectedValue,
      });
    });

    it("works for custom type url", () => {
      const aminoMsg = {
        type: "my-sdk/CustomType",
        value: {
          foo: "amino-prefix-bar",
          constant: "something-for-amino",
        },
      };
      const msg = new AminoTypes({
        additions: {
          "/my.CustomType": {
            aminoType: "my-sdk/CustomType",
            toAmino: () => {},
            fromAmino: ({ foo }: { readonly foo: string; readonly constant: string }): any => ({
              foo: foo.slice(13),
            }),
          },
        },
      }).fromAmino(aminoMsg);
      const expectedValue = {
        foo: "bar",
      };
      expect(msg).toEqual({
        typeUrl: "/my.CustomType",
        value: expectedValue,
      });
    });

    it("works with overridden type url", () => {
      const msg = new AminoTypes({
        additions: {
          "/my.OverrideType": {
            aminoType: "cosmos-sdk/MsgDelegate",
            toAmino: () => {},
            fromAmino: ({ foo }: { readonly foo: string }): MsgDelegate => ({
              delegatorAddress: foo,
              validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
              amount: coin(1234, "ucosm"),
            }),
          },
        },
      }).fromAmino({
        type: "cosmos-sdk/MsgDelegate",
        value: {
          foo: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        },
      });
      const expected: { readonly typeUrl: "/my.OverrideType"; readonly value: MsgDelegate } = {
        typeUrl: "/my.OverrideType",
        value: {
          delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          amount: coin(1234, "ucosm"),
        },
      };
      expect(msg).toEqual(expected);
    });

    it("throws for unknown type url", () => {
      expect(() =>
        new AminoTypes().fromAmino({ type: "cosmos-sdk/MsgUnknown", value: { foo: "bar" } }),
      ).toThrowError(/Type does not exist in the Amino message type register./i);
    });
  });
});
