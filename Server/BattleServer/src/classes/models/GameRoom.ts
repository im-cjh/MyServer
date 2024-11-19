import { create, fromBinary, toBinary } from '@bufbuild/protobuf';
import { ePacketId } from 'ServerCore/network/PacketId';
import { PacketUtils } from 'ServerCore/utils/parser/ParserUtils';
import { BattleSession } from 'src/network/BattleSession';
import { LobbySession } from 'src/network/LobbySession';
import { GamePlayer } from './GamePlayer';
import { B2C_GameStartNotification, B2C_GameStartNotificationSchema, B2C_JoinRoomRequestSchema } from 'src/protocol/room_pb';
import { RESPONSE_SUCCESS_CODE } from 'ServerCore/config/config';
import { UserData } from 'src/protocol/struct_pb';

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
    // 3. 해당 유저에게 B2C_EnterRoom패킷 전송
    // 3. 모든 인원이 들어왔다면 B2C_GameStart패킷 전송
---------------------------------------------*/
  public enterRoom(player: GamePlayer) {
    console.log('enterRoom');

    // 1. 방이 가득 찼는지 확인
    if (this.users.length > this.maxPlayerCount) {
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

    const enterRoomBuffer: Buffer = PacketUtils.SerializePacket(enterRoomPacket, B2C_JoinRoomRequestSchema, ePacketId.B2C_JoinRoomResponse, player.session.getNextSequence());
    player.session.send(enterRoomBuffer);

    // 4. 모든 인원이 들어왔다면 B2C_GameStart 패킷 전송
    if (this.users.length === this.maxPlayerCount) {
      console.log('모든 유저가 입장하였습니다. 게임을 시작합니다.');

      const userDatas: UserData[] = this.users.map((user) => user.userData);
      const gameStartPacket: B2C_GameStartNotification = create(B2C_GameStartNotificationSchema, {
        userDatas: userDatas
      });

      const gameStartBuffer: Buffer = PacketUtils.SerializePacket(gameStartPacket, B2C_GameStartNotificationSchema, ePacketId.B2C_GameStartNotification, player.session.getNextSequence());

      this.broadcast(gameStartBuffer);
    }
  }
  /*---------------------------------------------
    [방 퇴장]
---------------------------------------------*/

  /*---------------------------------------------
    [이동 동기화]
---------------------------------------------*/
  public handleMove(buffer: Buffer) {
    //console.log('handleMove');

    // const packet: C2B_Move = fromBinary(C2B_MoveSchema, buffer);

    // const B2C_MovePacket: B2C_Move = create(B2C_MoveSchema, {
    //   objectInfo: packet.objectInfo,
    //   objectType: packet.objectType,
    // });

    // const sendBuffer: Buffer = PacketUtils.SerializePacket(B2C_MovePacket, B2C_MoveSchema, ePacketId.B2C_Move, 0);
    // this.broadcast(sendBuffer);
  }
  /*---------------------------------------------
    [게임 시작]
---------------------------------------------*/

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
