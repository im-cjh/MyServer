import { BattleSession } from 'src/network/BattleSession';
import { UserData } from 'src/protocol/struct_pb';

export class GamePlayer {
  public session: BattleSession;
  public userData: UserData;

  constructor(session: BattleSession, userData: UserData) {
    this.session = session;
    this.userData = userData;
  }
}
