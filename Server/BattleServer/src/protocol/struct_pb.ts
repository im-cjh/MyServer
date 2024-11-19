// @generated by protoc-gen-es v2.2.1 with parameter "target=ts"
// @generated from file struct.proto (package Protocol, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { CharacterType, RoomStateType } from "./enum_pb";
import { file_enum } from "./enum_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file struct.proto.
 */
export const file_struct: GenFile = /*@__PURE__*/
  fileDesc("CgxzdHJ1Y3QucHJvdG8SCFByb3RvY29sIiUKCEJhc2VEYXRhEgoKAmhwGAEgASgFEg0KBW1heEhwGAIgASgFIlYKCVRvd2VyRGF0YRIPCgd0b3dlcklkGAEgASgFEhMKC3Rvd2VyTnVtYmVyGAIgASgFEiMKCHRvd2VyUG9zGAMgASgLMhEuUHJvdG9jb2wuUG9zSW5mbyJtCgtNb25zdGVyRGF0YRIRCgltb25zdGVySWQYASABKAUSFQoNbW9uc3Rlck51bWJlchgCIAEoBRINCgVsZXZlbBgDIAEoBRIlCgptb25zdGVyUG9zGAQgASgLMhEuUHJvdG9jb2wuUG9zSW5mbyJQCghVc2VyRGF0YRIKCgJpZBgBIAEoCRIMCgRuYW1lGAIgASgJEioKCWNoYXJhY3RlchgDIAEoCzIXLlByb3RvY29sLkNoYXJhY3RlckRhdGEilAEKCFJvb21EYXRhEgoKAmlkGAEgASgFEg8KB293bmVySWQYAiABKAkSDAoEbmFtZRgDIAEoCRISCgptYXhVc2VyTnVtGAQgASgFEiYKBXN0YXRlGAUgASgOMhcuUHJvdG9jb2wuUm9vbVN0YXRlVHlwZRIhCgV1c2VycxgGIAMoCzISLlByb3RvY29sLlVzZXJEYXRhIj8KDUNoYXJhY3RlckRhdGESLgoNY2hhcmFjdGVyVHlwZRgBIAEoDjIXLlByb3RvY29sLkNoYXJhY3RlclR5cGUiHwoHUG9zSW5mbxIJCgF4GAEgASgCEgkKAXkYAiABKAIiMgoJRXJyb3JEYXRhEhQKDHJlc3BvbnNlQ29kZRgBIAEoBRIPCgdtZXNzYWdlGAIgASgJYgZwcm90bzM", [file_enum]);

/**
 * @generated from message Protocol.BaseData
 */
export type BaseData = Message<"Protocol.BaseData"> & {
  /**
   * 현재 체력
   *
   * @generated from field: int32 hp = 1;
   */
  hp: number;

  /**
   * 최대 체력
   *
   * @generated from field: int32 maxHp = 2;
   */
  maxHp: number;
};

/**
 * Describes the message Protocol.BaseData.
 * Use `create(BaseDataSchema)` to create a new message.
 */
export const BaseDataSchema: GenMessage<BaseData> = /*@__PURE__*/
  messageDesc(file_struct, 0);

/**
 * @generated from message Protocol.TowerData
 */
export type TowerData = Message<"Protocol.TowerData"> & {
  /**
   * 타워 식별 id
   *
   * @generated from field: int32 towerId = 1;
   */
  towerId: number;

  /**
   * 타워 종류 구분하는 번호
   *
   * @generated from field: int32 towerNumber = 2;
   */
  towerNumber: number;

  /**
   * @generated from field: Protocol.PosInfo towerPos = 3;
   */
  towerPos?: PosInfo;
};

/**
 * Describes the message Protocol.TowerData.
 * Use `create(TowerDataSchema)` to create a new message.
 */
export const TowerDataSchema: GenMessage<TowerData> = /*@__PURE__*/
  messageDesc(file_struct, 1);

/**
 * @generated from message Protocol.MonsterData
 */
