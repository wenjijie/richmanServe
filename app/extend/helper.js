module.exports = {
    /**
     * 判断数据是否为空
     * @param {*} data 
     */
    isEmpty(data) {
        if(data === undefined || data === null || data === false || data === '' || data.toString() === 'NaN' || JSON.stringify(data) == '{}' || JSON.stringify(data) == '[]'){
            return true;  
        }
        return false;
    },

    /**
     * 获取数据的效验码（16位CRC码，2个字节）
     * @param {String} data 
     */
    getCrc(data){
        const POLY = 0xa001;
        let   crc  = 0xffff;

        if(typeof data === 'number'){
            data = data.toString(16);
        }
    
        // console.log('data: ', data);
        for(let i = 0; i < parseInt(data.length/2); i++){
            crc = crc ^ parseInt(data.substr(i*2, 2), 16);
            for(let j = 0; j<8; j++){
                if(crc & 0x0001)
                    crc = (crc>>1)^POLY;
                else
                    crc >>= 1;
            }
        }
    
        return this.fillZero(crc%256*256+parseInt(crc/256), 4);
    },

    /**
     * 对数据根据CRC校验码进行校验，判断是否可用
     * @param {String} data 
     */
    verifyCrc(data) {
        let crc       = data.substr(data.length-4);
        let verifyCrc = this.getCrc(data.substr(0, data.length-4));
        // console.log('crc: ', crc);
        // console.log('verifyCrc: ', verifyCrc.toString(16));

        return crc === verifyCrc.toString(16) ? true: false;
    },

    /**
     * 自动补0
     * @param {string} data 
     * @param {number} length 
     */
    fillZero(data, length) {
        let result = data.toString(16);

        if (result.length === length) {
            return result;
        } else if (result.length < length) {
            const sub = length - result.length;
            for (let i = 0; i < sub; i++) {
                result = '0' + result;
            }
            return result;
        } else {
            return -1;
        }
    },

    /**
     * 判断tar数组相对src数组新增和删除的元素
     * 元素类型需为字符串或数字等基本类型
     * @param {array} src 基础数组
     * @param {array} tar 要判断数组
     */
    compareArray(src, tar){

        //存放tar相对src添加的元素
        let add = [];
        //存放tar相对src删除的元素
        let deletes = [];
    
        let maxList = src;
        let minList = tar;
    
        // 以长度小的数组为基础运算，减少运算次数
        let flag = true;
        if(tar.length > src.length) {
            maxList = tar;
            minList = src;
            flag = false;
        }
    
        let map = new Map();
        for (let string of maxList) {
            map.set(string, 1);
        }
        for (let string of minList) {
    
            if(map.get(string) != undefined) {
                map.set(string, 2);
                continue;
            }
            add.push(string);
        }
        for(let [key, value] of map){
            if(value == 1) {
                deletes.push(key);
            }
        }
        let result = {};
        if (flag){
            result.add = add;
            result.delete = deletes;
        }else {
            result.add = deletes;
            result.delete = add;
        }
    
        return result;
    }
};