export interface discountProps{
    discount?:string;
}

export interface ProductCard extends discountProps {
  _id:string;
  id: string;
  image: string;
  name: string;
  description:string;
  price: string;
  rating?: string; 
  reviewsCount?: number; 
  hasDiscount?: boolean; // for showing discount buttton at top left 
  categoryId: string;
}

export type ProductCardprops = ProductCard;

export interface ProductDetail extends ProductCard {
  description: string;
  stock: number; // quantity available
  relatedProducts?: ProductCard[]; // related products category
  gallery?: string[];
}

export interface ProductCategoryProps{
    id: string;
    name:string;
    image:string;
    description:string;
}

 export interface CartItem {
  _id?: string;
  id: string;            
  name: string;          
  description: string;   
  price: number;         
  quantity: number;      
  image?: string;        
  categoryId?: string;  
  rating?: number;       
}

export interface Order {
  id: string;                     
  userId: string;                 
  products: OrderProduct[];       
  totalAmount: number;            
  status: "pending" | "paid" | "failed" | "cancelled"; 
  paymentMethod: "card" | "paypal" | "crypto" | string; 
  transactionRef?: string;        
  createdAt: string;              
  updatedAt?: string;             
}

export interface OrderProduct {
  productId: string;             
  name: string;                   
  price: number;                  
  quantity: number;              
  image?: string;                 
}