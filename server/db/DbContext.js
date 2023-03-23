import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BirdSchema } from '../models/Bird.js';
import { ValueSchema } from '../models/Value'
import { WatcherSchema } from '../models/Watcher.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Birds = mongoose.model('Bird', BirdSchema);

  Watchers = mongoose.model('Watcher', WatcherSchema);
}

export const dbContext = new DbContext()
