import { Socket } from 'net';
import { CustomError } from 'ServerCore/utils/error/CustomError';
import { ErrorCodes } from 'ServerCore/utils/error/ErrorCodes';
import { GamePlayer } from '../../contents/gameObjects/gamePlayer';
import { C2B_Init, C2B_InitSchema } from 'src/protocol/init_pb';
import { ePacketId } from 'ServerCore/network/PacketId';
import { config } from 'ServerCore/config/config';
import { PacketHeader } from 'ServerCore/network/PacketHeader';
import { PacketUtils } from 'ServerCore/utils/parser/ParserUtils';
import { gameRoomManager } from 'src/contents/rooms/gameRoomManager';
import { fromBinary } from '@bufbuild/protobuf';
import { BattleSession } from '../sessions/battleSession';
import { sessionManager } from 'src/server';

export const onConnection = (socket: Socket): void => {
  console.log('새로운 연결이 감지되었습니다:', socket.remoteAddress, socket.remotePort);

  let buffer = Buffer.alloc(0);

  socket.on('data', (data: Buffer) => {
    buffer = Buffer.concat([buffer, data]);

    // 최소한 헤더는 파싱할 수 있어야 한다
    if (buffer.length < config.packet.sizeOfHeader) {
      return;
    }

    let header: PacketHeader = PacketUtils.readPacketHeader(buffer);
    // 헤더에 기록된 패킷 크기를 파싱할 수 있어야 한다
    if (buffer.length < header.size) {
      console.log('파싱X', buffer.length, header.size);
      return;
    }

    const packet = buffer.subarray(config.packet.sizeOfHeader, header.size);

    if (header.id == ePacketId.C2B_Init) {
      console.log('클라 접속');
      initialHandler(packet, socket);
    } else {
      console.log('먼지 모르겥는거 두두등장');
      socket.destroy();
    }
  });
};

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
    console.log(error)
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, '패킷 디코딩 중 오류가 발생했습니다1');
  }

  //3. sessionManager에 세션 추가
  let session: BattleSession;
  // 세션이 생성되었으므로, 더 이상 주체 판별이 필요하지 않음
  if (packet.playerData) {
    session = sessionManager.addSession(packet.playerData.position!.uuid, socket);
  } else {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, '패킷 디코딩 중 오류가 발생했습니다2');
  }

  sessionManager.getSessionOrNull(packet.playerData.position!.uuid)?.setNickname(packet.playerData.nickname);

  const player = new GamePlayer(session, packet.playerData);
  gameRoomManager.enterRoomHandler(packet.roomId, player);
};

export default initialHandler;
