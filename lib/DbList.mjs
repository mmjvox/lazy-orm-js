import LazyOrmWrapper from './InitDynamicLibrary.mjs'

const dbListFinalizer = new FinalizationRegistry((pointer) => {
    if (pointer) {
        LazyOrmWrapper.DbList_destroy(pointer);
    }
  });

export class DbVariantList{
    
    constructor(list){
        this._NativeDbList = LazyOrmWrapper.DbList_create();
        dbListFinalizer.register(this, this._NativeDbList);
        
        this.list = list;
        this.setNativeList();
    }

    setList(list){
        this.list = list;
        this.setNativeList();
    }

    setNativeList(){
        if(Array.isArray(this.list)){
            let nativeVector = LazyOrmWrapper.DbVariant_create_vector();
            for (const item of this.list) {
                let nativeValue = LazyOrmWrapper.DbVariant_create();
                this.setDbVariant(nativeValue, item);
                LazyOrmWrapper.DbVariant_vector_push(nativeVector, nativeValue);
                LazyOrmWrapper.DbVariant_destroy(nativeValue);
            }
            LazyOrmWrapper.DbList_setList(this._NativeDbList, nativeVector);
            LazyOrmWrapper.DbVariant_destroy_vector(nativeVector);
        }
    }

    setDbVariant(cppPointer, val) {
  
        if (val === null || val === undefined) {
            LazyOrmWrapper.DbVariant_set_null(cppPointer);
        } else if (typeof val === "boolean") {
            LazyOrmWrapper.DbVariant_set_bool(cppPointer, val);
        } else if (typeof val === "number") {
          if (Number.isInteger(val)) {
            if (val >= 0 && val <= 0xFFFFFFFF) {
              // UInt32
              LazyOrmWrapper.DbVariant_set_ull(cppPointer, val);
            } else {
              // Int64
              LazyOrmWrapper.DbVariant_set_ll(cppPointer, val);
            }
          } else {
            // Double
            LazyOrmWrapper.DbVariant_set_double(cppPointer, val);
          }
        } else if (typeof val === "string") {
            // String
            LazyOrmWrapper.DbVariant_set_string(cppPointer, val);
        } else {
            console.log("Ssssssssss",val)
            throw new Error("DbVariant val type not found.");
        }
    }
}

const DbList = (list) => new DbVariantList(list); 

export default DbList;