"use server"

import { db } from "@/db/drizzle"
import { InsertNotebook, Notebook, notebooks } from "@/db/schema"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/dist/server/request/headers"

export const createNotebook = async (values: InsertNotebook) => {
    try {
        await db.insert(notebooks).values(values)
        return { success: true, message: "Notebook created successfully" }
    } catch (error) {
        console.error("Error creating notebook:", error)
        return { success: false, message: "Error creating notebook" }
    }
}

export const getNotebooks = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        const userId = session?.user?.id
        if (!userId) {
            return { success: false, message: "User not authenticated" }
        }

        const notebooksByUser = await db.select().from(notebooks).where(eq(notebooks.userId, userId))

        return { success: true, data: notebooksByUser }

    } catch (error) {
    
        console.error("Error fetching notebooks:", error)
    
        return { success: false, message: "Error fetching notebooks" }
    
    }
}

export const getNoteBookById = async (id: string) => {
    try {
        const notebook = await db.select().from(notebooks).where(eq(notebooks.id, id))
        if (!notebook) {
            return { success: false, message: "Notebook not found" }
        }
        return { success: true, data: notebook }
    } catch (error) {
        return { success: false, message: "Error fetching notebook" }
    }
}

export const deleteNotebook = async (id: string) => {
    try {
        await db.delete(notebooks).where(eq(notebooks.id, id))
        return { success: true, message: "Notebook deleted successfully" }
    } catch (error) {
        return { success: false, message: "Error deleting notebook" }
    }
}
export const updateNotebook = async (id: string, values: InsertNotebook) => {
    try {
        await db.update(notebooks).set(values).where(eq(notebooks.id, id))
        return { success: true, message: "Notebook updated successfully" }
    } catch (error) {
        return { success: false, message: "Error updating notebook" }
    }
}

