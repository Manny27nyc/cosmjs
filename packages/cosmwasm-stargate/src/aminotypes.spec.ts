// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, toUtf8 } from "@cosmjs/encoding";
import { AminoTypes, coins } from "@cosmjs/stargate";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1beta1/tx";
import Long from "long";

import {
  AminoMsgClearAdmin,
  AminoMsgExecuteContract,
  AminoMsgInstantiateContract,
  AminoMsgMigrateContract,
  AminoMsgStoreCode,
  AminoMsgUpdateAdmin,
  cosmWasmTypes,
} from "./aminotypes";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgStoreCode", () => {
      const msg: MsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        source: "Arrabiata",
        builder: "Bob",
        instantiatePermission: undefined,
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgStoreCode",
        value: msg,
      });
      const expected: AminoMsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
          source: "Arrabiata",
          builder: "Bob",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgInstantiateContract", () => {
      const msg: MsgInstantiateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        codeId: Long.fromString("12345"),
        label: "sticky",
        initMsg: toUtf8(
          JSON.stringify({
            foo: "bar",
          }),
        ),
        funds: coins(1234, "ucosm"),
        admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgInstantiateContract",
        value: msg,
      });
      const expected: AminoMsgInstantiateContract = {
        type: "wasm/MsgInstantiateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          code_id: "12345",
          label: "sticky",
          init_msg: {
            foo: "bar",
          },
          funds: coins(1234, "ucosm"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgUpdateAdmin", () => {
      const msg: MsgUpdateAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        newAdmin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin",
        value: msg,
      });
      const expected: AminoMsgUpdateAdmin = {
        type: "wasm/MsgUpdateAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          new_admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgClearAdmin", () => {
      const msg: MsgClearAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgClearAdmin",
        value: msg,
      });
      const expected: AminoMsgClearAdmin = {
        type: "wasm/MsgClearAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgExecuteContract", () => {
      const msg: MsgExecuteContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        msg: toUtf8(
          JSON.stringify({
            foo: "bar",
          }),
        ),
        funds: coins(1234, "ucosm"),
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
        value: msg,
      });
      const expected: AminoMsgExecuteContract = {
        type: "wasm/MsgExecuteContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          msg: {
            foo: "bar",
          },
          funds: coins(1234, "ucosm"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgMigrateContract", () => {
      const msg: MsgMigrateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        codeId: Long.fromString("98765"),
        migrateMsg: toUtf8(
          JSON.stringify({
            foo: "bar",
          }),
        ),
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgMigrateContract",
        value: msg,
      });
      const expected: AminoMsgMigrateContract = {
        type: "wasm/MsgMigrateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          code_id: "98765",
          msg: {
            foo: "bar",
          },
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgStoreCode", () => {
      const aminoMsg: AminoMsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
          source: "Arrabiata",
          builder: "Bob",
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        source: "Arrabiata",
        builder: "Bob",
        instantiatePermission: undefined,
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgStoreCode",
        value: expectedValue,
      });
    });

    it("works for MsgInstantiateContract", () => {
      const aminoMsg: AminoMsgInstantiateContract = {
        type: "wasm/MsgInstantiateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          code_id: "12345",
          label: "sticky",
          init_msg: {
            foo: "bar",
          },
          funds: coins(1234, "ucosm"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgInstantiateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        codeId: Long.fromString("12345"),
        label: "sticky",
        initMsg: toUtf8(
          JSON.stringify({
            foo: "bar",
          }),
        ),
        funds: coins(1234, "ucosm"),
        admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgInstantiateContract",
        value: expectedValue,
      });
    });

    it("works for MsgUpdateAdmin", () => {
      const aminoMsg: AminoMsgUpdateAdmin = {
        type: "wasm/MsgUpdateAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          new_admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgUpdateAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        newAdmin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgUpdateAdmin",
        value: expectedValue,
      });
    });

    it("works for MsgClearAdmin", () => {
      const aminoMsg: AminoMsgClearAdmin = {
        type: "wasm/MsgClearAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgClearAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgClearAdmin",
        value: expectedValue,
      });
    });

    it("works for MsgExecuteContract", () => {
      const aminoMsg: AminoMsgExecuteContract = {
        type: "wasm/MsgExecuteContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          msg: {
            foo: "bar",
          },
          funds: coins(1234, "ucosm"),
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgExecuteContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        msg: toUtf8(
          JSON.stringify({
            foo: "bar",
          }),
        ),
        funds: coins(1234, "ucosm"),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
        value: expectedValue,
      });
    });

    it("works for MsgMigrateContract", () => {
      const aminoMsg: AminoMsgMigrateContract = {
        type: "wasm/MsgMigrateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          code_id: "98765",
          msg: {
            foo: "bar",
          },
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgMigrateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        codeId: Long.fromString("98765"),
        migrateMsg: toUtf8(
          JSON.stringify({
            foo: "bar",
          }),
        ),
      };
      expect(msg).toEqual({
        typeUrl: "/cosmwasm.wasm.v1beta1.MsgMigrateContract",
        value: expectedValue,
      });
    });
  });
});
