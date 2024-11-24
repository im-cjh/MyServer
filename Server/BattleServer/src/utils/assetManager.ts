import { Utils } from "ServerCore/utils/Utils";
import { AssetStage } from "./interfaces/assetStage";
import { AssetMonster } from "./interfaces/assetMonster";
import { ParseUtils } from "./parseUtils";


/*---------------------------------------------
    [ServerAssetManager]

  -목적: game asset을 중앙에서 관리하기 위함
  -장점: 유지 보수 용이
---------------------------------------------*/
class AssetManager{
    //private towers: Array<assetMonster>;
    private monsters: Array<AssetMonster>;
    private stages: Array<AssetStage>;

    constructor(){
//        this.towers = new Array();
        this.monsters = new Array();
        this.stages = new Array();
    }


/*---------------------------------------------
    [게임 에셋 불러오기]
---------------------------------------------*/
    async loadGameAssets(){
        try {
            const [monsters, stages] = await Promise.all([
                //Utils.readFileAsync("tower.json"),
                ParseUtils.readFileAsync("monsters.json"),
                ParseUtils.readFileAsync("stages.json")
            ]);
            
            //타워 자원 로드
            //this.towers = towers;
            //몬스터자원 로드
            this.monsters = monsters.data;
            //스테이지 자원 로드
            this.stages = stages.data;

            return {monsters: this.monsters};  
            //return {towers: this.towers, monsters: this.monsters};  
        } catch (error) {
            console.log(error);
            throw new Error("Faild to load game assets: ");
        }
    }

/*---------------------------------------------
    [getGameAssets]
    -클라 접속 시 전달하기 위함
---------------------------------------------*/
    getGameAssets(){
        return {monsters: this.monsters, stages: this.stages};  
        //return {towers: this.towers, monsters: this.monsters, stages: this.stages};  
    }

    getStages(){
      return this.stages;
    }

/*---------------------------------------------
    [getter]
---------------------------------------------*/
    getStage(stageId: number){
      return this.stages[stageId] || null;
    }

/*---------------------------------------------
    [getStageMonsters]
    - 해당 스테이지에서 생성해야되는 몬스터 수
---------------------------------------------*/
    getStageMonsters(stageId: number){
      return this.stages[stageId].stageMonsters || null;
    }

    getRandomAssetMonster(): AssetMonster{
        const monsterId = Math.floor(Math.random() * this.monsters.length);
        return this.monsters[monsterId];
    }

}

export const assetManager = new AssetManager();
