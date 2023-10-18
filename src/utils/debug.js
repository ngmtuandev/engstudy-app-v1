import AsyncStorage from '@react-native-async-storage/async-storage';

const DEBUG_DATA = 'debug_data';
export const debug_store_key = async (key, value) => {
    try {
        let debug_data = await getDebugData();
        // console.log('debug_store_key - debug_data', debug_data);
        if(debug_data === null){
            debug_data = {};
        }
        debug_data[key] = value;
        debug_data_obj = debug_data;
        console.log('debug_store_key - debug_data', debug_data);
        await storeData(DEBUG_DATA, debug_data);
    } catch (err) {
        console.log('debug_store_key - err', err);
    }
}

export const debug_get_key = async (key) => {
    try {
        let return_vale = null;
        const debug_data = await getDebugData();
        // console.log('debug_get_key - debug_data', debug_data);
        if(debug_data !== null){
            if (typeof debug_data[key] !== "undefined") {
                return_vale = debug_data[key];
            }
        }
       return return_vale;
    } catch (e) {
        // saving error
    }
}
export const debug_clear = async () => {
    try {
        debug_data_obj = null; // Reset 
        return AsyncStorage.removeItem(DEBUG_DATA);
    } catch (e) {
        // saving error
    }
}

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        // console.log('storeData - jsonValue', jsonValue);
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

const getData = async (key) => {
    let return_vale = null;
    try {
        const value = await AsyncStorage.getItem(key);
        // console.log('getData - value', value);
        let obj;
        if(value){
            obj = parseJSON(value);
        }
        if(obj){
            return_vale = obj;
        }
    } catch(e) {
        // error reading value
    }

    // console.log('getData - return_vale', return_vale);
    return return_vale;
}

let debug_data_obj = null;
const getDebugData = async () => {
    try {
        let obj;
        // console.log('getDebugData - debug_data_obj', debug_data_obj);
        if(debug_data_obj !== null){
            obj = debug_data_obj;
        } else {
            obj = await getData(DEBUG_DATA);
            // console.log('getDebugData - obj', obj);
        }

        return obj;
    } catch(e) {
        // error reading value
    }
}