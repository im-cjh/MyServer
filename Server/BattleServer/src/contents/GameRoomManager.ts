import { create, fromBinary, toBinary } from '@bufbuild/protobuf';
import { LobbySession } from 'src/main/sessions/LobbySession';
import { PacketUtils } from 'ServerCore/utils/parser/ParserUtils';
import { ePacketId } from 'ServerCore/network/PacketId';
import { CustomError } from 'ServerCore/utils/error/CustomError';
import { ErrorCodes } from 'ServerCore/utils/error/ErrorCodes';
import { BattleSession } from 'src/main/sessions/BattleSession';
import { B2L_CreateGameRoomResponeSchema, L2B_CreateGameRoomRequestSchema } from 'src/protocol/room_pb';
import { GameRoom } from './GameRoom';
import { GamePlayer } from './GamePlayer';
import { C2B_PositionUpdateRequest, C2B_PositionUpdateRequestSchema } from 'src/protocol/character_pb';

const MAX_ROOMS_SIZE: number = 10000;

class GameRoomManager {
  /*---------------------------------------------
  [멤버 변수]
  -users: 
    일단 LobbySession으로 사용하기...
---------------------------------------------*/
  private rooms = new Map<number, GameRoom>();
  private availableRoomIds = Array.from({ length: MAX_ROOMS_SIZE }, (_, i) => i + 1);

  constructor() {}

  /*---------------------------------------------
    [방 입장]
    -클라에게 B2C_EnterRoom패킷 전송
---------------------------------------------*/
  public enterRoomHandler(roomId: number, player: GamePlayer) {
    console.log('enterRoomHandler');

    const room: GameRoom | undefined = this.rooms.get(roomId);
    if (room == undefined) {
      console.log('유효하지 않은 roomId입니다.');
      return;
    }

    room.enterRoom(player);
  }
  /*---------------------------------------------
    [방 퇴장]
---------------------------------------------*/

  /*---------------------------------------------
    [방 목록 조회]
---------------------------------------------*/

  /*---------------------------------------------
    [게임 시작]
    
    - 배틀서버에게 게임 방 생성 요청
    - 클라에게 배틀 서버의 주소와 포트번호, 게임 방ID 전송 
  ---------------------------------------------*/

  /*---------------------------------------------
    [방 생성]
    
    - 배틀서버에게 게임 방 생성 요청
    - 클라에게 배틀 서버의 주소와 포트번호, 게임 방ID 전송 
  ---------------------------------------------*/
  public createGameRoomHandler(buffer: Buffer, session: LobbySession | BattleSession) {
    console.log('createGameRoom', session.getId());
    console.log('--------------------');
    const L2B_CreateRoomPacket = fromBinary(L2B_CreateGameRoomRequestSchema, buffer);
    const roomId: number = L2B_CreateRoomPacket.roomId;
    const maxPlayerCount = L2B_CreateRoomPacket.maxPlayers;
    //roomdId가 이미 존재하는지 검증
    if (this.rooms.has(roomId)) {
      console.error(`방 ID ${roomId}가 이미 존재합니다.`);
      console.log(this.rooms.get(roomId));
      throw new CustomError(ErrorCodes.SOCKET_ERROR, '방 ID가 이미 존재합니다.');
    }
    //해당 방이 이미 풀방인지 검증
    if (maxPlayerCount <= 0 || maxPlayerCount > MAX_ROOMS_SIZE) {
      console.error(`유효하지 않은 최대 인원 수: ${maxPlayerCount}`);
      throw new CustomError(ErrorCodes.SOCKET_ERROR, '유효하지 않은 최대 인원 수입니다.');
    }

    //게임 방 생성
    const newGameRoom: GameRoom = new GameRoom(roomId, maxPlayerCount);
    this.rooms.set(roomId, newGameRoom);

    console.log('방 생성', L2B_CreateRoomPacket.roomId);

    const B2L_CreateRoomPacket = create(B2L_CreateGameRoomResponeSchema, {
      isCreated: true,
      roomId: L2B_CreateRoomPacket.roomId,
    });

    const sendBuffer: Buffer = PacketUtils.SerializePacket(B2L_CreateRoomPacket, B2L_CreateGameRoomResponeSchema, ePacketId.B2L_CreateGameRoomRespone, session.getNextSequence());
    session.send(sendBuffer);
    console.log('send B2L_CreateRoom');
  }

  /*---------------------------------------------
    [이동 동기화]
---------------------------------------------*/
  public moveHandler(buffer: Buffer, session: BattleSession) {
    console.log('moveHandler');

    const packet: C2B_PositionUpdateRequest = fromBinary(C2B_PositionUpdateRequestSchema, buffer);

    const room = this.rooms.get(packet.roomId);
    if (room == undefined) {
      console.log('유효하지 않은 roomId');
      throw new CustomError(ErrorCodes.SOCKET_ERROR, '유효하지 않은 roomId');
    }

    room.handleMove(packet, session);
  }
  /*---------------------------------------------
    [방 ID 해제]
    사용하지 않는 방 ID를 큐에 반환하여 재사용 가능하게 만듦
  ---------------------------------------------*/
}
export const gameRoomManager = new GameRoomManager();