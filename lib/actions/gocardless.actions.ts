"use server";

import NordigenClient from "nordigen-node"
import { randomUUID } from "crypto";

const client = new NordigenClient({
    secretId: process.env.GOCARDLESS_SECRET_ID,
    secretKey: process.env.GOCARDLESS_SECRET_KEY,
    environment: process.env.GOCARDLESS_ENV,
})

// (async () => {
//     await client.generateToken();
// })

export const getInstitutions = async () => {
    await client.generateToken();
    console.log('client', client)
    const institutions = await client.institution.getInstitutions({country: "SK"});
    return institutions
}

export const getInstitutionLink = async (institutionId: string) => {
    if (!institutionId) return { error: 'institutionId is required' }

    const link = await client.initSession({
        redirectUrl: "https://imservice.ngrok.app",
        institutionId: institutionId,
        referenceId: randomUUID(),
        userLanguage: "sk",
    })
    return link
}
