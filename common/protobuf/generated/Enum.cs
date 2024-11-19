// <auto-generated>
//     Generated by the protocol buffer compiler.  DO NOT EDIT!
//     source: enum.proto
// </auto-generated>
#pragma warning disable 1591, 0612, 3021, 8981
#region Designer generated code

using pb = global::Google.Protobuf;
using pbc = global::Google.Protobuf.Collections;
using pbr = global::Google.Protobuf.Reflection;
using scg = global::System.Collections.Generic;
namespace Protocol {

  /// <summary>Holder for reflection information generated from enum.proto</summary>
  public static partial class EnumReflection {

    #region Descriptor
    /// <summary>File descriptor for enum.proto</summary>
    public static pbr::FileDescriptor Descriptor {
      get { return descriptor; }
    }
    private static pbr::FileDescriptor descriptor;

    static EnumReflection() {
      byte[] descriptorData = global::System.Convert.FromBase64String(
          string.Concat(
            "CgplbnVtLnByb3RvEghQcm90b2NvbCozCg1Sb29tU3RhdGVUeXBlEggKBFdB",
            "SVQQABILCgdQUkVQQVJFEAESCwoHSU5BR0FNRRACKjkKCk9iamVjdFR5cGUS",
            "CQoFVE9XRVIQABIKCgZQTEFZRVIQARILCgdNT05TVEVSEAISBwoDRU5WEAMq",
            "MgoIQ2FyZFR5cGUSEAoMQVRUQUNLX1RPV0VSEAASFAoQU1RSX0FUVEFDS19U",
            "T1dFUhABKoABCg1DaGFyYWN0ZXJUeXBlEhEKDU5vbmVDaGFyYWN0ZXIQABIH",
            "CgNSZWQQARIJCgVTaGFyaxADEgoKBk1hbGFuZxAFEgoKBkZyb2dneRAHEgsK",
            "B0JvbWJNYW4QCBILCgdTbG93TWFuEAkSCAoETWFzaxAKEgwKCERpbm9zb3Vy",
            "EAxiBnByb3RvMw=="));
      descriptor = pbr::FileDescriptor.FromGeneratedCode(descriptorData,
          new pbr::FileDescriptor[] { },
          new pbr::GeneratedClrTypeInfo(new[] {typeof(global::Protocol.RoomStateType), typeof(global::Protocol.ObjectType), typeof(global::Protocol.CardType), typeof(global::Protocol.CharacterType), }, null, null));
    }
    #endregion

  }
  #region Enums
  /// <summary>
  ///변경 주의(클라 의존성)
  /// </summary>
  public enum RoomStateType {
    [pbr::OriginalName("WAIT")] Wait = 0,
    [pbr::OriginalName("PREPARE")] Prepare = 1,
    [pbr::OriginalName("INAGAME")] Inagame = 2,
  }

  public enum ObjectType {
    [pbr::OriginalName("TOWER")] Tower = 0,
    [pbr::OriginalName("PLAYER")] Player = 1,
    [pbr::OriginalName("MONSTER")] Monster = 2,
    [pbr::OriginalName("ENV")] Env = 3,
  }

  public enum CardType {
    [pbr::OriginalName("ATTACK_TOWER")] AttackTower = 0,
    /// <summary>
    /// 추가해야됨
    /// </summary>
    [pbr::OriginalName("STR_ATTACK_TOWER")] StrAttackTower = 1,
  }

  /// <summary>
  /// 캐릭터 타입, 변경 주의(클라 의존성)
  /// </summary>
  public enum CharacterType {
    [pbr::OriginalName("NoneCharacter")] NoneCharacter = 0,
    [pbr::OriginalName("Red")] Red = 1,
    [pbr::OriginalName("Shark")] Shark = 3,
    [pbr::OriginalName("Malang")] Malang = 5,
    [pbr::OriginalName("Froggy")] Froggy = 7,
    [pbr::OriginalName("BombMan")] BombMan = 8,
    [pbr::OriginalName("SlowMan")] SlowMan = 9,
    [pbr::OriginalName("Mask")] Mask = 10,
    [pbr::OriginalName("Dinosour")] Dinosour = 12,
  }

  #endregion

}

#endregion Designer generated code