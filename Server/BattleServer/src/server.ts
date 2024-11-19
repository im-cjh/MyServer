import net, { Server, Socket } from 'net';
import { v4 as uuidv4 } from 'uuid';
import { SessionManager } from 'ServerCore/classes/managers/SessionManager';
import { onConnection } from './events/onConnection';
import { BattleSession } from './network/BattleSession';
import { LobbySession } from './network/LobbySession';
import { battleConfig } from './config/config';
import initServer from './init';

const server: Server = net.createServer(onConnection);
/*---------------------------------------------
    [전역 변수]
      -sessionManager: 
---------------------------------------------*/
export const sessionManager: SessionManager<BattleSession> = new SessionManager(BattleSession);

export let lobbySession: LobbySession = new LobbySession(new Socket());
lobbySession.connectLobbyServer();

initServer()
  .then(() => {
    server.listen(battleConfig.server.port, battleConfig.server.host, () => {
      console.log(`서버가 ${battleConfig.server.host}:${battleConfig.server.port}에서 실행 중입니다.`);
      console.log(server.address());
    });
  })
  .catch((error: any) => {
    console.error(error);
    process.exit(1); // 오류 발생 시 프로세스 종료
  });
