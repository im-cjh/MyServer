import { GameRoom } from "./gameRoom";
import { Monster } from "../gameObjects/monster";
import { PosInfo, PosInfoSchema } from "src/protocol/struct_pb";
import { create } from "@bufbuild/protobuf";
import {v4 as uuidv4} from 'uuid'; 
import { assetManager } from "src/utils/assetManager";
import { AssetMonster } from "src/utils/interfaces/assetMonster";

export class MonsterSpawner  {
/*---------------------------------------------
    [멤버 변수]
---------------------------------------------*/
    private gameRoom: GameRoom;

    //this.spawnedMonster = 0; //생성된 몬스터 수는 gameRoom에서 가져오기
    private spawnedMonster: number = 0;
    private stageMonsters: number = 0; // 생성할 총 몬스터 수
    private spawnRate: number = 0; //몬스터 생성 간격
    //private spawnTimer: any; //NodeJS.Timeout
    private spawnTimer: NodeJS.Timeout | undefined; //NodeJS.Timeout
    

/*---------------------------------------------
    [생성자]
---------------------------------------------*/
    constructor(gameRoom: GameRoom) {
        this.gameRoom = gameRoom;
    }

/*---------------------------------------------
    [스폰 시작]
---------------------------------------------*/
startSpawning(stageId: number) {
    const stageInfo = assetManager.getStage(stageId);
    console.log(stageInfo, 'stageInfo', stageId);
    this.spawnedMonster = 0; //생성된 몬스터 수
    this.stageMonsters = stageInfo.stageMonsters; // 생성할 총 몬스터 수
    this.spawnRate = stageInfo.spawnRate; //몬스터 생성 간격

    this.spawnTimer = setInterval(() => {
      console.log('monsterLog: ', this.spawnedMonster, this.stageMonsters);
      if (this.spawnedMonster < this.stageMonsters) {
        this.spawnMonster(); //몬스터 생성
        this.spawnedMonster += 1;
      } else {
        this.stopSpawning();
      }
    }, this.spawnRate);
  }

/*---------------------------------------------
    [몬스터 스폰]
---------------------------------------------*/
    private spawnMonster(): void{
        if(this.gameRoom.getMonsterCount() >= this.stageMonsters){
            return;
        }

        const posInfo: PosInfo = create(PosInfoSchema, {
            uuid: uuidv4(),
            x: 10,
            y: 10
        });

        let randomAssetMonster: AssetMonster = assetManager.getRandomAssetMonster();
        const monster: Monster = new Monster(posInfo, randomAssetMonster.maxHp, randomAssetMonster.prefabId);
        this.gameRoom.addObject(monster);
    }

/*---------------------------------------------
    [stopSpawning]
---------------------------------------------*/
    stopSpawning() {
        this.spawnedMonster = 0;
        this.spawnedMonster = 0;
        clearInterval(this.spawnTimer);
      }
}
