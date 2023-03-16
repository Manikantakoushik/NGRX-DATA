import { EntityDataModuleConfig } from "@ngrx/data";
import { EntityMetadataMap } from "@ngrx/data";

export const entityMetadata: EntityMetadataMap={
    Post:{
        entityDispatcherOptions:{
            optimisticUpdate:true,
            optimisticDelete:false,
        }
    }    
}

export const entityConfig:EntityDataModuleConfig={
    entityMetadata,
}

