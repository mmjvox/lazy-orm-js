import { dlopen } from "@xan105/ffi/koffi";

class DynamicLazyOrmLibrary{
    
    static instance = null;

    constructor() {
        if (DynamicLazyOrmLibrary.instance) {
        }
        console.log("InitDynamicLibrary created.");
        

        this.LazyOrm = dlopen("/home/mmjvox/projects/lazy-orm-wrapper/build/liblazy-orm-wrapper", {
            myFunction: {
              result: "int",
              parameters: [ "int","int" ]
            },
            libVersion: {
              result: "string",
              parameters: []
            },
            wrapperVersion: {
              result: "string",
              parameters: []
            },
            freeString: {
              result: "void",
              parameters: [ "string" ]
            },
            MariadbLazy_create: {
              result: "pointer",
              parameters: []
            },
            MariadbLazy_destroy: {
              result: "void",
              parameters: ["pointer"]
            },
            MariadbLazy_setTabeName: {
              result: "void",
              parameters: ["pointer", "string"]
            },
            MariadbLazy_getTabeName: {
              result: "string",
              parameters: ["pointer"]
            },
            MariadbLazy_setQueryType: {
              result: "void",
              parameters: ["pointer", "int"]
            },
            MariadbLazy_setQueryTypeStr: {
              result: "void",
              parameters: ["pointer", "string"]
            },
            MariadbLazy_setProperty: {
              result: "void",
              parameters: ["pointer", "string"]
            },
            MariadbLazy_setProperty_null: {
              result: "void",
              parameters: ["pointer", "string"]
            },
            MariadbLazy_setProperty_bool: {
              result: "void",
              parameters: ["pointer", "string", "bool"]
            },
            MariadbLazy_setProperty_string: {
              result: "void",
              parameters: ["pointer", "string", "string"]
            },
            MariadbLazy_setProperty_ull: {
              result: "void",
              parameters: ["pointer", "string", "ulonglong"]
            },
            MariadbLazy_setProperty_ll: {
              result: "void",
              parameters: ["pointer", "string", "longlong"]
            },
            MariadbLazy_setProperty_double: {
              result: "void",
              parameters: ["pointer", "string", "double"]
            },
            // MariadbLazy_setProperty_ld: {
            //   result: "void",
            //   parameters: ["pointer", "string", "double"]
            // },
            MariadbLazy_setFiltering_bool: {
              result: "void",
              parameters: ["pointer", "string", "bool"]
            },
            MariadbLazy_setFiltering_string: {
              result: "void",
              parameters: ["pointer", "string", "string"]
            },
            MariadbLazy_setFiltering_ull: {
              result: "void",
              parameters: ["pointer", "string", "ulonglong"]
            },
            MariadbLazy_setFiltering_ll: {
              result: "void",
              parameters: ["pointer", "string", "longlong"]
            },
            MariadbLazy_setFiltering_double: {
              result: "void",
              parameters: ["pointer", "string", "double"]
            },
            // MariadbLazy_setFiltering_ld: {
            //   result: "void",
            //   parameters: ["pointer", "string", "double"]
            // },
            doubleSend: {
              result: "double",
              parameters: ["double"]
            },
            int64Send: {
              result: "longlong",
              parameters: ["longlong"]
            },
            MariadbLazy_queryString: {
              result: "string",
              parameters: ["pointer"]
            }
          });

      }
    

    static getInstance() {
      if (!DynamicLazyOrmLibrary.instance) {
        DynamicLazyOrmLibrary.instance = new DynamicLazyOrmLibrary();
      }
      return DynamicLazyOrmLibrary.instance;
    }


    getLazyOrmWrapper(){
        return this.LazyOrm;
    }


}

const LazyOrmWrapper = DynamicLazyOrmLibrary.getInstance().getLazyOrmWrapper();
export default LazyOrmWrapper;

export const LazyOrmProperties = "properties";

export const LazyOrmFilter = {
    None : "None",
    ORDERBY: "ORDERBY",
    LIMIT: "LIMIT",
    HAVING: "HAVING",
    GROUPBY: "GROUPBY"
};

export const LazyOrmWhere = {
    NNone : "NNone",
    WHERE : "WHERE",
    AND : "AND",
    OR : "OR",
    NOT : "NOT"
};

export const LazyOrmQuery = {
  UNDEFINED : "UNDEFINED",
  INIT      : "INIT",
  INSERT    : "INSERT",
  SELECT    : "SELECT",
  UPDATE    : "UPDATE",
  DELETE    : "DELETE",
  INSERT_UPDATE: "INSERT_UPDATE",
  BULK_INSERT: "BULK_INSERT",
  INSERT_IGNORE: "INSERT_IGNORE",
  BULK_UPDATE  : "BULK_UPDATE"
  //TODO: BATCH_INSERT_UPDATE
};