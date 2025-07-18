import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Profile {
  'id' : UserId,
  'timezone' : string,
  'createdAt' : bigint,
  'emergencyContact' : [] | [string],
  'isAnonymous' : boolean,
  'language' : string,
}
export type Result = { 'ok' : Profile } |
  { 'err' : string };
export type UserId = Principal;
export interface _SERVICE {
  'createProfile' : ActorMethod<[string, string, [] | [string]], Result>,
  'getProfile' : ActorMethod<[], [] | [Profile]>,
  'updateProfile' : ActorMethod<
    [[] | [string], [] | [string], [] | [string]],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
