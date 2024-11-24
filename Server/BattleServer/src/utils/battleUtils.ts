import { PosInfo, Vec2 } from "src/protocol/struct_pb";

export class BattleUtils {
    static isSamePosition(playerPos: PosInfo | undefined, pos: Vec2): boolean {
      return playerPos?.x === pos.x && playerPos?.y === pos.y;
    }
  }
  