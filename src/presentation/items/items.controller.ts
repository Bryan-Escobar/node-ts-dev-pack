import { Request, Response } from "express";
import { handleError } from "../../lib/errorHandler";
import { ItemsService } from "../../services/items.service";


export class ItemsController {
    private itemsService = new ItemsService();
    public getItems = (req: Request, res: Response) => {
        try {
            const items = this.itemsService.getItems();
            res.status(200).json(items);
        } catch (error) {
            const { statusCode, message } = handleError(error);
            res.status(statusCode).json({ error: message });

        }
    }
}