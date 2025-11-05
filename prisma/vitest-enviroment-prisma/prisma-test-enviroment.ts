import "dotenv/config"

import type { Environment } from 'vitest/environments'
import { randomUUID } from "node:crypto"
import { execSync } from "node:child_process"
import { prisma } from "@/lib/prisma.js"

function generateDatabaseUrl(schema: string){
    if(!process.env.DATABASE_URL){
        throw new Error("Please provide a DATABASE_URL env variable")
    }

    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set("schema", schema)
    return url.toString()
}

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup(){
        // Criar o banco de testes
        const schema = randomUUID()
        const database_url = generateDatabaseUrl(schema)
        console.log(database_url)
        process.env.DATABASE_URL  = database_url

        execSync('npx prisma db push')

        return {
            async teardown(){
                // Apagar o banco de testes
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    }
}