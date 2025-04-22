const pool = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const completeOrder = async (req, res, next) => {
  try {
    const { OrderDetail_ID } = req.params;
    const { CompleteDetail } = req.body;
    const CompletePhoto = req.file ? req.file.filename : null;

    const result = await pool
      .request()
      .input("CompleteDetail", CompleteDetail)
      .input("CompletePhoto", CompletePhoto)
      .input("OrderDetail_ID", OrderDetail_ID)
      .query(`
        UPDATE OrderDetail
        SET CompleteDetail = @CompleteDetail,
            CompletePhoto = @CompletePhoto
        WHERE OrderDetail_ID = @OrderDetail_ID
      `);

    res.status(200).json({ message: "Order marked as completed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { completeOrder };
