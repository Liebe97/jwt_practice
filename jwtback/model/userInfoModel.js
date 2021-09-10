import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userinfoSchema = new Schema({
  id: {
    type: String
  },
  password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const UserInfo = mongoose.model('UserInfo', userinfoSchema)

export default UserInfo;