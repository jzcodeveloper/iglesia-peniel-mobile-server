const mongoose = require("mongoose");

const advancedResults = () => async (req, res, next) => {
  let query = null;

  // Get model
  const model = mongoose.model(req.query.model);

  // Copy req.query
  const queryObj = { ...req.query };

  // Fields to exclude
  const removeFields = ["model", "populate", "select", "sort", "page", "limit"];

  // Remove fields from query
  removeFields.forEach((param) => delete queryObj[param]);

  // Stringify the query
  let queryStr = JSON.stringify(queryObj);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Parse the query
  queryStr = JSON.parse(queryStr);

  for (const key in queryStr) {
    // Discard the operators
    if (queryStr[key].startsWith("$")) continue;

    if (!mongoose.Types.ObjectId.isValid(queryStr[key]))
      // Create regular expression with the i flag
      queryStr[key] = new RegExp(queryStr[key], "i");
  }

  // Finding resource
  query = model.find(queryStr);

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-created");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Populate
  if (req.query.populate) {
    // eg fields,permissions.role
    const fields = req.query.populate.split(",");

    const populations = fields.reduce((acc, val, idx) => {
      // eg permissions.role
      const subfields = val.split(".");
      // one depth population
      if (subfields.length === 1) {
        acc.push({ path: subfields[0] });
      } else if (subfields.length === 2) {
        acc.push({ path: subfields[0], populate: { path: subfields[1] } });
      }
      return acc;
    }, []);

    query = query.populate(populations);

    /**
      "fields,permissions.role"
      ["fields", "permissions.role"]
      [0] = fields => ({ path: "field" })
      [1] = permissions.role => ({ path: "permissions", populate: { path: "role" }})
     */
  }

  // Execute query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    data: { total, page, results, pagination },
  };

  next();
};

module.exports = advancedResults;
