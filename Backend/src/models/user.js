import mongoose from 'mongoose';
import { Password } from '../services/password';

// The role can be either 'admin' or 'user'
const Role = {
    buyer: 141206,
    seller: 141207,
    admin: 141208,
  }

// An interface that describes the properties
// that are requried to create a new User

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    hst: {
      type: Number,
      default: Role.buyer
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs) => {
  return new User(attrs);
};

const User = mongoose.model('User', userSchema);

export { User };
