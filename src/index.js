import { Router } from './router';
import { html } from './ui';

export default {
	async fetch(request, env, ctx) {
		const router = new Router(request, env);
		
		// API Routes
		if (request.url.includes('/api/')) {
			return router.handleAPI();
		}
		
		// Serve UI
		return new Response(html, {
			headers: { 'content-type': 'text/html' },
		});
	},
};
