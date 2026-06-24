import { Router } from './router';
import { getPage } from './ui';

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const router = new Router(request, env);
		
		// API Routes
		if (url.pathname.startsWith('/api/')) {
			return router.handleAPI();
		}
		
		// Serve UI - check if detail page or board view
		const isDetailPage = url.pathname.startsWith('/project/');
		const projectId = isDetailPage ? url.pathname.split('/')[2] : null;
		
		return new Response(getPage(projectId), {
			headers: { 'content-type': 'text/html' },
		});
	},
};
