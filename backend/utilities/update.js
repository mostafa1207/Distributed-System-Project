const { deleteUser } = require("./delete");
const { findProduct } = require("./find");
const { createUserWithId } = require("./create");

// 662d89276ff715beaa82fa1b
// 662d89276ff715beaa82fa1b
updateUser = async function (req, user) {
  const { username, password, email, cart } = user;
  const { city } = req.body;
  const { userId, userType } = req;
  const updatedUser = await createUserWithId(
    {
      _id: user._id,
      username,
      email,
      city,
      userType,
      cart,
    },
    password
  );
  await deleteUser(userId, city, userType);
  //await user.remove();
  return updatedUser;
};

updateCart = async function (req, user) {
  const { productId, quantity } = req.body;
  const product = user.cart.find(
    (item) => item.productId.toString() === productId
  );

  if (!product) {
    user.cart.push({
      productId: productId,
      quantity: quantity,
    });
  } else {
    product.quantity += Number(quantity);
  }
  await user.save();
};

// updateQuantity = async function (req) {
//   const { productId, quantity } = req.body;

//   const product = await findProduct(productId);
//   product.availableQuantity -= quantity;
//   await product.save();
// };

module.exports = {
  updateUser,
  updateCart,
  //updateQuantity,
};
