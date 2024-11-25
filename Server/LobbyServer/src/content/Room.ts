import { create, toBinary } from '@bufbuild/protobuf';
import { ePacketId } from 'ServerCore/network/PacketId';
import { PacketUtils } from 'ServerCore/utils/parser/ParserUtils';
import { eRoomStateId } from 'src/config/roomState';
import { LobbySession } from 'src/main/sessions/LobbySession';
import { CharacterType, RoomStateType } from 'src/protocol/enum_pb';
import { L2C_JoinRoomNotification, L2C_JoinRoomNotificationSchema, L2C_JoinRoomResponse, L2C_JoinRoomResponseSchema } from 'src/protocol/room_pb';
import { CharacterDataSchema, RoomDataSchema, UserDataSchema } from 'src/protocol/struct_pb';
import { handleError } from 'src/utils/error/errorHandler';

export class Room {
  /*---------------------------------------------
    [멤버 변수]
---------------------------------------------*/
  private id: number;
  private roomName: string;
  private users: Array<LobbySession>;
  private state: eRoomStateId;
  private maxPlayerCount: number;

  /*---------------------------------------------
    [생성자]
---------------------------------------------*/
  constructor(id: number, roomName: string, maxPlayerCount: number = 2) {
    this.id = id;
    this.roomName = roomName;
    this.users = new Array();
    //this.users = new Set();
    this.state = eRoomStateId.WAITING; // 'waiting', 'inProgress'
    this.maxPlayerCount = maxPlayerCount;
  }

  /*---------------------------------------------
    [방 입장]
    // 1. 방이 가득 찼는지 확인
    // 2. 기존 플레이어 목록을 유저에게 보내기
    // 3.  유저 추가
    // 4. 새 유저 입장 정보를 다른 유저들에게 알리기
---------------------------------------------*/
  public enterRoom(newUser: LobbySession): boolean {
    console.log('Room::enterRoom');
    //1. 방이 가득 찼는지 확인
    if (this.users.length >= this.maxPlayerCount) {
      console.log('풀방');
      return false;
    }

    //2. 기존 플레이어 목록을 유저에게 보내기
    {
      const existUsers = [];
      for (const user of this.users) {
        existUsers.push(
          create(UserDataSchema, {
            id: user.getId(),
            name: user.getNickname(),
            character: create(CharacterDataSchema, {
              characterType: user.getCharacterType(),
            })
          }),
        );
      }
      let packet: L2C_JoinRoomResponse = create(L2C_JoinRoomResponseSchema, {
        roomInfo: create(RoomDataSchema, {
          id: this.id,
          name: this.roomName,
          maxUserNum: this.maxPlayerCount,
          ownerId: "tmp",
          state: RoomStateType.WAIT,
          users: existUsers
        }),
      });

      const sendBuffer = PacketUtils.SerializePacket(
        packet,
        L2C_JoinRoomResponseSchema,
        ePacketId.L2C_JoinRoomResponse,
        newUser.getNextSequence(),
      );
      console.log('Serialized packet size:', sendBuffer.length);
      newUser.send(sendBuffer);
    }

    //3.  유저 추가
    this.users.push(newUser);

    // 4. 새 유저 입장 정보를 다른 유저들에게 알리기
    {
      console.log('아이디는 ', newUser.getId());
      const packet: L2C_JoinRoomNotification = create(L2C_JoinRoomNotificationSchema, {
        joinUser: create(UserDataSchema, {
          id: newUser.getId(),
          name: newUser.getNickname(),
          character: create(CharacterDataSchema, {
            characterType: newUser.getCharacterType()
          })
        })
      });

      const sendBuffer: Buffer = PacketUtils.SerializePacket(
        packet,
        L2C_JoinRoomNotificationSchema,
        ePacketId.L2C_JoinRoomNotification,
        0,
      );

      this.broadcast(sendBuffer);
    }

    return true;
  }

  /*---------------------------------------------
    [방 퇴장]
---------------------------------------------*/
  public leaveRoom(player: LobbySession): boolean {
    // 성공적으로 퇴장했다고 응답하기
    //다른 플레이들에게 전달하기
    return true;
  }

  /*---------------------------------------------
    [플레이어 정보 가져오기]
---------------------------------------------*/
  getUser(userId: string) {
    //return this.users.find((user) => user.getId() === userId);
  }

  /*---------------------------------------------
    [게임 시작]
---------------------------------------------*/
  startGame() {
    this.state = eRoomStateId.IN_PROGRESS;

    //Game인스턴스 생성

    //생성한 Game에 players정보 넣기

    //gameStart패킷 전송
  }

  /*---------------------------------------------
    [broadcast]
---------------------------------------------*/
  public broadcast(buffer: Buffer) {
    for (const user of this.users) {
      user.send(buffer);
    }
  }
  /*---------------------------------------------
    [getter]
---------------------------------------------*/
  getRoomName() {
    return this.roomName;
  }

  getCurrentUsersCount() {
    return this.users.length;
  }

  getMaxUsersCount() {
    return this.maxPlayerCount;
  }
}
