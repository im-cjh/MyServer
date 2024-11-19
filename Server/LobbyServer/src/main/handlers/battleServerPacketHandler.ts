import { Socket } from 'node:net';
import defaultHandler from 'ServerCore/handlers/default.handler';
import { LobbySession } from 'src/main/sessions/LobbySession';
import { ePacketId } from 'ServerCore/network/PacketId';
import { roomManager } from 'src/content/RoomManager';
import { BattleSession } from 'src/main/sessions/BattleSession';

type PacketHandler = (buffer: Buffer, session: BattleSession) => void;

const battleHandlerMappings: Record<ePacketId, PacketHandler> | any = {
  [ePacketId.B2L_Init]: (buffer: Buffer, session: BattleSession) => defaultHandler(buffer, session),
  [ePacketId.B2L_CreateGameRoomRespone]: (buffer: Buffer, session: BattleSession) =>
    roomManager.onGameStartHandler(buffer, session),
};

export default battleHandlerMappings;
