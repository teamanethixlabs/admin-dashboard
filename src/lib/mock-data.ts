export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";
export type OrderStatus = "Pending" | "Confirmed" | "Packed" | "Out for Delivery" | "Delivered";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  status: ProductStatus;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  items: OrderItem[];
  amount: number;
  status: OrderStatus;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpending: number;
}

export const categories: Category[] = [
  { id: "c1", name: "Fruits & Vegetables", description: "Fresh produce sourced daily", productCount: 42 },
  { id: "c2", name: "Dairy & Eggs", description: "Milk, butter, cheese & eggs", productCount: 18 },
  { id: "c3", name: "Bakery", description: "Breads, buns and cakes", productCount: 14 },
  { id: "c4", name: "Beverages", description: "Juices, sodas, tea & coffee", productCount: 26 },
  { id: "c5", name: "Snacks", description: "Chips, biscuits & namkeen", productCount: 33 },
  { id: "c6", name: "Staples", description: "Rice, atta, dals & oil", productCount: 22 },
  { id: "c7", name: "Personal Care", description: "Soaps, shampoos & hygiene", productCount: 19 },
  { id: "c8", name: "Household", description: "Cleaning & home essentials", productCount: 21 },
];

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=200&q=80`;

export const products: Product[] = [
  { id: "p1", name: "Bananas (1 dozen)", category: "Fruits & Vegetables", price: 60, stock: 120, unit: "dozen", image: img("photo-1571771894821-ce9b6c11b08e"), status: "In Stock" },
  { id: "p2", name: "Red Apples (1 kg)", category: "Fruits & Vegetables", price: 180, stock: 45, unit: "kg", image: img("photo-1568702846914-96b305d2aaeb"), status: "In Stock" },
  { id: "p3", name: "Tomatoes (1 kg)", category: "Fruits & Vegetables", price: 40, stock: 8, unit: "kg", image: img("photo-1546470427-e26264be0b0d"), status: "Low Stock" },
  { id: "p4", name: "Onions (1 kg)", category: "Fruits & Vegetables", price: 35, stock: 200, unit: "kg", image: img("photo-1518977676601-b53f82aba655"), status: "In Stock" },
  { id: "p5", name: "Potatoes (1 kg)", category: "Fruits & Vegetables", price: 30, stock: 0, unit: "kg", image: img("photo-1518977676601-b53f82aba655"), status: "Out of Stock" },
  { id: "p6", name: "Amul Milk 1L", category: "Dairy & Eggs", price: 68, stock: 80, unit: "pack", image: img("photo-1550583724-b2692b85b150"), status: "In Stock" },
  { id: "p7", name: "Amul Butter 500g", category: "Dairy & Eggs", price: 265, stock: 25, unit: "pack", image: img("photo-1589985270826-4b7bb135bc9d"), status: "In Stock" },
  { id: "p8", name: "Farm Eggs (12 pcs)", category: "Dairy & Eggs", price: 90, stock: 60, unit: "tray", image: img("photo-1582722872445-44dc5f7e3c8f"), status: "In Stock" },
  { id: "p9", name: "Brown Bread", category: "Bakery", price: 55, stock: 30, unit: "loaf", image: img("photo-1509440159596-0249088772ff"), status: "In Stock" },
  { id: "p10", name: "Whole Wheat Buns", category: "Bakery", price: 40, stock: 6, unit: "pack", image: img("photo-1568471173242-461f0a730452"), status: "Low Stock" },
  { id: "p11", name: "Coca Cola 1.25L", category: "Beverages", price: 70, stock: 95, unit: "bottle", image: img("photo-1554866585-cd94860890b7"), status: "In Stock" },
  { id: "p12", name: "Tropicana Orange 1L", category: "Beverages", price: 130, stock: 40, unit: "pack", image: img("photo-1600271886742-f049cd451bba"), status: "In Stock" },
  { id: "p13", name: "Tata Tea Premium 500g", category: "Beverages", price: 260, stock: 22, unit: "pack", image: img("photo-1576092768241-dec231879fc3"), status: "In Stock" },
  { id: "p14", name: "Lay's Classic Salted", category: "Snacks", price: 20, stock: 300, unit: "pack", image: img("photo-1566478989037-eec170784d0b"), status: "In Stock" },
  { id: "p15", name: "Parle-G Biscuits", category: "Snacks", price: 10, stock: 500, unit: "pack", image: img("photo-1558961363-fa8fdf82db35"), status: "In Stock" },
  { id: "p16", name: "Haldiram's Bhujia 200g", category: "Snacks", price: 75, stock: 4, unit: "pack", image: img("photo-1599490659213-e2b9527bd087"), status: "Low Stock" },
  { id: "p17", name: "Basmati Rice 5kg", category: "Staples", price: 650, stock: 35, unit: "bag", image: img("photo-1586201375761-83865001e31c"), status: "In Stock" },
  { id: "p18", name: "Aashirvaad Atta 10kg", category: "Staples", price: 540, stock: 28, unit: "bag", image: img("photo-1612257999691-c3b9d7e7a1e2"), status: "In Stock" },
  { id: "p19", name: "Fortune Sunflower Oil 1L", category: "Staples", price: 145, stock: 70, unit: "bottle", image: img("photo-1604908176997-125f25cc6f4d"), status: "In Stock" },
  { id: "p20", name: "Dove Soap 100g", category: "Personal Care", price: 65, stock: 110, unit: "bar", image: img("photo-1556228720-195a672e8a03"), status: "In Stock" },
  { id: "p21", name: "Head & Shoulders Shampoo 340ml", category: "Personal Care", price: 320, stock: 18, unit: "bottle", image: img("photo-1585232004423-244e0e6904e3"), status: "In Stock" },
  { id: "p22", name: "Colgate MaxFresh 150g", category: "Personal Care", price: 95, stock: 0, unit: "tube", image: img("photo-1559591935-c6c92c6a5b1d"), status: "Out of Stock" },
  { id: "p23", name: "Surf Excel 1kg", category: "Household", price: 215, stock: 50, unit: "pack", image: img("photo-1610557892470-55d9e80c0bce"), status: "In Stock" },
  { id: "p24", name: "Vim Dishwash Bar", category: "Household", price: 25, stock: 220, unit: "bar", image: img("photo-1581578017093-cd30fce4eeb7"), status: "In Stock" },
];

export const orders: Order[] = [
  { id: "ORD-1042", customerName: "Priya Sharma", phone: "+91 98765 43210", items: [
    { productId: "p6", name: "Amul Milk 1L", qty: 2, price: 68 },
    { productId: "p8", name: "Farm Eggs (12 pcs)", qty: 1, price: 90 },
    { productId: "p9", name: "Brown Bread", qty: 1, price: 55 },
  ], amount: 281, status: "Pending", date: "2026-06-10" },
  { id: "ORD-1041", customerName: "Rahul Verma", phone: "+91 91234 56780", items: [
    { productId: "p17", name: "Basmati Rice 5kg", qty: 1, price: 650 },
    { productId: "p19", name: "Fortune Sunflower Oil 1L", qty: 2, price: 145 },
  ], amount: 940, status: "Confirmed", date: "2026-06-10" },
  { id: "ORD-1040", customerName: "Anita Desai", phone: "+91 99887 76655", items: [
    { productId: "p2", name: "Red Apples (1 kg)", qty: 2, price: 180 },
    { productId: "p1", name: "Bananas (1 dozen)", qty: 1, price: 60 },
  ], amount: 420, status: "Out for Delivery", date: "2026-06-10" },
  { id: "ORD-1039", customerName: "Karan Mehta", phone: "+91 90909 80808", items: [
    { productId: "p14", name: "Lay's Classic Salted", qty: 5, price: 20 },
    { productId: "p11", name: "Coca Cola 1.25L", qty: 2, price: 70 },
  ], amount: 240, status: "Delivered", date: "2026-06-09" },
  { id: "ORD-1038", customerName: "Sneha Iyer", phone: "+91 98989 12121", items: [
    { productId: "p20", name: "Dove Soap 100g", qty: 3, price: 65 },
    { productId: "p21", name: "Head & Shoulders Shampoo 340ml", qty: 1, price: 320 },
  ], amount: 515, status: "Packed", date: "2026-06-09" },
  { id: "ORD-1037", customerName: "Vikram Singh", phone: "+91 97000 23456", items: [
    { productId: "p18", name: "Aashirvaad Atta 10kg", qty: 1, price: 540 },
  ], amount: 540, status: "Delivered", date: "2026-06-09" },
  { id: "ORD-1036", customerName: "Meera Pillai", phone: "+91 99001 22334", items: [
    { productId: "p13", name: "Tata Tea Premium 500g", qty: 1, price: 260 },
    { productId: "p7", name: "Amul Butter 500g", qty: 1, price: 265 },
  ], amount: 525, status: "Delivered", date: "2026-06-08" },
  { id: "ORD-1035", customerName: "Arjun Nair", phone: "+91 90122 99888", items: [
    { productId: "p23", name: "Surf Excel 1kg", qty: 2, price: 215 },
    { productId: "p24", name: "Vim Dishwash Bar", qty: 4, price: 25 },
  ], amount: 530, status: "Pending", date: "2026-06-10" },
];

export const customers: Customer[] = [
  { id: "u1", name: "Priya Sharma", phone: "+91 98765 43210", totalOrders: 14, totalSpending: 8240 },
  { id: "u2", name: "Rahul Verma", phone: "+91 91234 56780", totalOrders: 9, totalSpending: 6120 },
  { id: "u3", name: "Anita Desai", phone: "+91 99887 76655", totalOrders: 21, totalSpending: 12450 },
  { id: "u4", name: "Karan Mehta", phone: "+91 90909 80808", totalOrders: 6, totalSpending: 1980 },
  { id: "u5", name: "Sneha Iyer", phone: "+91 98989 12121", totalOrders: 11, totalSpending: 5340 },
  { id: "u6", name: "Vikram Singh", phone: "+91 97000 23456", totalOrders: 4, totalSpending: 2200 },
  { id: "u7", name: "Meera Pillai", phone: "+91 99001 22334", totalOrders: 17, totalSpending: 9870 },
  { id: "u8", name: "Arjun Nair", phone: "+91 90122 99888", totalOrders: 8, totalSpending: 4310 },
];

export const stats = {
  totalProducts: 214,
  totalOrders: 1284,
  pendingOrders: 28,
  deliveredOrders: 1210,
  revenue: 482350,
  avgOrderValue: 376,
  returningCustomers: 68,
};

export const revenueByDay = [
  { day: "Mon", revenue: 12400 },
  { day: "Tue", revenue: 15800 },
  { day: "Wed", revenue: 14200 },
  { day: "Thu", revenue: 18600 },
  { day: "Fri", revenue: 21200 },
  { day: "Sat", revenue: 26400 },
  { day: "Sun", revenue: 22800 },
];

export const revenueByMonth = [
  { month: "Jan", revenue: 324000, orders: 860 },
  { month: "Feb", revenue: 298000, orders: 790 },
  { month: "Mar", revenue: 356000, orders: 940 },
  { month: "Apr", revenue: 412000, orders: 1080 },
  { month: "May", revenue: 445000, orders: 1170 },
  { month: "Jun", revenue: 482350, orders: 1284 },
];

export const categoryRevenue = [
  { name: "Fruits & Veg", value: 128400, color: "#10b981" },
  { name: "Dairy & Eggs", value: 86200, color: "#3b82f6" },
  { name: "Staples", value: 96800, color: "#f59e0b" },
  { name: "Beverages", value: 62400, color: "#8b5cf6" },
  { name: "Snacks", value: 54200, color: "#ec4899" },
  { name: "Others", value: 54350, color: "#6b7280" },
];

export const topSellingProducts = [
  { name: "Amul Milk 1L", sold: 342, revenue: 23256, trend: 12.4 },
  { name: "Bananas (1 dozen)", sold: 289, revenue: 17340, trend: 8.2 },
  { name: "Basmati Rice 5kg", sold: 156, revenue: 101400, trend: -2.1 },
  { name: "Brown Bread", sold: 234, revenue: 12870, trend: 15.6 },
  { name: "Farm Eggs (12 pcs)", sold: 198, revenue: 17820, trend: 5.8 },
];

export const inventoryAlerts = [
  { product: "Tomatoes (1 kg)", stock: 8, threshold: 20, status: "Low Stock" as ProductStatus },
  { product: "Potatoes (1 kg)", stock: 0, threshold: 50, status: "Out of Stock" as ProductStatus },
  { product: "Whole Wheat Buns", stock: 6, threshold: 15, status: "Low Stock" as ProductStatus },
  { product: "Haldiram's Bhujia 200g", stock: 4, threshold: 20, status: "Low Stock" as ProductStatus },
  { product: "Colgate MaxFresh 150g", stock: 0, threshold: 30, status: "Out of Stock" as ProductStatus },
];

export const orderStatuses: OrderStatus[] = ["Pending", "Confirmed", "Packed", "Out for Delivery", "Delivered"];

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
