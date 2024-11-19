import { Socket } from 'net';
import { LobbySession } from 'src/network/LobbySession';
import { CustomError } from 'ServerCore/utils/error/CustomError';
import { ErrorCodes } from 'ServerCore/utils/error/ErrorCodes';
import { RESPONSE_SUCCESS_CODE } from 'ServerCore/constants';
import { PacketUtils } from 'ServerCore/utils/parser/ParserUtils';
import { ePacketId } from 'ServerCore/network/PacketId';
import { sessionManager } from 'src/server';
import { battleConfig } from 'src/config/config';

import { ResponseUtils } from 'src/utils/response/ResponseUtils';
import { create, fromBinary } from '@bufbuild/protobuf';
import { gameRoomManager } from 'src/classes/managers/GameRoomManager';
import { BattleSession } from 'src/network/BattleSession';
import { GamePlayer } from 'src/classes/models/GamePlayer';
import { C2B_Init, C2B_InitSchema } from 'src/protocol/init_pb';

/*---------------------------------------------
    [초기화 핸들러]

    1. 클라 버전 검증
    2. 유저 정보 갱신
        2-1. 최초 접속 시 DB에 저장
        2-2. 최초가 아니면 로그인 기록 갱신
    3. session의 유저 id 갱신
    4. 유저 정보 응답 생성
    5. 유저 정보 직렬화
    6. 버퍼 전송

    - 클라로부터 deviceId를 받기
    - DB 조회
        -데이터X: 새로운 id발급
        -데이터O: 기존 id반환

---------------------------------------------*/
const initialHandler = async (buffer: Buffer, socket: Socket) => {
  console.log('initialHandler: called', socket.remoteAddress, socket.remotePort);

  let packet: C2B_Init;
  try {
    packet = fromBinary(C2B_InitSchema, buffer);
  } catch (error) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, '패킷 디코딩 중 오류가 발생했습니다');
  }

  //3. sessionManager에 세션 추가
  let session: BattleSession;
  // 세션이 생성되었으므로, 더 이상 주체 판별이 필요하지 않음
  if (packet.userData) {
    session = sessionManager.addSession(packet.userData.id, socket);
  } else {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, '패킷 디코딩 중 오류가 발생했습니다');
  }

  sessionManager.getSessionOrNull(packet.userData.id)?.setNickname(packet.userData.name);

  const player = new GamePlayer(session, packet.PlayerInfo);
  gameRoomManager.enterRoomHandler(packet.roomId, player);
};

export default initialHandler;
