// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
/* eslint-disable @typescript-eslint/naming-convention */
import { Stream } from "xstream";

import { createJsonRpcRequest } from "../jsonrpc";
import {
  HttpClient,
  instanceOfRpcStreamingClient,
  RpcClient,
  SubscriptionEvent,
  WebsocketClient,
} from "../rpcclients";
import { adaptor33, Decoder, Encoder, Params, Responses } from "./adaptor";
import * as requests from "./requests";
import * as responses from "./responses";

export class Tendermint33Client {
  /**
   * Creates a new Tendermint client for the given endpoint.
   *
   * Uses HTTP when the URL schema is http or https. Uses WebSockets otherwise.
   */
  public static async connect(url: string): Promise<Tendermint33Client> {
    const useHttp = url.startsWith("http://") || url.startsWith("https://");
    const rpcClient = useHttp ? new HttpClient(url) : new WebsocketClient(url);
    return Tendermint33Client.create(rpcClient);
  }

  /**
   * Creates a new Tendermint client given an RPC client.
   */
  public static async create(rpcClient: RpcClient): Promise<Tendermint33Client> {
    // For some very strange reason I don't understand, tests start to fail on some systems
    // (our CI) when skipping the status call before doing other queries. Sleeping a little
    // while did not help. Thus we query the version as a way to say "hi" to the backend,
    // even in cases where we don't use the result.
    const _version = await this.detectVersion(rpcClient);
    return new Tendermint33Client(rpcClient);
  }

  private static async detectVersion(client: RpcClient): Promise<string> {
    const req = createJsonRpcRequest(requests.Method.Status);
    const response = await client.execute(req);
    const result = response.result;

    if (!result || !result.node_info) {
      throw new Error("Unrecognized format for status response");
    }

    const version = result.node_info.version;
    if (typeof version !== "string") {
      throw new Error("Unrecognized version format: must be string");
    }
    return version;
  }

  private readonly client: RpcClient;
  private readonly p: Params;
  private readonly r: Responses;

  /**
   * Use `Tendermint33Client.connect` or `Tendermint33Client.create` to create an instance.
   */
  private constructor(client: RpcClient) {
    this.client = client;
    this.p = adaptor33.params;
    this.r = adaptor33.responses;
  }

  public disconnect(): void {
    this.client.disconnect();
  }

  public async abciInfo(): Promise<responses.AbciInfoResponse> {
    const query: requests.AbciInfoRequest = { method: requests.Method.AbciInfo };
    return this.doCall(query, this.p.encodeAbciInfo, this.r.decodeAbciInfo);
  }

  public async abciQuery(params: requests.AbciQueryParams): Promise<responses.AbciQueryResponse> {
    const query: requests.AbciQueryRequest = { params: params, method: requests.Method.AbciQuery };
    return this.doCall(query, this.p.encodeAbciQuery, this.r.decodeAbciQuery);
  }

  public async block(height?: number): Promise<responses.BlockResponse> {
    const query: requests.BlockRequest = { method: requests.Method.Block, params: { height: height } };
    return this.doCall(query, this.p.encodeBlock, this.r.decodeBlock);
  }

  public async blockResults(height?: number): Promise<responses.BlockResultsResponse> {
    const query: requests.BlockResultsRequest = {
      method: requests.Method.BlockResults,
      params: { height: height },
    };
    return this.doCall(query, this.p.encodeBlockResults, this.r.decodeBlockResults);
  }

  /**
   * Queries block headers filtered by minHeight <= height <= maxHeight.
   *
   * @param minHeight The minimum height to be included in the result. Defaults to 0.
   * @param maxHeight The maximum height to be included in the result. Defaults to infinity.
   */
  public async blockchain(minHeight?: number, maxHeight?: number): Promise<responses.BlockchainResponse> {
    const query: requests.BlockchainRequest = {
      method: requests.Method.Blockchain,
      params: {
        minHeight: minHeight,
        maxHeight: maxHeight,
      },
    };
    return this.doCall(query, this.p.encodeBlockchain, this.r.decodeBlockchain);
  }

