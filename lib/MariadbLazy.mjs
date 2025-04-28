import LazyOrmWrapper, {LazyOrmQuery, LazyOrmProperties, LazyOrmFilter, LazyOrmWhere} from './InitDynamicLibrary.mjs'
import NestedWhere from "../lib/NestedWhere.mjs";

const mariadbLazyFinalizer = new FinalizationRegistry((pointer) => {
    if (pointer) {
        LazyOrmWrapper.MariadbLazy_destroy(pointer);
    }
  });

class MariadbLazy {

    setPropertyByType(cppPointer, key, val) {
  
        if (val === null || val === undefined) {
            LazyOrmWrapper.MariadbLazy_setProperty_null(cppPointer, key);
        } else if (typeof val === "boolean") {
            LazyOrmWrapper.MariadbLazy_setProperty_bool(cppPointer, key, val);
        } else if (typeof val === "number") {
          if (Number.isInteger(val)) {
            if (val >= 0 && val <= 0xFFFFFFFF) {
              // UInt32
              LazyOrmWrapper.MariadbLazy_setProperty_ull(cppPointer, key, val);
            } else {
              // Int64
              LazyOrmWrapper.MariadbLazy_setProperty_ll(cppPointer, key, val);
            }
          } else {
            // Double
            LazyOrmWrapper.MariadbLazy_setProperty_double(cppPointer, key, val);
          }
        } else if (typeof val === "string") {
            // String
            LazyOrmWrapper.MariadbLazy_setProperty_string(cppPointer, key, val);
        } else {
            LazyOrmWrapper.MariadbLazy_setProperty(cppPointer, key);
        }
    }

    setFilterByType(cppPointer, key, val) {
  
        if (val === null || val === undefined) {
        //   LazyOrmWrapper.MariadbLazy_setFiltering_null(cppPointer, key);
        } else if (typeof val === "boolean") {
            LazyOrmWrapper.MariadbLazy_setFiltering_bool(cppPointer, key, val);
        } else if (typeof val === "number") {
          if (Number.isInteger(val)) {
            if (val >= 0 && val <= 0xFFFFFFFF) {
              // UInt32
              LazyOrmWrapper.MariadbLazy_setFiltering_ull(cppPointer, key, val);
            } else {
              // Int64
              LazyOrmWrapper.MariadbLazy_setFiltering_ll(cppPointer, key, val);
            }
          } else {
            // Double
            LazyOrmWrapper.MariadbLazy_setFiltering_double(cppPointer, key, val);
          }
        } else if (typeof val === "string") {
            // String
            LazyOrmWrapper.MariadbLazy_setFiltering_string(cppPointer, key, val);
        } else {
        //   LazyOrmWrapper.MariadbLazy_setFiltering(cppPointer, key);
        }
    }

    constructor() {
        this._MariadbLazy = LazyOrmWrapper.MariadbLazy_create();
        mariadbLazyFinalizer.register(this, this._MariadbLazy);


        return new Proxy(this, {
            get(target, prop){
                if(prop in LazyOrmQuery){
                    return LazyOrmWrapper.MariadbLazy_getTabeName(target._MariadbLazy);;
                }

                if (prop in target) {
                    return target[prop];
                }

                throw new Error(`Invalid key: ${prop}`);
            },
            set(target, prop, value){
                // console.log("set",prop,value, typeof value);
                
                if(prop in LazyOrmQuery){
                    LazyOrmWrapper.MariadbLazy_setQueryTypeStr(target._MariadbLazy, prop);
                    LazyOrmWrapper.MariadbLazy_setTabeName(target._MariadbLazy, value);
                    return true;
                }

                if(prop in LazyOrmFilter){
                    target.setFilters(prop, value);
                    return true;
                }

                if(prop in LazyOrmWhere){
                    target.setNestedWheres(value);
                    return true;
                }

                if(prop=="<<"){
                    target.setProperties(value);
                    return true;
                }
                
                if (prop in target) {
                    target[prop] = value;
                    return true;
                }
                // throw new Error(`Invalid key: ${prop}`);
            }
        });
    }

    destroy() {
        if (this._MariadbLazy) {
            LazyOrmWrapper.MariadbLazy_destroy(this._MariadbLazy);
            this._MariadbLazy = null;
        }
    }

    setProperties(values){
        if(typeof values === 'object'){
            if(Array.isArray(values)){
                for(const v of values){
                    if((typeof v === "string")){
                        LazyOrmWrapper.MariadbLazy_setProperty(this._MariadbLazy, v);
                    }
                }
            }
            else {
                for(const key in values){
                    sendToLazyOrmCpp(this._MariadbLazy, key, values[key]);
                }
            }
        }
    }

    setFilters(keyType, values){
        if(typeof values === 'object'){
            if(Array.isArray(values)){
                for(const v of values){
                    this.setFilterByType(this._MariadbLazy, keyType, v);
                }
            }
        }
    }

    setNestedWheres(nestedWheres){
        let parsedStructure = NestedWhere.parse(nestedWheres);
        parsedStructure.joinNesteds();
        LazyOrmWrapper.MariadbLazy_setWhereFilter(this._MariadbLazy, parsedStructure._NativeWhereFilter);
    }

    

    queryString(){
        return LazyOrmWrapper.MariadbLazy_queryString(this._MariadbLazy);
    }

}


export default MariadbLazy;