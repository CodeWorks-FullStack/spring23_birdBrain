import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const BirdSchema = new Schema({
    name: { type: String, required: true, minLength: 3 },
    imgUrl: { type: String, required: true },
    species: { type: String, enum: ['pigeon', 'seagull', 'crow', 'goose', 'raptor', 'party-fowler'], default: 'party-fowler', required: true },
    isReal: { type: Boolean, default: false },
    location: { type: String, required: true },
    informantId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
    { timestamps: true, toJSON: { virtuals: true } }
)

BirdSchema.virtual('informant', {
    localField: 'informantId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

BirdSchema.virtual('watcherCount', {
    localField: '_id',
    ref: 'Watcher',
    foreignField: 'birdId',
    count: true
})