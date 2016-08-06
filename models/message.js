'use strict';

module.exports = (mongoose, models) => {
  let Schema = mongoose.Schema;
  let messageSchema = mongoose.Schema({
    text: String,
    date: Date
  });

  let Message = mongoose.model('Message', messageSchema);
  models.Message = Message;
};
