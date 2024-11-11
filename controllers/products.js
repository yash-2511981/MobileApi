const product = require("../models/product")

const getAllProducts = async (req, res) => {
    const { company, name, featured, sort, select } = req.query
    const queryObject = {}

    if (company) {
        queryObject.company = { $regex: company, $options: "i" };
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    if (featured) {
        queryObject.featured = featured;
    }

    let apiData = product.find(queryObject);

    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    //adding pagination into api
    let page = req.query.page || 1 //taking the page no bydefault 1
    let limit = req.query.limit || 5 //taking the limit bydefault 10

    let skip = (page - 1) * limit //setting the limit for how many item should be skip according to page no

    apiData=apiData.skip(skip).limit(limit); //displaying the product

    const Products = await apiData;
    res.status(200).json({ Products });
}

//for testing purpose
const getAllProductsTesting = async (req, res) => {
    //setting the parameters if user enters query
    const { company, name, featured, sort, select } = req.query
    //bydefault all products will be displayed
    const queryObject = {}

    //searching
    if (company) {
        queryObject.company = { $regex: company, $options: "i" };
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }
    if (featured) {
        queryObject.featured = featured;
    }

    let apiData = product.find(queryObject);

    //sorting according to user instruction
    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    //if user wants to see selected fields
    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    //adding the pagination for better maintainability
    let page = req.query.page || 1 //taking the page no bydefault 1
    let limit = req.query.limit || 5 //taking the limit bydefault 10

    let skip = (page - 1) * limit //setting the limit for how many item should be skip according to page no

    apiData=apiData.skip(skip).limit(limit); //displaying the product


    const Products = await apiData;
    res.status(200).json({ Products });;
}

module.exports = { getAllProducts, getAllProductsTesting }
