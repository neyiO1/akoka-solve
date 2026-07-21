import { Schema, Document, model } from 'mongoose';

export interface OfflineAction {
  action: string;
  payload: any;
  timestamp: Date;
}

export interface UserProfileDocument extends Document {
  userId: string;
  preferences: Record<string, any>;
  learningHistory: Array<Record<string, any>>;
  offlineQueue: OfflineAction[];
  lastSyncedAt: Date;
}

export const UserProfileSchema = new Schema<UserProfileDocument>({
  userId: { type: String, required: true, index: true }, // Ref to Postgres User ID
  preferences: { type: Schema.Types.Mixed, default: {} },
  learningHistory: { type: [Schema.Types.Mixed], default: [] },
  offlineQueue: [
    {
      action: { type: String, required: true },
      payload: { type: Schema.Types.Mixed },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  lastSyncedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const UserProfileModel = model<UserProfileDocument>('UserProfile', UserProfileSchema);
