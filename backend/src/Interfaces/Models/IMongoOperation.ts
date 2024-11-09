import { ObjectId } from "mongoose";

export type MongoOperationResult = InsertResult | DeleteResult | UpdateResult | BulkWriteResult|Record<string,any>|null;

interface InsertResult {
  acknowledged: boolean;  
  insertedId: string | ObjectId; 
}

interface DeleteResult {
  acknowledged: boolean; 
  deletedCount: number;   
}

// Update operation result type
interface UpdateResult {
  acknowledged: boolean;  
  matchedCount: number;  
  modifiedCount: number; 
  upsertedId?: string | ObjectId; // The IDof the upserted document, if applicable
}

// Bulk Write operation result type
interface BulkWriteResult {
  acknowledged: boolean;    // Whether the bulk operation was acknowledged
  insertedCount: number;    // The number of documents inserted in bulk
  matchedCount: number;     // The number of documents matched in bulk
  modifiedCount: number;    // The number of documents modified in bulk
  deletedCount: number;     // The number of documents deleted in bulk
  upsertedCount: number;    // The number of upserted documents
  upsertedIds: Record<string, ObjectId>; // A record of upserted document IDs
}