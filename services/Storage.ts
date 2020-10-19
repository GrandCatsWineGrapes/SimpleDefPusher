import DataStore from 'nedb';
import path from 'path';

interface IDefData {
    id?: string,
    name: string,
    def: string
}

export default class Worker {
    private _db: DataStore;
    constructor() {
        this._db = new DataStore({
            filename: path.join(__dirname, '../db/defs.db'),
            autoload: true
        })
    }

    public pushDef(data: IDefData): Promise<IDefData> {
        return new Promise((resolve, reject) => {
            this._db.insert(data, (err: Error|null, newDoc: IDefData) => {
                if (err) reject(err)
                else resolve(newDoc)
            })
        })
    }

    public getDefList(): Promise<IDefData[]> {
        return new Promise((resolve, reject) => {
            this._db.find({}, (err: Error, docs: IDefData[]) => {
                if (err) reject(err)
                resolve(docs);
            } )
        })
    }

    public getSingleDef(id: string): Promise<IDefData> {
        return new Promise((resolve, reject) => {
            this._db.findOne({_id: id}, (err: Error | null, doc : IDefData) => {
                if (err) reject(err)
                resolve(doc);
            })
        })
    }

    public updateDef(data: IDefData): Promise<string> {
        return new Promise((resolve, reject) => {
            this._db.update({_id: data.id}, data, {}, (err: Error|null) => {
                if (err) reject(err)
                resolve(data.id);
            })
        })
    }

    public deleteDef(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this._db.remove({_id: id}, {}, (err: Error|null) => {
                if (err) reject(err);
                resolve(id);
            })
        })
    }

    

}


