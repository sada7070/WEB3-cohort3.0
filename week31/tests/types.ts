import * as borsh from "borsh";

export class CounterAccount {
    count: number;

    constructor({count}: {count:number}) {
        this.count = count;
    }
}

export const schema: borsh.Schema = {                  // schema to represent how rust variables look like
    struct: {
        count: 'u32',
    }
}

export const COUNTER_SIZE = borsh.serialize(schema, new CounterAccount({count: 0})).length;         // calculating size required to create data account 