import MessageModel from "../../model/MessageModel";

export const getMessageView = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await MessageModel.find({
      userId: ObjectId(req.id),
      friendId: ObjectId(id),
      status: "friend",
    });

    await res.send({
      message,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const postMessageView = async (req, res) => {
  try {
    const id = req.params.id;
    const message1 = new MessageModel.create({
      userId: req.id,
      friendId: id,
      message: req.body.message,
    });

    await message1.save();

    const message2 = new MessageModel.create({
      userId: id,
      friendId: req.id,
      message: req.body.message,
    });
    await message2.save();

    await res.status(200).json({
      msg: "message  is Created successfully!",
      message1,
      message2,
    });
  } catch (err) {
    await res.send(err);
  }
};
