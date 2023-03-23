import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const WatcherSchema = new Schema({
    birdId: { type: Schema.Types.ObjectId, required: true, ref: 'Bird' },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
    { timestamps: true, toJSON: { virtuals: true } }
)

WatcherSchema.virtual('watcher', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

// ANCHOR this says I can only create a watcher once
// ANCHOR I cannot watch the same bird more than once
WatcherSchema.index({ birdId: 1, accountId: 1 }, { unique: true })