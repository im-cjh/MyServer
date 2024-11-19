import { LobbySession } from "src/main/sessions/LobbySession";

export class User {
  public session: LobbySession;
  public nickname: string | undefined;

  constructor(session: LobbySession, nickname: string | undefined) {
    this.session = session;
    this.nickname = nickname;
  }
}
