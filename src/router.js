// API Router for Project Tracker

export class Router {
	constructor(request, env) {
		this.request = request;
		this.env = env;
		this.url = new URL(request.url);
	}

	async handleAPI() {
		const path = this.url.pathname;
		const method = this.request.method;

		// CORS headers
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'content-type': 'application/json',
		};

		if (method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		try {
			// GET /api/projects - List all projects
			if (path === '/api/projects' && method === 'GET') {
				const projects = await this.getProjects();
				return new Response(JSON.stringify(projects), { headers: corsHeaders });
			}

			// POST /api/projects - Create new project
			if (path === '/api/projects' && method === 'POST') {
				const body = await this.request.json();
				const result = await this.createProject(body);
				return new Response(JSON.stringify(result), { headers: corsHeaders, status: 201 });
			}

			// GET /api/projects/:id - Get single project with details
			if (path.match(/^\/api\/projects\/\d+$/) && method === 'GET') {
				const id = path.split('/').pop();
				const project = await this.getProject(id);
				return new Response(JSON.stringify(project), { headers: corsHeaders });
			}

			// PUT /api/projects/:id - Update project
			if (path.match(/^\/api\/projects\/\d+$/) && method === 'PUT') {
				const id = path.split('/').pop();
				const body = await this.request.json();
				const result = await this.updateProject(id, body);
				return new Response(JSON.stringify(result), { headers: corsHeaders });
			}

			// POST /api/projects/:id/updates - Add update to project
			if (path.match(/^\/api\/projects\/\d+\/updates$/) && method === 'POST') {
				const id = path.split('/')[3];
				const body = await this.request.json();
				const result = await this.addUpdate(id, body);
				return new Response(JSON.stringify(result), { headers: corsHeaders, status: 201 });
			}

			// POST /api/projects/:id/blockers - Add blocker
			if (path.match(/^\/api\/projects\/\d+\/blockers$/) && method === 'POST') {
				const id = path.split('/')[3];
				const body = await this.request.json();
				const result = await this.addBlocker(id, body);
				return new Response(JSON.stringify(result), { headers: corsHeaders, status: 201 });
			}

			return new Response(JSON.stringify({ error: 'Not found' }), { 
				headers: corsHeaders, 
				status: 404 
			});

		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), { 
				headers: corsHeaders, 
				status: 500 
			});
		}
	}

	async getProjects() {
		const { results } = await this.env.DB.prepare(
			`SELECT p.*, 
				(SELECT COUNT(*) FROM blockers b WHERE b.project_id = p.id AND b.status = 'open') as open_blockers,
				(SELECT content FROM project_updates u WHERE u.project_id = p.id ORDER BY u.created_at DESC LIMIT 1) as latest_update
			FROM projects p 
			ORDER BY 
				CASE stage 
					WHEN 'now' THEN 1 
					WHEN 'next' THEN 2 
					WHEN 'later' THEN 3 
				END,
				updated_at DESC`
		).all();
		return results;
	}

	async getProject(id) {
		const project = await this.env.DB.prepare(
			`SELECT * FROM projects WHERE id = ?`
		).bind(id).first();

		if (!project) return null;

		const updates = await this.env.DB.prepare(
			`SELECT * FROM project_updates WHERE project_id = ? ORDER BY created_at DESC`
		).bind(id).all();

		const blockers = await this.env.DB.prepare(
			`SELECT * FROM blockers WHERE project_id = ? AND status = 'open' ORDER BY created_at DESC`
		).bind(id).all();

		return {
			...project,
			updates: updates.results,
			blockers: blockers.results
		};
	}

	async createProject(body) {
		const { name, description, stage, status, owner, team, gitlab_url, github_url } = body;
		
		const result = await this.env.DB.prepare(
			`INSERT INTO projects (name, description, stage, status, owner, team, gitlab_url, github_url) 
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
		).bind(name, description, stage || 'later', status || 'on_track', owner, team, gitlab_url, github_url).run();

		return { id: result.meta.last_row_id, success: true };
	}

	async updateProject(id, body) {
		const { stage, status, owner, team } = body;
		
		await this.env.DB.prepare(
			`UPDATE projects 
			 SET stage = COALESCE(?, stage),
			     status = COALESCE(?, status),
			     owner = COALESCE(?, owner),
			     team = COALESCE(?, team),
			     updated_at = CURRENT_TIMESTAMP
			 WHERE id = ?`
		).bind(stage, status, owner, team, id).run();

		return { success: true };
	}

	async addUpdate(projectId, body) {
		const { update_type, content, created_by } = body;
		
		await this.env.DB.prepare(
			`INSERT INTO project_updates (project_id, update_type, content, created_by) 
			 VALUES (?, ?, ?, ?)`
		).bind(projectId, update_type, content, created_by).run();

		return { success: true };
	}

	async addBlocker(projectId, body) {
		const { description, severity } = body;
		
		await this.env.DB.prepare(
			`INSERT INTO blockers (project_id, description, severity) 
			 VALUES (?, ?, ?)`
		).bind(projectId, description, severity || 'medium').run();

		return { success: true };
	}
}
