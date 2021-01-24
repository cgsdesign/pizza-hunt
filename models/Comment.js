const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      replyBody: {
        type: String,
        required: 'You need a reply!',
        trim: true
      },
      writtenBy: {
        type: String,
        required: 'You need an Author!',
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );


  const CommentSchema = new Schema(
    {
      writtenBy: {
        type: String,
        required: 'You need an author!',
        trim: true
      },
      commentBody: {
        type: String,
        required: 'You nmissed the comment!',
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      // use ReplySchema to validate data for a reply
      replies: [ReplySchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

  CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
  });



const Comment = model('Comment', CommentSchema);

module.exports = Comment;