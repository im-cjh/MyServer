import { BattleSession } from 'src/main/sessions/BattleSession';
import { GamePlayerData } from 'src/protocol/struct_pb';

export class GamePlayer {
  public session: BattleSession;
  public playerData: GamePlayerData;

  constructor(session: BattleSession, playerData: GamePlayerData) {
    this.session = session;
    this.playerData = playerData;
  }
}
