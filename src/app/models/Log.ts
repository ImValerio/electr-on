import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const log = new Schema({
    date: {
        type: String,
        required: true,
    },

},{collection: 'log'});

// mongoose.models = {};
 export default mongoose.models.Log ?? mongoose.model('Log', log);
 
