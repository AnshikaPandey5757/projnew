// In-memory data storage for Vercel serverless environment
// For production, consider using Vercel KV, PostgreSQL, or another database

let users = [];
let items = [
  {
    id: "1",
    title: "Canon EOS 80D DSLR",
    description: "Professional DSLR camera with 18-135mm lens, perfect for events and photography.",
    category: "Electronics",
    deposit: 4000,
    price: 500,
    location: "Hostel 4, IIT Campus",
    owner: "rahul@example.com",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"],
    available: true,
    condition: "Excellent",
    trustScore: "96/100",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "DJI Mavic Air 2",
    description: "4K drone with 34 mins flight time, remote controller and 3 batteries.",
    category: "Electronics",
    deposit: 8000,
    price: 1200,
    location: "Sector 62, Noida",
    owner: "aman@example.com",
    images: ["https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"],
    available: true,
    condition: "Like New",
    trustScore: "98/100",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Quechua 4-Person Tent",
    description: "Spacious waterproof camping tent, extremely easy to set up and pack away.",
    category: "Outdoor",
    deposit: 1500,
    price: 200,
    location: "Hostel 2, IIT Campus",
    owner: "ananya@example.com",
    images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80"],
    available: true,
    condition: "Good",
    trustScore: "94/100",
    createdAt: new Date().toISOString()
  }
];
let borrowRequests = [];
let notifications = [];
let payments = [];

export const dataStore = {
  users,
  items,
  borrowRequests,
  notifications,
  payments,
  
  resetAll() {
    users = [];
    this.items = [];
    this.borrowRequests = [];
    this.notifications = [];
    this.payments = [];
  }
};

