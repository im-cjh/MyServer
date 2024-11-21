import { create, fromBinary, toBinary } from '@bufbuild/protobuf';
import { ePacketId } from 'ServerCore/network/PacketId';
import { PacketUtils } from 'ServerCore/utils/parser/ParserUtils';
import { BattleSession } from 'src/main/sessions/BattleSession';
import { LobbySession } from 'src/main/sessions/LobbySession';
import { GamePlayer } from './GamePlayer';
import { RESPONSE_SUCCESS_CODE } from 'ServerCore/config/config';
import { B2C_GameStartNotification, B2C_GameStartNotificationSchema, B2C_JoinRoomRequestSchema } from 'src/protocol/room_pb';
import { GamePlayerData, GamePlayerDataSchema, PosInfoSchema } from 'src/protocol/struct_pb';
import { B2C_PositionUpdateNotification, B2C_PositionUpdateNotificationSchema, C2B_PositionUpdateRequest } from 'src/protocol/character_pb';

export class GameRoom {
  /*---------------------------------------------
    [멤버 변수]
---------------------------------------------*/
  private id: number;
  private users: Array<GamePlayer>;
  private maxPlayerCount: number;

  /*---------------------------------------------
    [생성자]
---------------------------------------------*/
  constructor(id: number, maxPlayerCount: number) {
    this.users = new Array();
    this.id = id;
    this.maxPlayerCount = maxPlayerCount;
  }

/*---------------------------------------------
  [방 입장]
  // 1. 방이 가득 찼는지 확인
  // 2. 유저 추가
  // 3. 해당 유저에게 B2C_JoinRoomResponse 패킷 전송
  // 4. 모든 인원이 들어왔다면 B2C_GameStart 패킷 전송
---------------------------------------------*/
public enterRoom(player: GamePlayer) {
  console.log('enterRoom');

  // 스폰 좌표 목록
  const spawnCoordinates = [
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 3 },
    { x: 4, y: 3 }
  ];

  // 1. 방이 가득 찼는지 확인
  if (this.users.length >= this.maxPlayerCount) {
    console.error(`방이 가득 찼습니다. (방 ID: ${this.id})`);
    return;
  }

  // 2. 유저 추가
  this.users.push(player);
  console.log(`유저가 방에 입장했습니다. 현재 인원: ${this.users.length}/${this.maxPlayerCount}`);

  // 3. 해당 유저에게 B2C_JoinRoomResponse 패킷 전송
  const enterRoomPacket = create(B2C_JoinRoomRequestSchema, {
    isSuccess: true
  });

  const enterRoomBuffer: Buffer = PacketUtils.SerializePacket(
    enterRoomPacket,
    B2C_JoinRoomRequestSchema,
    ePacketId.B2C_JoinRoomResponse,
    player.session.getNextSequence()
  );
  player.session.send(enterRoomBuffer);

  // 4. 모든 인원이 들어왔다면 B2C_GameStart 패킷 전송
  if (this.users.length === this.maxPlayerCount) {
    console.log('모든 유저가 입장하였습니다. 게임을 시작합니다.');

    // 유저의 스폰 위치 부여
    const playerDatas: GamePlayerData[] = [];

    for (let i = 0; i < this.users.length; i++) {
      console.log("i+1회 호출");
      const user = this.users[i];
      const spawnPoint = spawnCoordinates[i]; // 좌표 목록에서 순차적으로 할당

      const posInfo = create(PosInfoSchema, {
        uuid: user.session.getId(),
        x: spawnPoint.x,
        y: spawnPoint.y
      });

      const gamePlayerData = create(GamePlayerDataSchema, {
        position: posInfo,
        nickname: user.playerData.nickname,
        characterType: user.playerData.characterType
      });

      playerDatas.push(gamePlayerData);
    }

    // B2C_GameStartNotification 패킷 생성
    const gameStartPacket: B2C_GameStartNotification = create(B2C_GameStartNotificationSchema, {
      playerDatas
    });

    const gameStartBuffer: Buffer = PacketUtils.SerializePacket(
      gameStartPacket,
      B2C_GameStartNotificationSchema,
      ePacketId.B2C_GameStartNotification,
      player.session.getNextSequence()
    );

    // 모든 유저에게 전송
    this.broadcast(gameStartBuffer);
  }
}

  /*---------------------------------------------
    [방 퇴장]
---------------------------------------------*/
// public leaveRoom(player: GamePlayer) {
//   console.log('leaveRoom');

//   // 1. 유저 제거
//   this.users = this.users.filter((user) => user !== player);
//   console.log(`유저가 방을 떠났습니다. 현재 인원: ${this.users.length}/${this.maxPlayerCount}`);

//   // 2. 방에 아무도 남아 있지 않으면 정리 로직 수행
//   if (this.users.length === 0) {
//     console.log(`방이 비어 있습니다. 방 ID: ${this.id} 정리 중...`);
//     // 추가 정리 로직 (필요 시)
//   }

//   // 3. 나간 유저 정보 브로드캐스트 
//   const leavePacket = create(B2C_PositionUpdateNotificationSchema, {
//     posInfos: create(PosInfoSchema, {
//       uuid: player.session.getId()
//     })
//   });

//   const leaveBuffer: Buffer = PacketUtils.SerializePacket(leavePacket, B2C_PositionUpdateNotificationSchema, ePacketId.B2C_PlayerLeaveNotification, 0);
//   this.broadcast(leaveBuffer);
// }

  /*---------------------------------------------
    [이동 동기화]
---------------------------------------------*/
  public handleMove(clientPacket: C2B_PositionUpdateRequest, session: BattleSession) {
    console.log('handleMove');

    //TODO 위치 검증 필요


    const packet: B2C_PositionUpdateNotification = create(B2C_PositionUpdateNotificationSchema, {
      posInfos: create(PosInfoSchema, {
        uuid: session.getId(),
        x: clientPacket.posInfos?.x,
        y: clientPacket.posInfos?.y,
      })
    });

    const sendBuffer: Buffer = PacketUtils.SerializePacket(packet, B2C_PositionUpdateNotificationSchema, ePacketId.B2C_PositionUpdateNotification, 0);
    this.broadcast(sendBuffer);
  }
  /*---------------------------------------------
    [broadcast]
---------------------------------------------*/
  private broadcast(buffer: Buffer) {
    for (const user of this.users) {
      user.session.send(buffer);
    }
  }
  /*---------------------------------------------
    [getter]
---------------------------------------------*/
}
