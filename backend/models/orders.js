const {Schema,model}=require('mongoose')
const OrderSchema=new Schema({
  userId:{
    required:true,
    type:Schema.Types.ObjectId,
    ref:"AlexCustomers" || "CairoCustomers",
  },
  orderProducts:[{
    productId: {
      reqiured: true,
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    quantity: { reqiured: true, type: Number },

  }]
},{timestamps:true})
module.exports=model('Orders',OrderSchema)