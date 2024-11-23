import { Socket } from 'net';
import { create } from '@bufbuild/protobuf';
import { LobbySession } from 'src/main/sessions/lobbySession';

import { ErrorCodes } from 'ServerCore/utils/error/ErrorCodes';
import { PacketUtils } from 'ServerCore/utils/parser/ParserUtils';
import { ePacketId } from 'ServerCore/network/PacketId';
import { BattleSession } from 'src/main/sessions/battleSession';
import { ErrorData, ErrorDataSchema } from 'src/protocol/struct_pb';
import { ResponseUtils } from './responseUtils';



export const handleError = (session: LobbySession | BattleSession, error: any) => {
  let responseCode: number;
  let message: string = error.message;
  if (error.code) {
    responseCode = error.code;
    console.error(`에러 코드: ${error.code}, 메시지: ${error.message}`);
    console.log(error.stack.split('\n')[1]);
  } else {
    responseCode = ErrorCodes.SOCKET_ERROR;
    console.error(`일반 에러: ${error.message}`);
    console.log(error.stack.split('\n')[1]);
  }

  const packet: ErrorData = ResponseUtils.createErrorResponse(responseCode, message);
  const sendBuffer: Buffer = PacketUtils.SerializePacket<ErrorData>(
    packet,
    ErrorDataSchema,
    ePacketId.S2C_Error,
    session.getNextSequence(),
  );
  session.send(sendBuffer);
};
