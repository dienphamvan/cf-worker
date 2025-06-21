const REDIRECT_SITES = ['api.dienphamvan.site']
const FALLBACK_SITE = 'fallback.dienphamvan.site'

export default {
    async fetch(request: Request, env: any, ctx: any): Promise<Response> {
        try {
            console.log('Request:', request)

            const isRedirect = REDIRECT_SITES.some((site) =>
                request.url.includes(site)
            )
            if (isRedirect) {
                console.log('Redirecting to fallback site')
                return Response.redirect(FALLBACK_SITE, 302)
            }

            const response = await fetch(request)

            const newHeaders = new Headers(response.headers)
            newHeaders.set('Access-Control-Allow-Origin', '*')
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
            console.error('Error:', err)
            return Response.redirect(FALLBACK_SITE, 302)
        }
    },
}
