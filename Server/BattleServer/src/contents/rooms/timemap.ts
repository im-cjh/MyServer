import { Vec2 } from "src/protocol/struct_pb";

export enum Tile{
    value = 0,
    Base = 1,
    Tower = 2,
};

export class Tilemap {
/*---------------------------------------------
  [멤버 변수]
---------------------------------------------*/
    // private mapSize: Vec2;
    // private tileSize: number;
    // private tiles: Array<Array<Tile>>;

/*---------------------------------------------
  [멤버 변수]
---------------------------------------------*/
 constructor(){

 }  
 
 public LoadFile(path: string): void{

 }

 public GetTile(pos: Vec2){
    // if (pos.x < 0 || pos.x >= this.mapSize.x || pos.y < 0 || pos.y >= this.mapSize.y)
	// 	return null;

	// return this.tiles[pos.y][pos.x];
 }
}