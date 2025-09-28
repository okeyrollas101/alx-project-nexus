import { NextApiRequest, NextApiResponse } from "next";
import Category from "@/models/Category";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // connect to database
    await Category.db?.readyState;  
    await User.db?.readyState;
    await Product.db?.readyState;
    await Order.db?.readyState;
   try {
    const method = req.method;

    if (method == "GET") {
        const categoryCount = await Category.countDocuments();
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        const orderCount = await Order.countDocuments();

        return res.status(200).json({ 
            categoryCount: categoryCount, 
            userCount: userCount, 
            productCount: productCount, 
            orderCount: orderCount, 
        });
    }
    if (method !== "GET"){
    return res.status(405).json({ message: "Method Not Allowed" });
  }
   } catch (error) {
       return res.status(500).json({ message: `Server Error ${error}` });
   }
}