  /**
   * Broadcast transaction to mempool and wait for response
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_sync
   */
  public async broadcastTxSync(
    params: requests.BroadcastTxParams,
  ): Promise<responses.BroadcastTxSyncResponse> {
    const query: requests.BroadcastTxRequest = { params: params, method: requests.Method.BroadcastTxSync };
    return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxSync);
  }

  /**
   * Broadcast transaction to mempool and do not wait for result
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_async
   */
  public async broadcastTxAsync(
    params: requests.BroadcastTxParams,
  ): Promise<responses.BroadcastTxAsyncResponse> {
    const query: requests.BroadcastTxRequest = { params: params, method: requests.Method.BroadcastTxAsync };
    return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxAsync);
  }

  /**
   * Broadcast transaction to mempool and wait for block
   *
   * @see https://docs.tendermint.com/master/rpc/#/Tx/broadcast_tx_commit
   */
  public async broadcastTxCommit(
    params: requests.BroadcastTxParams,
  ): Promise<responses.BroadcastTxCommitResponse> {
    const query: requests.BroadcastTxRequest = { params: params, method: requests.Method.BroadcastTxCommit };
    return this.doCall(query, this.p.encodeBroadcastTx, this.r.decodeBroadcastTxCommit);
  }

  public async commit(height?: number): Promise<responses.CommitResponse> {
    const query: requests.CommitRequest = { method: requests.Method.Commit, params: { height: height } };
    return this.doCall(query, this.p.encodeCommit, this.r.decodeCommit);
  }

  public async genesis(): Promise<responses.GenesisResponse> {
    const query: requests.GenesisRequest = { method: requests.Method.Genesis };
    return this.doCall(query, this.p.encodeGenesis, this.r.decodeGenesis);
  }

  public async health(): Promise<responses.HealthResponse> {
    const query: requests.HealthRequest = { method: requests.Method.Health };
    return this.doCall(query, this.p.encodeHealth, this.r.decodeHealth);
  }

  public async status(): Promise<responses.StatusResponse> {
    const query: requests.StatusRequest = { method: requests.Method.Status };
    return this.doCall(query, this.p.encodeStatus, this.r.decodeStatus);
  }

  public subscribeNewBlock(): Stream<responses.NewBlockEvent> {
    const request: requests.SubscribeRequest = {
      method: requests.Method.Subscribe,
      query: { type: requests.SubscriptionEventType.NewBlock },
    };
    return this.subscribe(request, this.r.decodeNewBlockEvent);
  }

  public subscribeNewBlockHeader(): Stream<responses.NewBlockHeaderEvent> {
    const request: requests.SubscribeRequest = {
      method: requests.Method.Subscribe,
      query: { type: requests.SubscriptionEventType.NewBlockHeader },
    };
    return this.subscribe(request, this.r.decodeNewBlockHeaderEvent);
  }

  public subscribeTx(query?: string): Stream<responses.TxEvent> {
    const request: requests.SubscribeRequest = {
      method: requests.Method.Subscribe,
      query: {
        type: requests.SubscriptionEventType.Tx,
        raw: query,
      },
    };
    return this.subscribe(request, this.r.decodeTxEvent);
  }

  /**
   * Get a single transaction by hash
   *
   * @see https://docs.tendermint.com/master/rpc/#/Info/tx
   */
  public async tx(params: requests.TxParams): Promise<responses.TxResponse> {
    const query: requests.TxRequest = { params: params, method: requests.Method.Tx };
    return this.doCall(query, this.p.encodeTx, this.r.decodeTx);
  }

  /**
   * Search for transactions that are in a block
   *
   * @see https://docs.tendermint.com/master/rpc/#/Info/tx_search
   */
  public async txSearch(params: requests.TxSearchParams): Promise<responses.TxSearchResponse> {
    const query: requests.TxSearchRequest = { params: params, method: requests.Method.TxSearch };
    return this.doCall(query, this.p.encodeTxSearch, this.r.decodeTxSearch);
  }

  // this should paginate through all txSearch options to ensure it returns all results.
  // starts with page 1 or whatever was provided (eg. to start on page 7)
  public async txSearchAll(params: requests.TxSearchParams): Promise<responses.TxSearchResponse> {
    let page = params.page || 1;
    const txs: responses.TxResponse[] = [];
    let done = false;

    while (!done) {
      const resp = await this.txSearch({ ...params, page: page });
      txs.push(...resp.txs);
      if (txs.length < resp.totalCount) {
        page++;
      } else {
        done = true;
      }
    }

    return {
      totalCount: txs.length,
      txs: txs,
    };
  }

  public async validators(params: requests.ValidatorsParams): Promise<responses.ValidatorsResponse> {
    const query: requests.ValidatorsRequest = {
      method: requests.Method.Validators,
      params: params,
    };
    return this.doCall(query, this.p.encodeValidators, this.r.decodeValidators);
  }

  public async validatorsAll(height?: number): Promise<responses.ValidatorsResponse> {
    const validators: responses.Validator[] = [];
    let page = 1;
    let done = false;
    let blockHeight = height;

    while (!done) {
      const response = await this.validators({
        per_page: 50,
        height: blockHeight,
        page: page,
      });
      validators.push(...response.validators);
      blockHeight = blockHeight || response.blockHeight;
      if (validators.length < response.total) {
        page++;
      } else {
        done = true;
      }
    }

    return {
      // NOTE: Default value is for type safety but this should always be set
      blockHeight: blockHeight ?? 0,
      count: validators.length,
      total: validators.length,
      validators: validators,
    };
  }

  // doCall is a helper to handle the encode/call/decode logic
  private async doCall<T extends requests.Request, U extends responses.Response>(
    request: T,
    encode: Encoder<T>,
    decode: Decoder<U>,
  ): Promise<U> {
    const req = encode(request);
    const result = await this.client.execute(req);
    return decode(result);
  }

  private subscribe<T>(request: requests.SubscribeRequest, decode: (e: SubscriptionEvent) => T): Stream<T> {
    if (!instanceOfRpcStreamingClient(this.client)) {
      throw new Error("This RPC client type cannot subscribe to events");
    }

    const req = this.p.encodeSubscribe(request);
    const eventStream = this.client.listen(req);
    return eventStream.map<T>((event) => {
      return decode(event);
    });
  }
}
