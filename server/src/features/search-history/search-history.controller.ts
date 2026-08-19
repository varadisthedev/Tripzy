import type { Request, Response } from "express";
import { z } from "zod";
import { searchHistoryRepository } from "./search-history.repository.js";

const createSearchHistorySchema = z.object({
    query: z.string().trim().min(1).max(255),
    filters: z.record(z.string(), z.any()).optional(),
});

export async function listSearchHistory(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const history = await searchHistoryRepository.findAllByUserId(req.user.userId);
    res.status(200).json({ history });
}

export async function createSearchHistory(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ message: "Authentication required." });
        return;
    }

    const parsed = createSearchHistorySchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid search history data.", errors: parsed.error.flatten().fieldErrors });
        return;
    }

    const entry = await searchHistoryRepository.create(req.user.userId, parsed.data);
    res.status(201).json({ message: "Search recorded.", entry });
}
