import { globalHandleError } from "../middleware/globalErrorMiddleware.js";
import authRouter from "../modules/authentication/auth.routes.js";
import brandRoutes from "../modules/brand/brand.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import couponRoutes from "../modules/coupon/coupon.routes.js";
import logoutRouter from "../modules/logout/logout.routes.js";
import orderRouter from "../modules/order/order.routes.js";
import productRoutes from "../modules/product/product.routes.js";
import reviewRoutes from "../modules/review/review.routes.js";
import subCategoryRoutes from "../modules/subCategory/subCategory.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import { AppError } from "./AppError.js";
 const bootstrap = (app) => {
app.set('query parser', 'extended');//to allow nested query like price[gt]=100

  app.use("/api/v1/categories", categoryRoutes);
  app.use("/api/v1/subcategories", subCategoryRoutes);
  app.use("/api/v1/brands", brandRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/users",authRouter);
  app.use("/api/v1/reviews",reviewRoutes);
  app.use("/api/v1/cart",cartRouter);
  app.use("/api/v1/coupons",couponRoutes);
  app.use("/api/v1/orders",orderRouter);
  app.use("/api/v1/logout",logoutRouter);

  app.use((req,res,next)=>{
    // res.json({message:`invalid Url`})
    next(new AppError(`invalid Url ${req.originalUrl}`,404))
})

app.use(globalHandleError)
//handel error outside express
app.use('unhandledRejection',(err)=>{
    console.log(`error outside express ${err.message}`);

})
};

export default bootstrap
