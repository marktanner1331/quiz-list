export class List {
    keys: string[];
    
    constructor(private list: Object[]) {
        let first = list[0];
        this.keys = Object.keys(first);
    }

    count(): number {
        return this.list.length;
    }

    tryConvertToNumber(str: string) {
        let k = parseInt(str);
       
        if(/^\d+$/.test(str)) {
            return k;
        } else if(/^\d+ BCE$/.test(str)) {
            k = parseInt(str.replace(" BCE", ""));

            if(isNaN(k) == false) {
                return -k;
            }
        }

        return str;
    }

    get(orderBy: string, orderType: "ascending"|"descending"): Object[] {
        this.list.sort((a:any, b:any) => {
            let aValue:any = a[orderBy];
            let bValue:any = b[orderBy];
            
            if(typeof aValue === 'string') {
                aValue = this.tryConvertToNumber(aValue);
                bValue = this.tryConvertToNumber(bValue);
            }

            let compared: number;
            if(typeof aValue === 'string') {
                compared = (aValue as string).localeCompare(bValue);
            } else if(typeof aValue == 'number') {
                if (bValue === null) {
                    compared = -1;
                } else if(aValue < bValue) {
                    compared = -1;
                } else if(aValue == bValue) {
                    compared = 0;
                } else {
                    compared = 1;
                }
            } else if(aValue === null) {
                if(bValue === null) {
                    compared = 0;
                } else {
                    compared = 1;
                }
            } else {
                throw new Error();
            }

            if(orderType == "descending") {
                compared = -compared;
            }

            return compared;
        });

        return this.list;
    }
}