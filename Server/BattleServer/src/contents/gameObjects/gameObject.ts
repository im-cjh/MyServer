import { Utils } from "ServerCore/utils/Utils";
import { PosInfo } from "src/protocol/struct_pb";

export abstract class GameObject{
    protected pos: PosInfo;
    protected prefabId: string; //엔티티 유형의 식별자 - 예: minecraft:skeleton

    protected hp: number;
    protected maxHp: number;

    constructor(pos: PosInfo, maxHp: number, prefabId: string){
        this.pos = pos;
        this.hp = maxHp;
        this.maxHp = maxHp;
        this.prefabId = prefabId;
    }

    public onDamaged(amount: number): void {
        this.hp = Utils.clamp(this.hp-amount, 0, this.hp);
        if(this.hp == 0){
            this.onDeath();
        }
    }

/*---------------------------------------------
    [onDeath]
    엔티티 사망
---------------------------------------------*/
    public abstract onDeath(): void;

    public getPos(): PosInfo{
        return this.pos;
    }

    public getId(): string{
        return this.pos.uuid;
    }

    public getPrefabId(): string{
        return this.prefabId;
    }
}