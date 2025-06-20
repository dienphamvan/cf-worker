export default {
    async fetch(request, env, ctx) {
        try {
            console.log('Request Headers:', JSON.stringify(request))
            console.log('env: ', JSON.stringify(env))
            console.log('ctx: ', JSON.stringify(ctx))

            // Attempt to fetch from origin
            const response = await fetch(request)

            // Clone and modify the response to include CORS headers
            const newHeaders = new Headers(response.headers)
            newHeaders.set('Access-Control-Allow-Origin', '*') // or specific origin
            newHeaders.set(
                'Access-Control-Allow-Methods',
                'GET,HEAD,POST,OPTIONS'
            )
            newHeaders.set('Access-Control-Allow-Headers', '*')

            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders,
            })
        } catch (err) {
            // Redirect to fallback or return static message
            return new Response('Site is down', {
                status: 503,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'text/plain',
                },
            })
        }
    },
}
