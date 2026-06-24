// UI Template for Project Tracker

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketing Agent Project Tracker</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
        }
        header h1 {
            font-size: 2em;
            margin-bottom: 10px;
        }
        header p {
            opacity: 0.9;
        }
        .add-btn {
            background: #48bb78;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 15px;
            transition: all 0.2s;
        }
        .add-btn:hover {
            background: #38a169;
            transform: translateY(-2px);
        }
        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }
        @media (max-width: 900px) {
            .board { grid-template-columns: 1fr; }
        }
        .column {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .column-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
        }
        .column-header h2 {
            font-size: 1.3em;
            font-weight: 600;
        }
        .badge {
            background: #e2e8f0;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 500;
        }
        .badge.now { background: #c6f6d5; color: #22543d; }
        .badge.next { background: #bee3f8; color: #2a4365; }
        .badge.later { background: #e9d8fd; color: #44337a; }
        .card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .card:hover {
            border-color: #667eea;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
            transform: translateY(-2px);
        }
        .card-title {
            font-weight: 600;
            font-size: 1.05em;
            margin-bottom: 8px;
            color: #2d3748;
        }
        .card-meta {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            font-size: 0.85em;
            color: #718096;
            margin-bottom: 10px;
        }
        .status-badge {
            padding: 3px 10px;
            border-radius: 20px;
            font-size: 0.75em;
            font-weight: 600;
            text-transform: uppercase;
        }
        .status-on_track { background: #c6f6d5; color: #22543d; }
        .status-at_risk { background: #feebc8; color: #744210; }
        .status-blocked { background: #fed7d7; color: #742a2a; }
        .status-completed { background: #e2e8f0; color: #4a5568; }
        .card-preview {
            font-size: 0.9em;
            color: #4a5568;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #e2e8f0;
            font-size: 0.85em;
        }
        .blocker-indicator {
            color: #e53e3e;
            font-weight: 600;
        }
        .owner-tag {
            background: #edf2f7;
            padding: 3px 10px;
            border-radius: 20px;
            color: #4a5568;
        }
        /* Modal Styles */
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
        }
        .modal-overlay.active {
            display: flex;
        }
        .modal {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .modal-header {
            padding: 24px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h2 {
            font-size: 1.5em;
            color: #2d3748;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5em;
            cursor: pointer;
            color: #718096;
            padding: 5px;
        }
        .modal-body {
            padding: 24px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: #4a5568;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            font-size: 15px;
            font-family: inherit;
        }
        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        .detail-section {
            margin-bottom: 24px;
        }
        .detail-section h3 {
            font-size: 1.1em;
            margin-bottom: 12px;
            color: #4a5568;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .update-item, .blocker-item {
            background: #f8fafc;
            border-left: 3px solid #667eea;
            padding: 12px 16px;
            margin-bottom: 10px;
            border-radius: 0 6px 6px 0;
        }
        .update-item {
            border-left-color: #667eea;
        }
        .blocker-item {
            border-left-color: #e53e3e;
            background: #fff5f5;
        }
        .update-meta, .blocker-meta {
            font-size: 0.8em;
            color: #718096;
            margin-bottom: 4px;
        }
        .btn-primary {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
        }
        .btn-primary:hover {
            background: #5a67d8;
        }
        .btn-secondary {
            background: #e2e8f0;
            color: #4a5568;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 15px;
            margin-left: 10px;
        }
        .loading {
            text-align: center;
            padding: 40px;
            color: #718096;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Marketing Agent Project Tracker</h1>
            <p>Track all AI agent projects across the marketing division</p>
            <button class="add-btn" onclick="openCreateModal()">+ New Project</button>
        </header>

        <div class="board" id="board">
            <div class="column" data-stage="now">
                <div class="column-header">
                    <h2>Now</h2>
                    <span class="badge now" id="count-now">0</span>
                </div>
                <div id="list-now" class="card-list">
                    <div class="loading">Loading...</div>
                </div>
            </div>
            <div class="column" data-stage="next">
                <div class="column-header">
                    <h2>Next</h2>
                    <span class="badge next" id="count-next">0</span>
                </div>
                <div id="list-next" class="card-list">
                    <div class="loading">Loading...</div>
                </div>
            </div>
            <div class="column" data-stage="later">
                <div class="column-header">
                    <h2>Later</h2>
                    <span class="badge later" id="count-later">0</span>
                </div>
                <div id="list-later" class="card-list">
                    <div class="loading">Loading...</div>
                </div>
            </div>
        </div>
    </div>

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

        // Load projects on page load
        document.addEventListener('DOMContentLoaded', loadProjects);

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
            const blockerBadge = project.open_blockers > 0 
                ? '<span class="blocker-indicator">⚠️ ' + project.open_blockers + ' blocker' + (project.open_blockers > 1 ? 's' : '') + '</span>' 
                : '';
            
            return \`
                <div class="card" onclick="openDetail(\${project.id})">
                    <div class="card-title">\${escapeHtml(project.name)}</div>
                    <div class="card-meta">
                        <span class="status-badge \${statusClass}">\${statusLabel}</span>
                        <span>\${escapeHtml(project.team || 'No team')}</span>
                    </div>
                    <div class="card-preview">\${escapeHtml(project.description || 'No description')}</div>
                    <div class="card-footer">
                        \${blockerBadge}
                        <span class="owner-tag">\${escapeHtml(project.owner || 'Unassigned')}</span>
                    </div>
                </div>
            \`;
        }

        async function openDetail(id) {
            currentProjectId = id;
            try {
                const res = await fetch(\`/api/projects/\${id}\`);
                const project = await res.json();
                renderDetail(project);
                openModal('detailModal');
            } catch (err) {
                alert('Error loading project details');
            }
        }

        function renderDetail(project) {
            document.getElementById('detailTitle').textContent = project.name;
            
            const statusClass = 'status-' + project.status;
            const statusLabel = project.status.replace('_', ' ');
            
            let updatesHtml = project.updates?.length 
                ? project.updates.map(u => \`
                    <div class="update-item">
                        <div class="update-meta">\${escapeHtml(u.update_type)} • \${new Date(u.created_at).toLocaleDateString()} • \${escapeHtml(u.created_by || 'Unknown')}</div>
                        <div>\${escapeHtml(u.content)}</div>
                    </div>
                \`).join('')
                : '<p style="color:#718096;font-style:italic;">No updates yet</p>';
            
            let blockersHtml = project.blockers?.length
                ? project.blockers.map(b => \`
                    <div class="blocker-item">
                        <div class="blocker-meta">\${escapeHtml(b.severity)} priority • Open since \${new Date(b.created_at).toLocaleDateString()}</div>
                        <div>\${escapeHtml(b.description)}</div>
                    </div>
                \`).join('')
                : '<p style="color:#718096;font-style:italic;">No open blockers 🎉</p>';

            const links = [];
            if (project.gitlab_url) links.push(\`<a href="\${project.gitlab_url}" target="_blank" style="color:#667eea;">GitLab</a>\`);
            if (project.github_url) links.push(\`<a href="\${project.github_url}" target="_blank" style="color:#667eea;">GitHub</a>\`);
            
            document.getElementById('detailBody').innerHTML = \`
                <div class="detail-section">
                    <p style="margin-bottom:15px;color:#4a5568;">\${escapeHtml(project.description || 'No description')}</p>
                    <div style="display:flex;gap:15px;margin-bottom:15px;flex-wrap:wrap;">
                        <span class="status-badge \${statusClass}">\${statusLabel}</span>
                        <span style="color:#718096;">📁 \${escapeHtml(project.team || 'No team')}</span>
                        <span style="color:#718096;">👤 \${escapeHtml(project.owner || 'Unassigned')}</span>
                        \${links.length ? '<span style="color:#718096;">🔗 ' + links.join(' • ') + '</span>' : ''}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>🚧 Blockers</h3>
                    \${blockersHtml}
                    <button class="btn-primary" style="margin-top:10px;" onclick="addBlocker()">+ Add Blocker</button>
                </div>
                
                <div class="detail-section">
                    <h3>📝 Updates & Next Steps</h3>
                    \${updatesHtml}
                    <button class="btn-primary" style="margin-top:10px;" onclick="addUpdate()">+ Add Update</button>
                </div>
            \`;
        }

        async function addUpdate() {
            const content = prompt('Enter update:');
            if (!content) return;
            
            try {
                await fetch(\`/api/projects/\${currentProjectId}/updates\`, {
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
                await fetch(\`/api/projects/\${currentProjectId}/blockers\`, {
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
