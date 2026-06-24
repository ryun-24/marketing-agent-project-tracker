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
        
        /* App Layout with Sidebar */
        .app-layout {
            display: flex;
            min-height: 100vh;
            background: var(--bg);
        }
        
        /* Sidebar */
        .sidebar {
            width: 260px;
            background: var(--surface);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            padding: 16px 0;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
        }
        
        .sidebar-header {
            padding: 0 16px 16px;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 16px;
            font-weight: 600;
        }
        
        .logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: 700;
        }
        
        .sidebar-new-btn {
            margin: 0 16px 12px;
            padding: 8px 12px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        
        .sidebar-new-btn span {
            font-size: 16px;
        }
        
        .sidebar-search {
            padding: 0 16px 12px;
        }
        
        .sidebar-search input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid var(--border);
            border-radius: 6px;
            font-size: 13px;
            background: var(--bg);
        }
        
        .sidebar-nav {
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
            margin-bottom: 2px;
        }
        
        .nav-item:hover {
            background: var(--bg);
            color: var(--text-primary);
        }
        
        .nav-item.active {
            background: var(--bg);
            color: var(--text-primary);
            font-weight: 500;
        }
        
        .nav-icon {
            font-size: 16px;
            width: 20px;
            text-align: center;
        }
        
        .nav-count {
            margin-left: auto;
            font-size: 12px;
            color: var(--text-muted);
            background: var(--bg);
            padding: 2px 8px;
            border-radius: 10px;
        }
        
        .sidebar-section {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid var(--border);
        }
        
        .sidebar-label {
            padding: 0 16px 8px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
        }
        
        .team-list {
            padding: 0 12px;
        }
        
        .team-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 6px 12px;
            font-size: 13px;
            color: var(--text-secondary);
            cursor: pointer;
            border-radius: 6px;
        }
        
        .team-item:hover {
            background: var(--bg);
            color: var(--text-primary);
        }
        
        .team-letter {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
            color: white;
        }
        
        .team-name {
            flex: 1;
        }
        
        .team-count {
            font-size: 12px;
            color: var(--text-muted);
        }
        
        .sidebar-footer {
            margin-top: auto;
            padding: 16px;
            border-top: 1px solid var(--border);
        }
        
        .user-profile {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .user-avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 600;
        }
        
        .user-info {
            flex: 1;
        }
        
        .user-name {
            font-size: 13px;
            font-weight: 500;
        }
        
        .user-email {
            font-size: 12px;
            color: var(--text-muted);
        }
        
        /* Main Content */
        .main-content {
            flex: 1;
            margin-left: 260px;
            padding: 24px 32px;
        }
        
        /* Top Bar */
        .top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .top-bar-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .top-bar-left h1 {
            font-size: 24px;
            font-weight: 600;
        }
        
        .live-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            background: #dcfce7;
            color: #166534;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .search-box {
            position: relative;
            width: 400px;
        }
        
        .search-box svg {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
        }
        
        .search-box input {
            width: 100%;
            padding: 10px 12px 10px 40px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 14px;
            background: var(--surface);
        }
        
        .search-shortcut {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            color: var(--text-muted);
            background: var(--bg);
            padding: 2px 6px;
            border-radius: 4px;
        }
        
        .top-bar-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .team-avatars {
            display: flex;
            align-items: center;
        }
        
        .team-avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
            border: 2px solid var(--surface);
            margin-left: -8px;
        }
        
        .team-avatar:first-child {
            margin-left: 0;
        }
        
        .icon-btn {
            width: 36px;
            height: 36px;
            border: 1px solid var(--border);
            border-radius: 6px;
            background: var(--surface);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn-primary {
            padding: 10px 16px;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
        }
        
        /* Stats Bar */
        .stats-bar {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border);
        }
        
        .stats-item {
            font-size: 14px;
            color: var(--text-secondary);
        }
        
        .stats-item strong {
            color: var(--text-primary);
            font-weight: 600;
        }
        
        .stats-dot {
            font-size: 10px;
        }
        
        .stats-dot.on-track { color: var(--success); }
        .stats-dot.at-risk { color: var(--warning); }
        .stats-dot.blocked { color: var(--danger); }
        .stats-dot.unknown { color: var(--text-muted); }
        
        .stats-count {
            font-size: 13px;
            color: var(--text-secondary);
            margin-right: 8px;
        }
        
        .stats-filters {
            display: flex;
            gap: 8px;
            margin-left: auto;
        }
        
        .filter-pill {
            padding: 6px 12px;
            border: 1px solid var(--border);
            border-radius: 6px;
            background: var(--surface);
            font-size: 13px;
            color: var(--text-secondary);
            cursor: pointer;
        }
        
        .view-toggle {
            display: flex;
            border: 1px solid var(--border);
            border-radius: 6px;
            overflow: hidden;
        }
        
        .view-btn {
            padding: 6px 10px;
            border: none;
            background: var(--surface);
            font-size: 14px;
            cursor: pointer;
            color: var(--text-secondary);
        }
        
        .view-btn.active {
            background: var(--bg);
            color: var(--text-primary);
        }
        
        /* Priority Tabs */
        .priority-tabs {
            display: flex;
            gap: 4px;
            margin-bottom: 24px;
            background: var(--surface);
            padding: 4px;
            border-radius: 8px;
            width: fit-content;
            border: 1px solid var(--border);
        }
        
        .priority-tab {
            padding: 8px 16px;
            border: none;
            background: transparent;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-secondary);
            cursor: pointer;
            transition: all 0.15s ease;
        }
        
        .priority-tab:hover {
            color: var(--text-primary);
        }
        
        .priority-tab.active {
            background: var(--text-primary);
            color: white;
        }
        
        /* Projects List */
        .projects-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        
        .project-row {
            display: grid;
            grid-template-columns: auto 1fr auto auto auto;
            align-items: center;
            gap: 16px;
            padding: 16px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        
        .project-row:hover {
            border-color: #d1d5db;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        
        .project-status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        
        .project-status-dot.on_track { background: var(--success); }
        .project-status-dot.at_risk { background: var(--warning); }
        .project-status-dot.blocked { background: var(--danger); }
        
        .project-info {
            min-width: 0;
        }
        
        .project-name {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .project-meta {
            font-size: 12px;
            color: var(--text-muted);
        }
        
        .project-team {
            font-size: 13px;
            color: var(--text-secondary);
            padding: 4px 10px;
            background: var(--bg);
            border-radius: 4px;
        }
        
        .project-blockers {
            font-size: 12px;
            color: var(--danger);
        }
        
        .project-owner-sm {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: var(--text-secondary);
        }
        
        .owner-avatar-sm {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
        }
        
        /* Project Cards */
        .project-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 16px;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        
        .project-card:hover {
            border-color: #d1d5db;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        
        .project-card-header {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 8px;
        }
        
        .status-indicator {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-top: 6px;
            flex-shrink: 0;
        }
        
        .status-indicator.on_track { background: var(--success); }
        .status-indicator.at_risk { background: var(--warning); }
        .status-indicator.blocked { background: var(--danger); }
        
        .project-card-title {
            font-size: 14px;
            font-weight: 500;
            line-height: 1.4;
            flex: 1;
        }
        
        .project-card-menu {
            color: var(--text-muted);
            cursor: pointer;
        }
        
        .project-card-desc {
            font-size: 13px;
            color: var(--text-secondary);
            line-height: 1.5;
            margin-bottom: 12px;
        }
        
        .project-card-meta {
            font-size: 12px;
            color: var(--text-muted);
            margin-bottom: 12px;
        }
        
        .project-progress {
            margin-bottom: 12px;
        }
        
        .progress-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: var(--text-muted);
            margin-bottom: 4px;
        }
        
        .progress-bar {
            height: 4px;
            background: var(--border);
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--success);
            border-radius: 2px;
            transition: width 0.3s ease;
        }
        
        .progress-fill.partial {
            background: var(--warning);
        }
        
        .project-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 12px;
            border-top: 1px solid var(--border);
        }
        
        .project-owner {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .owner-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
        }
        
        .owner-name {
            font-size: 12px;
            color: var(--text-secondary);
        }
        
        .blocker-tag {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            background: #fee2e2;
            color: #991b1b;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 500;
        }
        
        .privacy-tag {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 2px 8px;
            background: var(--bg);
            color: var(--text-muted);
            border-radius: 4px;
            font-size: 11px;
        }
        
        .project-date {
            font-size: 12px;
            color: var(--text-muted);
        }
        
        /* Detail Page Layout */
        .detail-app {
            display: flex;
            min-height: 100vh;
            background: #f8fafc;
        }
        
        .detail-sidebar {
            width: 64px;
            background: var(--surface);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 16px 0;
            position: fixed;
            height: 100vh;
        }
        
        .detail-sidebar-logo {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
        }
        
        .detail-back-btn {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            text-decoration: none;
            transition: all 0.15s ease;
        }
        
        .detail-back-btn:hover {
            background: var(--bg);
            color: var(--text-primary);
        }
        
        .detail-main {
            margin-left: 64px;
            flex: 1;
            padding: 32px 40px;
            max-width: 900px;
        }
        
        .detail-breadcrumb {
            font-size: 13px;
            color: var(--text-muted);
            margin-bottom: 8px;
        }
        
        .detail-breadcrumb a {
            color: var(--accent);
            text-decoration: none;
        }
        
        .detail-breadcrumb a:hover {
            text-decoration: underline;
        }
        
        .detail-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 24px;
        }
        
        .detail-title-section h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .detail-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            color: var(--text-secondary);
        }
        
        .detail-meta span {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .detail-status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .detail-status-badge.on_track {
            background: #dcfce7;
            color: #166534;
        }
        
        .detail-status-badge.at_risk {
            background: #fef3c7;
            color: #92400e;
        }
        
        .detail-status-badge.blocked {
            background: #fee2e2;
            color: #991b1b;
        }
        
        /* Stat Cards */
        .stat-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }
        
        .stat-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 16px;
        }
        
        .stat-label {
            font-size: 12px;
            font-weight: 500;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
        }
        
        .stat-value {
            font-size: 24px;
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .stat-value.danger {
            color: #dc2626;
        }
        
        /* Info Cards Grid */
        .info-cards-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 16px;
        }
        
        .info-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
        }
        
        .info-card-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .info-card-icon {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
        
        .info-card-icon.status {
            background: #dbeafe;
        }
        
        .info-card-icon.accomplishments {
            background: #dcfce7;
        }
        
        .info-card-icon.next-steps {
            background: #fef3c7;
        }
        
        .info-card-icon.blockers {
            background: #fee2e2;
        }
        
        .info-card-content {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.6;
        }
        
        .info-card-content p {
            margin: 0;
        }
        
        /* Full width cards */
        .info-card.full-width {
            grid-column: 1 / -1;
        }
        
        /* Comments Section */
        .comments-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            margin-top: 16px;
        }
        
        .comments-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            font-size: 14px;
            font-weight: 600;
            color: var(--text-primary);
        }
        
        .comments-count {
            background: var(--bg);
            color: var(--text-muted);
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
        }
        
        .comments-empty {
            font-size: 14px;
            color: var(--text-muted);
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
    <div class="app-layout">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <div class="logo-icon">PT</div>
                    <span>Project Tracker</span>
                </div>
            </div>
            
            <button class="sidebar-new-btn" onclick="openCreateModal()">
                <span>+</span> New project
            </button>
            
            <div class="sidebar-search">
                <input type="text" placeholder="Search..." id="sidebarSearch">
            </div>
            
            <nav class="sidebar-nav">
                <a href="/" class="nav-item active">
                    <span class="nav-icon">🌐</span>
                    Global board
                    <span class="nav-count" id="nav-global-count">11</span>
                </a>
                <a href="/?view=my" class="nav-item">
                    <span class="nav-icon">📋</span>
                    My board
                </a>
            </nav>
            
            <div class="sidebar-section">
                <div class="sidebar-label">TEAMS</div>
                <div class="team-list" id="teamList">
                    <!-- Teams populated by JS -->
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Top Bar -->
            <div class="top-bar">
                <div class="top-bar-left">
                    <h1>Global board</h1>
                    <span class="live-badge">● Live</span>
                </div>
                
                <div class="top-bar-center">
                    <div class="search-box">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input type="text" id="searchInput" placeholder="Search projects..." onkeyup="filterProjects()">
                        <span class="search-shortcut">⌘K</span>
                    </div>
                </div>
                
                <div class="top-bar-right">
                    <div class="team-avatars">
                        <div class="team-avatar" title="Active users">CJ</div>
                        <div class="team-avatar" title="Active users">SM</div>
                        <div class="team-avatar" title="Active users">...</div>
                    </div>
                    <span class="status-badge">Active ● 6</span>
                    <button class="btn-primary" onclick="openCreateModal()">+ New project</button>
                </div>
            </div>
            
            <!-- Stats Bar -->
            <div class="stats-bar">
                <span class="stats-item"><strong id="total-projects">12</strong> projects</span>
                <span class="stats-dot on-track">●</span>
                <span class="stats-count" id="count-ontrack">10</span>
                <span class="stats-dot at-risk">●</span>
                <span class="stats-count" id="count-atrisk">1</span>
                <span class="stats-dot blocked">●</span>
                <span class="stats-count" id="count-blocked">0</span>
                <span class="stats-dot unknown">●</span>
                <span class="stats-count" id="count-unknown">9</span>
                
                <div class="view-toggle">
                    <button class="view-btn active">⊞</button>
                    <button class="view-btn">☰</button>
                </div>
            </div>

            <!-- Priority Tabs -->
            <div class="priority-tabs">
                <button class="priority-tab active" onclick="showPriority('P0')" data-priority="P0">P0</button>
                <button class="priority-tab" onclick="showPriority('P1')" data-priority="P1">P1</button>
                <button class="priority-tab" onclick="showPriority('P2')" data-priority="P2">P2</button>
                <button class="priority-tab" onclick="showPriority('P3')" data-priority="P3">P3</button>
            </div>
            
            <!-- Projects List -->
            <div class="projects-list" id="projectsList">
                <!-- Populated by JS -->
                <div class="loading"><div class="spinner"></div> Loading projects...</div>
            </div>
        </main>
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

        let allProjects = [];
        let filteredProjects = [];
        let currentPriority = 'P0';

        async function loadProjects() {
            try {
                const res = await fetch('/api/projects');
                if (!res.ok) throw new Error('API error: ' + res.status);
                const projects = await res.json();
                allProjects = projects || [];
                filteredProjects = projects || [];
                console.log('Loaded projects:', allProjects.length);
                renderProjectsList();
                updateStats(allProjects);
            } catch (err) {
                console.error('Failed to load projects:', err);
                document.getElementById('projectsList').innerHTML = '<div class="empty-state">Error loading projects. Please refresh.</div>';
            }
        }

        function getPriority(project) {
            if (project.stage === 'now') return 'P0';
            if (project.stage === 'next') return 'P1';
            if (project.stage === 'later') return 'P2';
            return 'P3';
        }

        function showPriority(priority) {
            currentPriority = priority;
            
            // Update active tab
            document.querySelectorAll('.priority-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.priority === priority);
            });
            
            renderProjectsList();
        }

        function filterProjects() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            filteredProjects = allProjects.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                (p.description && p.description.toLowerCase().includes(searchTerm)) ||
                (p.team && p.team.toLowerCase().includes(searchTerm))
            );
            renderProjectsList();
        }

        function updateStats(projects) {
            document.getElementById('total-projects').textContent = projects.length;
            document.getElementById('count-ontrack').textContent = projects.filter(p => p.status === 'on_track').length;
            document.getElementById('count-atrisk').textContent = projects.filter(p => p.status === 'at_risk').length;
            document.getElementById('count-blocked').textContent = projects.filter(p => p.status === 'blocked').length;
            document.getElementById('nav-global-count').textContent = projects.length;
        }

        function renderProjectsList() {
            const container = document.getElementById('projectsList');
            if (!container) return;
            
            if (!filteredProjects || filteredProjects.length === 0) {
                container.innerHTML = '<div class="empty-state">No projects found</div>';
                return;
            }
            
            const priorityProjects = filteredProjects.filter(p => getPriority(p) === currentPriority);
            
            if (priorityProjects.length === 0) {
                container.innerHTML = '<div class="empty-state">No projects in ' + currentPriority + '</div>';
                return;
            }
            
            const html = priorityProjects.map(p => renderProjectRow(p)).join('');
            container.innerHTML = html;
        }

        function renderProjectRow(project) {
            const initials = project.owner ? project.owner.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';
            const blockerText = project.open_blockers > 0 ? '⚠️ ' + project.open_blockers + ' blocker' + (project.open_blockers > 1 ? 's' : '') : '';
            
            return [
                '<div class="project-row" onclick="openDetail(' + project.id + ')">',
                '    <div class="project-status-dot ' + project.status + '"></div>',
                '    <div class="project-info">',
                '        <div class="project-name">' + escapeHtml(project.name) + '</div>',
                '        <div class="project-meta">' + escapeHtml(project.description || 'No description') + '</div>',
                '    </div>',
                '    <div class="project-team">' + escapeHtml(project.team || 'No team') + '</div>',
                '    <div class="project-blockers">' + blockerText + '</div>',
                '    <div class="project-owner-sm">',
                '        <div class="owner-avatar-sm">' + initials + '</div>',
                '        <span>' + escapeHtml(project.owner || 'Unassigned') + '</span>',
                '    </div>',
                '</div>'
            ].join('');
        }

        function renderProjectCard(project) {
            const initials = project.owner ? project.owner.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?';
            const ownerName = project.owner ? project.owner.split(' ')[0] : 'Unassigned';
            const progress = project.status === 'completed' ? 100 : 
                            project.status === 'on_track' ? 60 : 
                            project.status === 'at_risk' ? 30 : 0;
            const progressColor = progress === 100 ? 'var(--success)' : 
                                 progress > 50 ? 'var(--warning)' : 'var(--success)';
            
            return [
                '<div class="project-card" onclick="openDetail(' + project.id + ')">',
                '    <div class="project-card-header">',
                '        <span class="status-indicator ' + project.status + '"></span>',
                '        <div class="project-card-title">' + escapeHtml(project.name) + '</div>',
                '        <span class="project-card-menu">⋯</span>',
                '    </div>',
                '    <div class="project-card-desc">' + escapeHtml(project.description || 'No description yet.') + '</div>',
                '    <div class="project-progress">',
                '        <div class="progress-row">',
                '            <span>Progress</span>',
                '            <span>' + progress + '%</span>',
                '        </div>',
                '        <div class="progress-bar">',
                '            <div class="progress-fill" style="width:' + progress + '%;background:' + progressColor + '"></div>',
                '        </div>',
                '    </div>',
                '    <div class="project-card-footer">',
                '        <div class="project-owner">',
                '            <div class="owner-avatar">' + initials + '</div>',
                '            <span class="owner-name">' + escapeHtml(ownerName) + '</span>',
                '            <span style="color:var(--text-muted);">•</span>',
                '            <span class="owner-name">' + escapeHtml(project.team || 'No team') + '</span>',
                (project.open_blockers > 0 ? '<span class="blocker-tag">⚠️ ' + project.open_blockers + ' blocker' + (project.open_blockers > 1 ? 's' : '') + '</span>' : ''),
                '        </div>',
                '        <span class="project-date">6d ago</span>',
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
            
            // Calculate stats
            const openBlockers = project.blockers?.length || 0;
            const lastUpdated = project.updated_at 
                ? new Date(project.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : '22h ago';
            const comments = project.comments?.length || 0;
            const progress = project.status === 'completed' ? 100 : 
                            project.status === 'on_track' ? 60 : 
                            project.status === 'at_risk' ? 30 : 0;
            
            // Format latest update as accomplishments
            const accomplishments = project.updates?.length > 0 
                ? project.updates[0].content 
                : 'No accomplishments recorded yet';
            
            // Format blockers for display
            const blockersList = project.blockers?.length > 0
                ? project.blockers.map(b => b.description).join(', ')
                : 'No open blockers';
            
            document.body.innerHTML = [
                '<div class="detail-app">',
                '    <aside class="detail-sidebar">',
                '        <div class="detail-sidebar-logo">',
                '            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">',
                '                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
                '            </svg>',
                '        </div>',
                '        <a href="/" class="detail-back-btn" title="Back to board">',
                '            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">',
                '                <path d="M19 12H5M12 19l-7-7 7-7"/>',
                '            </svg>',
                '        </a>',
                '    </aside>',
                '    <main class="detail-main">',
                '        <div class="detail-breadcrumb">',
                '            <a href="/">Projects</a> / ' + escapeHtml(project.name),
                '        </div>',
                '        <div class="detail-header">',
                '            <div class="detail-title-section">',
                '                <h1>' + escapeHtml(project.name) + '</h1>',
                '                <div class="detail-meta">',
                '                    <span class="detail-status-badge ' + project.status + '">',
                '                        <span style="width:6px;height:6px;background:currentColor;border-radius:50%;"></span>',
                statusLabel,
                '                    </span>',
                '                    <span>●</span>',
                '                    <span>' + escapeHtml(project.owner || 'Unassigned') + '</span>',
                '                    <span>●</span>',
                '                    <span>' + escapeHtml(project.team || 'No team') + '</span>',
                '                </div>',
                '            </div>',
                '        </div>',
                '        ',
                '        <!-- Stat Cards -->',
                '        <div class="stat-cards">',
                '            <div class="stat-card">',
                '                <div class="stat-label">Open blockers</div>',
                '                <div class="stat-value ' + (openBlockers > 0 ? 'danger' : '') + '">' + openBlockers + '</div>',
                '            </div>',
                '            <div class="stat-card">',
                '                <div class="stat-label">Progress</div>',
                '                <div class="stat-value">' + progress + '%</div>',
                '            </div>',
                '            <div class="stat-card">',
                '                <div class="stat-label">Last updated</div>',
                '                <div class="stat-value" style="font-size:18px;">' + lastUpdated + '</div>',
                '            </div>',
                '            <div class="stat-card">',
                '                <div class="stat-label">Comments</div>',
                '                <div class="stat-value">' + comments + '</div>',
                '            </div>',
                '        </div>',
                '        ',
                '        <!-- Info Cards -->',
                '        <div class="info-cards-grid">',
                '            <div class="info-card">',
                '                <div class="info-card-header">',
                '                    <div class="info-card-icon status">📋</div>',
                '                    Status',
                '                </div>',
                '                <div class="info-card-content">',
                '                    <p>' + escapeHtml(project.description || 'Current process involves manual uploads and validations, with some errors encountered.') + '</p>',
                '                </div>',
                '            </div>',
                '            <div class="info-card">',
                '                <div class="info-card-header">',
                '                    <div class="info-card-icon accomplishments">💡</div>',
                '                    Accomplishments',
                '                </div>',
                '                <div class="info-card-content">',
                '                    <p>' + escapeHtml(accomplishments) + '</p>',
                '                </div>',
                '            </div>',
                '            <div class="info-card">',
                '                <div class="info-card-header">',
                '                    <div class="info-card-icon next-steps">➡️</div>',
                '                    Next steps',
                '                </div>',
                '                <div class="info-card-content">',
                '                    <p>Implement a dashboard for PO tracking, explore integrations, and schedule a follow-up meeting to discuss further.</p>',
                '                </div>',
                '            </div>',
                '            <div class="info-card">',
                '                <div class="info-card-header">',
                '                    <div class="info-card-icon blockers">⚠️</div>',
                '                    Blockers',
                '                </div>',
                '                <div class="info-card-content">',
                '                    <p>' + escapeHtml(blockersList) + '</p>',
                '                </div>',
                '            </div>',
                '        </div>',
                '        ',
                '        <!-- Comments -->',
                '        <div class="comments-card">',
                '            <div class="comments-header">',
                '                💬 Comments',
                '                <span class="comments-count">' + comments + '</span>',
                '            </div>',
                '            <div class="comments-empty">',
                comments === 0 ? 'No comments yet. Start the conversation.' : 'Comments section coming soon.',
                '            </div>',
                '        </div>',
                '    </main>',
                '</div>'
            ].join('');
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
