import { create, fromBinary, toBinary } from '@bufbuild/protobuf';
import { LobbySession } from 'src/main/sessions/LobbySession';
import { Room } from './Room';
import { PacketUtils } from 'ServerCore/utils/parser/ParserUtils';
import { ePacketId } from 'ServerCore/network/PacketId';
import { CustomError } from 'ServerCore/utils/error/CustomError';
import { ErrorCodes } from 'ServerCore/utils/error/ErrorCodes';
import { battleSessionManager } from 'src/server';
import { BattleSession } from 'src/main/sessions/BattleSession';
import { lobbyConfig } from 'src/config/config';
import { B2L_CreateGameRoomResponeSchema, C2L_CreateRoomRequest, C2L_CreateRoomRequestSchema, C2L_GameStartSchema, C2L_JoinRoomRequest, C2L_JoinRoomRequestSchema, C2L_LeaveRoomRequest, C2L_LeaveRoomRequestSchema, L2B_CreateGameRoomRequestSchema, L2C_CreateRoomResponse, L2C_CreateRoomResponseSchema, L2C_GameStartSchema, L2C_GetRoomListResponseSchema } from 'src/protocol/room_pb';
import { RoomDataSchema } from 'src/protocol/struct_pb';
import { RoomStateType } from 'src/protocol/enum_pb';
import { handleError } from 'src/utils/error/errorHandler';

const MAX_ROOMS_SIZE: number = 10000;

class RoomManager {
  /*---------------------------------------------
  [멤버 변수]
  -users: 
    일단 LobbySession으로 사용하기...
---------------------------------------------*/
  private rooms = new Map<number, Room>();
  private availableRoomIds = Array.from({ length: MAX_ROOMS_SIZE }, (_, i) => i + 1);

  constructor() {
    let tmpRoomId = this.availableRoomIds.shift();
    if (!tmpRoomId) tmpRoomId = 0;
    this.rooms.set(tmpRoomId, new Room(tmpRoomId, '정현의 방', 2));
  }

  /*---------------------------------------------
    [방 생성]
---------------------------------------------*/
createRoomHandler(buffer: Buffer, session: LobbySession) {
  console.log('createRoomHandler');
  //패킷 분해
  const packet: C2L_CreateRoomRequest = fromBinary(C2L_CreateRoomRequestSchema, buffer);
  let roomId: number | undefined = this.availableRoomIds.shift();
  if(roomId == undefined){
    handleError(session, new CustomError(ErrorCodes.SOCKET_ERROR, "방 id부족"));
    return;
  }
  this.rooms.set(roomId, new Room(roomId, packet.name, packet.maxUserNum));

  const response: L2C_CreateRoomResponse = create(L2C_CreateRoomResponseSchema, {
    isSuccess: true,
    room: create(RoomDataSchema, {
      id: roomId, 
      name: packet.name,
    })
  });

  const sendBuffer: Buffer = PacketUtils.SerializePacket(response, L2C_CreateRoomResponseSchema, ePacketId.L2C_CreateRoomResponse, 0);
  session.send(sendBuffer);
}

  /*---------------------------------------------
    [방 입장]
---------------------------------------------*/
  enterRoomHandler(buffer: Buffer, session: LobbySession) {
    console.log('enterRoomHandler');
    //패킷 분해
    const packet: C2L_JoinRoomRequest = fromBinary(C2L_JoinRoomRequestSchema, buffer);

    //방id가 유효한지 검증

    //Room::enterRoom()호출
    this.rooms.get(packet.roomId)?.enterRoom(session);
  }

  /*---------------------------------------------
    [방 퇴장]
---------------------------------------------*/
  leaveRoomHandler(buffer: Buffer, session: LobbySession) {
    console.log('leaveRoomHandler');
    // 패킷 분해
    const packet: C2L_LeaveRoomRequest = fromBinary(C2L_LeaveRoomRequestSchema, buffer);
    this.rooms.get(packet.roomId)?.leaveRoom(session);
  }

