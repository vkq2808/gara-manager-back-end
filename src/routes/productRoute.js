import express from "express";
import { handleGetProductDetail, handleGetAllProducts } from "../controllers";

let route = express.Router();

let productRoute = (app) => {
    route.get("/", handleGetAllProducts);
    route.get("/:path", handleGetProductDetail);

    return app.use("/product", route);
}

export default productRoute;
