import net, { Server, Socket } from "net";
import { lobbyConfig } from "./config/config";

import { LobbySession } from "./main/sessions/LobbySession";
import { BattleSession } from "./main/sessions/BattleSession";
import { testAllConnections } from "./test/testDbConnection";
import pools from "./db/database";
import { onConnection } from "./main/handlers/commonPacketHandler";
import { SessionManager } from "ServerCore/network/SessionManager";

const server: Server = net.createServer(onConnection);
/*---------------------------------------------
    [전역 변수]
      -sessionManager: 
---------------------------------------------*/
export const sessionManager: SessionManager<LobbySession> = new SessionManager(
  LobbySession
);

export const battleSessionManager: SessionManager<BattleSession> =
  new SessionManager(BattleSession);

const initServer = async () => {
  try {
    await testAllConnections(pools);
    // 다음 작업
  } catch (error: any) {
    console.error(error.message);
    process.exit(1); // 오류 발생 시 프로세스 종료
  }
};

initServer()
  .then(() => {
    server.listen(lobbyConfig.server.port, lobbyConfig.server.host, () => {
      console.log(
        `서버가 ${lobbyConfig.server.host}:${lobbyConfig.server.port}에서 실행 중입니다.`
      );
      console.log(server.address());
    });
  })
  .catch((error: any) => {
    console.error(error);
    process.exit(1); // 오류 발생 시 프로세스 종료
  });
