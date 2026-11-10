import slugify from "slugify";
import { AppError } from "../utilities/AppError.js";
import { catchError } from "../utilities/catchError.js";
import { ApiFeatures } from "../utilities/ApiFeatures.js";

const deleteOne = (model, name) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    let response = {};
    response[name] = document;
    if (document)
      return res.status(201).json({ message: "success", ...response });

    next(new AppError(`${name} not found`, 404));
  });
};

const updateItem = (model, name, nameSlug = "name") => {
  return catchError(async (req, res, next) => {
    if (req.body[nameSlug])  req.body.slug = slugify(req.body[nameSlug])
    let newDocument = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    let response = {};
    response[name] = newDocument;
    if (newDocument)
      return res.status(201).json({ message: "success", ...response });
    next(new AppError(`${name} not found`, 404));
  });
};

const getItems = (model, IdParams) => {
  return catchError(async (req, res, next) => {
    let filter = {};
    if (req.params[IdParams]) filter[IdParams] = req.params[IdParams];
    let apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .filter()
      .sort()
      .selectFields()
      .paginate()
      .search();
     if (model.modelName === "Order") {
      apiFeatures.mongooseQuery =
        apiFeatures.mongooseQuery.populate("orderItems.productId",
          "title imageCover price priceAfterDiscount"
        );
    }
    let results = await apiFeatures.mongooseQuery;
    let page = apiFeatures.queryString.page || 1;
    res.json({ page, message: "success", results });
  });
};

const getOne = (model, name) => {
  return catchError(async (req, res, next) => {
    let result = await model.findById(req.params.id);
    let response = {};
    response[name] = result;
    if (!result) return next(new AppError(`${name} not found`, 404));
    res.json({ message: "success", ...response });
  });
};

const createOne = async (model, body) => {
  const doc = new model(body);
  await doc.save();
  return doc;
};
export { deleteOne, updateItem, getItems, getOne, createOne };
