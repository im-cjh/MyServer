// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file monster.proto (package Protocol, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file monster.proto.
 */
export const file_monster: GenFile = /*@__PURE__*/
  fileDesc("Cg1tb25zdGVyLnByb3RvEghQcm90b2NvbCIZChdDMkJfU3Bhd25Nb25zdGVyUmVxdWVzdCJEChhCMkNfU3Bhd25Nb25zdGVyUmVzcG9uc2USEQoJbW9uc3RlcklkGAEgASgFEhUKDW1vbnN0ZXJOdW1iZXIYAiABKAUiSAocUzJCX1NwYXduTW9uc3Rlck5vdGlmaWNhdGlvbhIRCgltb25zdGVySWQYASABKAUSFQoNbW9uc3Rlck51bWJlchgCIAEoBSJDCh1CMlNfTW9uc3RlckF0dGFja1Rvd2VyUmVxdWVzdBIRCgltb25zdGVySWQYASABKAUSDwoHdG93ZXJJZBgCIAEoBSJICh1TMkJfVXBkYXRlVG93ZXJIUE5vdGlmaWNhdGlvbhIPCgd0b3dlcklkGAEgASgFEhYKDnVwZGF0ZWRUb3dlckhQGAIgASgFIi4KHEIyU19Nb25zdGVyQXR0YWNrQmFzZVJlcXVlc3QSDgoGZGFtYWdlGAEgASgFIiwKF0MyQl9Nb25zdGVyRGVhdGhSZXF1ZXN0EhEKCW1vbnN0ZXJJZBgBIAEoBSIxChxCMkNfTW9uc3RlckRlYXRoTm90aWZpY2F0aW9uEhEKCW1vbnN0ZXJJZBgBIAEoBWIGcHJvdG8z");

/**
 * @generated from message Protocol.C2B_SpawnMonsterRequest
 */
export type C2B_SpawnMonsterRequest = Message<"Protocol.C2B_SpawnMonsterRequest"> & {
};

/**
 * Describes the message Protocol.C2B_SpawnMonsterRequest.
 * Use `create(C2B_SpawnMonsterRequestSchema)` to create a new message.
 */
export const C2B_SpawnMonsterRequestSchema: GenMessage<C2B_SpawnMonsterRequest> = /*@__PURE__*/
  messageDesc(file_monster, 0);

/**
 * @generated from message Protocol.B2C_SpawnMonsterResponse
 */
export type B2C_SpawnMonsterResponse = Message<"Protocol.B2C_SpawnMonsterResponse"> & {
  /**
   * @generated from field: int32 monsterId = 1;
   */
  monsterId: number;

  /**
   * @generated from field: int32 monsterNumber = 2;
   */
  monsterNumber: number;
};

/**
 * Describes the message Protocol.B2C_SpawnMonsterResponse.
 * Use `create(B2C_SpawnMonsterResponseSchema)` to create a new message.
 */
export const B2C_SpawnMonsterResponseSchema: GenMessage<B2C_SpawnMonsterResponse> = /*@__PURE__*/
  messageDesc(file_monster, 1);

/**
 * @generated from message Protocol.S2B_SpawnMonsterNotification
 */
export type S2B_SpawnMonsterNotification = Message<"Protocol.S2B_SpawnMonsterNotification"> & {
  /**
   * @generated from field: int32 monsterId = 1;
   */
  monsterId: number;

  /**
   * @generated from field: int32 monsterNumber = 2;
   */
  monsterNumber: number;
};

/**
 * Describes the message Protocol.S2B_SpawnMonsterNotification.
 * Use `create(S2B_SpawnMonsterNotificationSchema)` to create a new message.
 */
export const S2B_SpawnMonsterNotificationSchema: GenMessage<S2B_SpawnMonsterNotification> = /*@__PURE__*/
  messageDesc(file_monster, 2);

/**
 * @generated from message Protocol.B2S_MonsterAttackTowerRequest
 */
export type B2S_MonsterAttackTowerRequest = Message<"Protocol.B2S_MonsterAttackTowerRequest"> & {
  /**
   * @generated from field: int32 monsterId = 1;
   */
  monsterId: number;

  /**
   * @generated from field: int32 towerId = 2;
   */
  towerId: number;
};

/**
 * Describes the message Protocol.B2S_MonsterAttackTowerRequest.
 * Use `create(B2S_MonsterAttackTowerRequestSchema)` to create a new message.
 */
export const B2S_MonsterAttackTowerRequestSchema: GenMessage<B2S_MonsterAttackTowerRequest> = /*@__PURE__*/
  messageDesc(file_monster, 3);

/**
 * @generated from message Protocol.S2B_UpdateTowerHPNotification
 */
export type S2B_UpdateTowerHPNotification = Message<"Protocol.S2B_UpdateTowerHPNotification"> & {
  /**
   * @generated from field: int32 towerId = 1;
   */
  towerId: number;

  /**
   * @generated from field: int32 updatedTowerHP = 2;
   */
  updatedTowerHP: number;
};

/**
 * Describes the message Protocol.S2B_UpdateTowerHPNotification.
 * Use `create(S2B_UpdateTowerHPNotificationSchema)` to create a new message.
 */
export const S2B_UpdateTowerHPNotificationSchema: GenMessage<S2B_UpdateTowerHPNotification> = /*@__PURE__*/
  messageDesc(file_monster, 4);

/**
 * @generated from message Protocol.B2S_MonsterAttackBaseRequest
 */
export type B2S_MonsterAttackBaseRequest = Message<"Protocol.B2S_MonsterAttackBaseRequest"> & {
  /**
   * @generated from field: int32 damage = 1;
   */
  damage: number;
};

/**
 * Describes the message Protocol.B2S_MonsterAttackBaseRequest.
 * Use `create(B2S_MonsterAttackBaseRequestSchema)` to create a new message.
 */
export const B2S_MonsterAttackBaseRequestSchema: GenMessage<B2S_MonsterAttackBaseRequest> = /*@__PURE__*/
  messageDesc(file_monster, 5);

/**
 * @generated from message Protocol.C2B_MonsterDeathRequest
 */
export type C2B_MonsterDeathRequest = Message<"Protocol.C2B_MonsterDeathRequest"> & {
  /**
   * @generated from field: int32 monsterId = 1;
   */
  monsterId: number;
};

/**
 * Describes the message Protocol.C2B_MonsterDeathRequest.
 * Use `create(C2B_MonsterDeathRequestSchema)` to create a new message.
 */
export const C2B_MonsterDeathRequestSchema: GenMessage<C2B_MonsterDeathRequest> = /*@__PURE__*/
  messageDesc(file_monster, 6);

/**
 * @generated from message Protocol.B2C_MonsterDeathNotification
 */
export type B2C_MonsterDeathNotification = Message<"Protocol.B2C_MonsterDeathNotification"> & {
  /**
   * @generated from field: int32 monsterId = 1;
   */
  monsterId: number;
};

/**
 * Describes the message Protocol.B2C_MonsterDeathNotification.
 * Use `create(B2C_MonsterDeathNotificationSchema)` to create a new message.
 */
export const B2C_MonsterDeathNotificationSchema: GenMessage<B2C_MonsterDeathNotification> = /*@__PURE__*/
  messageDesc(file_monster, 7);
