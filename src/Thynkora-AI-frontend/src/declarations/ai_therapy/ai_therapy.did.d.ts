import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Message {
  'id' : bigint,
  'content' : string,
  'userId' : Principal,
  'isUser' : boolean,
  'timestamp' : bigint,
  'riskLevel' : [] | [bigint],
  'supportActions' : Array<string>,
}
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : Message } |
  { 'err' : string };
export interface _SERVICE {
  'sendMessage' : ActorMethod<[string, string], Result_1>,
  'startSession' : ActorMethod<[], Result>,
  'triggerEmergencyResponse' : ActorMethod<[string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
