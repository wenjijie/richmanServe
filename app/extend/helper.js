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
};