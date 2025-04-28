import {DbVariantList} from './DbList.mjs';
import LazyOrmWrapper from './InitDynamicLibrary.mjs'

const nestedWhereFinalizer = new FinalizationRegistry((pointer) => {
    if (pointer) {
        LazyOrmWrapper.WhereFilter_destroy(pointer);
    }
  });

class NestedWhere {
    constructor(value) {
        this._NativeWhereFilter = LazyOrmWrapper.WhereFilter_create();
        nestedWhereFinalizer.register(this, this._NativeWhereFilter);
        
        this.value = value;
        this.nested = [];
        
    }

    static parse(nestedArray) {
        const root = new NestedWhere();

        let nativeVector = LazyOrmWrapper.DbVariant_create_vector();

        for (const item of nestedArray) {
            if (Array.isArray(item)) {
                root.nested.push(NestedWhere.parse(item));
            } else {

                if(item instanceof DbVariantList){
                    const nativeValue = item._NativeDbList;
                    LazyOrmWrapper.DbVariant_vector_push(nativeVector, nativeValue);
                } else {
                    let nativeValue = LazyOrmWrapper.DbVariant_create();
                    root.setDbVariant(nativeValue, item);
                    LazyOrmWrapper.DbVariant_vector_push(nativeVector, nativeValue);
                    LazyOrmWrapper.DbVariant_destroy(nativeValue);
                }

                if (!root.value){
                    root.value = item;
                    console.log(item)
                } 
                else {
                    root.nested.push(new NestedWhere(item));
                } 
            }
        }

        LazyOrmWrapper.WhereFilter_addVarinatVector(root._NativeWhereFilter, nativeVector);
        LazyOrmWrapper.DbVariant_destroy_vector(nativeVector);
        
        return root;
    }

    joinNesteds(){

        if(this.value!==undefined)
        {
            // console.log("this.value", this.value);
            return this._NativeWhereFilter
        }

        for(let nestedWhere of this.nested){
            let retWhere = nestedWhere.joinNesteds();
            LazyOrmWrapper.WhereFilter_addWhereFilter(this._NativeWhereFilter, retWhere);
            // LazyOrmWrapper.WhereFilter_destroy(retWhere);
        }

        // console.log(this.nested)

        return this._NativeWhereFilter
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

export default NestedWhere;