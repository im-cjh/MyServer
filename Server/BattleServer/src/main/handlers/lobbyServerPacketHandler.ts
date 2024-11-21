import { Socket } from 'node:net';
import defaultHandler from 'ServerCore/handlers/default.handler';
import { LobbySession } from 'src/main/sessions/LobbySession';
import { ePacketId } from 'ServerCore/network/PacketId';
import { BattleSession } from 'src/main/sessions/BattleSession';
import { gameRoomManager } from 'src/contents/GameRoomManager';

type PacketHandler = (buffer: Buffer, session: LobbySession) => void;

const lobbyHandlerMappings: Record<ePacketId, PacketHandler> | any = {
  [ePacketId.L2B_CreateGameRoomRequest]: (buffer: Buffer, session: LobbySession) => gameRoomManager.createGameRoomHandler(buffer, session),
  [ePacketId.S2C_Error]: function (buffer: Buffer, session: LobbySession) {
    console.log('에러 ㅇㅇ');
  },
};

export default lobbyHandlerMappings;