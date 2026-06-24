import { Router } from './router';
import { getPage } from './ui';

// Cloudflare Access Authentication
async function verifyAccessToken(request, env) {
	// If you have a bypass token for development
	if (env.ACCESS_BYPASS_TOKEN) {
		const bypassHeader = request.headers.get('X-Access-Bypass');
		if (bypassHeader === env.ACCESS_BYPASS_TOKEN) {
			return { email: 'dev@local', name: 'Developer' };
		}
	}
	
	// Check for Cloudflare Access JWT
	const jwt = request.headers.get('CF-Access-JWT-Assertion');
	if (!jwt) {
		return null;
	}
	
	// Get user info from Access headers
	const email = request.headers.get('CF-Access-Authenticated-User-Email');
	const name = request.headers.get('CF-Access-Authenticated-User-Name') || email;
	
	if (!email) {
		return null;
	}
	
	return { email, name };
}

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		
		// Verify authentication (if Access is enabled)
		const user = await verifyAccessToken(request, env);
		
		// If you want to REQUIRE authentication, uncomment below:
		// if (!user && !url.pathname.startsWith('/api/')) {
		//   return new Response('Authentication required', { status: 401 });
		// }
		
		const router = new Router(request, env);
		
		// API Routes
		if (url.pathname.startsWith('/api/')) {
			return router.handleAPI();
		}
		
		// Serve UI - check if detail page or board view
		const isDetailPage = url.pathname.startsWith('/project/');
		const projectId = isDetailPage ? url.pathname.split('/')[2] : null;
		
		return new Response(getPage(projectId, user), {
			headers: { 'content-type': 'text/html' },
		});
	},
};
