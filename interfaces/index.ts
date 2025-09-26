export interface discountProps{
    discount?:string;
}

export interface ProductCard extends discountProps {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  rating?: string; 
  reviewsCount?: number; 
  hasDiscount?: boolean; // for showing discount buttton at top left 
  categoryId: string;
}

export interface ProductCardprops{
    id: string
    products: ProductCard[]
}

export interface ProductDetail extends ProductCard {
  description: string;
  stock: number; // quantity available
  relatedProducts?: ProductCard[]; // related products category
  gallery?: string[];
}

export interface ProductCategoryProps{
    id: string;
    name: string;
    image: string;
    description: string;
}

 export interface CartItem {
  id: string;            
  name: string;          
  description: string;   
  price: number;         
  quantity: number;      
  image?: string;        
  categoryId?: string;  
  rating?: number;       
}