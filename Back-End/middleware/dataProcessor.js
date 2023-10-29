function filterAndPaginate(model) {
  return async (req, res, next) => {
    const { page, limit, ...filters } = req.query;
    const result = await model.find(filters);
    console.log(result);
    const pageNum = parseInt(page || 1);
    const limitData = parseInt(limit || 2);
    //to send prev and next page in response
    const startIndex = (pageNum - 1) * limitData;
    const endIndex = pageNum * limitData;
    const results = {};
    console.log(result.length);
    // if (endIndex < result.length) {
    //   results.next = {
    //     page: pageNum + 1, //next page number
    //     limit: limitData,
    //   };
    // }
    // if (startIndex > 0) {
    //   results.previous = {
    //     page: pageNum - 1, //previous page number
    //     limit: limitData,
    //   };
    // }
    try {
      //fetching data
      results.results = result.slice(startIndex, endIndex);
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

function paginate(model) {
  return async (req, res, next) => {
    //paginate
    const pageNum = parseInt(req.query.page || 1);
    const limitData = parseInt(req.query.limit || 2);
    //to send prev and next page in response
    const startIndex = (pageNum - 1) * limitData;
    const endIndex = pageNum * limitData;
    const results = {};
    // if (endIndex < (await model.countDocuments().exec())) {
    //   results.next = {
    //     page: pageNum + 1, //next page number
    //     limit: limitData,
    //   };
    // }
    // if (startIndex > 0) {
    //   results.previous = {
    //     page: pageNum - 1, //previous page number
    //     limit: limitData,
    //   };
    // }
    try {
      //fetching data
      results.results = await model
        .find()
        .limit(limitData)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = { paginate, filterAndPaginate };
