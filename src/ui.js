// UI Template for Project Tracker - Clean Professional Design

export function getPage(projectId, user = null) {
    const isDetail = !!projectId;
    const userDisplay = user ? `<span style="margin-left:auto;font-size:13px;color:var(--text-secondary);">${user.email}</span>` : '';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Tracker | Marketing Agents</title>
    <style>
        :root {
            --bg: #fafafa;
            --surface: #ffffff;
            --border: #e5e5e5;
            --text-primary: #171717;
            --text-secondary: #737373;
            --text-muted: #a3a3a3;
            --accent: #f97316;
            --accent-light: #fff7ed;
            --success: #22c55e;
            --warning: #f59e0b;
            --danger: #ef4444;
            --now: #dcfce7;
            --now-text: #166534;
            --next: #dbeafe;
            --next-text: #1e40af;
            --later: #f3e8ff;
            --later-text: #6b21a8;
        }
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            background: var(--bg);
            color: var(--text-primary);
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
        }
        
        /* Header */
        .header {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 16px 24px;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            max-width: 1600px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .header-left {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        
        .header h1 {
            font-size: 18px;
            font-weight: 600;
            letter-spacing: -0.01em;
        }
        
        .header-subtitle {
            font-size: 13px;
            color: var(--text-secondary);
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.15s ease;
            border: none;
        }
        
        .btn-primary {
            background: var(--text-primary);
            color: white;
        }
        
        .btn-primary:hover {
            background: #404040;
        }
        
        .btn-secondary {
            background: var(--surface);
            color: var(--text-primary);
            border: 1px solid var(--border);
        }
        
        .btn-secondary:hover {
            background: var(--bg);
        }
        
        /* Main Content */
        .main {
            max-width: 1600px;
            margin: 0 auto;
            padding: 24px;
        }
        
        /* Board Layout */
        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            align-items: start;
        }
        
        @media (max-width: 1024px) {
            .board { grid-template-columns: 1fr; }
        }
        
        /* Column */
        .column {
            background: transparent;
        }
        
        .column-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            padding: 0 4px;
        }
        
        .column-title {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            color: var(--text-secondary);
        }
        
        .count {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            height: 24px;
            padding: 0 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .count.now { background: var(--now); color: var(--now-text); }
        .count.next { background: var(--next); color: var(--next-text); }
        .count.later { background: var(--later); color: var(--later-text); }
        
        /* Cards */
        .card-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        
        .card:hover {
            border-color: #d4d4d4;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            transform: translateY(-1px);
        }
        
        .card-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 8px;
        }
        
        .card-title {
            font-size: 14px;
            font-weight: 500;
            line-height: 1.4;
            color: var(--text-primary);
        }
        
        .card-desc {
            font-size: 13px;
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
        }
        
        .card-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: var(--text-muted);
        }
        
        .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.02em;
        }
        
        .status-on_track { background: #dcfce7; color: #166534; }
        .status-at_risk { background: #fef3c7; color: #92400e; }
        .status-blocked { background: #fee2e2; color: #991b1b; }
        .status-completed { background: #f3f4f6; color: #374151; }
        
        .status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
        }
        
        .status-on_track .status-dot { background: var(--success); }
        .status-at_risk .status-dot { background: var(--warning); }
        .status-blocked .status-dot { background: var(--danger); }
        
        .owner {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
        }
        
        .blocker-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
            background: #fee2e2;
            color: #991b1b;
        }
        
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: var(--text-muted);
            font-size: 13px;
        }
        
        /* Modal */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }
        
        .modal-overlay.active {
            display: flex;
        }
        
        .modal {
            background: var(--surface);
            border-radius: 12px;
            width: 100%;
            max-width: 600px;
            max-height: calc(100vh - 48px);
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
        }
        
        .modal-header {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .modal-header h2 {
            font-size: 16px;
            font-weight: 600;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: var(--text-muted);
            padding: 4px;
            line-height: 1;
        }
        
        .modal-close:hover {
            color: var(--text-primary);
        }
        
        .modal-body {
            padding: 24px;
            overflow-y: auto;
        }
        
        /* Forms */
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 6px;
            font-size: 13px;
            font-weight: 500;
            color: var(--text-primary);
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border);
            border-radius: 6px;
            font-size: 14px;
            font-family: inherit;
            background: var(--surface);
            color: var(--text-primary);
            transition: border-color 0.15s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: #a3a3a3;
        }
        
        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        
        /* Detail View */
        .detail-header {
            margin-bottom: 24px;
        }
        
        .detail-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .detail-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        
        .detail-meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-secondary);
        }
        
        .detail-section {
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--border);
        }
        
        .detail-section:last-child {
            border-bottom: none;
        }
        
        .section-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;
        }
        
        .section-title {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.03em;
            color: var(--text-secondary);
        }
        
        .item-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .item {
            background: var(--bg);
            border-radius: 8px;
            padding: 16px;
        }
        
        .item-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .item-meta {
            font-size: 12px;
            color: var(--text-muted);
        }
        
        .item-content {
            font-size: 14px;
            color: var(--text-primary);
            line-height: 1.5;
        }
        
        .blocker-item {
            background: #fef2f2;
            border-left: 3px solid var(--danger);
        }
        
        .severity {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            padding: 2px 8px;
            border-radius: 4px;
            background: #fee2e2;
            color: #991b1b;
        }
        
        .link-list {
            display: flex;
            gap: 12px;
        }
        
        .link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--accent);
            text-decoration: none;
        }
        
        .link:hover {
            text-decoration: underline;
        }
        
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 200px;
            color: var(--text-muted);
            font-size: 14px;
        }
        
        .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid var(--border);
            border-top-color: var(--accent);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 12px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Detail Page Layout */
        .app {
            display: flex;
            min-height: 100vh;
        }
        
        .sidebar {
            width: 240px;
            background: var(--surface);
            border-right: 1px solid var(--border);
            padding: 20px 0;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
        }
        
        .sidebar-logo {
            padding: 0 20px 20px;
            border-bottom: 1px solid var(--border);
            margin-bottom: 20px;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .logo-icon {
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .nav {
            padding: 0 12px;
        }
        
        .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 12px;
            font-size: 14px;
            color: var(--text-secondary);
            text-decoration: none;
            border-radius: 6px;
            transition: all 0.15s ease;
        }
        
        .nav-item:hover {
            background: var(--bg);
            color: var(--text-primary);
        }
        
        .detail-layout {
            margin-left: 240px;
            padding: 32px;
            max-width: 800px;
        }
        
        .detail-breadcrumb {
            font-size: 14px;
            color: var(--text-muted);
            margin-bottom: 16px;
        }
        
        .detail-breadcrumb a {
            color: var(--accent);
            text-decoration: none;
        }
        
        .detail-breadcrumb a:hover {
            text-decoration: underline;
        }
        
        .detail-breadcrumb span {
            margin: 0 8px;
        }
        
        .detail-title {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 16px;
        }
        
        .detail-badges {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
        }
        
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
        }
        
        .detail-description {
            font-size: 15px;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 24px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--border);
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 32px;
        }
        
        .info-item {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        
        .info-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
        }
        
        .info-value {
            font-size: 14px;
            color: var(--text-primary);
        }
        
        .owner-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .info-link {
            color: var(--accent);
            text-decoration: none;
            font-size: 14px;
        }
        
        .info-link:hover {
            text-decoration: underline;
        }
        
        .section {
            margin-bottom: 32px;
        }
        
        .section h2 {
            font-size: 18px;
            font-weight: 600;
        }
        
        .cards-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 16px;
        }
        
        .update-card, .blocker-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 16px;
        }
        
        .blocker-card {
            border-left: 3px solid var(--danger);
        }
        
        .update-header, .blocker-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
        }
        
        .update-type {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: var(--text-muted);
        }
        
        .update-date, .blocker-date {
            font-size: 12px;
            color: var(--text-muted);
        }
        
        .update-content, .blocker-content {
            font-size: 14px;
            color: var(--text-primary);
            line-height: 1.5;
            margin-bottom: 8px;
        }
        
        .update-author {
            font-size: 12px;
            color: var(--text-muted);
        }
        
        .blocker-severity {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            padding: 2px 8px;
            border-radius: 4px;
        }
        
        .blocker-severity.high {
            background: var(--danger-bg);
            color: #991b1b;
        }
        
        .blocker-severity.medium {
            background: var(--warning-bg);
            color: #92400e;
        }
        
        .blocker-severity.low {
            background: #f3f4f6;
            color: #374151;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <div class="header-left">
                <h1>Project Tracker</h1>
                <span class="header-subtitle">Marketing Agents</span>
            </div>
            ${userDisplay}
            <button class="btn btn-primary" onclick="openCreateModal()">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                New Project
            </button>
        </div>
    </header>

    <main class="main">
        <div class="board" id="board">
            <div class="column" data-stage="now">
                <div class="column-header">
                    <span class="column-title">Now</span>
                    <span class="count now" id="count-now">0</span>
                </div>
                <div id="list-now" class="card-list">
                    <div class="loading"><div class="spinner"></div> Loading projects...</div>
                </div>
            </div>
            <div class="column" data-stage="next">
                <div class="column-header">
                    <span class="column-title">Next</span>
                    <span class="count next" id="count-next">0</span>
                </div>
                <div id="list-next" class="card-list">
                    <div class="loading"><div class="spinner"></div> Loading projects...</div>
                </div>
            </div>
            <div class="column" data-stage="later">
                <div class="column-header">
                    <span class="column-title">Later</span>
                    <span class="count later" id="count-later">0</span>
                </div>
                <div id="list-later" class="card-list">
                    <div class="loading"><div class="spinner"></div> Loading projects...</div>
                </div>
            </div>
        </div>
    </main>

    <!-- Create Project Modal -->
    <div class="modal-overlay" id="createModal">
        <div class="modal">
            <div class="modal-header">
                <h2>Create New Project</h2>
                <button class="modal-close" onclick="closeModal('createModal')">&times;</button>
            </div>
            <div class="modal-body">
                <form id="createForm">
                    <div class="form-group">
                        <label>Project Name</label>
                        <input type="text" name="name" required placeholder="e.g., AI Content Generator">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea name="description" placeholder="What does this project do?"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Stage</label>
                            <select name="stage">
                                <option value="now">Now</option>
                                <option value="next">Next</option>
                                <option value="later" selected>Later</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select name="status">
                                <option value="on_track" selected>On Track</option>
                                <option value="at_risk">At Risk</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Owner</label>
                            <input type="text" name="owner" placeholder="e.g., Sarah Chen">
                        </div>
                        <div class="form-group">
                            <label>Team</label>
                            <input type="text" name="team" placeholder="e.g., Content Team">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>GitLab URL (optional)</label>
                            <input type="url" name="gitlab_url" placeholder="https://gitlab.com/...">
                        </div>
                        <div class="form-group">
                            <label>GitHub URL (optional)</label>
                            <input type="url" name="github_url" placeholder="https://github.com/...">
                        </div>
                    </div>
                    <button type="submit" class="btn-primary">Create Project</button>
                    <button type="button" class="btn-secondary" onclick="closeModal('createModal')">Cancel</button>
                </form>
            </div>
        </div>
    </div>

    <!-- Project Detail Modal -->
    <div class="modal-overlay" id="detailModal">
        <div class="modal">
            <div class="modal-header">
                <h2 id="detailTitle">Project Details</h2>
                <button class="modal-close" onclick="closeModal('detailModal')">&times;</button>
            </div>
            <div class="modal-body" id="detailBody">
                <!-- Dynamic content -->
            </div>
        </div>
    </div>

    <script>
        let currentProjects = [];
        let currentProjectId = null;

        // Check URL path for detail view
        const pathParts = window.location.pathname.split('/');
        const urlProjectId = pathParts[1] === 'project' ? pathParts[2] : null;

        // Load on page load
        document.addEventListener('DOMContentLoaded', () => {
            if (urlProjectId) {
                loadProjectDetail(urlProjectId);
            } else {
                loadProjects();
            }
        });

        // Form submission
        document.getElementById('createForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            try {
                const res = await fetch('/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (res.ok) {
                    closeModal('createModal');
                    e.target.reset();
                    loadProjects();
                }
            } catch (err) {
                alert('Error creating project: ' + err.message);
            }
        });

        async function loadProjects() {
            try {
                const res = await fetch('/api/projects');
                const projects = await res.json();
                currentProjects = projects;
                renderBoard(projects);
            } catch (err) {
                console.error('Failed to load projects:', err);
                document.getElementById('list-now').innerHTML = '<div class="loading">Error loading projects</div>';
            }
        }

        function renderBoard(projects) {
            const stages = ['now', 'next', 'later'];
            
            stages.forEach(stage => {
                const stageProjects = projects.filter(p => p.stage === stage);
                document.getElementById('count-' + stage).textContent = stageProjects.length;
                document.getElementById('list-' + stage).innerHTML = stageProjects.map(p => renderCard(p)).join('');
            });
        }

        function renderCard(project) {
            const statusClass = 'status-' + project.status;
            const statusLabel = project.status.replace('_', ' ');
            const statusDot = '<span class="status-dot"></span>';
            const blockerBadge = project.open_blockers > 0 
                ? '<span class="blocker-badge">⚠️ ' + project.open_blockers + '</span>' 
                : '';
            const initials = project.owner ? project.owner.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';
            
            return [
                '<div class="card" onclick="openDetail(' + project.id + ')">',
                '    <div class="card-header">',
                '        <div class="card-title">' + escapeHtml(project.name) + '</div>',
                blockerBadge,
                '    </div>',
                '    <div class="card-desc">' + escapeHtml(project.description || 'No description') + '</div>',
                '    <div class="card-footer">',
                '        <div class="card-meta">',
                '            <span class="status-pill ' + statusClass + '">' + statusDot + statusLabel + '</span>',
                '            <span>' + escapeHtml(project.team || 'No team') + '</span>',
                '        </div>',
                '        <div class="owner">',
                '            <div class="avatar">' + initials + '</div>',
                '        </div>',
                '    </div>',
                '</div>'
            ].join('');
        }

        function openDetail(id) {
            window.location.href = '/project/' + id;
        }
        
        async function loadProjectDetail(id) {
            currentProjectId = id;
            try {
                const res = await fetch('/api/projects/' + id);
                const project = await res.json();
                renderDetailPage(project);
            } catch (err) {
                document.body.innerHTML = '<div style="padding:40px;text-align:center;">Error loading project</div>';
            }
        }

        function renderDetailPage(project) {
            const initials = project.owner ? project.owner.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';
            const statusClass = 'status-' + project.status;
            const statusLabel = project.status.replace('_', ' ');
            
            let updatesHtml = project.updates?.length 
                ? project.updates.map(u => [
                    '<div class="update-card">',
                    '    <div class="update-header">',
                    '        <span class="update-type">' + escapeHtml(u.update_type) + '</span>',
                    '        <span class="update-date">' + new Date(u.created_at).toLocaleDateString() + '</span>',
                    '    </div>',
                    '    <div class="update-content">' + escapeHtml(u.content) + '</div>',
                    '    <div class="update-author">by ' + escapeHtml(u.created_by || 'Unknown') + '</div>',
                    '</div>'
                ].join('')).join('')
                : '<p class="empty-state">No updates yet</p>';
            
            let blockersHtml = project.blockers?.length
                ? project.blockers.map(b => [
                    '<div class="blocker-card">',
                    '    <div class="blocker-header">',
                    '        <span class="blocker-severity ' + escapeHtml(b.severity) + '">' + escapeHtml(b.severity) + '</span>',
                    '        <span class="blocker-date">Open since ' + new Date(b.created_at).toLocaleDateString() + '</span>',
                    '    </div>',
                    '    <div class="blocker-content">' + escapeHtml(b.description) + '</div>',
                    '</div>'
                ].join('')).join('')
                : '<p class="empty-state">No open blockers 🎉</p>';
            
            document.body.innerHTML = [
                '<div class="app">',
                '    <aside class="sidebar">',
                '        <div class="sidebar-logo">',
                '            <div class="logo">',
                '                <div class="logo-icon">',
                '                    <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
                '                </div>',
                '                <span>Projects</span>',
                '            </div>',
                '        </div>',
                '        <nav class="nav">',
                '            <a href="/" class="nav-item">← Back to Board</a>',
                '        </nav>',
                '    </aside>',
                '    <main class="main">',
                '        <div class="detail-layout">',
                '            <div class="detail-main">',
                '                <div class="detail-breadcrumb">',
                '                    <a href="/">Projects</a>',
                '                    <span>/</span>',
                '                    <span>' + escapeHtml(project.name) + '</span>',
                '                </div>',
                '                <h1 class="detail-title">' + escapeHtml(project.name) + '</h1>',
                '                <div class="detail-badges">',
                '                    <span class="badge ' + statusClass + '">' + statusLabel + '</span>',
                '                    <span class="badge">' + escapeHtml(project.stage) + '</span>',
                '                </div>',
                '                <p class="detail-description">' + escapeHtml(project.description || 'No description') + '</p>',
                '                <div class="info-grid">',
                '                    <div class="info-item">',
                '                        <span class="info-label">Owner</span>',
                '                        <div class="info-value owner-info">',
                '                            <div class="avatar">' + initials + '</div>',
                '                            <span>' + escapeHtml(project.owner || 'Unassigned') + '</span>',
                '                        </div>',
                '                    </div>',
                '                    <div class="info-item">',
                '                        <span class="info-label">Team</span>',
                '                        <span class="info-value">' + escapeHtml(project.team || 'No team') + '</span>',
                '                    </div>',
                (project.gitlab_url ? [
                '                    <div class="info-item">',
                '                        <span class="info-label">GitLab</span>',
                '                        <a href="' + project.gitlab_url + '" target="_blank" class="info-link">View repository →</a>',
                '                    </div>'] : []),
                (project.github_url ? [
                '                    <div class="info-item">',
                '                        <span class="info-label">GitHub</span>',
                '                        <a href="' + project.github_url + '" target="_blank" class="info-link">View repository →</a>',
                '                    </div>'] : []),
                '                </div>',
                '                <div class="section">',
                '                    <div class="section-header">',
                '                        <h2>Blockers (' + (project.blockers?.length || 0) + ')</h2>',
                '                        <button class="btn" onclick="addBlocker()">+ Add blocker</button>',
                '                    </div>',
                '                    <div class="cards-list">' + blockersHtml + '</div>',
                '                </div>',
                '                <div class="section">',
                '                    <div class="section-header">',
                '                        <h2>Updates (' + (project.updates?.length || 0) + ')</h2>',
                '                        <button class="btn" onclick="addUpdate()">+ Add update</button>',
                '                    </div>',
                '                    <div class="cards-list">' + updatesHtml + '</div>',
                '                </div>',
                '            </div>',
                '        </div>',
                '    </main>',
                '</div>'
            ].flat().join('');
        }

        async function addUpdate() {
            const content = prompt('Enter update:');
            if (!content) return;
            
            try {
                await fetch('/api/projects/' + currentProjectId + '/updates', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        update_type: 'general',
                        content,
                        created_by: 'User'
                    })
                });
                openDetail(currentProjectId);
            } catch (err) {
                alert('Error adding update');
            }
        }

        async function addBlocker() {
            const description = prompt('Describe the blocker:');
            if (!description) return;
            
            try {
                await fetch('/api/projects/' + currentProjectId + '/blockers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        description,
                        severity: 'high'
                    })
                });
                openDetail(currentProjectId);
            } catch (err) {
                alert('Error adding blocker');
            }
        }

        function openModal(id) {
            document.getElementById(id).classList.add('active');
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
        }

        function openCreateModal() {
            openModal('createModal');
        }

        function escapeHtml(text) {
            if (!text) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) overlay.classList.remove('active');
            });
        });
    </script>
</body>
</html>
`;
}
