import { Socket } from 'node:net';
import defaultHandler from 'ServerCore/handlers/default.handler';
import { LobbySession } from 'src/main/sessions/lobbySession';
import { ePacketId } from 'ServerCore/network/PacketId';
import { BattleSession } from 'src/main/sessions/battleSession';
import { gameRoomManager } from 'src/contents/gameRoomManager';

type PacketHandler = (buffer: Buffer, session: BattleSession) => void;

const handlerMappings: Record<ePacketId, PacketHandler> | any = {
  [ePacketId.L2B_CreateGameRoomRequest]: (buffer: Buffer, session: BattleSession) => gameRoomManager.createGameRoomHandler(buffer, session),
  [ePacketId.C2B_PositionUpdateRequest]: (buffer: Buffer, session: BattleSession) => gameRoomManager.moveHandler(buffer, session),
  [ePacketId.S2C_Error]: function (buffer: Buffer, session: BattleSession) {
    console.log('에러 ㅇㅇ');
  },
};

export default handlerMappings;
