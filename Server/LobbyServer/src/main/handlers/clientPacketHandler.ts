import { Socket } from 'node:net';
import defaultHandler from 'ServerCore/handlers/default.handler';
import { LobbySession } from 'src/main/sessions/LobbySession';
import initialHandler from './commonPacketHandler';
import { ePacketId } from 'ServerCore/network/PacketId';
import { roomManager } from 'src/content/RoomManager';

type PacketHandler = (buffer: Buffer, session: LobbySession) => void;

const handlerMappings: Record<ePacketId, PacketHandler> | any = {
  [ePacketId.C2L_JoinRoomRequest]: (buffer: Buffer, session: LobbySession) =>
    roomManager.enterRoomHandler(buffer, session),
  [ePacketId.C2L_LeaveRoomRequest]: (buffer: Buffer, session: LobbySession) =>
    roomManager.enterRoomHandler(buffer, session),
  [ePacketId.C2L_GetRoomListRequest]: (buffer: Buffer, session: LobbySession) =>
    roomManager.getRoomsHandler(buffer, session),
  [ePacketId.C2L_GameStart]: (buffer: Buffer, session: LobbySession) =>
    roomManager.gameStartHandler(buffer, session),
  [ePacketId.C2L_CreateRoomRequest]: (buffer: Buffer, session: LobbySession) =>
    roomManager.createRoomHandler(buffer, session),
  [ePacketId.B2L_CreateGameRoomRespone]: function (buffer: Buffer, session: LobbySession) {
    console.log('B2L_CreateRoom ㅇㅇ');
  },
  [ePacketId.S2C_Error]: function (buffer: Buffer, session: LobbySession) {
    console.log('에러 ㅇㅇ');
  },
};

export default handlerMappings;