export type MonsterData = Message<"Protocol.MonsterData"> & {
  /**
   * 몬스터 식별 id
   *
   * @generated from field: int32 monsterId = 1;
   */
  monsterId: number;

  /**
   * 몬스터 종류 구분하는 번호
   *
   * @generated from field: int32 monsterNumber = 2;
   */
  monsterNumber: number;

  /**
   * 레벨
   *
   * @generated from field: int32 level = 3;
   */
  level: number;

  /**
   * @generated from field: Protocol.PosInfo monsterPos = 4;
   */
  monsterPos?: PosInfo;
};

/**
 * Describes the message Protocol.MonsterData.
 * Use `create(MonsterDataSchema)` to create a new message.
 */
export const MonsterDataSchema: GenMessage<MonsterData> = /*@__PURE__*/
  messageDesc(file_struct, 2);

/**
 * 변경 주의(클라 의존성)
 *
 * @generated from message Protocol.UserData
 */
export type UserData = Message<"Protocol.UserData"> & {
  /**
   * 유저 식별 id
   *
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * 닉네임
   *
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: Protocol.CharacterData character = 3;
   */
  character?: CharacterData;
};

/**
 * Describes the message Protocol.UserData.
 * Use `create(UserDataSchema)` to create a new message.
 */
export const UserDataSchema: GenMessage<UserData> = /*@__PURE__*/
  messageDesc(file_struct, 3);

/**
 * 변경 주의(클라 의존성)
 *
 * @generated from message Protocol.RoomData
 */
export type RoomData = Message<"Protocol.RoomData"> & {
  /**
   * 방 ID
   *
   * @generated from field: int32 id = 1;
   */
  id: number;

  /**
   * 방 소유자 ID
   *
   * @generated from field: string ownerId = 2;
   */
  ownerId: string;

  /**
   * 방 이름
   *
   * @generated from field: string name = 3;
   */
  name: string;

  /**
   * 최대 사용자 수
   *
   * @generated from field: int32 maxUserNum = 4;
   */
  maxUserNum: number;

  /**
   * 방 상태
   *
   * @generated from field: Protocol.RoomStateType state = 5;
   */
  state: RoomStateType;

  /**
   * 방에 참여하는 사용자 목록
   *
   * @generated from field: repeated Protocol.UserData users = 6;
   */
  users: UserData[];
};

/**
 * Describes the message Protocol.RoomData.
 * Use `create(RoomDataSchema)` to create a new message.
 */
export const RoomDataSchema: GenMessage<RoomData> = /*@__PURE__*/
  messageDesc(file_struct, 4);

/**
 * 캐릭터 데이터, 변경 주의(클라 의존성)
 *
 * @generated from message Protocol.CharacterData
 */
export type CharacterData = Message<"Protocol.CharacterData"> & {
  /**
   * 필드 정의
   *
   * 캐릭터 타입
   *
   * @generated from field: Protocol.CharacterType characterType = 1;
   */
  characterType: CharacterType;
};

/**
 * Describes the message Protocol.CharacterData.
 * Use `create(CharacterDataSchema)` to create a new message.
 */
export const CharacterDataSchema: GenMessage<CharacterData> = /*@__PURE__*/
  messageDesc(file_struct, 5);

/**
 * @generated from message Protocol.PosInfo
 */
export type PosInfo = Message<"Protocol.PosInfo"> & {
  /**
   * @generated from field: float x = 1;
   */
  x: number;

  /**
   * @generated from field: float y = 2;
   */
  y: number;
};

/**
 * Describes the message Protocol.PosInfo.
 * Use `create(PosInfoSchema)` to create a new message.
 */
export const PosInfoSchema: GenMessage<PosInfo> = /*@__PURE__*/
  messageDesc(file_struct, 6);

/**
 * @generated from message Protocol.ErrorData
 */
export type ErrorData = Message<"Protocol.ErrorData"> & {
  /**
   * 에러코드
   *
   * @generated from field: int32 responseCode = 1;
   */
  responseCode: number;

  /**
   * 에러 내용
   *
   * @generated from field: string message = 2;
   */
  message: string;
};

/**
 * Describes the message Protocol.ErrorData.
 * Use `create(ErrorDataSchema)` to create a new message.
 */
export const ErrorDataSchema: GenMessage<ErrorData> = /*@__PURE__*/
  messageDesc(file_struct, 7);