  /*---------------------------------------------
    [방 목록 조회]
---------------------------------------------*/
  getRoomsHandler(buffer: Buffer, session: LobbySession | BattleSession) {
    console.log('getRoomsHandler called');
    // 방 목록을 담을 배열 초기화
    const roomInfos = [];

    // 방 목록을 순회하면서 RoomInfo 메시지 생성
    for (const [roomId, room] of this.rooms) {
      const roomInfo = create(RoomDataSchema, {
        id: roomId,
        name: room.getRoomName(),
        maxUserNum: room.getMaxUsersCount(),
        state: RoomStateType.WAIT,
      });
      console.log("인원 수: " + room.getMaxUsersCount())
      roomInfos.push(roomInfo);
    }

    const packet = create(L2C_GetRoomListResponseSchema, {
      rooms: roomInfos,
    });

    const sendBuffer = PacketUtils.SerializePacket(
      packet,
      L2C_GetRoomListResponseSchema,
      ePacketId.L2C_GetRoomListResponse,
      session.getNextSequence(),
    );
    session.send(sendBuffer);
  }

  /*---------------------------------------------
    [게임 시작]
    
    - 배틀서버에게 게임 방 생성 요청
  ---------------------------------------------*/
  public gameStartHandler(buffer: Buffer, sesison: LobbySession | BattleSession) {
    console.log('gameStartHandler');
    const battleSession: BattleSession | null =
      battleSessionManager.getSessionOrNull('battleServerSession');

    if (!battleSession) {
      console.log('!BattleServerSession을 찾을 수 없습니다.');
      throw new CustomError(ErrorCodes.SOCKET_ERROR, 'BattleServerSession을 찾을 수 없습니다.');
    }

    const packet = fromBinary(C2L_GameStartSchema, buffer);
    const room = this.rooms.get(packet.roomId);
    if (room == undefined) {
      console.log('방을 찾을 수 없습니다.');
      throw new CustomError(ErrorCodes.SOCKET_ERROR, 'invalid roomId.');
    }

    const L2BPacket = create(L2B_CreateGameRoomRequestSchema, {
      roomId: packet.roomId,
      maxPlayers: room.getCurrentUsersCount(),
    });

    const sendBuffer: Buffer = PacketUtils.SerializePacket(
      L2BPacket,
      L2B_CreateGameRoomRequestSchema,
      ePacketId.L2B_CreateGameRoomRequest,
      sesison.getNextSequence(),
    );

    console.log('내가 받은 roomId', packet.roomId);
    battleSession.send(sendBuffer);
    console.log('보내기 직후');
  }

  /*---------------------------------------------
    [게임 시작2]
    
    - 클라에게 배틀 서버의 주소와 포트번호, 게임 방ID 전송 
  ---------------------------------------------*/
  public onGameStartHandler(buffer: Buffer, sesison: LobbySession | BattleSession) {
    console.log('------------------------------');
    console.log('onGameStartHandler');
    console.log('------------------------------');

    const packet = fromBinary(B2L_CreateGameRoomResponeSchema, buffer);

    if (packet.isCreated == false) {
      console.log('onGameStartHandler: 실패');
      throw new CustomError(ErrorCodes.SOCKET_ERROR, '방 생성 실패');
    }

    const room = this.rooms.get(packet.roomId);
    if (!room) {
      console.log(this.rooms);
      console.log('onGameStartHandler: 실패');
      throw new CustomError(ErrorCodes.SOCKET_ERROR, `유효하지 않은 roomID: ${packet.roomId}`);
    }

    const L2C_GameStartPacket = create(L2C_GameStartSchema, {
      host: lobbyConfig.battleServer.host,
      port: lobbyConfig.battleServer.port,
      roomId: packet.roomId,
    });

    const sendBuffer = PacketUtils.SerializePacket(
      L2C_GameStartPacket,
      L2C_GameStartSchema,
      ePacketId.L2C_GameStart,
      0,
    );
    room.broadcast(sendBuffer);
  }
  /*---------------------------------------------
    [방 ID 해제]
    사용하지 않는 방 ID를 큐에 반환하여 재사용 가능하게 만듦
  ---------------------------------------------*/
  public freeRoomId(roomId: number) {
    if (!this.rooms.has(roomId)) {
      console.log('유효하지 않은 roomID');
      throw new CustomError(ErrorCodes.SOCKET_ERROR, '유효하지 않은 roomID');
    }

    this.rooms.delete(roomId);
    this.availableRoomIds.push(roomId);
  }
}
export const roomManager = new RoomManager();
