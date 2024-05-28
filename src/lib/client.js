
import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: 'xq20i5im',
    dataset: 'production',
    apiVersion: '2024-05-27',
    useCdn: true,
    token: 'skg43oXLH4g6elL6ByqdrmfgGkojoujGCrTIIiqaWijGzjVeOdJBxrUpaThGhm3A7eR996ICBqXFVmVkFWvqSRn46MP76Hx0vJihV2r93jWbwGZnbi93A3ZvWqu98zhw1ijoJFzWmLBYwJDNPxOCEdXzZKa73HE64LdJMAfCo3gUtK58J72B'
})