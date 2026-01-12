import { CustomError } from "../domain/errors/CustomError";

// Datos ficticios de items para pruebas
const mockItems = [
    { id: 1, name: "Laptop", price: 999.99, category: "Electronics", stock: 15 },
    { id: 2, name: "Wireless Mouse", price: 29.99, category: "Electronics", stock: 50 },
    { id: 3, name: "Mechanical Keyboard", price: 149.99, category: "Electronics", stock: 25 },
    { id: 4, name: "Monitor 27\"", price: 349.99, category: "Electronics", stock: 10 },
    { id: 5, name: "USB-C Hub", price: 49.99, category: "Accessories", stock: 100 },
    { id: 6, name: "Headphones", price: 199.99, category: "Audio", stock: 30 },
    { id: 7, name: "Webcam HD", price: 79.99, category: "Electronics", stock: 45 },
    { id: 8, name: "Desk Lamp", price: 39.99, category: "Office", stock: 60 },
    { id: 9, name: "Notebook", price: 5.99, category: "Office", stock: 200 },
    { id: 10, name: "Coffee Mug", price: 12.99, category: "Kitchen", stock: 75 }
];

export class ItemsService {
    public getItems() {
        if (!mockItems || mockItems.length === 0) {
            throw new CustomError('No items found', 404);
        }
        return mockItems;
    }
}