import { PosInfo } from "src/protocol/struct_pb";
import { GameObject } from "./gameObject";

export class Monster extends GameObject {
/*---------------------------------------------
    [멤버 변수]
---------------------------------------------*/


/*---------------------------------------------
    [생성자]
---------------------------------------------*/
    constructor(pos: PosInfo, maxHp: number, prefabId: string) {
        super(pos, maxHp, prefabId);
    }

    public onDamaged(){
        
    }

    public override onDeath(): void {
        throw new Error("Method not implemented.");
    }
}
