export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    {
      this.mongooseQuery = mongooseQuery;
      this.queryString = queryString;
    }
  }
  paginate() {
    const PAGE_LIMIT = 25;
    let page = this.queryString.page * 1 || 1;
    if (page < 1) page = 1;
    const skip = (page - 1) * PAGE_LIMIT;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(PAGE_LIMIT);
    return this;
  }
  filter() {
    let filterObj = { ...this.queryString };
    let excludedQuery = ["page", "sort", "fields", "keyword"];
    excludedQuery.forEach((elm) => {
      delete filterObj[elm];
    });
    //advanced filter like price[gt]=100
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/\b(gt|gte|lte|lt)\b/g,(match) => `$${match}`);
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      let newSort = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(newSort);
    }
    return this;
  }
  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }
  selectFields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
} 