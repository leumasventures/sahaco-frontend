/* ============================================================
   Sacred Heart College – School Management Dashboard
   script2.js – v3.0  |  Role-Enforced Application Logic
   Roles: Admin (full) | Teacher (results + attendance) | Parent (view results only)
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────
   1. APP STATE
───────────────────────────────────────── */
const App = {
  currentSection: 'dashboard',
  currentUser: { name: 'Samuel', role: 'Admin', privileges: null },
  sidebarCollapsed: false,

  data: {
    classes: [
      { id: 1, name: 'JSS 1', level: 'Junior', arms: ['A', 'B', 'C'] },
      { id: 2, name: 'JSS 2', level: 'Junior', arms: ['A', 'B', 'C'] },
      { id: 3, name: 'JSS 3', level: 'Junior', arms: ['A', 'B'] },
      { id: 4, name: 'SS 1',  level: 'Senior', arms: ['A', 'B', 'C'] },
      { id: 5, name: 'SS 2',  level: 'Senior', arms: ['A', 'B', 'C'] },
      { id: 6, name: 'SS 3',  level: 'Senior', arms: ['A', 'B'] },
    ],

    students: [
      { id: 'SHC/001', name: 'Adaeze Okonkwo',  class: 'SS 1',  arm: 'A', gender: 'Female', dob: '2009-03-14', parent: 'Mrs Okonkwo', phone: '08012345678', attendance: 96 },
      { id: 'SHC/002', name: 'Chukwuemeka Eze', class: 'SS 1',  arm: 'A', gender: 'Male',   dob: '2008-11-22', parent: 'Mr Eze',      phone: '08023456789', attendance: 82 },
      { id: 'SHC/003', name: 'Blessing Nwosu',  class: 'JSS 2', arm: 'B', gender: 'Female', dob: '2011-07-01', parent: 'Mr Nwosu',    phone: '08034567890', attendance: 70 },
      { id: 'SHC/004', name: 'Ifeanyi Okafor',  class: 'SS 2',  arm: 'C', gender: 'Male',   dob: '2007-05-30', parent: 'Mrs Okafor',  phone: '08045678901', attendance: 91 },
      { id: 'SHC/005', name: 'Ngozi Chukwu',    class: 'JSS 1', arm: 'A', gender: 'Female', dob: '2012-01-19', parent: 'Mr Chukwu',   phone: '08056789012', attendance: 74 },
      { id: 'SHC/006', name: 'Tochukwu Ani',    class: 'SS 3',  arm: 'A', gender: 'Male',   dob: '2006-09-05', parent: 'Mrs Ani',     phone: '08067890123', attendance: 98 },
      { id: 'SHC/007', name: 'Chidinma Uche',   class: 'JSS 3', arm: 'B', gender: 'Female', dob: '2010-12-11', parent: 'Mr Uche',     phone: '08078901234', attendance: 88 },
      { id: 'SHC/008', name: 'Obinna Obi',      class: 'SS 2',  arm: 'A', gender: 'Male',   dob: '2008-04-25', parent: 'Mrs Obi',     phone: '08089012345', attendance: 63 },
    ],

    teachers: [
      { id: 'T001', name: 'Mr Emeka Nwosu',   subject: 'Mathematics', class: 'SS 1',  arm: 'A', phone: '08011112222', email: 'enwosu@shc.edu', status: 'Active',    role: 'Teacher' },
      { id: 'T002', name: 'Mrs Ngozi Eze',    subject: 'English',     class: 'JSS 2', arm: 'B', phone: '08022223333', email: 'ngeze@shc.edu',  status: 'Active',    role: 'Teacher' },
      { id: 'T003', name: 'Mr Chibuike Obi',  subject: 'Biology',     class: 'SS 2',  arm: 'A', phone: '08033334444', email: 'cobi@shc.edu',   status: 'Active',    role: 'Teacher' },
      { id: 'T004', name: 'Mrs Adaora Nze',   subject: 'Chemistry',   class: 'SS 3',  arm: 'A', phone: '08044445555', email: 'anze@shc.edu',   status: 'Active',    role: 'Teacher' },
      { id: 'T005', name: 'Mr Samuel Nnaji',  subject: 'Physics',     class: 'SS 2',  arm: 'B', phone: '08055556666', email: 'snnaji@shc.edu', status: 'On Leave',  role: 'Teacher' },
      { id: 'T006', name: 'Mrs Ifeoma Okeke', subject: 'Civic Ed.',   class: 'JSS 1', arm: 'A', phone: '08066667777', email: 'iokeke@shc.edu', status: 'Active',    role: 'Teacher' },
    ],

    subjects: [
      { id: 1,  name: 'Mathematics',       code: 'MTH', level: 'All',    type: 'Core' },
      { id: 2,  name: 'English Language',  code: 'ENG', level: 'All',    type: 'Core' },
      { id: 3,  name: 'Biology',           code: 'BIO', level: 'Senior', type: 'Science' },
      { id: 4,  name: 'Chemistry',         code: 'CHE', level: 'Senior', type: 'Science' },
      { id: 5,  name: 'Physics',           code: 'PHY', level: 'Senior', type: 'Science' },
      { id: 6,  name: 'Further Maths',     code: 'FMT', level: 'Senior', type: 'Science' },
      { id: 7,  name: 'Economics',         code: 'ECO', level: 'Senior', type: 'Commercial' },
      { id: 8,  name: 'Government',        code: 'GOV', level: 'Senior', type: 'Arts' },
      { id: 9,  name: 'Literature',        code: 'LIT', level: 'Senior', type: 'Arts' },
      { id: 10, name: 'Agricultural Sci.', code: 'AGR', level: 'All',    type: 'Vocational' },
      { id: 11, name: 'Basic Technology',  code: 'BTH', level: 'Junior', type: 'Vocational' },
      { id: 12, name: 'Civic Education',   code: 'CVE', level: 'All',    type: 'Core' },
      { id: 13, name: 'Social Studies',    code: 'SST', level: 'Junior', type: 'Core' },
      { id: 14, name: 'French',            code: 'FRE', level: 'All',    type: 'Language' },
      { id: 15, name: 'Fine Art',          code: 'FAT', level: 'All',    type: 'Arts' },
      { id: 16, name: 'Music',             code: 'MUS', level: 'Junior', type: 'Arts' },
      { id: 17, name: 'Computer Studies',  code: 'CST', level: 'All',    type: 'Science' },
      { id: 18, name: 'Home Economics',    code: 'HEC', level: 'Junior', type: 'Vocational' },
      { id: 19, name: 'Yoruba',            code: 'YOR', level: 'All',    type: 'Language' },
      { id: 20, name: 'Igbo',              code: 'IGB', level: 'All',    type: 'Language' },
      { id: 21, name: 'Hausa',             code: 'HAU', level: 'All',    type: 'Language' },
      { id: 22, name: 'CRS / MRS',         code: 'CRS', level: 'All',    type: 'Core' },
      { id: 23, name: 'Geography',         code: 'GEO', level: 'Senior', type: 'Arts' },
      { id: 24, name: 'Accounting',        code: 'ACC', level: 'Senior', type: 'Commercial' },
    ],

    results: [],
    attendance: [],
    remarks: [],

    fixtures: [
      { id: 1, type: 'Football',  teamA: 'SS 1A',  teamB: 'SS 2A',  date: '2026-03-10', time: '10:00', venue: 'School Field',   status: 'Upcoming',  scoreA: null, scoreB: null },
      { id: 2, type: 'Debate',    teamA: 'JSS 2B', teamB: 'JSS 3A', date: '2026-03-12', time: '09:00', venue: 'Assembly Hall',  status: 'Upcoming',  scoreA: null, scoreB: null },
      { id: 3, type: 'Athletics', teamA: 'SS 3A',  teamB: 'SS 3B',  date: '2026-02-18', time: '08:00', venue: 'Sports Complex', status: 'Completed', scoreA: 3,    scoreB: 1 },
      { id: 4, type: 'Football',  teamA: 'JSS 1A', teamB: 'JSS 1B', date: '2026-03-15', time: '11:00', venue: 'School Field',   status: 'Upcoming',  scoreA: null, scoreB: null },
    ],

    schoolInfo: {
      name:      'Sacred Heart College Eziukwu Aba',
      session:   '2025/2026',
      term:      'Second Term',
      principal: 'Rev. Fr. Emmanuel Eze',
    },
  },
};

/* ─────────────────────────────────────────
   2. PRIVILEGE HELPERS
   Central place for all access checks.
───────────────────────────────────────── */
const priv = {
  /** Is the current role Admin? */
  isAdmin:   () => App.currentUser.role === 'Admin',
  /** Is the current role Teacher? */
  isTeacher: () => App.currentUser.role === 'Teacher',
  /** Is the current role Parent? */
  isParent:  () => App.currentUser.role === 'Parent',

  /** Can the user enter or edit results? */
  canEnterResults: () => {
    const p = App.currentUser.privileges;
    return p ? p.canEnterResults === true : priv.isAdmin() || priv.isTeacher();
  },

  /** Can the user take attendance? */
  canTakeAttendance: () => {
    const p = App.currentUser.privileges;
    return p ? p.canTakeAttendance === true : priv.isAdmin() || priv.isTeacher();
  },

  /** Can the user manage students / staff / classes? (Admin only) */
  canManage: () => {
    const p = App.currentUser.privileges;
    return p ? p.canManageStudents === true : priv.isAdmin();
  },

  /** Can the user access settings? (Admin only) */
  canAccessSettings: () => {
    const p = App.currentUser.privileges;
    return p ? p.canAccessSettings === true : priv.isAdmin();
  },

  /** Can the user add principal/teacher remarks? (Admin only) */
  canAddRemarks: () => {
    const p = App.currentUser.privileges;
    return p ? p.canAddRemarks === true : priv.isAdmin();
  },

  /**
   * Teacher class/arm scope guard.
   * Admins always pass. Teachers only pass for their own assigned class/arm.
   */
  canActOnClass: (cls, arm) => {
    if (priv.isAdmin()) return true;
    const u = App.currentUser;
    return u.assignedClass === cls && u.assignedArm === arm;
  },
};

/* Deny helper — shows toast and returns true when access is blocked */
function denyAccess(msg = 'Access denied.') {
  toast(msg, 'error');
  return true; // caller does: if (denyAccess()) return;
}

/* ─────────────────────────────────────────
   3. UTILITIES
───────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function toast(message, type = 'info') {
  const existing = document.getElementById('toast-container');
  const container = existing || (() => {
    const c = document.createElement('div');
    c.id = 'toast-container';
    c.style.cssText = 'position:fixed;top:1.2rem;right:1.2rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem;';
    document.body.appendChild(c);
    return c;
  })();

  const colors = { info: '#3b82f6', success: '#22c55e', warning: '#f59e0b', error: '#ef4444' };
  const t = document.createElement('div');
  t.style.cssText = `background:${colors[type]||colors.info};color:#fff;padding:.75rem 1.25rem;border-radius:8px;
    font-size:.875rem;box-shadow:0 4px 12px rgba(0,0,0,.2);max-width:340px;
    animation:slideInRight .25s ease;cursor:pointer;`;
  t.textContent = message;
  t.onclick = () => t.remove();
  container.appendChild(t);

  if (!document.getElementById('toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = `@keyframes slideInRight{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}`;
    document.head.appendChild(s);
  }
  setTimeout(() => t.remove(), 4000);
}

function confirmDlg(message) { return window.confirm(message); }

function grade(score) {
  if (score >= 70) return { letter: 'A', remark: 'Excellent' };
  if (score >= 60) return { letter: 'B', remark: 'Very Good' };
  if (score >= 50) return { letter: 'C', remark: 'Good' };
  if (score >= 45) return { letter: 'D', remark: 'Pass' };
  if (score >= 40) return { letter: 'E', remark: 'Weak Pass' };
  return { letter: 'F', remark: 'Fail' };
}

function makeId(prefix, arr) { return prefix + String(arr.length + 1).padStart(3, '0'); }
function ordinal(n) {
  const s = ['th','st','nd','rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/* ─────────────────────────────────────────
   4. NAVIGATION
───────────────────────────────────────── */
function navigate(sectionId) {
  /* Block sections the role can't see */
  const allowed = App.currentUser.privileges?.allowedSections;
  if (allowed && !allowed.includes(sectionId)) {
    const fallback = priv.isParent() ? 'results' : 'dashboard';
    if (sectionId !== fallback) { navigate(fallback); return; }
  }

  $$('.content-section').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(sectionId);
  if (target) { target.classList.remove('hidden'); App.currentSection = sectionId; }

  $$('.sidebar-nav a').forEach(a => {
    a.closest('li')?.classList.remove('active');
    if (a.getAttribute('href') === `#${sectionId}`) a.closest('li')?.classList.add('active');
  });

  const titleMap = {
    dashboard: 'School Dashboard', classes: 'Classes', arms: 'Class Arms',
    students: 'Students', teachers: 'Staff', subjects: 'Subjects',
    results: 'Results', 'report-cards': 'Report Cards',
    attendance: 'Attendance', fixtures: 'Fixtures & Honours',
    'parent-portal': 'Parent Portal', settings: 'Settings',
  };
  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = titleMap[sectionId] || sectionId;

  renderSection(sectionId);
}

function renderSection(id) {
  switch (id) {
    case 'dashboard':     renderDashboard();    break;
    case 'classes':       renderClasses();      break;
    case 'arms':          renderArms();         break;
    case 'students':      renderStudents();     break;
    case 'teachers':      renderTeachers();     break;
    case 'subjects':      renderSubjects();     break;
    case 'results':       renderResults();      break;
    case 'report-cards':  renderReportCards();  break;
    case 'attendance':    renderAttendance();   break;
    case 'fixtures':      renderFixtures();     break;
    case 'settings':      renderSettings();     break;
  }
}

/* ─────────────────────────────────────────
   5. SIDEBAR
───────────────────────────────────────── */
function initSidebar() {
  /* Hide nav links that the current role cannot access */
  $$('.sidebar-nav a[href]').forEach(a => {
    const section = a.getAttribute('href').replace('#', '');
    const allowed = App.currentUser.privileges?.allowedSections;
    if (allowed && !allowed.includes(section)) {
      a.closest('li')?.style.setProperty('display', 'none');
    }
  });

  $$('.sidebar-nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const hash = a.getAttribute('href').replace('#', '');
      navigate(hash);
      if (window.innerWidth < 768) collapseSidebar(true);
    });
  });

  const toggleBtn = $('.sidebar-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', () => toggleSidebar());

  const ham = document.getElementById('sidebar-toggle-mobile');
  if (ham) ham.addEventListener('click', () => toggleSidebar());

  $$('.has-submenu > a').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); a.closest('li').classList.toggle('open'); });
  });
}

function toggleSidebar() { App.sidebarCollapsed = !App.sidebarCollapsed; collapseSidebar(App.sidebarCollapsed); }
function collapseSidebar(collapsed) {
  const sidebar = document.getElementById('sidebar');
  const main = $('.main-container');
  App.sidebarCollapsed = collapsed;
  sidebar?.classList.toggle('collapsed', collapsed);
  main?.classList.toggle('sidebar-collapsed', collapsed);
}

/* ─────────────────────────────────────────
   6. DASHBOARD
   Parents → redirect to results immediately
───────────────────────────────────────── */
function renderDashboard() {
  /* Parents should never land on the dashboard */
  if (priv.isParent()) { navigate('results'); return; }

  const s = App.data;
  const lowAttendance = s.students.filter(st => st.attendance < 75).length;
  const avgAtt = s.students.length
    ? (s.students.reduce((a, b) => a + b.attendance, 0) / s.students.length).toFixed(1) : 0;

  const statsMap = {
    'Total Students':        { val: s.students.length,     trend: `${s.classes.length} classes`, cls: '' },
    'Pending Results':       { val: 47,                    trend: '3 classes overdue',           cls: 'warning' },
    'Average Attendance':    { val: avgAtt + '%',          trend: '↑ 2.1% this week',            cls: 'success' },
    'Active Staff':          { val: s.teachers.length,     trend: `${s.teachers.length} teachers`, cls: '' },
    'Subjects Offered':      { val: s.subjects.length,     trend: '',                             cls: 'info' },
    'Low Attendance Alerts': { val: lowAttendance,         trend: 'Students < 75%',              cls: 'alert' },
  };

  const grid = document.getElementById('dashboard-stats');
  if (!grid) return;
  grid.innerHTML = Object.entries(statsMap).map(([label, d]) => `
    <div class="stat-card ${d.cls}" style="background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.07);border-left:4px solid ${statColor(d.cls)};">
      <h4 style="margin:0 0 .5rem;font-size:.85rem;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:.05em;">${label}</h4>
      <div class="number" style="font-size:2rem;font-weight:700;color:#111827;">${d.val}</div>
      ${d.trend ? `<span style="font-size:.8rem;color:#6b7280;">${d.trend}</span>` : ''}
    </div>
  `).join('');

  /* Only show buttons relevant to the role */
  const btnPrimary   = $('.btn-primary');
  const btnSecondary = $('.btn-secondary');
  const btnOutline   = $('.btn-outline');
  if (btnPrimary)   btnPrimary.onclick   = () => navigate('results');
  if (btnSecondary) btnSecondary.onclick = () => navigate('report-cards');
  if (btnOutline) {
    if (priv.canTakeAttendance()) {
      btnOutline.onclick = () => navigate('attendance');
    } else {
      btnOutline.style.display = 'none';
    }
  }
}

function statColor(cls) {
  const map = { warning: '#f59e0b', success: '#22c55e', info: '#3b82f6', alert: '#ef4444', '': '#6366f1' };
  return map[cls] || '#6366f1';
}

/* ─────────────────────────────────────────
   7. CLASSES  (Admin only)
   Improvements:
   • Rich stats cards above the table
   • Empty-state UI when no classes exist
   • Duplicate name check on add/edit
   • Arm tag chips in table (instead of plain text)
   • Cascade warning on delete (shows affected students/teachers)
   • Arm manager in modal: add/remove individual arms as chips
   • Confirm delete is blocked if students are enrolled
   • Level badge colour is consistent with data
   • Animated row highlight after save
─────────────────────────────────────────── */
function renderClasses() {
  if (!priv.canManage()) { accessDeniedPage('classes'); return; }

  const section   = document.getElementById('classes');
  const classes   = App.data.classes;
  const students  = App.data.students;

  /* ── Summary stats ── */
  const totalStudents = students.length;
  const totalArms     = classes.reduce((n, c) => n + c.arms.length, 0);
  const juniorCount   = classes.filter(c => c.level === 'Junior').length;
  const seniorCount   = classes.filter(c => c.level === 'Senior').length;

  section.innerHTML = `
    <!-- Stats row -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin-bottom:1.5rem;">
      ${[
        ['🏫', 'Total Classes',   classes.length,   '#2563eb'],
        ['🎓', 'Junior Classes',  juniorCount,      '#0891b2'],
        ['📚', 'Senior Classes',  seniorCount,      '#7c3aed'],
        ['🚪', 'Total Arms',      totalArms,        '#059669'],
        ['👩‍🎓','Total Students', totalStudents,    '#d97706'],
      ].map(([icon, label, val, color]) => `
        <div style="background:#fff;border-radius:12px;padding:1rem 1.25rem;box-shadow:0 2px 8px rgba(0,0,0,.07);border-top:3px solid ${color};">
          <div style="font-size:1.4rem;">${icon}</div>
          <div style="font-size:1.6rem;font-weight:700;color:${color};line-height:1.2;">${val}</div>
          <div style="font-size:.78rem;color:#6b7280;margin-top:.15rem;">${label}</div>
        </div>`).join('')}
    </div>

    <!-- Header row -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;flex-wrap:wrap;gap:1rem;">
      <h2 style="margin:0;">Classes</h2>
      <div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;">
        <input id="class-search" placeholder="🔍 Search classes…" oninput="filterClassTable()"
          style="${inputStyle()};max-width:200px;padding:.45rem .75rem;font-size:.875rem;">
        <button id="add-class-btn" onclick="openClassModal()" style="${btnStyle('primary')}">+ Add Class</button>
      </div>
    </div>

    <!-- Table or empty state -->
    ${classes.length === 0
      ? `<div style="background:#fff;border-radius:12px;padding:4rem 2rem;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.07);">
           <div style="font-size:3rem;margin-bottom:1rem;">🏫</div>
           <h3 style="margin:0 0 .5rem;color:#374151;">No classes yet</h3>
           <p style="color:#9ca3af;margin:0 0 1.5rem;">Add your first class to get started.</p>
           <button onclick="openClassModal()" style="${btnStyle('primary')}">+ Add First Class</button>
         </div>`
      : `<div style="overflow-x:auto;">
         <table id="classes-table" style="${tableStyle()}">
           <thead><tr style="${thRowStyle()}">
             <th style="${thStyle()}">#</th>
             <th style="${thStyle()}">Class Name</th>
             <th style="${thStyle()}">Level</th>
             <th style="${thStyle()}">Arms</th>
             <th style="${thStyle()}">Students</th>
             <th style="${thStyle()}">Actions</th>
           </tr></thead>
           <tbody id="classes-tbody">
             ${classes.map((c, i) => classRow(c, i)).join('')}
           </tbody>
         </table></div>`
    }`;
}

/** Render a single table row (also used when refreshing a single row after edit) */
function classRow(c, i) {
  const studentCount = App.data.students.filter(s => s.class === c.name).length;
  const armChips = c.arms.map(a =>
    `<span style="display:inline-block;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:6px;padding:.15rem .55rem;font-size:.78rem;font-weight:500;color:#374151;margin:.1rem .15rem;">${a}</span>`
  ).join('');

  return `<tr id="class-row-${c.id}" style="${trStyle()}">
    <td style="${tdStyle()}">${i + 1}</td>
    <td style="${tdStyle()};font-weight:600;">${c.name}</td>
    <td style="${tdStyle()}"><span style="${badgeStyle(c.level === 'Junior' ? 'info' : 'success')}">${c.level}</span></td>
    <td style="${tdStyle()}">${armChips}</td>
    <td style="${tdStyle()}">
      <span style="${badgeStyle(studentCount > 0 ? 'secondary' : 'warning')}">${studentCount} student${studentCount !== 1 ? 's' : ''}</span>
    </td>
    <td style="${tdStyle()}">
      <button onclick="editClass(${c.id})" style="${btnStyle('secondary', 'sm')}">✏ Edit</button>
      <button onclick="deleteClass(${c.id})" style="${btnStyle('danger', 'sm')}">🗑 Delete</button>
    </td>
  </tr>`;
}

/** Live search / filter */
window.filterClassTable = function () {
  const q = (document.getElementById('class-search')?.value || '').toLowerCase();
  document.querySelectorAll('#classes-tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
};

/* ── Edit / Delete ──────────────────────────────────────────── */
window.editClass = function (id) {
  if (!priv.canManage()) { denyAccess(); return; }
  openClassModal(App.data.classes.find(c => c.id === id));
};

window.deleteClass = function (id) {
  if (!priv.canManage()) { denyAccess(); return; }
  const cls      = App.data.classes.find(c => c.id === id);
  if (!cls) return;

  const enrolled = App.data.students.filter(s => s.class === cls.name).length;
  const teachers = (App.data.teachers || []).filter(t => t.assignedClass === cls.name).length;

  /* Block delete if students are enrolled */
  if (enrolled > 0) {
    showModal(`
      <div style="text-align:center;padding:.5rem 0 1rem;">
        <div style="font-size:2.5rem;margin-bottom:.75rem;">⚠️</div>
        <h3 style="margin:0 0 .5rem;">Cannot Delete Class</h3>
        <p style="color:#6b7280;margin:0 0 1.5rem;">
          <strong>${cls.name}</strong> has <strong>${enrolled} enrolled student${enrolled !== 1 ? 's' : ''}</strong>.
          Re-assign or remove all students before deleting this class.
        </p>
        <button onclick="closeModal()" style="${btnStyle('primary')}">OK, Got It</button>
      </div>`);
    return;
  }

  /* Warn about assigned teachers but still allow */
  const teacherNote = teachers > 0
    ? `<p style="font-size:.85rem;color:#d97706;background:#fef3c7;border-radius:8px;padding:.6rem .9rem;margin:.75rem 0 0;">⚠ ${teachers} teacher assignment${teachers !== 1 ? 's' : ''} will also be cleared.</p>`
    : '';

  showModal(`
    <div style="text-align:center;padding:.5rem 0 1rem;">
      <div style="font-size:2.5rem;margin-bottom:.75rem;">🗑️</div>
      <h3 style="margin:0 0 .5rem;">Delete Class?</h3>
      <p style="color:#6b7280;margin:0;">Are you sure you want to delete <strong>${cls.name}</strong>? This cannot be undone.</p>
      ${teacherNote}
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:center;">
        <button onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button onclick="confirmDeleteClass(${id})" style="${btnStyle('danger')}">Yes, Delete</button>
      </div>
    </div>`);
};

window.confirmDeleteClass = function (id) {
  const cls = App.data.classes.find(c => c.id === id);
  if (!cls) return;
  /* Clear teacher assignments for this class */
  if (App.data.teachers) {
    App.data.teachers.forEach(t => { if (t.assignedClass === cls.name) { t.assignedClass = ''; t.assignedArm = ''; } });
  }
  App.data.classes = App.data.classes.filter(c => c.id !== id);
  closeModal();
  renderClasses();
  toast(`"${cls.name}" deleted.`, 'warning');
};

/* ── Modal ─────────────────────────────────────────────────── */
function openClassModal(cls = null) {
  const isEdit = !!cls;

  /* Build initial arm chip state */
  let modalArms = cls ? [...cls.arms] : ['A', 'B', 'C'];

  const renderArmChips = () => {
    const container = document.getElementById('arm-chips');
    if (!container) return;
    container.innerHTML = modalArms.map(a => `
      <span style="display:inline-flex;align-items:center;gap:.3rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:.2rem .65rem;font-size:.85rem;font-weight:600;color:#1d4ed8;margin:.15rem;">
        ${a}
        <button type="button" onclick="removeArm('${a}')"
          style="background:none;border:none;cursor:pointer;color:#3b82f6;font-size:.9rem;padding:0;line-height:1;">✕</button>
      </span>`).join('') +
      `<button type="button" id="add-arm-btn" onclick="toggleAddArmInput()"
        style="${btnStyle('secondary', 'sm')};font-size:.78rem;">+ Add Arm</button>
       <span id="add-arm-inline" style="display:none;align-items:center;gap:.35rem;">
         <input id="new-arm-input" placeholder="e.g. D" maxlength="5"
           style="${inputStyle()};width:80px;padding:.3rem .5rem;font-size:.85rem;"
           onkeydown="if(event.key==='Enter'){event.preventDefault();addArmFromInput();}">
         <button type="button" onclick="addArmFromInput()" style="${btnStyle('primary', 'sm')}">Add</button>
       </span>`;
  };

  /* Expose helpers to global scope so inline onclick works */
  window.removeArm = function (a) {
    modalArms = modalArms.filter(x => x !== a);
    renderArmChips();
  };
  window.toggleAddArmInput = function () {
    const el = document.getElementById('add-arm-inline');
    el.style.display = el.style.display === 'none' ? 'inline-flex' : 'none';
    if (el.style.display !== 'none') document.getElementById('new-arm-input').focus();
  };
  window.addArmFromInput = function () {
    const val = (document.getElementById('new-arm-input')?.value || '').trim().toUpperCase();
    if (!val) return;
    if (modalArms.includes(val)) { toast(`Arm "${val}" already exists.`, 'warning'); return; }
    modalArms.push(val);
    renderArmChips();
  };

  showModal(`
    <h3 style="margin:0 0 1.5rem;">${isEdit ? `✏ Edit Class — ${cls.name}` : '➕ Add New Class'}</h3>
    <form id="class-form">

      <label style="${labelStyle()}">Class Name <span style="color:#ef4444;">*</span></label>
      <input id="cls-name" value="${cls?.name || ''}" placeholder="e.g. JSS 1"
        style="${inputStyle()}" required autocomplete="off">
      <div id="cls-name-error" style="color:#ef4444;font-size:.8rem;margin-top:.25rem;display:none;"></div>

      <label style="${labelStyle()}">Level <span style="color:#ef4444;">*</span></label>
      <select id="cls-level" style="${inputStyle()}">
        <option ${cls?.level === 'Junior' ? 'selected' : ''} value="Junior">Junior</option>
        <option ${cls?.level === 'Senior' ? 'selected' : ''} value="Senior">Senior</option>
      </select>

      <label style="${labelStyle()}">Arms</label>
      <div id="arm-chips" style="display:flex;flex-wrap:wrap;align-items:center;gap:.25rem;padding:.5rem;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;min-height:44px;"></div>
      <p style="font-size:.78rem;color:#9ca3af;margin:.35rem 0 0;">Click ✕ to remove an arm. At least one arm is required.</p>

      <div style="display:flex;gap:.75rem;margin-top:1.75rem;justify-content:flex-end;">
        <button type="button" onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button type="submit" style="${btnStyle('primary')}">${isEdit ? '💾 Save Changes' : '✅ Add Class'}</button>
      </div>
    </form>`);

  /* Render chips now that the DOM exists */
  renderArmChips();

  document.getElementById('class-form').onsubmit = (e) => {
    e.preventDefault();
    const name  = document.getElementById('cls-name').value.trim();
    const level = document.getElementById('cls-level').value;
    const nameErr = document.getElementById('cls-name-error');

    /* Validation */
    if (!name) {
      nameErr.textContent = 'Class name is required.'; nameErr.style.display = '';
      document.getElementById('cls-name').focus(); return;
    }
    /* Duplicate check */
    const duplicate = App.data.classes.find(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== cls?.id);
    if (duplicate) {
      nameErr.textContent = `A class named "${duplicate.name}" already exists.`; nameErr.style.display = '';
      document.getElementById('cls-name').focus(); return;
    }
    nameErr.style.display = 'none';

    if (modalArms.length === 0) { toast('Add at least one arm.', 'error'); return; }

    if (isEdit) {
      const oldName = cls.name;
      Object.assign(cls, { name, level, arms: [...modalArms] });
      /* Update references in students / teachers if name changed */
      if (oldName !== name) {
        App.data.students.forEach(s  => { if (s.class === oldName) s.class = name; });
        if (App.data.teachers) App.data.teachers.forEach(t => { if (t.assignedClass === oldName) t.assignedClass = name; });
      }
      toast('Class updated!', 'success');
    } else {
      App.data.classes.push({ id: Date.now(), name, level, arms: [...modalArms] });
      toast('Class added!', 'success');
    }

    closeModal();
    renderClasses();

    /* Highlight the saved row */
    if (isEdit) {
      const row = document.getElementById(`class-row-${cls.id}`);
      if (row) {
        row.style.transition = 'background .1s';
        row.style.background = '#d1fae5';
        setTimeout(() => { row.style.background = ''; }, 1400);
      }
    }
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   8. CLASS ARMS  (Admin only)

   Improvements over original:
   ✦ Summary stats bar (total arms, avg size, largest arm, empty arms)
   ✦ Empty-state when no classes exist
   ✦ Per-class collapse / expand toggle
   ✦ Arm cards show: student count, teacher assignments, capacity bar
   ✦ Add arm: duplicate check, auto-uppercase, multi-add support
   ✦ Rename arm: updates all student + teacher records
   ✦ Delete arm: blocked if students enrolled; warns if teachers assigned
   ✦ Move Students: reassign all students from one arm to another in one click
   ✦ Reorder arms: drag handle or ▲▼ buttons (no external dep)
   ✦ View Students: quick popover listing enrolled students
   ✦ Fixtures: generateArmFixtures() seeds realistic starter data
─────────────────────────────────────────────────────────────────────────────── */

/* ── FIXTURES ─────────────────────────────────────────────────────────────── */

/**
 * generateArmFixtures()
 * Call once to ensure every class in App.data.classes has a sensible arms array.
 * Skips classes that already have arms defined.
 * Default pattern: ['A','B','C'] for Junior, ['A','B'] for Senior.
 */
window.generateArmFixtures = function () {
  let added = 0;
  (App.data.classes || []).forEach(cls => {
    if (!Array.isArray(cls.arms) || cls.arms.length === 0) {
      cls.arms = cls.level === 'Senior' ? ['A', 'B'] : ['A', 'B', 'C'];
      added++;
    }
  });
  if (added > 0) toast(`Arms fixtures generated for ${added} class${added !== 1 ? 'es' : ''}.`, 'success');
  else toast('All classes already have arms defined.', 'info');
  renderArms();
};

/**
 * seedDemoArmsData()
 * Heavier fixture: creates 3 demo classes with arms if App.data.classes is empty.
 */
window.seedDemoArmsData = function () {
  if (!App.data.classes) App.data.classes = [];
  if (!App.data.students) App.data.students = [];

  const demoClasses = [
    { id: 101, name: 'JSS 1', level: 'Junior',  arms: ['A', 'B', 'C'] },
    { id: 102, name: 'JSS 2', level: 'Junior',  arms: ['A', 'B'] },
    { id: 103, name: 'SSS 1', level: 'Senior',  arms: ['A', 'B'] },
  ];

  demoClasses.forEach(demo => {
    if (!App.data.classes.find(c => c.name === demo.name)) {
      App.data.classes.push(demo);
    }
  });

  toast('Demo class/arm data seeded.', 'success');
  renderArms();
};


/* ── HELPERS ──────────────────────────────────────────────────────────────── */

function armStudents(className, arm) {
  return (App.data.students || []).filter(s => s.class === className && s.arm === arm);
}

function armTeachers(className, arm) {
  return (App.data.teachers || []).filter(t => t.assignedClass === className && t.assignedArm === arm);
}

/** Capacity bar HTML: filled / total students vs a configurable max */
function capacityBar(count, max = 40) {
  const pct  = Math.min(100, Math.round((count / max) * 100));
  const color = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#22c55e';
  return `
    <div style="margin-top:.5rem;">
      <div style="display:flex;justify-content:space-between;font-size:.72rem;color:#9ca3af;margin-bottom:.2rem;">
        <span>${count} enrolled</span><span>max ~${max}</span>
      </div>
      <div style="background:#f3f4f6;border-radius:99px;height:5px;overflow:hidden;">
        <div style="width:${pct}%;background:${color};height:100%;border-radius:99px;transition:width .4s;"></div>
      </div>
    </div>`;
}

/** A single arm card */
function armCard(cls, arm) {
  const students = armStudents(cls.name, arm);
  const teachers = armTeachers(cls.name, arm);
  const count    = students.length;

  return `
    <div id="arm-card-${cls.id}-${arm}"
      draggable="true"
      ondragstart="armDragStart(event,'${cls.id}','${arm}')"
      ondragover="event.preventDefault();"
      ondrop="armDrop(event,'${cls.id}','${arm}')"
      style="background:#fff;border:1.5px solid #e5e7eb;border-radius:12px;padding:1rem 1.1rem;
             min-width:160px;flex:1;max-width:220px;cursor:grab;transition:box-shadow .15s, border-color .15s;"
      onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,.1)';this.style.borderColor='#93c5fd';"
      onmouseout="this.style.boxShadow='';this.style.borderColor='#e5e7eb';">

      <!-- Drag handle + arm name -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.35rem;">
        <div style="display:flex;align-items:center;gap:.4rem;">
          <span style="color:#d1d5db;font-size:1rem;cursor:grab;" title="Drag to reorder">⠿</span>
          <strong style="font-size:1rem;color:#1e3a5f;">${cls.name} ${arm}</strong>
        </div>
        <!-- Reorder buttons -->
        <div style="display:flex;gap:.15rem;">
          <button title="Move left" onclick="moveArmLeft(${cls.id},'${arm}')"
            style="background:none;border:1px solid #e5e7eb;border-radius:5px;width:22px;height:22px;cursor:pointer;font-size:.7rem;color:#6b7280;display:flex;align-items:center;justify-content:center;">◀</button>
          <button title="Move right" onclick="moveArmRight(${cls.id},'${arm}')"
            style="background:none;border:1px solid #e5e7eb;border-radius:5px;width:22px;height:22px;cursor:pointer;font-size:.7rem;color:#6b7280;display:flex;align-items:center;justify-content:center;">▶</button>
        </div>
      </div>

      <!-- Teacher badge -->
      <div style="font-size:.78rem;color:#6b7280;margin-bottom:.3rem;">
        ${teachers.length > 0
          ? `<span style="color:#059669;">👩‍🏫 ${teachers.map(t=>t.name).join(', ')}</span>`
          : `<span style="color:#d1d5db;">No teacher assigned</span>`}
      </div>

      ${capacityBar(count)}

      <!-- Action buttons -->
      <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.85rem;">
        <button onclick="viewArmStudents(${cls.id},'${arm}')"
          style="${btnStyle('secondary','sm')};font-size:.75rem;">👁 View</button>
        <button onclick="renameArm(${cls.id},'${arm}')"
          style="${btnStyle('secondary','sm')};font-size:.75rem;">✏ Rename</button>
        <button onclick="openMoveStudents(${cls.id},'${arm}')"
          style="${btnStyle('secondary','sm')};font-size:.75rem;">🔀 Move</button>
        <button onclick="deleteArm(${cls.id},'${arm}')"
          style="${btnStyle('danger','sm')};font-size:.75rem;">🗑</button>
      </div>
    </div>`;
}


/* ── MAIN RENDER ──────────────────────────────────────────────────────────── */

function renderArms() {
  if (!priv.canManage()) { accessDeniedPage('arms'); return; }

  const section  = document.getElementById('arms');
  const classes  = App.data.classes || [];
  const students = App.data.students || [];

  /* Global stats */
  const totalArms    = classes.reduce((n, c) => n + (c.arms?.length || 0), 0);
  const allArmSizes  = classes.flatMap(c => (c.arms||[]).map(a => armStudents(c.name,a).length));
  const avgSize      = totalArms ? (allArmSizes.reduce((a,b)=>a+b,0)/totalArms).toFixed(1) : 0;
  const maxSize      = allArmSizes.length ? Math.max(...allArmSizes) : 0;
  const emptyArms    = allArmSizes.filter(n => n === 0).length;

  section.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;flex-wrap:wrap;gap:1rem;">
      <h2 style="margin:0;">Class Arms</h2>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
        <button onclick="generateArmFixtures()" style="${btnStyle('secondary')}">🔧 Generate Fixtures</button>
        ${classes.length === 0 ? `<button onclick="seedDemoArmsData()" style="${btnStyle('secondary')}">🌱 Seed Demo Data</button>` : ''}
      </div>
    </div>

    <!-- Stats bar -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:1rem;margin-bottom:1.75rem;">
      ${[
        ['🚪','Total Arms',    totalArms,  '#2563eb'],
        ['📊','Avg Class Size',avgSize,    '#0891b2'],
        ['🏆','Largest Arm',   maxSize,    '#7c3aed'],
        ['🟡','Empty Arms',    emptyArms,  emptyArms>0?'#d97706':'#059669'],
      ].map(([icon, label, val, color]) => `
        <div style="background:#fff;border-radius:12px;padding:.9rem 1.1rem;
                    box-shadow:0 2px 8px rgba(0,0,0,.07);border-top:3px solid ${color};">
          <div style="font-size:1.2rem;">${icon}</div>
          <div style="font-size:1.5rem;font-weight:700;color:${color};line-height:1.2;">${val}</div>
          <div style="font-size:.75rem;color:#6b7280;margin-top:.1rem;">${label}</div>
        </div>`).join('')}
    </div>

    ${classes.length === 0
      ? `<div style="background:#fff;border-radius:12px;padding:4rem 2rem;text-align:center;
                     box-shadow:0 2px 8px rgba(0,0,0,.07);">
           <div style="font-size:3rem;margin-bottom:1rem;">🚪</div>
           <h3 style="margin:0 0 .5rem;color:#374151;">No classes found</h3>
           <p style="color:#9ca3af;margin:0 0 1.5rem;">
             Add classes first, or seed demo data to get started.
           </p>
           <button onclick="seedDemoArmsData()" style="${btnStyle('primary')}">🌱 Seed Demo Data</button>
         </div>`
      : classes.map(cls => renderClassArmsBlock(cls)).join('')
    }`;
}

/** Render the collapsible block for one class */
function renderClassArmsBlock(cls) {
  const collapseKey = `arms-collapsed-${cls.id}`;
  const collapsed   = window[collapseKey] || false;
  const total       = (cls.arms||[]).reduce((n,a) => n + armStudents(cls.name,a).length, 0);

  return `
    <div id="arms-block-${cls.id}"
      style="background:#fff;border-radius:14px;padding:1.25rem 1.5rem;
             margin-bottom:1.25rem;box-shadow:0 2px 8px rgba(0,0,0,.07);">

      <!-- Class header row -->
      <div style="display:flex;align-items:center;justify-content:space-between;
                  flex-wrap:wrap;gap:.5rem;margin-bottom:${collapsed?'0':'1rem'};">
        <div style="display:flex;align-items:center;gap:.65rem;cursor:pointer;"
          onclick="toggleArmsBlock(${cls.id})">
          <span style="font-size:1rem;color:#6b7280;transition:transform .2s;
                       display:inline-block;transform:rotate(${collapsed?'-90':'0'}deg);"
            id="chevron-${cls.id}">▾</span>
          <h3 style="margin:0;">${cls.name}</h3>
          <span style="${badgeStyle(cls.level==='Junior'?'info':'success')}">${cls.level}</span>
          <span style="${badgeStyle('secondary')}">${(cls.arms||[]).length} arm${(cls.arms||[]).length!==1?'s':''}</span>
          <span style="font-size:.8rem;color:#9ca3af;">${total} students</span>
        </div>
        <button onclick="addArm(${cls.id})" style="${btnStyle('primary','sm')}">+ Add Arm</button>
      </div>

      <!-- Arms grid (collapsible) -->
      <div id="arms-grid-${cls.id}" style="display:${collapsed?'none':'flex'};flex-wrap:wrap;gap:.85rem;">
        ${(cls.arms||[]).length === 0
          ? `<p style="color:#9ca3af;font-size:.875rem;padding:.5rem 0;">
               No arms for this class. Click "+ Add Arm" to create one.
             </p>`
          : (cls.arms||[]).map(arm => armCard(cls, arm)).join('')}
      </div>
    </div>`;
}


/* ── COLLAPSE / EXPAND ────────────────────────────────────────────────────── */

window.toggleArmsBlock = function (classId) {
  const key  = `arms-collapsed-${classId}`;
  window[key] = !window[key];
  const grid    = document.getElementById(`arms-grid-${classId}`);
  const chevron = document.getElementById(`chevron-${classId}`);
  if (grid)    grid.style.display    = window[key] ? 'none' : 'flex';
  if (chevron) chevron.style.transform = window[key] ? 'rotate(-90deg)' : 'rotate(0deg)';
};


/* ── DRAG-TO-REORDER ──────────────────────────────────────────────────────── */

let _dragArm = null, _dragClassId = null;

window.armDragStart = function (e, classId, arm) {
  _dragClassId = parseInt(classId);
  _dragArm     = arm;
  e.dataTransfer.effectAllowed = 'move';
};

window.armDrop = function (e, classId, targetArm) {
  e.preventDefault();
  if (_dragArm === null || parseInt(classId) !== _dragClassId || _dragArm === targetArm) return;
  const cls  = App.data.classes.find(c => c.id === _dragClassId);
  if (!cls) return;
  const from = cls.arms.indexOf(_dragArm);
  const to   = cls.arms.indexOf(targetArm);
  if (from < 0 || to < 0) return;
  cls.arms.splice(from, 1);
  cls.arms.splice(to, 0, _dragArm);
  _dragArm = null; _dragClassId = null;
  refreshArmsGrid(cls);
};


/* ── REORDER BUTTONS ──────────────────────────────────────────────────────── */

window.moveArmLeft = function (classId, arm) {
  const cls = App.data.classes.find(c => c.id === classId);
  if (!cls) return;
  const i = cls.arms.indexOf(arm);
  if (i <= 0) return;
  [cls.arms[i-1], cls.arms[i]] = [cls.arms[i], cls.arms[i-1]];
  refreshArmsGrid(cls);
};

window.moveArmRight = function (classId, arm) {
  const cls = App.data.classes.find(c => c.id === classId);
  if (!cls) return;
  const i = cls.arms.indexOf(arm);
  if (i < 0 || i >= cls.arms.length - 1) return;
  [cls.arms[i], cls.arms[i+1]] = [cls.arms[i+1], cls.arms[i]];
  refreshArmsGrid(cls);
};

/** Re-render only the arms grid inside a class block (no full page re-render) */
function refreshArmsGrid(cls) {
  const grid = document.getElementById(`arms-grid-${cls.id}`);
  if (!grid) { renderArms(); return; }
  grid.innerHTML = (cls.arms||[]).length === 0
    ? `<p style="color:#9ca3af;font-size:.875rem;padding:.5rem 0;">No arms for this class.</p>`
    : cls.arms.map(arm => armCard(cls, arm)).join('');
}


/* ── ADD ARM ──────────────────────────────────────────────────────────────── */

window.addArm = function (classId) {
  if (!priv.canManage()) { denyAccess(); return; }
  const cls = App.data.classes.find(c => c.id === classId);
  if (!cls) return;

  showModal(`
    <h3 style="margin:0 0 .25rem;">Add Arm to ${cls.name}</h3>
    <p style="color:#6b7280;font-size:.875rem;margin:0 0 1.5rem;">
      Current arms: <strong>${cls.arms.join(', ') || 'none'}</strong>
    </p>
    <form id="arm-form">
      <label style="${labelStyle()}">Arm Letter(s) <span style="color:#9ca3af;font-weight:400;">(comma-separated for multiple)</span></label>
      <input id="arm-letter" placeholder="e.g. D  or  D, E, F"
        style="${inputStyle()}" autocomplete="off" required autofocus>
      <div id="arm-error" style="color:#ef4444;font-size:.8rem;margin-top:.3rem;display:none;"></div>
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:flex-end;">
        <button type="button" onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button type="submit" style="${btnStyle('primary')}">Add Arm</button>
      </div>
    </form>`);

  document.getElementById('arm-form').onsubmit = (e) => {
    e.preventDefault();
    const raw     = document.getElementById('arm-letter').value;
    const letters = raw.split(',').map(l => l.trim().toUpperCase()).filter(Boolean);
    const errEl   = document.getElementById('arm-error');

    if (!letters.length) { errEl.textContent='Enter at least one arm letter.'; errEl.style.display=''; return; }

    const dupes = letters.filter(l => cls.arms.includes(l));
    if (dupes.length) { errEl.textContent=`Already exists: ${dupes.join(', ')}`; errEl.style.display=''; return; }
    errEl.style.display = 'none';

    const invalid = letters.filter(l => !/^[A-Z0-9]{1,3}$/.test(l));
    if (invalid.length) { errEl.textContent=`Invalid arm name(s): ${invalid.join(', ')}. Use 1-3 letters/digits.`; errEl.style.display=''; return; }

    letters.forEach(l => cls.arms.push(l));
    closeModal();
    refreshArmsGrid(cls);
    toast(`Arm${letters.length>1?'s':''} ${letters.map(l=>`${cls.name} ${l}`).join(', ')} added!`, 'success');
  };
};


/* ── RENAME ARM ───────────────────────────────────────────────────────────── */

window.renameArm = function (classId, arm) {
  if (!priv.canManage()) { denyAccess(); return; }
  const cls      = App.data.classes.find(c => c.id === classId);
  const count    = armStudents(cls.name, arm).length;
  const teachers = armTeachers(cls.name, arm).length;

  showModal(`
    <h3 style="margin:0 0 .25rem;">Rename Arm — ${cls.name} ${arm}</h3>
    <p style="color:#6b7280;font-size:.875rem;margin:0 0 ${count||teachers?'.75':'1.5'}rem;">
      This will update all records that reference this arm.
    </p>
    ${count > 0 ? `<div style="${infoNote('info')}">📌 ${count} student record${count!==1?'s':''} will be updated.</div>` : ''}
    ${teachers > 0 ? `<div style="${infoNote('warning')}">⚠ ${teachers} teacher assignment${teachers!==1?'s':''} will be updated.</div>` : ''}
    <form id="rename-arm-form" style="margin-top:1.25rem;">
      <label style="${labelStyle()}">New Arm Name</label>
      <input id="new-arm-name" value="${arm}" maxlength="5"
        style="${inputStyle()}" autocomplete="off" required>
      <div id="rename-error" style="color:#ef4444;font-size:.8rem;margin-top:.3rem;display:none;"></div>
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:flex-end;">
        <button type="button" onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button type="submit" style="${btnStyle('primary')}">Rename</button>
      </div>
    </form>`);

  document.getElementById('rename-arm-form').onsubmit = (e) => {
    e.preventDefault();
    const newName = document.getElementById('new-arm-name').value.trim().toUpperCase();
    const errEl   = document.getElementById('rename-error');

    if (!newName)                  { errEl.textContent='Enter a name.'; errEl.style.display=''; return; }
    if (!/^[A-Z0-9]{1,5}$/.test(newName)) { errEl.textContent='Use 1-5 letters or digits.'; errEl.style.display=''; return; }
    if (newName === arm)           { closeModal(); return; }
    if (cls.arms.includes(newName)) { errEl.textContent=`Arm "${newName}" already exists.`; errEl.style.display=''; return; }

    /* Apply rename */
    cls.arms[cls.arms.indexOf(arm)] = newName;
    (App.data.students||[]).forEach(s => { if (s.class===cls.name && s.arm===arm) s.arm=newName; });
    (App.data.teachers||[]).forEach(t => { if (t.assignedClass===cls.name && t.assignedArm===arm) t.assignedArm=newName; });

    closeModal();
    refreshArmsGrid(cls);
    toast(`Arm renamed to ${cls.name} ${newName}.`, 'success');
  };
};


/* ── VIEW STUDENTS IN ARM ─────────────────────────────────────────────────── */

window.viewArmStudents = function (classId, arm) {
  const cls      = App.data.classes.find(c => c.id === classId);
  const students = armStudents(cls.name, arm);

  showModal(`
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.5rem;">
      <h3 style="margin:0;">Students — ${cls.name} ${arm}</h3>
      <span style="${badgeStyle('info')}">${students.length} enrolled</span>
    </div>
    ${students.length === 0
      ? `<div style="text-align:center;padding:2rem;color:#9ca3af;">
           <div style="font-size:2rem;margin-bottom:.5rem;">🎒</div>
           <p style="margin:0;">No students enrolled in this arm yet.</p>
         </div>`
      : `<div style="overflow-x:auto;max-height:340px;overflow-y:auto;">
           <table style="${tableStyle()}font-size:.875rem;">
             <thead><tr style="${thRowStyle()}">
               <th style="${thStyle()}">#</th>
               <th style="${thStyle()}">Student ID</th>
               <th style="${thStyle()}">Name</th>
               <th style="${thStyle()}">Gender</th>
             </tr></thead>
             <tbody>
               ${students.map((s,i) => `
                 <tr style="${trStyle()}">
                   <td style="${tdStyle()}">${i+1}</td>
                   <td style="${tdStyle()};font-family:monospace;">${s.id}</td>
                   <td style="${tdStyle()};font-weight:500;">${s.name}</td>
                   <td style="${tdStyle()}"><span style="${badgeStyle(s.gender==='Female'?'info':'secondary')}">${s.gender||'—'}</span></td>
                 </tr>`).join('')}
             </tbody>
           </table>
         </div>`}
    <div style="text-align:right;margin-top:1.25rem;">
      <button onclick="closeModal()" style="${btnStyle('secondary')}">Close</button>
    </div>`);
};


/* ── MOVE STUDENTS ────────────────────────────────────────────────────────── */

window.openMoveStudents = function (classId, arm) {
  if (!priv.canManage()) { denyAccess(); return; }
  const cls      = App.data.classes.find(c => c.id === classId);
  const students = armStudents(cls.name, arm);
  const otherArms = cls.arms.filter(a => a !== arm);

  if (students.length === 0) { toast('No students in this arm to move.', 'info'); return; }
  if (otherArms.length === 0) { toast('No other arms to move students to.', 'warning'); return; }

  showModal(`
    <h3 style="margin:0 0 .25rem;">Move Students — ${cls.name} ${arm}</h3>
    <p style="color:#6b7280;font-size:.875rem;margin:0 0 1.5rem;">
      Move all <strong>${students.length}</strong> student${students.length!==1?'s':''} from ${arm} to another arm.
    </p>
    <label style="${labelStyle()}">Destination Arm</label>
    <select id="move-target-arm" style="${inputStyle()}">
      ${otherArms.map(a => `<option value="${a}">${cls.name} ${a} (${armStudents(cls.name,a).length} students)</option>`).join('')}
    </select>
    <div style="display:flex;gap:.75rem;margin-top:1.75rem;justify-content:flex-end;">
      <button onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
      <button onclick="confirmMoveStudents(${cls.id},'${arm}')" style="${btnStyle('primary')}">Move Students</button>
    </div>`);
};

window.confirmMoveStudents = function (classId, fromArm) {
  const targetArm = document.getElementById('move-target-arm').value;
  const cls       = App.data.classes.find(c => c.id === classId);
  const moved     = armStudents(cls.name, fromArm);

  moved.forEach(s => { s.arm = targetArm; });
  closeModal();
  refreshArmsGrid(cls);
  toast(`${moved.length} student${moved.length!==1?'s':''} moved to ${cls.name} ${targetArm}.`, 'success');
};


/* ── DELETE ARM ───────────────────────────────────────────────────────────── */

window.deleteArm = function (classId, arm) {
  if (!priv.canManage()) { denyAccess(); return; }
  const cls      = App.data.classes.find(c => c.id === classId);
  const enrolled = armStudents(cls.name, arm).length;
  const teachers = armTeachers(cls.name, arm).length;

  /* Block if students are enrolled */
  if (enrolled > 0) {
    showModal(`
      <div style="text-align:center;padding:.5rem 0 1rem;">
        <div style="font-size:2.5rem;margin-bottom:.75rem;">⛔</div>
        <h3 style="margin:0 0 .5rem;">Cannot Delete Arm</h3>
        <p style="color:#6b7280;margin:0 0 1.5rem;">
          <strong>${cls.name} ${arm}</strong> has <strong>${enrolled} enrolled student${enrolled!==1?'s':''}</strong>.
          Use "🔀 Move" to reassign students first.
        </p>
        <button onclick="closeModal()" style="${btnStyle('primary')}">OK</button>
      </div>`);
    return;
  }

  const teacherNote = teachers > 0
    ? `<div style="${infoNote('warning')}">⚠ ${teachers} teacher assignment${teachers!==1?'s':''} will be cleared.</div>`
    : '';

  showModal(`
    <div style="text-align:center;padding:.5rem 0 1rem;">
      <div style="font-size:2.5rem;margin-bottom:.75rem;">🗑️</div>
      <h3 style="margin:0 0 .5rem;">Delete Arm?</h3>
      <p style="color:#6b7280;margin:0 0 .75rem;">
        Delete <strong>${cls.name} ${arm}</strong>? This cannot be undone.
      </p>
      ${teacherNote}
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:center;">
        <button onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button onclick="confirmDeleteArm(${classId},'${arm}')" style="${btnStyle('danger')}">Yes, Delete</button>
      </div>
    </div>`);
};

window.confirmDeleteArm = function (classId, arm) {
  const cls = App.data.classes.find(c => c.id === classId);
  if (!cls) return;

  /* Clear teacher assignments */
  (App.data.teachers||[]).forEach(t => {
    if (t.assignedClass === cls.name && t.assignedArm === arm) { t.assignedArm = ''; }
  });

  cls.arms = cls.arms.filter(a => a !== arm);
  closeModal();
  refreshArmsGrid(cls);
  toast(`Arm ${cls.name} ${arm} removed.`, 'warning');
};


/* ── STYLE HELPERS (local) ────────────────────────────────────────────────── */

/** Subtle info/warning note box */
function infoNote(type) {
  const map = { info: '#eff6ff;border-left:3px solid #3b82f6;color:#1e40af',
                warning: '#fefce8;border-left:3px solid #f59e0b;color:#92400e' };
  return `background:${map[type]||map.info};border-radius:0 6px 6px 0;padding:.55rem .85rem;font-size:.82rem;margin:.5rem 0;`;
}

/* ─────────────────────────────────────────────────────────────────────────────
   9. STUDENTS  (improved)
   Admin   → full CRUD + bulk import
   Teacher → view only
   Parent  → redirected to results

   Improvements:
   ✦ Rich fixture generator with 40 realistic Nigerian student names
   ✦ Stats dashboard (total, gender split, low attendance, class breakdown)
   ✦ Advanced filter bar: search + class + arm + gender + attendance filter
   ✦ Sortable table columns (click header)
   ✦ Avatar initials chip per student row
   ✦ View profile: tabbed (Info / Results / Attendance history)
   ✦ Smart ID generator (respects existing IDs, no collisions)
   ✦ Attendance quick-edit inline without opening modal
   ✦ Duplicate name warning on add
   ✦ Bulk add: Excel upload (SheetJS) + CSV textarea + template download
   ✦ Transfer student: move to different class/arm with one click
   ✦ Print student list button
   ✦ Cascade delete: removes linked results when student is deleted
   ✦ Confirm delete shows student name + linked data count
─────────────────────────────────────────────────────────────────────────────── */


/* ══════════════════════════════════════════════════════════════════════════════
   FIXTURES
══════════════════════════════════════════════════════════════════════════════ */

const STUDENT_FIXTURE_NAMES = {
  male: [
    'Emeka Okonkwo','Tunde Adeyemi','Chukwuemeka Eze','Biodun Adewale','Kelechi Obi',
    'Oluwaseun Afolabi','Aminu Bello','Suleiman Musa','Ifeanyi Nwosu','Gbenga Omotayo',
    'Chidubem Okeke','Yusuf Ibrahim','Babatunde Olawale','Nnamdi Chukwu','Segun Adebayo',
    'Chukwudi Nnadi','Kayode Oduola','Uche Onyekachi','Abdullahi Sani','Rotimi Adesanya',
  ],
  female: [
    'Adaeze Okonkwo','Funmilayo Adesanya','Ngozi Eze','Amara Obi','Bukola Adeyemi',
    'Chisom Nwosu','Fatima Al-Hassan','Blessing Omotayo','Ifeoma Okeke','Yetunde Bello',
    'Adunola Afolabi','Chiamaka Nnadi','Hafsat Ibrahim','Omowunmi Olawale','Chidinma Chukwu',
    'Oluwatoyin Adebayo','Nkechi Oduola','Zainab Musa','Ebele Onyekachi','Kehinde Rotimi',
  ],
};

const PARENT_NAMES = {
  male:   n => `Mr ${n.split(' ')[1]}`,
  female: n => `Mrs ${n.split(' ')[1]}`,
};

const PHONES = () => `080${Math.floor(10000000 + Math.random()*89999999)}`;

const NIGERIAN_DOBS = (minAge = 10, maxAge = 18) => {
  const year = new Date().getFullYear() - minAge - Math.floor(Math.random() * (maxAge - minAge));
  const month = String(Math.floor(Math.random()*12)+1).padStart(2,'0');
  const day   = String(Math.floor(Math.random()*28)+1).padStart(2,'0');
  return `${year}-${month}-${day}`;
};

/** Generate a collision-free student ID */
function genStudentId(prefix = 'SHC') {
  const existing = new Set((App.data.students||[]).map(s => s.id));
  let n = (App.data.students||[]).length + 1;
  let id;
  do { id = `${prefix}/${String(n).padStart(3,'0')}`; n++; } while (existing.has(id));
  return id;
}

/**
 * seedStudentFixtures({ count, classFilter })
 * Generates realistic student records distributed across all classes/arms.
 * Skips if students already exist unless force=true.
 */
window.seedStudentFixtures = function ({ count = 40, force = false } = {}) {
  if (!App.data.students) App.data.students = [];
  if (App.data.students.length > 0 && !force) {
    toast(`${App.data.students.length} students already exist. Use force=true to re-seed.`, 'info');
    renderStudents(); return;
  }
  if (force) App.data.students = [];

  const classes = App.data.classes || [];
  if (!classes.length) { toast('No classes found. Add classes first.', 'warning'); return; }

  // Build a flat list of all class+arm slots and distribute evenly
  const slots = classes.flatMap(c => (c.arms||[]).map(a => ({ cls: c.name, arm: a })));
  if (!slots.length) { toast('No class arms found. Generate arm fixtures first.', 'warning'); return; }

  const maleNames   = [...STUDENT_FIXTURE_NAMES.male];
  const femaleNames = [...STUDENT_FIXTURE_NAMES.female];
  const shuffle     = arr => arr.sort(() => Math.random() - .5);
  shuffle(maleNames); shuffle(femaleNames);

  let mi = 0, fi = 0;
  for (let i = 0; i < count; i++) {
    const slot   = slots[i % slots.length];
    const gender = i % 2 === 0 ? 'Male' : 'Female';
    const name   = gender === 'Male'
      ? (maleNames[mi++ % maleNames.length])
      : (femaleNames[fi++ % femaleNames.length]);
    const parent = gender === 'Male' ? PARENT_NAMES.male(name) : PARENT_NAMES.female(name);
    App.data.students.push({
      id:         genStudentId(),
      name,
      class:      slot.cls,
      arm:        slot.arm,
      gender,
      dob:        NIGERIAN_DOBS(),
      parent,
      phone:      PHONES(),
      attendance: Math.floor(60 + Math.random() * 40), // 60–100%
    });
  }
  toast(`${count} student fixture${count!==1?'s':''} generated!`, 'success');
  renderStudents();
};

/** Thin fixture — just a handful of quick demo entries */
window.seedMinimalStudents = function () {
  window.seedStudentFixtures({ count: 12, force: false });
};


/* ══════════════════════════════════════════════════════════════════════════════
   SORT STATE
══════════════════════════════════════════════════════════════════════════════ */
let _sortCol = 'name', _sortDir = 1; // 1 = asc, -1 = desc

function sortStudents(list) {
  return [...list].sort((a, b) => {
    let va = a[_sortCol] ?? '', vb = b[_sortCol] ?? '';
    if (typeof va === 'number') return (va - vb) * _sortDir;
    return String(va).localeCompare(String(vb)) * _sortDir;
  });
}

window.setStudentSort = function (col) {
  if (_sortCol === col) _sortDir *= -1; else { _sortCol = col; _sortDir = 1; }
  renderStudents(_currentFilter, _currentFilters);
};

let _currentFilter  = '';
let _currentFilters = {};


/* ══════════════════════════════════════════════════════════════════════════════
   MAIN RENDER
══════════════════════════════════════════════════════════════════════════════ */
function renderStudents(filter = '', filters = {}) {
  if (priv.isParent()) { navigate('results'); return; }

  _currentFilter  = filter;
  _currentFilters = filters;

  const section    = document.getElementById('students');
  const canManage  = priv.canManage();
  const all        = App.data.students || [];

  /* ── Apply filters ── */
  let list = all.filter(s => {
    const q = filter.toLowerCase();
    if (q && !s.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q) &&
             !s.class.toLowerCase().includes(q) && !(s.parent||'').toLowerCase().includes(q)) return false;
    if (filters.cls   && s.class  !== filters.cls)    return false;
    if (filters.arm   && s.arm    !== filters.arm)    return false;
    if (filters.gender&& s.gender !== filters.gender) return false;
    if (filters.attn === 'low'  && s.attendance >= 75) return false;
    if (filters.attn === 'good' && s.attendance <  75) return false;
    return true;
  });

  list = sortStudents(list);

  /* ── Stats ── */
  const male       = all.filter(s => s.gender === 'Male').length;
  const female     = all.filter(s => s.gender === 'Female').length;
  const lowAttn    = all.filter(s => s.attendance < 75).length;
  const avgAttn    = all.length ? (all.reduce((a,b) => a + b.attendance, 0) / all.length).toFixed(1) : 0;

  /* ── Dropdown options ── */
  const classOpts = ['', ...new Set(all.map(s => s.class))].map(c =>
    `<option value="${c}" ${filters.cls===c?'selected':''}>${c||'All Classes'}</option>`).join('');
  const armOpts   = ['', ...new Set(all.map(s => s.arm))].map(a =>
    `<option value="${a}" ${filters.arm===a?'selected':''}>${a||'All Arms'}</option>`).join('');

  /* ── Sort indicator ── */
  const si = col => _sortCol===col ? (_sortDir===1?' ↑':' ↓') : '';
  const th = (col, label) =>
    `<th style="${thStyle()};cursor:pointer;user-select:none;" onclick="setStudentSort('${col}')">${label}${si(col)}</th>`;

  section.innerHTML = `
    <!-- Stats row -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:1rem;margin-bottom:1.5rem;">
      ${[
        ['🎒','Total Students', all.length,   '#2563eb'],
        ['👦','Male',           male,         '#0891b2'],
        ['👧','Female',         female,       '#7c3aed'],
        ['📉','Low Attendance', lowAttn,      lowAttn>0?'#ef4444':'#059669'],
        ['📊','Avg Attendance', avgAttn+'%',  '#d97706'],
      ].map(([icon,label,val,color]) => `
        <div style="background:#fff;border-radius:12px;padding:.9rem 1.1rem;
                    box-shadow:0 2px 8px rgba(0,0,0,.07);border-top:3px solid ${color};cursor:default;">
          <div style="font-size:1.2rem;">${icon}</div>
          <div style="font-size:1.5rem;font-weight:700;color:${color};line-height:1.2;">${val}</div>
          <div style="font-size:.75rem;color:#6b7280;margin-top:.1rem;">${label}</div>
        </div>`).join('')}
    </div>

    <!-- Toolbar -->
    <div style="display:flex;justify-content:space-between;align-items:flex-start;
                margin-bottom:1.25rem;flex-wrap:wrap;gap:.75rem;">
      <h2 style="margin:0;">Students
        <span style="font-size:.9rem;font-weight:400;color:#9ca3af;">(${list.length} of ${all.length})</span>
      </h2>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;">
        ${canManage ? `
          <button onclick="openStudentModal()" style="${btnStyle('primary')}">+ Add Student</button>
          <button onclick="openBulkStudentModal()" style="${btnStyle('info')}">⬆ Bulk Add</button>
          <button onclick="printStudentList()" style="${btnStyle('secondary')}">🖨 Print</button>
          <button onclick="seedStudentFixtures({count:40,force:false})" style="${btnStyle('secondary')}">🌱 Seed Fixtures</button>
        ` : ''}
      </div>
    </div>

    <!-- Filter bar -->
    <div style="background:#fff;border-radius:10px;padding:.85rem 1rem;
                box-shadow:0 2px 8px rgba(0,0,0,.06);margin-bottom:1.25rem;
                display:flex;flex-wrap:wrap;gap:.65rem;align-items:center;">
      <input id="student-search" placeholder="🔍 Search name, ID, parent…"
        value="${filter}" style="${inputStyle()};max-width:220px;padding:.45rem .75rem;font-size:.875rem;"
        oninput="renderStudents(this.value, _currentFilters)">
      <select onchange="renderStudents(_currentFilter,{..._currentFilters,cls:this.value})"
        style="${inputStyle()};max-width:140px;padding:.45rem .65rem;font-size:.85rem;">${classOpts}</select>
      <select onchange="renderStudents(_currentFilter,{..._currentFilters,arm:this.value})"
        style="${inputStyle()};max-width:100px;padding:.45rem .65rem;font-size:.85rem;">${armOpts}</select>
      <select onchange="renderStudents(_currentFilter,{..._currentFilters,gender:this.value})"
        style="${inputStyle()};max-width:110px;padding:.45rem .65rem;font-size:.85rem;">
        <option value="">All Genders</option>
        <option value="Male" ${filters.gender==='Male'?'selected':''}>Male</option>
        <option value="Female" ${filters.gender==='Female'?'selected':''}>Female</option>
      </select>
      <select onchange="renderStudents(_currentFilter,{..._currentFilters,attn:this.value})"
        style="${inputStyle()};max-width:150px;padding:.45rem .65rem;font-size:.85rem;">
        <option value="">All Attendance</option>
        <option value="low"  ${filters.attn==='low'?'selected':''}>⚠ Below 75%</option>
        <option value="good" ${filters.attn==='good'?'selected':''}>✅ 75% &amp; above</option>
      </select>
      ${(filter || Object.values(filters).some(Boolean))
        ? `<button onclick="renderStudents('',{})" style="${btnStyle('secondary')};font-size:.8rem;padding:.35rem .75rem;">✕ Clear</button>` : ''}
    </div>

    ${!canManage ? `<div style="${infoBanner()}">👁 View-only mode — Teachers can view student records but cannot add, edit, or delete.</div>` : ''}

    <!-- Table -->
    ${list.length === 0 && all.length === 0
      ? `<div style="background:#fff;border-radius:12px;padding:4rem 2rem;text-align:center;
                     box-shadow:0 2px 8px rgba(0,0,0,.07);">
           <div style="font-size:3rem;margin-bottom:1rem;">🎒</div>
           <h3 style="margin:0 0 .5rem;color:#374151;">No students yet</h3>
           <p style="color:#9ca3af;margin:0 0 1.5rem;">Add students manually or seed fixture data to get started.</p>
           ${canManage ? `<div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
             <button onclick="openStudentModal()" style="${btnStyle('primary')}">+ Add Student</button>
             <button onclick="seedStudentFixtures({count:40})" style="${btnStyle('secondary')}">🌱 Seed 40 Fixtures</button>
           </div>` : ''}
         </div>`
      : `<div style="overflow-x:auto;">
         <table style="${tableStyle()}">
           <thead><tr style="${thRowStyle()}">
             ${th('id','ID')}
             ${th('name','Student')}
             ${th('class','Class')}
             ${th('arm','Arm')}
             ${th('gender','Gender')}
             ${th('attendance','Attendance')}
             <th style="${thStyle()}">Actions</th>
           </tr></thead>
           <tbody>
             ${list.length ? list.map(s => studentRow(s, canManage)).join('')
               : `<tr><td colspan="7" style="text-align:center;padding:2.5rem;color:#9ca3af;">
                    No students match your filters.
                    <button onclick="renderStudents('',{})" style="margin-left:.5rem;${btnStyle('secondary')};font-size:.8rem;">Clear filters</button>
                  </td></tr>`}
           </tbody>
         </table></div>`
    }`;
}

/* ── Single table row ── */
function studentRow(s, canManage) {
  const initials = s.name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase();
  const avatarColor = stringToColor(s.name);
  const attnColor = s.attendance < 75 ? '#ef4444' : s.attendance < 90 ? '#f59e0b' : '#22c55e';

  return `<tr id="student-row-${s.id}" style="${trStyle()}" data-sid="${s.id}">
    <td style="${tdStyle()};font-family:monospace;font-size:.8rem;color:#6b7280;">${s.id}</td>
    <td style="${tdStyle()}">
      <div style="display:flex;align-items:center;gap:.65rem;">
        <div style="width:32px;height:32px;border-radius:50%;background:${avatarColor};
                    display:flex;align-items:center;justify-content:center;
                    font-size:.7rem;font-weight:700;color:#fff;flex-shrink:0;">${initials}</div>
        <div>
          <div style="font-weight:600;color:#1e3a5f;">${s.name}</div>
          <div style="font-size:.75rem;color:#9ca3af;">${s.parent||''}</div>
        </div>
      </div>
    </td>
    <td style="${tdStyle()}">${s.class}</td>
    <td style="${tdStyle()}"><span style="${badgeStyle('secondary')}">${s.arm}</span></td>
    <td style="${tdStyle()}">
      <span style="${badgeStyle(s.gender==='Female'?'info':'secondary')}">${s.gender}</span>
    </td>
    <td style="${tdStyle()};min-width:120px;">
      <div style="display:flex;align-items:center;gap:.5rem;">
        <div style="flex:1;background:#e5e7eb;border-radius:4px;height:7px;min-width:60px;">
          <div style="width:${s.attendance}%;height:100%;border-radius:4px;background:${attnColor};transition:width .3s;"></div>
        </div>
        <span style="font-size:.8rem;font-weight:700;color:${attnColor};min-width:36px;">${s.attendance}%</span>
      </div>
    </td>
    <td style="${tdStyle()}">
      <button onclick="viewStudent('${s.id}')" style="${btnStyle('info','sm')}">👁 View</button>
      ${canManage ? `
        <button onclick="editStudent('${s.id}')" style="${btnStyle('secondary','sm')}">✏ Edit</button>
        <button onclick="transferStudent('${s.id}')" style="${btnStyle('secondary','sm')}">🔀</button>
        <button onclick="deleteStudent('${s.id}')" style="${btnStyle('danger','sm')}">🗑</button>
      ` : ''}
    </td>
  </tr>`;
}

/** Deterministic pastel color from a string */
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const colors = ['#2563eb','#7c3aed','#059669','#d97706','#dc2626','#0891b2','#9333ea','#16a34a'];
  return colors[Math.abs(hash) % colors.length];
}


/* ══════════════════════════════════════════════════════════════════════════════
   VIEW STUDENT (tabbed profile)
══════════════════════════════════════════════════════════════════════════════ */
window.viewStudent = function (id) {
  const s       = App.data.students.find(st => st.id === id);
  const results = App.data.results.filter(r => r.studentId === id);
  const terms   = [...new Set(results.map(r => r.term))];

  const infoTab = () => `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      ${[
        ['Student ID', s.id],
        ['Full Name',  s.name],
        ['Class',      `${s.class} ${s.arm}`],
        ['Gender',     s.gender],
        ['Date of Birth', s.dob || '—'],
        ['Age',        s.dob ? calcAge(s.dob)+' years' : '—'],
        ['Parent/Guardian', s.parent || '—'],
        ['Phone',      s.phone || '—'],
        ['Attendance', s.attendance + '%'],
      ].map(([k,v]) => `
        <div style="background:#f9fafb;border-radius:8px;padding:.65rem .9rem;">
          <div style="font-size:.75rem;color:#9ca3af;margin-bottom:.15rem;">${k}</div>
          <div style="font-weight:600;color:#1e3a5f;">${v}</div>
        </div>`).join('')}
    </div>`;

  const resultsTab = () => results.length === 0
    ? `<div style="text-align:center;padding:2.5rem;color:#9ca3af;">
         <div style="font-size:2rem;margin-bottom:.5rem;">📋</div>
         <p style="margin:0;">No results recorded yet.</p>
       </div>`
    : terms.map(term => {
        const tr   = results.filter(r => r.term === term);
        const avg  = (tr.reduce((a,b)=>a+b.total,0)/tr.length).toFixed(1);
        return `
          <div style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.65rem;flex-wrap:wrap;gap:.5rem;">
              <strong style="color:#1e3a5f;">${term}</strong>
              <span style="${badgeStyle(parseFloat(avg)>=50?'success':'danger')}">Avg: ${avg}%</span>
            </div>
            <div style="overflow-x:auto;">
            <table style="${tableStyle()}font-size:.82rem;">
              <thead><tr style="${thRowStyle()}">
                <th style="${thStyle()}">Subject</th><th style="${thStyle()}">CA</th>
                <th style="${thStyle()}">Exam</th><th style="${thStyle()}">Total</th><th style="${thStyle()}">Grade</th>
              </tr></thead>
              <tbody>${tr.map(r=>`<tr style="${trStyle()}">
                <td style="${tdStyle()}">${r.subject}</td><td style="${tdStyle()}">${r.ca}</td>
                <td style="${tdStyle()}">${r.exam}</td><td style="${tdStyle()}"><strong>${r.total}</strong></td>
                <td style="${tdStyle()}"><span style="${badgeStyle(r.total>=50?'success':'danger')}">${grade(r.total).letter}</span></td>
              </tr>`).join('')}</tbody>
            </table></div>
          </div>`;
      }).join('');

  showModal(`
    <!-- Avatar header -->
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid #f3f4f6;">
      <div style="width:52px;height:52px;border-radius:50%;background:${stringToColor(s.name)};
                  display:flex;align-items:center;justify-content:center;font-size:1.1rem;
                  font-weight:700;color:#fff;flex-shrink:0;">
        ${s.name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase()}
      </div>
      <div>
        <h3 style="margin:0;">${s.name}</h3>
        <p style="margin:.2rem 0 0;font-size:.85rem;color:#6b7280;">${s.id} &nbsp;·&nbsp; ${s.class} ${s.arm}</p>
      </div>
    </div>

    <!-- Tabs -->
    <div style="display:flex;gap:.35rem;margin-bottom:1.25rem;">
      <button id="ptab-info"    onclick="switchProfileTab('info')"    style="${btnStyle('primary','sm')}">📋 Info</button>
      <button id="ptab-results" onclick="switchProfileTab('results')" style="${btnStyle('secondary','sm')}">📊 Results (${results.length})</button>
    </div>

    <div id="profile-info-panel">${infoTab()}</div>
    <div id="profile-results-panel" style="display:none;">${resultsTab()}</div>

    <div style="display:flex;justify-content:flex-end;gap:.75rem;margin-top:1.5rem;">
      ${priv.canManage() ? `<button onclick="closeModal();editStudent('${s.id}')" style="${btnStyle('secondary')}">✏ Edit</button>` : ''}
      <button onclick="closeModal()" style="${btnStyle('primary')}">Close</button>
    </div>`);
};

window.switchProfileTab = function (tab) {
  const panels = { info: 'profile-info-panel', results: 'profile-results-panel' };
  const btns   = { info: 'ptab-info', results: 'ptab-results' };
  Object.keys(panels).forEach(k => {
    document.getElementById(panels[k]).style.display = k === tab ? '' : 'none';
    document.getElementById(btns[k]).style.cssText   = btnStyle(k===tab?'primary':'secondary','sm');
  });
};

function calcAge(dob) {
  const d = new Date(dob), n = new Date();
  let age = n.getFullYear() - d.getFullYear();
  if (n.getMonth() < d.getMonth() || (n.getMonth()===d.getMonth() && n.getDate()<d.getDate())) age--;
  return age;
}


/* ══════════════════════════════════════════════════════════════════════════════
   ADD / EDIT STUDENT
══════════════════════════════════════════════════════════════════════════════ */
function openStudentModal(s = null) {
  if (!priv.canManage()) { denyAccess(); return; }
  const isEdit      = !!s;
  const classOpts   = App.data.classes.map(c =>
    `<option ${s?.class===c.name?'selected':''}>${c.name}</option>`).join('');
  const currentArms = (s ? App.data.classes.find(c=>c.name===s.class)?.arms
                         : App.data.classes[0]?.arms) || [];

  showModal(`
    <h3 style="margin:0 0 1.5rem;">${isEdit ? `✏ Edit — ${s.name}` : '➕ Add New Student'}</h3>
    <form id="student-form">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">

        <div style="grid-column:1/-1;">
          <label style="${labelStyle()}">Full Name <span style="color:#ef4444;">*</span></label>
          <input id="st-name" value="${s?.name||''}" placeholder="First Last"
            style="${inputStyle()}" required autocomplete="off">
          <div id="st-name-warn" style="color:#d97706;font-size:.8rem;margin-top:.2rem;display:none;"></div>
        </div>

        <div>
          <label style="${labelStyle()}">Class <span style="color:#ef4444;">*</span></label>
          <select id="st-class" style="${inputStyle()}" onchange="updateStudentModalArms()">${classOpts}</select>
        </div>
        <div>
          <label style="${labelStyle()}">Arm <span style="color:#ef4444;">*</span></label>
          <select id="st-arm" style="${inputStyle()}">
            ${currentArms.map(a=>`<option ${s?.arm===a?'selected':''}>${a}</option>`).join('')}
          </select>
        </div>

        <div>
          <label style="${labelStyle()}">Gender</label>
          <select id="st-gender" style="${inputStyle()}">
            <option ${s?.gender==='Male'?'selected':''}>Male</option>
            <option ${s?.gender==='Female'?'selected':''}>Female</option>
          </select>
        </div>
        <div>
          <label style="${labelStyle()}">Date of Birth</label>
          <input type="date" id="st-dob" value="${s?.dob||''}" style="${inputStyle()}">
        </div>

        <div>
          <label style="${labelStyle()}">Parent / Guardian</label>
          <input id="st-parent" value="${s?.parent||''}" placeholder="Name" style="${inputStyle()}">
        </div>
        <div>
          <label style="${labelStyle()}">Phone</label>
          <input id="st-phone" value="${s?.phone||''}" placeholder="080xxxxxxxx" style="${inputStyle()}">
        </div>

        ${isEdit ? `
        <div>
          <label style="${labelStyle()}">Attendance (%)</label>
          <input type="number" id="st-attendance" min="0" max="100"
            value="${s?.attendance??100}" style="${inputStyle()}">
        </div>` : ''}

        <div style="grid-column:1/-1;display:flex;gap:.75rem;justify-content:flex-end;margin-top:.5rem;">
          <button type="button" onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
          <button type="submit" style="${btnStyle('primary')}">${isEdit?'💾 Save Changes':'✅ Add Student'}</button>
        </div>
      </div>
    </form>`);

  /* Duplicate name check on blur */
  document.getElementById('st-name').addEventListener('blur', function() {
    const val     = this.value.trim().toLowerCase();
    const warnEl  = document.getElementById('st-name-warn');
    const dupes   = (App.data.students||[]).filter(st =>
      st.name.toLowerCase() === val && st.id !== s?.id);
    if (dupes.length) {
      warnEl.textContent = `⚠ A student named "${dupes[0].name}" already exists (${dupes[0].id}).`;
      warnEl.style.display = '';
    } else { warnEl.style.display = 'none'; }
  });

  document.getElementById('student-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('st-name').value.trim();
    if (!name) return toast('Full name is required.', 'error');

    const data = {
      name,
      class:      document.getElementById('st-class').value,
      arm:        document.getElementById('st-arm').value,
      gender:     document.getElementById('st-gender').value,
      dob:        document.getElementById('st-dob').value,
      parent:     document.getElementById('st-parent').value.trim(),
      phone:      document.getElementById('st-phone').value.trim(),
    };
    if (isEdit) {
      data.attendance = parseInt(document.getElementById('st-attendance').value) || s.attendance;
      Object.assign(s, data);
      toast('Student updated!', 'success');
    } else {
      data.attendance = 100;
      data.id = genStudentId();
      App.data.students.push(data);
      toast(`Student added! ID: ${data.id}`, 'success');
    }
    closeModal(); renderStudents(_currentFilter, _currentFilters);
    /* Highlight row */
    if (isEdit) {
      const row = document.getElementById(`student-row-${s.id}`);
      if (row) { row.style.background='#d1fae5'; setTimeout(()=>row.style.background='',1400); }
    }
  };
}

window.updateStudentModalArms = function () {
  const cls     = document.getElementById('st-class')?.value;
  const classData = App.data.classes.find(c => c.name === cls);
  const armSel  = document.getElementById('st-arm');
  if (armSel && classData) armSel.innerHTML = classData.arms.map(a=>`<option>${a}</option>`).join('');
};

window.editStudent = function (id) {
  if (!priv.canManage()) { denyAccess('Only Admins can edit students.'); return; }
  openStudentModal(App.data.students.find(st => st.id === id));
};


/* ══════════════════════════════════════════════════════════════════════════════
   TRANSFER STUDENT
══════════════════════════════════════════════════════════════════════════════ */
window.transferStudent = function (id) {
  if (!priv.canManage()) { denyAccess(); return; }
  const s        = App.data.students.find(st => st.id === id);
  const classOpts = App.data.classes.map(c =>
    `<option ${s.class===c.name?'selected':''}>${c.name}</option>`).join('');
  const currentArms = App.data.classes.find(c=>c.name===s.class)?.arms || [];

  showModal(`
    <h3 style="margin:0 0 .25rem;">Transfer Student</h3>
    <p style="color:#6b7280;font-size:.875rem;margin:0 0 1.5rem;">
      Moving <strong>${s.name}</strong> from <strong>${s.class} ${s.arm}</strong>
    </p>
    <label style="${labelStyle()}">New Class</label>
    <select id="transfer-class" style="${inputStyle()}" onchange="updateTransferArms()">${classOpts}</select>
    <label style="${labelStyle()}">New Arm</label>
    <select id="transfer-arm" style="${inputStyle()}">
      ${currentArms.map(a=>`<option ${s.arm===a?'selected':''}>${a}</option>`).join('')}
    </select>
    <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:flex-end;">
      <button onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
      <button onclick="confirmTransfer('${id}')" style="${btnStyle('primary')}">🔀 Transfer</button>
    </div>`);
};

window.updateTransferArms = function () {
  const cls     = document.getElementById('transfer-class')?.value;
  const classData = App.data.classes.find(c => c.name === cls);
  const armSel  = document.getElementById('transfer-arm');
  if (armSel && classData) armSel.innerHTML = classData.arms.map(a=>`<option>${a}</option>`).join('');
};

window.confirmTransfer = function (id) {
  const s      = App.data.students.find(st => st.id === id);
  const newCls = document.getElementById('transfer-class').value;
  const newArm = document.getElementById('transfer-arm').value;
  if (newCls === s.class && newArm === s.arm) { closeModal(); return; }
  const oldLabel = `${s.class} ${s.arm}`;
  s.class = newCls; s.arm = newArm;
  closeModal();
  renderStudents(_currentFilter, _currentFilters);
  toast(`${s.name} transferred from ${oldLabel} → ${newCls} ${newArm}.`, 'success');
};


/* ══════════════════════════════════════════════════════════════════════════════
   DELETE STUDENT
══════════════════════════════════════════════════════════════════════════════ */
window.deleteStudent = function (id) {
  if (!priv.canManage()) { denyAccess('Only Admins can delete students.'); return; }
  const s        = App.data.students.find(st => st.id === id);
  const resCount = (App.data.results||[]).filter(r => r.studentId === id).length;

  showModal(`
    <div style="text-align:center;padding:.5rem 0 1rem;">
      <div style="font-size:2.5rem;margin-bottom:.75rem;">🗑️</div>
      <h3 style="margin:0 0 .5rem;">Delete Student?</h3>
      <p style="color:#6b7280;margin:0;">
        Delete <strong>${s.name}</strong> (${s.id})?
      </p>
      ${resCount > 0 ? `
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;
                    padding:.6rem .9rem;margin:.85rem 0 0;font-size:.85rem;color:#991b1b;">
          ⚠ This will also delete <strong>${resCount} result record${resCount!==1?'s':''}</strong>.
        </div>` : ''}
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:center;">
        <button onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button onclick="confirmDeleteStudent('${id}')" style="${btnStyle('danger')}">Yes, Delete</button>
      </div>
    </div>`);
};

window.confirmDeleteStudent = function (id) {
  const s = App.data.students.find(st => st.id === id);
  App.data.students = App.data.students.filter(st => st.id !== id);
  if (App.data.results) App.data.results = App.data.results.filter(r => r.studentId !== id);
  closeModal();
  renderStudents(_currentFilter, _currentFilters);
  toast(`${s?.name||'Student'} deleted.`, 'warning');
};


/* ══════════════════════════════════════════════════════════════════════════════
   BULK ADD (CSV textarea + Excel upload)
══════════════════════════════════════════════════════════════════════════════ */
window.openBulkStudentModal = function () {
  if (!priv.canManage()) { denyAccess(); return; }
  const classOpts = App.data.classes.map(c => `<option>${c.name}</option>`).join('');

  showModal(`
    <h3 style="margin:0 0 .25rem;">Bulk Add Students</h3>
    <p style="color:#6b7280;font-size:.875rem;margin:0 0 1.25rem;">
      Choose an import method below.
    </p>

    <!-- Method tabs -->
    <div style="display:flex;gap:.35rem;margin-bottom:1.25rem;">
      <button id="btab-csv"   onclick="switchBulkTab('csv')"   style="${btnStyle('primary','sm')}">📋 CSV Text</button>
      <button id="btab-excel" onclick="switchBulkTab('excel')" style="${btnStyle('secondary','sm')}">📊 Excel File</button>
    </div>

    <!-- Class + Arm selectors (shared) -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
      <div><label style="${labelStyle()}">Class</label>
        <select id="bulk-class" style="${inputStyle()}" onchange="updateBulkArms()">${classOpts}</select>
      </div>
      <div><label style="${labelStyle()}">Arm</label>
        <select id="bulk-arm" style="${inputStyle()}">
          ${App.data.classes[0]?.arms.map(a=>`<option>${a}</option>`).join('')||''}
        </select>
      </div>
    </div>

    <!-- CSV tab -->
    <div id="bulk-tab-csv">
      <p style="font-size:.82rem;color:#6b7280;margin:0 0 .6rem;">
        Format: <code style="background:#f3f4f6;padding:.15rem .4rem;border-radius:4px;">
        Full Name, Gender, DOB (YYYY-MM-DD), Parent Name, Phone</code>
      </p>
      <textarea id="bulk-students-text" rows="9"
        style="${inputStyle()};resize:vertical;font-family:monospace;font-size:.83rem;"
        placeholder="Adaeze Okonkwo, Female, 2009-03-14, Mrs Okonkwo, 08012345678&#10;Emeka Eze, Male, 2010-07-22, Mr Eze, 08099887766"></textarea>
      <div id="bulk-csv-preview" style="margin-top:.65rem;"></div>
      <div style="display:flex;gap:.65rem;margin-top:1rem;justify-content:flex-end;flex-wrap:wrap;">
        <button onclick="previewBulkStudents()" style="${btnStyle('secondary')}">👁 Preview</button>
        <button onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button onclick="saveBulkStudents()" style="${btnStyle('primary')}">✅ Import</button>
      </div>
    </div>

    <!-- Excel tab -->
    <div id="bulk-tab-excel" style="display:none;">
      <div style="display:flex;align-items:center;justify-content:space-between;
                  flex-wrap:wrap;gap:.75rem;margin-bottom:1rem;">
        <p style="margin:0;font-size:.85rem;color:#6b7280;">Upload a .xlsx file with columns:<br>
          <code style="background:#f3f4f6;padding:.15rem .4rem;border-radius:4px;font-size:.8rem;">
          Name | Gender | DOB | Parent | Phone</code>
        </p>
        <button onclick="downloadStudentTemplate()" style="${btnStyle('secondary')};font-size:.82rem;">⬇ Template</button>
      </div>
      <div id="student-excel-drop"
        ondragover="event.preventDefault();this.style.borderColor='#2563eb';"
        ondragleave="this.style.borderColor='#d1d5db';"
        ondrop="handleStudentExcelDrop(event)"
        onclick="document.getElementById('student-excel-input').click()"
        style="border:2px dashed #d1d5db;border-radius:10px;padding:2rem;text-align:center;
               background:#f9fafb;cursor:pointer;transition:border-color .2s;">
        <div style="font-size:2rem;margin-bottom:.4rem;">📊</div>
        <p style="margin:0;font-weight:600;color:#374151;font-size:.9rem;">Click or drag &amp; drop Excel file</p>
        <p style="margin:.2rem 0 0;font-size:.78rem;color:#9ca3af;">.xlsx / .xls only</p>
      </div>
      <input type="file" id="student-excel-input" accept=".xlsx,.xls"
        style="display:none" onchange="handleStudentExcelSelect(this)">
      <div id="student-excel-info" style="margin-top:.65rem;"></div>
      <div id="student-excel-preview" style="margin-top:.65rem;"></div>
      <div style="display:flex;gap:.65rem;margin-top:1rem;justify-content:flex-end;flex-wrap:wrap;">
        <button onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button id="btn-import-students" onclick="saveExcelStudents()"
          style="${btnStyle('primary')}" disabled>✅ Import</button>
      </div>
    </div>`);

  /* initialise arm dropdown */
  updateBulkArms();
};

window.switchBulkTab = function (tab) {
  document.getElementById('bulk-tab-csv').style.display   = tab==='csv'   ? '' : 'none';
  document.getElementById('bulk-tab-excel').style.display = tab==='excel' ? '' : 'none';
  document.getElementById('btab-csv').style.cssText   = btnStyle(tab==='csv'?'primary':'secondary','sm');
  document.getElementById('btab-excel').style.cssText = btnStyle(tab==='excel'?'primary':'secondary','sm');
};

window.updateBulkArms = function () {
  const cls = document.getElementById('bulk-class')?.value;
  const classData = App.data.classes.find(c => c.name === cls);
  const armSel = document.getElementById('bulk-arm');
  if (armSel && classData) armSel.innerHTML = classData.arms.map(a=>`<option>${a}</option>`).join('');
};

window.previewBulkStudents = function () {
  const lines   = document.getElementById('bulk-students-text').value.trim().split('\n').filter(Boolean);
  const preview = document.getElementById('bulk-csv-preview');
  const parsed  = lines.map((line, i) => {
    const p = line.split(',').map(x=>x.trim());
    return { ok: !!p[0], num: i+1, name: p[0]||'', gender: p[1]||'Male', dob: p[2]||'' };
  });
  const valid = parsed.filter(p=>p.ok).length;
  preview.innerHTML = `
    <div style="background:#f9fafb;border-radius:8px;padding:.85rem 1rem;max-height:180px;overflow-y:auto;">
      <p style="margin:0 0 .4rem;font-size:.82rem;font-weight:600;">${parsed.length} row(s) — ${valid} valid, ${parsed.length-valid} invalid:</p>
      ${parsed.map(p=>`<div style="font-size:.8rem;color:${p.ok?'#374151':'#ef4444'};">
        ${p.ok?'✔':'✘'} ${p.num}. ${p.name||'(empty)'} &nbsp;·&nbsp; ${p.gender}
      </div>`).join('')}
    </div>`;
};

window.saveBulkStudents = function () {
  if (!priv.canManage()) { denyAccess(); return; }
  const cls   = document.getElementById('bulk-class').value;
  const arm   = document.getElementById('bulk-arm').value;
  const lines = document.getElementById('bulk-students-text').value.trim().split('\n').filter(Boolean);
  let added   = 0;
  lines.forEach(line => {
    const p = line.split(',').map(x=>x.trim());
    if (!p[0]) return;
    App.data.students.push({
      id: genStudentId(), name: p[0], class: cls, arm,
      gender: p[1]||'Male', dob: p[2]||'', parent: p[3]||'', phone: p[4]||'', attendance: 100,
    });
    added++;
  });
  closeModal(); renderStudents(_currentFilter, _currentFilters);
  toast(`${added} student${added!==1?'s':''} added!`, 'success');
};


/* ── Excel student import ── */
window.handleStudentExcelDrop = function (e) {
  e.preventDefault();
  document.getElementById('student-excel-drop').style.borderColor='#d1d5db';
  if (e.dataTransfer.files[0]) processStudentExcel(e.dataTransfer.files[0]);
};
window.handleStudentExcelSelect = function (input) {
  if (input.files[0]) processStudentExcel(input.files[0]);
};

function processStudentExcel(file) {
  const info = document.getElementById('student-excel-info');
  if (typeof XLSX === 'undefined') {
    info.innerHTML = `<p style="color:#ef4444;font-size:.85rem;">⚠ SheetJS (XLSX) library not loaded.</p>`; return;
  }
  info.innerHTML = `<p style="color:#6b7280;font-size:.83rem;">⏳ Reading ${file.name}…</p>`;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const wb    = XLSX.read(e.target.result, { type:'array' });
      const ws    = wb.Sheets[wb.SheetNames[0]];
      const rows  = XLSX.utils.sheet_to_json(ws, { defval:'' });

      const get = (row, ...keys) => {
        for (const k of keys) {
          const match = Object.keys(row).find(rk=>rk.toLowerCase().includes(k.toLowerCase()));
          if (match) return String(row[match]).trim();
        } return '';
      };

      const parsed = rows.map((row,i) => {
        const name = get(row,'name','full');
        return { ok: !!name, num:i+2, name, gender: get(row,'gender')||'Male',
                 dob: get(row,'dob','birth','date'), parent: get(row,'parent','guardian'),
                 phone: get(row,'phone','tel') };
      });
      window._parsedStudentExcel = parsed;

      const valid = parsed.filter(p=>p.ok).length;
      info.innerHTML = `<p style="font-size:.83rem;color:#374151;">✅ ${file.name} — ${parsed.length} row(s) found.</p>`;
      document.getElementById('btn-import-students').disabled = valid === 0;

      document.getElementById('student-excel-preview').innerHTML = `
        <div style="background:#f9fafb;border-radius:8px;padding:.85rem;max-height:200px;overflow-y:auto;">
          <p style="margin:0 0 .4rem;font-size:.82rem;font-weight:600;">${valid} valid · ${parsed.length-valid} invalid</p>
          ${parsed.map(p=>`<div style="font-size:.8rem;color:${p.ok?'#374151':'#ef4444'};">
            ${p.ok?'✔':'✘'} ${p.num}. ${p.name||'(empty)'} &nbsp;·&nbsp; ${p.gender}
          </div>`).join('')}
        </div>`;
    } catch(err) {
      info.innerHTML = `<p style="color:#ef4444;font-size:.83rem;">⚠ ${err.message}</p>`;
    }
  };
  reader.readAsArrayBuffer(file);
}

window.saveExcelStudents = function () {
  if (!priv.canManage()) { denyAccess(); return; }
  const cls    = document.getElementById('bulk-class').value;
  const arm    = document.getElementById('bulk-arm').value;
  const rows   = (window._parsedStudentExcel||[]).filter(p=>p.ok);
  if (!rows.length) { toast('No valid rows to import.', 'warning'); return; }
  rows.forEach(p => {
    App.data.students.push({
      id: genStudentId(), name: p.name, class: cls, arm,
      gender: p.gender, dob: p.dob, parent: p.parent, phone: p.phone, attendance: 100,
    });
  });
  window._parsedStudentExcel = null;
  closeModal(); renderStudents(_currentFilter, _currentFilters);
  toast(`${rows.length} student${rows.length!==1?'s':''} imported!`, 'success');
};

/** Download a minimal Excel template for bulk student import */
window.downloadStudentTemplate = function () {
  if (typeof XLSX === 'undefined') {
    toast('SheetJS not loaded.', 'error'); return;
  }
  const wb  = XLSX.utils.book_new();
  const ws  = XLSX.utils.aoa_to_sheet([
    ['Name *','Gender','DOB (YYYY-MM-DD)','Parent / Guardian','Phone'],
    ['Adaeze Okonkwo','Female','2009-03-14','Mrs Okonkwo','08012345678'],
    ['Emeka Eze','Male','2010-07-22','Mr Eze','08099887766'],
  ]);
  ws['!cols'] = [{wch:24},{wch:10},{wch:18},{wch:22},{wch:16}];
  XLSX.utils.book_append_sheet(wb, ws, 'Students');
  XLSX.writeFile(wb, 'students_template.xlsx');
  toast('Template downloaded!', 'success');
};


/* ══════════════════════════════════════════════════════════════════════════════
   PRINT
══════════════════════════════════════════════════════════════════════════════ */
window.printStudentList = function () {
  const students = App.data.students || [];
  const rows     = students.map((s,i) => `
    <tr>
      <td>${i+1}</td><td>${s.id}</td><td>${s.name}</td>
      <td>${s.class} ${s.arm}</td><td>${s.gender}</td><td>${s.attendance}%</td>
    </tr>`).join('');

  const win = window.open('','_blank');
  win.document.write(`
    <html><head><title>Student List</title>
    <style>
      body{font-family:Arial,sans-serif;font-size:12px;padding:20px;}
      h2{margin-bottom:4px;} p{color:#666;margin:0 0 16px;}
      table{width:100%;border-collapse:collapse;}
      th,td{border:1px solid #ddd;padding:6px 10px;text-align:left;}
      th{background:#f3f4f6;font-weight:600;}
      tr:nth-child(even){background:#fafafa;}
      @media print{button{display:none;}}
    </style></head><body>
    <h2>Student List — ${App.data.schoolInfo?.name||'School'}</h2>
    <p>Generated: ${new Date().toLocaleString()} &nbsp;|&nbsp; Total: ${students.length}</p>
    <button onclick="window.print()" style="margin-bottom:12px;padding:6px 14px;cursor:pointer;">🖨 Print</button>
    <table>
      <thead><tr><th>#</th><th>ID</th><th>Name</th><th>Class</th><th>Gender</th><th>Attendance</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    </body></html>`);
  win.document.close();
};

/* ─────────────────────────────────────────
   10. TEACHERS / STAFF  (Admin only)
───────────────────────────────────────── */
function renderTeachers(filter = '') {
  if (!priv.canManage()) { accessDeniedPage('teachers'); return; }

  const section = document.getElementById('teachers');
  const list = filter
    ? App.data.teachers.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()) || t.subject.toLowerCase().includes(filter.toLowerCase()))
    : App.data.teachers;

  section.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:1rem;">
      <h2 style="margin:0;">Staff (${App.data.teachers.length})</h2>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
        <input id="teacher-search" placeholder="Search staff…" value="${filter}" style="${inputStyle('sm')}" oninput="renderTeachers(this.value)">
        <button onclick="openTeacherModal()" style="${btnStyle('primary')}">+ Add Staff</button>
      </div>
    </div>
    <div style="overflow-x:auto;">
    <table style="${tableStyle()}">
      <thead><tr style="${thRowStyle()}">
        <th style="${thStyle()}">ID</th><th style="${thStyle()}">Name</th><th style="${thStyle()}">Subject</th>
        <th style="${thStyle()}">Class</th><th style="${thStyle()}">Arm</th><th style="${thStyle()}">Status</th>
        <th style="${thStyle()}">Actions</th>
      </tr></thead>
      <tbody>
        ${list.map(t => `
          <tr style="${trStyle()}">
            <td style="${tdStyle()}">${t.id}</td><td style="${tdStyle()}">${t.name}</td>
            <td style="${tdStyle()}">${t.subject}</td><td style="${tdStyle()}">${t.class}</td>
            <td style="${tdStyle()}">${t.arm||'-'}</td>
            <td style="${tdStyle()}"><span style="${badgeStyle(t.status==='Active'?'success':'warning')}">${t.status}</span></td>
            <td style="${tdStyle()}">
              <button onclick="editTeacher('${t.id}')" style="${btnStyle('secondary','sm')}">Edit</button>
              <button onclick="deleteTeacher('${t.id}')" style="${btnStyle('danger','sm')}">Del</button>
            </td>
          </tr>`).join('')}
      </tbody>
    </table></div>`;
}

window.editTeacher = function(id) {
  if (!priv.canManage() && denyAccess()) return;
  openTeacherModal(App.data.teachers.find(t => t.id === id));
};
window.deleteTeacher = function(id) {
  if (!priv.canManage() && denyAccess()) return;
  if (!confirmDlg('Delete this staff member?')) return;
  App.data.teachers = App.data.teachers.filter(t => t.id !== id); renderTeachers(); toast('Staff deleted.', 'warning');
};

function openTeacherModal(t = null) {
  if (!priv.canManage() && denyAccess()) return;
  const isEdit = !!t;
  const subjOpts = App.data.subjects.map(s => `<option ${t?.subject===s.name?'selected':''}>${s.name}</option>`).join('');
  const clsOpts  = App.data.classes.map(c => `<option ${t?.class===c.name?'selected':''}>${c.name}</option>`).join('');
  const selCls   = t ? App.data.classes.find(c => c.name===t.class) : App.data.classes[0];
  const armOpts  = selCls?.arms.map(a => `<option ${t?.arm===a?'selected':''}>${a}</option>`).join('') || '';

  showModal(`
    <h3 style="margin:0 0 1.5rem;">${isEdit?'Edit Staff Member':'Add New Staff Member'}</h3>
    <form id="teacher-form" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      <div><label style="${labelStyle()}">Full Name</label><input id="tc-name" value="${t?.name||''}" style="${inputStyle()}" required></div>
      <div><label style="${labelStyle()}">Subject</label><select id="tc-subject" style="${inputStyle()}">${subjOpts}</select></div>
      <div><label style="${labelStyle()}">Class</label><select id="tc-class" style="${inputStyle()}" onchange="updateTeacherArms()">${clsOpts}</select></div>
      <div><label style="${labelStyle()}">Arm</label><select id="tc-arm" style="${inputStyle()}">${armOpts}</select></div>
      <div><label style="${labelStyle()}">Phone</label><input id="tc-phone" value="${t?.phone||''}" style="${inputStyle()}"></div>
      <div><label style="${labelStyle()}">Email</label><input id="tc-email" value="${t?.email||''}" type="email" style="${inputStyle()}"></div>
      <div><label style="${labelStyle()}">Status</label>
        <select id="tc-status" style="${inputStyle()}">
          <option ${t?.status==='Active'?'selected':''}>Active</option>
          <option ${t?.status==='On Leave'?'selected':''}>On Leave</option>
          <option ${t?.status==='Resigned'?'selected':''}>Resigned</option>
        </select>
      </div>
      <div style="grid-column:1/-1;display:flex;gap:.75rem;justify-content:flex-end;margin-top:.5rem;">
        <button type="button" onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button type="submit" style="${btnStyle('primary')}">${isEdit?'Save':'Add Staff'}</button>
      </div>
    </form>`);

  window.updateTeacherArms = function() {
    const cls = document.getElementById('tc-class')?.value;
    const classData = App.data.classes.find(c => c.name === cls);
    const armSel = document.getElementById('tc-arm');
    if (armSel && classData) armSel.innerHTML = classData.arms.map(a=>`<option>${a}</option>`).join('');
  };
  document.getElementById('teacher-form').onsubmit = (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('tc-name').value.trim(),
      subject: document.getElementById('tc-subject').value,
      class: document.getElementById('tc-class').value,
      arm: document.getElementById('tc-arm').value,
      phone: document.getElementById('tc-phone').value,
      email: document.getElementById('tc-email').value,
      status: document.getElementById('tc-status').value,
    };
    if (!data.name) return toast('Name required.', 'error');
    if (isEdit) { Object.assign(t, data); toast('Staff updated!', 'success'); }
    else { App.data.teachers.push({ id: makeId('T', App.data.teachers), role: 'Teacher', ...data }); toast('Staff added!', 'success'); }
    closeModal(); renderTeachers();
  };
}

/* ─────────────────────────────────────────
   11. SUBJECTS  (Admin only)
───────────────────────────────────────── */
function renderSubjects() {
  if (!priv.canManage()) { accessDeniedPage('subjects'); return; }

  const section = document.getElementById('subjects');
  const types = [...new Set(App.data.subjects.map(s => s.type))];
  section.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
      <h2 style="margin:0;">Subjects (${App.data.subjects.length})</h2>
      <button onclick="openSubjectModal()" style="${btnStyle('primary')}">+ Add Subject</button>
    </div>
    ${types.map(type => `
      <div style="background:#fff;border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:1rem;box-shadow:0 2px 8px rgba(0,0,0,.07);">
        <h4 style="margin:0 0 .75rem;color:#374151;">${type}</h4>
        <div style="display:flex;flex-wrap:wrap;gap:.5rem;">
          ${App.data.subjects.filter(s=>s.type===type).map(s=>`
            <div style="display:flex;align-items:center;gap:.4rem;background:#f3f4f6;border-radius:8px;padding:.4rem .9rem;font-size:.875rem;">
              <span style="font-weight:600;">${s.name}</span>
              <span style="color:#9ca3af;font-size:.75rem;">(${s.code})</span>
              <span style="${badgeStyle(s.level==='All'?'info':s.level==='Senior'?'success':'warning')}">${s.level}</span>
              <button onclick="deleteSubject(${s.id})" style="background:none;border:none;color:#ef4444;cursor:pointer;">×</button>
            </div>`).join('')}
        </div>
      </div>`).join('')}`;
}

window.deleteSubject = function(id) {
  if (!priv.canManage() && denyAccess()) return;
  if (!confirmDlg('Remove this subject?')) return;
  App.data.subjects = App.data.subjects.filter(s => s.id !== id); renderSubjects(); toast('Subject removed.', 'warning');
};

function openSubjectModal() {
  if (!priv.canManage() && denyAccess()) return;
  showModal(`
    <h3 style="margin:0 0 1.5rem;">Add New Subject</h3>
    <form id="subj-form">
      <label style="${labelStyle()}">Subject Name</label><input id="sb-name" style="${inputStyle()}" required placeholder="e.g. Economics">
      <label style="${labelStyle()}">Code</label><input id="sb-code" style="${inputStyle()}" required placeholder="e.g. ECO" maxlength="4">
      <label style="${labelStyle()}">Level</label>
      <select id="sb-level" style="${inputStyle()}"><option>All</option><option>Junior</option><option>Senior</option></select>
      <label style="${labelStyle()}">Type</label>
      <select id="sb-type" style="${inputStyle()}">
        <option>Core</option><option>Science</option><option>Arts</option><option>Commercial</option><option>Vocational</option><option>Language</option>
      </select>
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:flex-end;">
        <button type="button" onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button type="submit" style="${btnStyle('primary')}">Add Subject</button>
      </div>
    </form>`);
  document.getElementById('subj-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('sb-name').value.trim();
    const code = document.getElementById('sb-code').value.trim().toUpperCase();
    if (!name || !code) return toast('All fields required.', 'error');
    App.data.subjects.push({ id: Date.now(), name, code, level: document.getElementById('sb-level').value, type: document.getElementById('sb-type').value });
    closeModal(); renderSubjects(); toast('Subject added!', 'success');
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   12. RESULTS  (improved – Excel bulk entry + template download)
   Admin   → enter results for any class
   Teacher → enter results for assigned class/arm only
   Parent  → view their child's results only (read-only)
───────────────────────────────────────────────────────────────────────────── */

/* ── EMBEDDED EXCEL TEMPLATE (base64) ──────────────────────────────────────
   Generated from a pre-built openpyxl workbook with:
     • Instructions sheet with colour-coded guide
     • Results Entry sheet with dropdowns, auto-calculated Total/Grade/Remark
     • 500 blank rows ready to fill
   ─────────────────────────────────────────────────────────────────────────── */
const RESULTS_TEMPLATE_B64 = "UEsDBBQAAAAIAHuCWVxGx01IlQAAAM0AAAAQAAAAZG9jUHJvcHMvYXBwLnhtbE3PTQvCMAwG4L9SdreZih6kDkQ9ip68zy51hbYpbYT67+0EP255ecgboi6JIia2mEXxLuRtMzLHDUDWI/o+y8qhiqHke64x3YGMsRoPpB8eA8OibdeAhTEMOMzit7Dp1C5GZ3XPlkJ3sjpRJsPiWDQ6sScfq9wcChDneiU+ixNLOZcrBf+LU8sVU57mym/8ZAW/B7oXUEsDBBQAAAAIAHuCWVwz0BHp7wAAACsCAAARAAAAZG9jUHJvcHMvY29yZS54bWzNks9OwzAMh18F5d666Vgloi4XECeQkJgE4hYl3hat+aPEqN3b05atE4IH4Bj7l8+fJbc6Ch0SvqQQMZHFfDO4zmeh44YdiKIAyPqATuVyTPixuQvJKRqfaQ9R6aPaI9RV1YBDUkaRgglYxIXIZGu00AkVhXTGG73g42fqZpjRgB069JSBlxyYnCbG09C1cAVMMMLk8ncBzUKcq39i5w6wc3LIdkn1fV/2qzk37sDh/fnpdV63sD6T8hrHX9kKOkXcsMvkt9X9w/aRybqqm6Kqi3q95Y3gd2J9+zG5/vC7Crtg7M7+Y+OLoGzh113IL1BLAwQUAAAACAB7gllcmVycIxAGAACcJwAAEwAAAHhsL3RoZW1lL3RoZW1lMS54bWztWltz2jgUfu+v0Hhn9m0LxjaBtrQTc2l227SZhO1OH4URWI1seWSRhH+/RzYQy5YN7ZJNups8BCzp+85FR+foOHnz7i5i6IaIlPJ4YNkv29a7ty/e4FcyJBFBMBmnr/DACqVMXrVaaQDDOH3JExLD3IKLCEt4FMvWXOBbGi8j1uq0291WhGlsoRhHZGB9XixoQNBUUVpvXyC05R8z+BXLVI1lowETV0EmuYi08vlsxfza3j5lz+k6HTKBbjAbWCB/zm+n5E5aiOFUwsTAamc/VmvH0dJIgILJfZQFukn2o9MVCDINOzqdWM52fPbE7Z+Mytp0NG0a4OPxeDi2y9KLcBwE4FG7nsKd9Gy/pEEJtKNp0GTY9tqukaaqjVNP0/d93+ubaJwKjVtP02t33dOOicat0HgNvvFPh8Ouicar0HTraSYn/a5rpOkWaEJG4+t6EhW15UDTIABYcHbWzNIDll4p+nWUGtkdu91BXPBY7jmJEf7GxQTWadIZljRGcp2QBQ4AN8TRTFB8r0G2iuDCktJckNbPKbVQGgiayIH1R4Ihxdyv/fWXu8mkM3qdfTrOa5R/aasBp+27m8+T/HPo5J+nk9dNQs5wvCwJ8fsjW2GHJ247E3I6HGdCfM/29pGlJTLP7/kK6048Zx9WlrBdz8/knoxyI7vd9lh99k9HbiPXqcCzIteURiRFn8gtuuQROLVJDTITPwidhphqUBwCpAkxlqGG+LTGrBHgE323vgjI342I96tvmj1XoVhJ2oT4EEYa4pxz5nPRbPsHpUbR9lW83KOXWBUBlxjfNKo1LMXWeJXA8a2cPB0TEs2UCwZBhpckJhKpOX5NSBP+K6Xa/pzTQPCULyT6SpGPabMjp3QmzegzGsFGrxt1h2jSPHr+BfmcNQockRsdAmcbs0YhhGm78B6vJI6arcIRK0I+Yhk2GnK1FoG2camEYFoSxtF4TtK0EfxZrDWTPmDI7M2Rdc7WkQ4Rkl43Qj5izouQEb8ehjhKmu2icVgE/Z5ew0nB6ILLZv24fobVM2wsjvdH1BdK5A8mpz/pMjQHo5pZCb2EVmqfqoc0PqgeMgoF8bkePuV6eAo3lsa8UK6CewH/0do3wqv4gsA5fy59z6XvufQ9odK3NyN9Z8HTi1veRm5bxPuuMdrXNC4oY1dyzcjHVK+TKdg5n8Ds/Wg+nvHt+tkkhK+aWS0jFpBLgbNBJLj8i8rwKsQJ6GRbJQnLVNNlN4oSnkIbbulT9UqV1+WvuSi4PFvk6a+hdD4sz/k8X+e0zQszQ7dyS+q2lL61JjhK9LHMcE4eyww7ZzySHbZ3oB01+/ZdduQjpTBTl0O4GkK+A226ndw6OJ6YkbkK01KQb8P56cV4GuI52QS5fZhXbefY0dH758FRsKPvPJYdx4jyoiHuoYaYz8NDh3l7X5hnlcZQNBRtbKwkLEa3YLjX8SwU4GRgLaAHg69RAvJSVWAxW8YDK5CifEyMRehw55dcX+PRkuPbpmW1bq8pdxltIlI5wmmYE2eryt5lscFVHc9VW/Kwvmo9tBVOz/5ZrcifDBFOFgsSSGOUF6ZKovMZU77nK0nEVTi/RTO2EpcYvOPmx3FOU7gSdrYPAjK5uzmpemUxZ6by3y0MCSxbiFkS4k1d7dXnm5yueiJ2+pd3wWDy/XDJRw/lO+df9F1Drn723eP6bpM7SEycecURAXRFAiOVHAYWFzLkUO6SkAYTAc2UyUTwAoJkphyAmPoLvfIMuSkVzq0+OX9FLIOGTl7SJRIUirAMBSEXcuPv75Nqd4zX+iyBbYRUMmTVF8pDicE9M3JD2FQl867aJguF2+JUzbsaviZgS8N6bp0tJ//bXtQ9tBc9RvOjmeAes4dzm3q4wkWs/1jWHvky3zlw2zreA17mEyxDpH7BfYqKgBGrYr66r0/5JZw7tHvxgSCb/NbbpPbd4Ax81KtapWQrET9LB3wfkgZjjFv0NF+PFGKtprGtxtoxDHmAWPMMoWY434dFmhoz1YusOY0Kb0HVQOU/29QNaPYNNByRBV4xmbY2o+ROCjzc/u8NsMLEjuHti78BUEsDBBQAAAAIAHuCWVwADWJM+wQAAEIUAAAYAAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sjZh5b9s6DMC/CpEB6wYMteUkzrEmQM62WC/k2PD+dBMl0ZttpZK8tt/+UbaTtnuyFKBNIlGk+NNBErp45uK33FGq4CWJU9mr7ZTadz1PrnY0ieQ539MUJRsukkhhU2w9uRc0WudKSewFvh96ScTSWv8i73sQ/QueqZil9EGAzJIkEq9DGvPnXo3UDh0ztt0p3eH1L/bRls6pWu4fBLa8o5U1S2gqGU9B0E2vNiTdcRBohXzET0af5bvfoFEeOf+tG9frXs3XHtGYrpQ2EeHXHzqicdyrDbQfT7nRQe6Bd7Ty/vfB+jSHR5jHSNIRj3+xtdr1au0arOkmymI1489XtARqansrHsv8E56LsY0arDKpeFLqogMJS4vv6KVch3fjg7BCISgVgr8UQr9CoV4q1P+eoUqhUSo08oUpSPJlGEcq6l8I/gwiH61x6+2DleMC4Kqv9IihXuR8IPayVJ+HuRIoZWhQ9T9/IkE78IPvALPJfHmzmMNwefMDJneL2T/w+VM7IChbTG4fbgaLCVwur8eTC0+hS1rfW5WzjIpZgnwWfQaPkrFJ4qH7R4Z6wYBnqpKhntuoVzBc3f+CxT0s50bPCt2GwTOT5INnDbdnjdxGs8KzuaJ7ICavCr2wQu+Sg8K/HYWzGZV4tCVMUiVez6AIElG6hg2LY2ApvPJMwBoPxblhnnExT6uaselmbLoZAxNj08o4V9mapup6DAnOi4ddrXZAXzBAwPVYajLNjwGQ422Rr1LRBL7Q8+05zK9Gnu+Tr0bgpgs4dAOHbuC6CTi0Ao8GSMMF7YJfXCzyHRr+OcDkJUr+Lwp9I1/o4mu5+VpuvoaJr2XlW1CRFHv5SIGn+L/pwpQJ7NCibzCnK44Ht2gsdkwUv42YLRdm243ZdmM2TZht+7mlMk+GRS7uAgbPJqbfIDRhtF0YHTdGx41hmnvUsWNEfyjeMCZ1IKF5RMn2MY/WwBRkkqXbIv5cJ3suFJ7RFY3P4DFTiqfGHeu4UInvZtVjLJF+dH+zvL3DTDWdzCZ3I3Mm8isDvlH00Udygo9FRmtX+Dg43uAywmE4M/pJrPuzTNlThvGvtMH0J9swKgC+CPqUMUHXX037UNq1bURwAmRghRy+QWaP/2JtZyQM7Cew0IQ0SqgTKnBCnVBGkLoVanSEwlA91/HYSFW3R3mO+5RmPJMwkBJjBRbP6puu5TDYOzHrTswTahLSsGKOj5h54qkGtdcoWpmlUV7V58mrgAzdkM6ahJxQlJCmFXJyhNQpxohnL0/eEhd47zMXtt5SlxPVWY2QE8oRElpRp293sUhNRlp7bTJYRWuasBXIMrvlhdYxtTk5nVUJOaEsIS1r8L+cDcbXd5cwHw1uzJG/VR35TaKPDp5QUJAinXcqIz98aTXLzSC+b1qqUWlDp6KKa4WJNsaYYVznUplYOE6oKEjHyjFEjvDA0WqYMTp2jJ9UvMIl52sjRseJEZxQLAS+FWOEGM0DRmjGKE1UYlQRHPRsBCeUEgGxEoyRoHEgaFYQEDvBQySlkYC4CU6oE4LASjBFAr8EaFQABHaAacRiI0BQDeC9eylJqNjmD04SVjxLlY4C73oPj1p+V5eHnkGCAmN/q6vDikFS747zZx7vberide02EluWSojpBt3wz1uYHkSxokVD8X3+VPPIscxOiucdipFZ6AEo33CuDg09wfHZsP8fUEsDBBQAAAAIAHuCWVySushEgn8AAJOoBAAYAAAAeGwvd29ya3NoZWV0cy9zaGVldDIueG1spN1d02a3eSXmv9LFg5Q1VMLGNzCRVGVtPoBUsV0uyZ5UDttUS2LMDw3Zsuz8+mw0G3s/eBaw8DE5mLj3et/7vkUse1xX1TR/8bfvf/j3H//8/v2HN//57Tff/fjLz/784cNf/vsXX/z41Z/ff/vux//j+7+8/+5M/vj9D9+++3D+8Yc/ffHjX354/+4PH3/p22++kG/f2i++fff1d5/96hcfv/3zD7/6xfd//fDN19+9/+cf3vz412+/fffDf/36/Tff/+2Xn4nPyoffff2nP3/IH7741S/+8u5P73///sO//uWffzj/9MU15Q9ff/v+ux+//v67Nz+8/+MvP/t78d9/a97K/Bsff+R/fP3+bz8+/ddv8n+Wf/v++3/Pf/jtH3752dvP8uzv3r/5r9//5Zuvz23yszcfvv/LP7z/44fj/TffnBPVZ2/effXh6/94/8/nj/3ys3/7/sOH77/N+Xnnh3cfzk9//OH7/+/9dx93vv/m/fmz5zV/gR/+acinofk/5P/8dPFn13+gfNTzf10ujx//yZ7/pP7t3Y/vj++/+b+//sOHP//yM//Zmz+8/+O7v37z4Xff/+037z/90zJ53lfff/Pjx//zzd9++llhP3vz1V9/PK/59MvnBd9+/d1P//93//npn/LTL8jeL8hPvyBffkHozi+oT7+gZn9Bf/oF/foLvvML5tMvmNdf6P1nsJ9+wb7+guz8gvv0C272P4P/9At+9j9D+PQL4WMdfnq/j4//5bsP7371ix++/9ubHz7+dH5kda29nv3s8Vf5Jz5W66f/JOfnr7/L/z32+w8/nPHX58QPv/r9v/zrl49/+pc3v3v8/l//4V9+/+bX//oP/9eb88Pv/p9ffPHh3Jx/6ouvPg379U/DfpqV/7v3So5u8mU3eXST2E1SN/lNN/ltK/ni/Cd4/WOUP/1jvDuO/xjlT/8YVe8f44e//uH9dx/e/PbLN/+t9Q9u9Ot//bf/9/yfFM3fPQa/e/z9m99/9f0P79/8tzd/9/Z/129/1pjx5WDG4z/fffs8xTanPAZT/uX9D982/yPE0X/89z9+/J/Zrd9Nn35X95Z+/+HdN43f+83g99IP7/7wvvF7vx383u/O/zvuh3+vf7Eqk/pUprf9MqmfVpjeP47fHF+8fStaPRr85j+++5D/7+APX3/1Y6tJn37bXv+d8B+/UuYXX/zHc1MaP2NefuZR/QxeEb/+4ccPb3IbWl0Y/LJ8K835vyFI2+rCp99150//8Ve/jX/39//05d/99vf/9K//+OvH7/7uUD/7+fWHL9XPfvbzf/ztP51fP/9S/Vy8ffuzn3/22dnqP+b/RPV/nt+8jk3ql599dv74zz/+1//bnz78n7905uef/f3zB3t++PXzB3N+OJ4/6PPDl+eY+NnP8v/XXP3bydWP//zq/N8Uzv8J83rC/3j/w3+9Sd9//4fXU16/5Wv++d2PP+aD3n39Tfumqsh6XGQ9U2TZKvLgNx/f/embr3/885t/ePfdn/56/u96rTbrRpvfvrS58TPav7RZ/6+0efDLtM2atlk/t1mXNuvPv9SDNr+OTfqpUvq1zfq1zfq1zXq+zZOrX9qse23WjTbrzTabcZvNTJtVq82D3/z1ux+//ur8v1+/fv/dV80qG6ypfKnpl42f0fqlyuZ/pcqDX6ZVNrTK5rnKplTZfP6lGVT5dWwyT30yr1U2r1U2r1U281WeXP1SZdOrsmlU2WxW2f5UZRH6VbY/Xe/xfxv+dT86PkWh8b/F96NHf2DsR+mnSL5tN8Y+N8aWxtjPv7SDxryOTfbp2exrY+xrY+xrY+x8YyZXvzTG9hpjG42xm41x48a4fmP60eH6jelHj/7A2I+So41xz41xpTHu8y/doDGvY5N7ejb32hj32hj32hg335jJ1S+Ncb3GuEZj3GZj/Lgxvt+YfnT4fmP60aM/MPaj5Glj/HNjfGmM//xLP2jM69jkn57NvzbGvzbGvzbGzzdmcvVLY3yvMb7RGL/ZmDBuTOg3ph8dod+YfvToD4z9KAXamPDcmFAaEz7/Mgwa8zo2hadnC6+NCa+NCa+NCfONmVz90pjQa0xoNCZsNka8HVcm/0yvMyQ7StZqDckeZGYkWfqU9Zoj3j5X5/zTp+6It5+ffxq0B2af254eUbx9LdCnL08N+vTlqUKfvkx1aP6Alxo9HfLSo6eD4ONGk8REkwRpUj87StZsUj97kJmRZOlT1m2SqJokriaJs0li1KTX2ee254cU0CQBTRLQJLHQpOkDXpskuk0SrSaJ3SbJiSZJ0qR+dpSs2aR+9iAzI8nSp6zbJFk1SV5NkmeT5KhJr7PPbc8PKaFJEpokoUlyoUnTB7w2SXabJFtNkrtNUhNNUqRJ/ewoWbNJ/exBZkaSpU9Zt0mVvIuL3oU6mzTCd5h9bnt+SPB3AQAvQODFAsHPH/DapC7Di5bDi12IF3qiSZo0qZ8dJWs2qZ89yMxIsvQp6zapUm9xsbfQZ5NG8A2zz23PDwn2LQC/Bei3WODv+QNem9QlcNEycLGL4MJMNMmQJvWzo2TNJvWzB5kZSZY+Zd0mVegsLnUW5mzSyJ1h9rnt+SGBngXYswB8Fgv6PH/Aa5O6Ai1aBC12DVpMILQgCk2yQxCHJtmDzIwkS4JbtKgwWlwaLezZpJFHw+xz2/NDAkkLMGkBKC0WVHr+gNcmdWVatGha7Nq0mMBpQXSaZIcgPk2yB5kZSZYEN2pRIbW4lFq4s0kjp4bZ57bnhwSqFmDVArBaLGj1/AGvTeqKtWiRtdg1azGB1oKoNcmOkjWbROCazIwkS4LbtajwWlx6LfzZpJFfw+xz2/NDAmELMGwBiC0WFHv+gNcmdSVbtChb7Fq2mMBsQTSbZEfJmk0ioE1mRpIlwU1bVKgtLtUW4WzSyLVh9rnt+SGBtgXYtgDcFgu6PX/Aa5O6wi1axC12jVtOGLckxk2yQxLjJtmDzIwkS5Ibt6yMW17GLd9+fv5p0CSYfW57ekgJxi3BuCUYt1ww7vkDXpoku8YtW8Ytd41bThi3JMZNskMS4ybZg8yMJEuSG7esjFtexi3F2aSRccPsc9vzQ4JxSzBuCcYtF4x7/oDXJnWNW7aMW+4at5wwbkmMm2SHJMZNsgeZGUmWJDduWRm3vIxbyrNJI+OG2ee254cE45Zg3BKMWy4Y9/wBr03qGrdsGbfcNW45YdySGDfJDkmMm2QPMjOSLElu3LIybnkZt1Rnk0bGDbPPbc8PCcYtwbglGLdcMO75A16b1DVu2TJuuWvccsK4JTFukh2SGDfJHmRmJFmS3LhlZdzyMm6pzyaNjBtmn9ueHxKMW4JxSzBuuWDc8we8Nqlr3LJl3HLXuOWEcUti3CQ7JDFukj3IzEiyJLlxy8q45WXc0pxNGhk3zD63PT8kGLcE45Zg3HLBuOcPeG1S17hly7jlrnHLCeOWxLhJdkhi3CR7kJmRZEly45aVccvLuKU9mzQybph9bnt+SDBuCcYtwbjlgnHPH/DapK5xy5Zxy13jlhPGLYlxk+yQxLhJ9iAzI8mS5MYtK+OWl3FLdzZpZNww+9z2/JBg3BKMW4JxywXjnj/gtUld45Yt45a7xi0njFsS4ybZUbJmk4hxk5mRZEly45aVccvLuKU/mzQybph9bnt+SDBuCcYtwbjlgnHPH/DapK5xy5Zxy13jlhPGLYlxk+woWbNJxLjJzEiyJLlxy8q45WXcMpxNGhk3zD63PT8kGLcE45Zg3HLBuOcPeG1S17hly7jlrnGrCeNWxLhJdihi3CR7kJmRZElx41aVcavLuNXbz88/jf6fmQMxq2diVmDcCoxbgXGrBeOeP+D1/71517hVy7jVrnGrCeNWxLhJdihi3CR7kJmRZElx41aVcavLuJU4mzQybph9bnt+SDBuBcatwLjVgnHPH/DapK5xq5Zxq13jVhPGrYhxk+xQxLhJ9iAzI8mS4satKuNWl3EreTZpZNww+9z2/JBg3AqMW4FxqwXjnj/gtUld41Yt41a7xq0mjFsR4ybZoYhxk+xBZkaSJcWNW9V/g8r9V6jkv0Nl+JeoADGrZ2JW+Peo4F+kgn+TyspfpTJ9wGuT+n+dSvPvU9k1bjVh3IoYN8kORYybZA8yM5IsKW7cqjJudRm30meTRsYNs89tzw8Jxq3AuBUYt1ow7vkDXpvUNW7VMm61a9xqwrgVMW6SHYoYN8keZGYkWVLcuFVl3OoybmXOJo2MG2af254fEoxbgXErMG61YNzzB7w2qWvcqmXcate41YRxK2LcJDsUMW6SPcjMSLKkuHGryrjVZdzKnk0aGTfMPrc9PyQYtwLjVmDcasG45w94bVLXuFXLuNWucasJ41bEuEl2KGLcJHuQmZFkSXHjVpVxq8u4lTubNDJumH1ue35IMG4Fxq3AuNWCcc8f8NqkrnGrlnGrXeNWE8atiHGT7ChZs0nEuMnMSLKkuHGryrjVZdzKn00aGTfMPrc9PyQYtwLjVmDcasG45w94bVLXuFXLuNWucasJ41bEuEl2lKzZJGLcZGYkWVLcuFVl3OoybhXOJo2MG2af254fEoxbgXErMG61YNzzB7w2qWvcqmXcate49YRxa2LcJDs0MW6SPcjMSLKkuXHryrj1Zdz67efnn0Z/+SQQs34mZg3GrcG4NRi3XjDu+QNe/xbKrnHrlnHrXePWE8atiXGT7NDEuEn2IDMjyZLmxq0r49aXcWtxNmlk3DD73Pb8kGDcGoxbg3HrBeOeP+C1SV3j1i3j1rvGrSeMWxPjJtmhiXGT7EFmRpIlzY1bV8atL+PW8mzSyLhh9rnt+SHBuDUYtwbj1gvGPX/Aa5O6xq1bxq13jVtPGLcmxk2yQxPjJtmDzIwkS5obt66MW1/GrdXZpJFxw+xz2/NDgnFrMG4Nxq0XjHv+gNcmdY1bt4xbb/+l4RPGrYlxk+zQxLhJ9iAzI8mS5sat67+h+/4ruvPf0T38S7qBmPUzMWv8e7rxL+rGv6l75a/qnj7gtUn9v667+fd17xq3njBuTYybZIcmxk2yB5kZSZY0N25dGbe+jFubs0kj44bZ57bnhwTj1mDcGoxbLxj3/AGvTeoat24Zt941bj1h3JoYN8kOTYybZA8yM5IsaW7cujJufRm3tmeTRsYNs89tzw8Jxq3BuDUYt14w7vkDXpvUNW7dMm69a9x6wrg1MW6SHZoYN8keZGYkWdLcuHVl3Poybu3OJo2MG2af254fEoxbg3FrMG69YNzzB7w2qWvcumXcete49YRxa2LcJDtK1mwSMW4yM5IsaW7cujJufRm39meTRsYNs89tzw8Jxq3BuDUYt14w7vkDXpvUNW7dMm69a9x6wrg1MW6SHSVrNokYN5kZSZY0N25dGbe+jFuHs0kj44bZ57bnhwTj1mDcGoxbLxj3/AGvTeoat24Zt941bjNh3IYYN8kOQ4ybZA8yM5IsGW7cpjJucxm3efv5+afRv5UGiNk8E7MB4zZg3AaM2ywY9/wBr/96mq5xm5Zxm13jNhPGbYhxk+wwxLhJ9iAzI8mS4cZtKuM2l3EbcTZpZNww+9z2/JBg3AaM24BxmwXjnj/gtUld4zYt4za7xm0mjNsQ4ybZYYhxk+xBZkaSJcON21TGbS7jNvJs0si4Yfa57fkhwbgNGLcB4zYLxj1/wGuTusZtWsZtdo3bTBi3IcZNssMQ4ybZg8yMJEuGG7epjNtcxm3U2aSRccPsc9vzQ4JxGzBuA8ZtFox7/oDXJnWN27SM2+wat5kwbkOMm2SHIcZNsgeZGUmWDDduUxm3uYzb6LNJI+OG2ee254cE4zZg3AaM2ywY9/wBr03qGrdpGbfZNW4zYdyGGDfJDkOMm2QPMjOSLBlu3Kb+l0De/xbI/K+BHP57IIGYTfWvY8R/FST+uyDxXwa58m+DnD7gtUn9fyNk818JuWvcZsK4DTFukh2GGDfJHmRmJFky3LhNZdzmMm5jzyaNjBtmn9ueHxKM24BxGzBus2Dc8we8Nqlr3KZl3GbXuM2EcRti3CQ7DDFukj3IzEiyZLhxm8q4zWXcxp1NGhk3zD63PT8kGLcB4zZg3GbBuOcPeG1S17hNy7jNrnGbCeM2xLhJdpSs2SRi3GRmJFky3LhNZdzmMm7jzyaNjBtmn9ueHxKM24BxGzBus2Dc8we8Nqlr3KZl3GbXuM2EcRti3CQ7StZsEjFuMjOSLBlu3KYybnMZtwlnk0bGDbPPbc8PCcZtwLgNGLdZMO75A16b1DVu0zJus2vcdsK4LTFukh2WGDfJHmRmJFmy3LhtZdz2Mm779vPzT6N/jzYQs30mZgvGbcG4LRi3XTDu+QNe/4XaXeO2LeO2u8ZtJ4zbEuMm2WGJcZPsQWZGkiXLjdtWxm0v47bibNLIuGH2ue35IcG4LRi3BeO2C8Y9f8Brk7rGbVvGbXeN204YtyXGTbLDEuMm2YPMjCRLlhu3rYzbXsZt5dmkkXHD7HPb80OCcVswbgvGbReMe/6A1yZ1jdu2jNvuGredMG5LjJtkhyXGTbIHmRlJliw3blsZt72M26qzSSPjhtnntueHBOO2YNwWjNsuGPf8Aa9N6hq3bRm33TVuO2Hclhg3yQ5LjJtkDzIzkixZbty2Mm57GbfVZ5NGxg2zz23PDwnGbcG4LRi3XTDu+QNem9Q1btsybrtr3HbCuC0xbpIdlhg3yR5kZiRZsty4bWXc9jJua84mjYwbZp/bnh8SjNuCcVswbrtg3PMHvDapa9y2Zdx217jthHFbYtwkOywxbpI9yMxIsmS5cdvKuO1l3NaeTRoZN8w+tz0/JBi3BeO2YNx2wbjnD3htUte4bcu47a5x2wnjtsS4SXZYYtwke5CZkWTJcuO2lXHby7itO5s0Mm6YfW57fkgwbgvGbcG47YJxzx/w2qSucduWcdtd47YTxm2JcZPsKFmzScS4ycxIsmS5cdvKuO1l3NafTRoZN8w+tz0/JBi3BeO2YNx2wbjnD3htUte4bcu47a5x2wnjtsS4SXaUrNkkYtxkZiRZsty4bWXc9jJuG84mjYwbZp/bnh8SjNuCcVswbrtg3PMHvDapa9y2Zdx217jdhHE7YtwkOxwxbpI9yMxIsuS4cbvKuN1l3O7t5+efBk2C2ee2p4d0YNwOjNuBcbsF454/4KVJrmvcrmXcbte43YRxO2LcJDscMW6SPcjMSLLkuHG7yrjdZdxOnE0aGTfMPrc9PyQYtwPjdmDcbsG45w94bVLXuF3LuN2ucbsJ43bEuEl2OGLcJHuQmZFkyXHjdpVxu8u4nTybNDJumH1ue35IMG4Hxu3AuN2Ccc8f8NqkrnG7lnG7XeN2E8btiHGT7HDEuEn2IDMjyZLjxu0q43aXcTt1Nmlk3DD73Pb8kGDcDozbgXG7BeOeP+C1SV3jdi3jdrvG7SaM2xHjJtnhiHGT7EFmRpIlx43bVcbtLuN2+mzSyLhh9rnt+SHBuB0YtwPjdgvGPX/Aa5O6xu1axu12jdtNGLcjxk2ywxHjJtmDzIwkS44bt6uM213G7czZpJFxw+xz2/NDgnE7MG4Hxu0WjHv+gNcmdY3btYzb7Rq3mzBuR4ybZIcjxk2yB5kZSZYcN25XGbe7jNvZs0kj44bZ57bnhwTjdmDcDozbLRj3/AGvTeoat2sZt9s1bjdh3I4YN8kOR4ybZA8yM5IsOW7crjJudxm3c2eTRsYNs89tzw8Jxu3AuB0Yt1sw7vkDXpvUNW7XMm63a9xuwrgdMW6SHSVrNokYN5kZSZYcN25XGbe7jNv5s0kj44bZ57bnhwTjdmDcDozbLRj3/AGvTeoat2sZt9s1bjdh3I4YN8mOkjWbRIybzIwkS44bt6uM213G7cLZpJFxw+xz2/NDgnE7MG4Hxu0WjHv+gNcmdY3btYzb7Rq3nzBuT4ybZIcnxk2yB5kZSZY8N25fGbe/jNu//fz806BJMPvc9vSQHozbg3F7MG6/YNzzB7w0yXeN27eM2+8at58wbk+Mm2SHJ8ZNsgeZGUmWPDduXxm3v4zbi7NJI+OG2ee254cE4/Zg3B6M2y8Y9/wBr03qGrdvGbffNW4/YdyeGDfJDk+Mm2QPMjOSLHlu3L4ybn8Zt5dnk0bGDbPPbc8PCcbtwbg9GLdfMO75A16b1DVu3zJuv2vcfsK4PTFukh2eGDfJHmRmJFny3Lh9Zdz+Mm6vziaNjBtmn9ueHxKM24NxezBuv2Dc8we8Nqlr3L5l3H7XuP2EcXti3CQ7PDFukj3IzEiy5Llx+8q4/WXcXp9NGhk3zD63PT8kGLcH4/Zg3H7BuOcPeG1S17h9y7j9rnH7CeP2xLhJdnhi3CR7kJmRZMlz4/aVcfvLuL05mzQybph9bnt+SDBuD8btwbj9gnHPH/DapK5x+5Zx+13j9hPG7Ylxk+zwxLhJ9iAzI8mS58btK+P2l3F7ezZpZNww+9z2/JBg3B6M24Nx+wXjnj/gtUld4/Yt4/a7xu0njNsT4ybZ4Ylxk+xBZkaSJc+N21fG7S/j9u5s0si4Yfa57fkhwbg9GLcH4/YLxj1/wGuTusbtW8btd43bTxi3J8ZNsqNkzSYR4yYzI8mS58btK+P2l3F7fzZpZNww+9z2/JBg3B6M24Nx+wXjnj/gtUld4/Yt4/a7xu0njNsT4ybZUbJmk4hxk5mRZMlz4/aVcfvLuH04mzQybph9bnt+SDBuD8btwbj9gnHPH/DapK5x+5Zx+13jDhPGHYhxk+wIxLhJ9iAzI8lS4MYdKuMOl3GHt5+ffxo0CWaf254eMoBxBzDuAMYdFox7/oCXJoWucYeWcYdd4w4Txh2IcZPsCMS4SfYgMyPJUuDGHSrjDpdxB3E2aWTcMPvc9vyQYNwBjDuAcYcF454/4LVJXeMOLeMOu8YdJow7EOMm2RGIcZPsQWZGkqXAjTtUxh0u4w7ybNLIuGH2ue35IcG4Axh3AOMOC8Y9f8Brk7rGHVrGHXaNO0wYdyDGTbIjEOMm2YPMjCRLgRt3qIw7XMYd1NmkkXHD7HPb80OCcQcw7gDGHRaMe/6A1yZ1jTu0jDvsGneYMO5AjJtkRyDGTbIHmRlJlgI37lAZd7iMO+izSSPjhtnntueHBOMOYNwBjDssGPf8Aa9N6hp3aBl32DXuMGHcgRg3yY5AjJtkDzIzkiwFbtyhMu5wGXcwZ5NGxg2zz23PDwnGHcC4Axh3WDDu+QNem9Q17tAy7rBr3GHCuAMxbpIdgRg3yR5kZiRZCty4Q2Xc4TLuYM8mjYwbZp/bnh8SjDuAcQcw7rBg3PMHvDapa9yhZdxh17jDhHEHYtwkOwIxbpI9yMxIshS4cYfKuMNl3MGdTRoZN8w+tz0/JBh3AOMOYNxhwbjnD3htUte4Q8u4w65xhwnjDsS4SXaUrNkkYtxkZiRZCty4Q2Xc4TLu4M8mjYwbZp/bnh8SjDuAcQcw7rBg3PMHvDapa9yhZdxh17jDhHEHYtwkO0rWbBIxbjIzkiwFbtyhMu5wGXcIZ5NGxg2zz23PDwnGHcC4Axh3WDDu+QNem9Q17tAy7rBr3Oc/v3GVPv5Qr0ssPK6w1SYWPtjYyMJUwl6jPlbmrlT+46dOnf/l5/nPg1bhgrzz6VnPP70Wq3x6alb59FSt8mmqW0tnvNTr+ZyXfj2fhV93GjaB3x9/qN8wwt9X2G4YAXA2NrIwlbDfMFE3TNwNE7lhIwfHBXln9bRA4eVT1TDA8PJpsmELZ0DDuiL+fBZ+3WnYBIp//KF+wwiLX2G7YQTG2djIwlTCfsNk3TB5N0zmho18HBfkndXTApGXT1XDAMnLp8mGLZwBDetK+fNZ+HWnYRNY/vGH+g0jXH6F7YYRMGdjIwtTCfsNU3XD1N0wlRs2cnNckHdWTwt0Xj5VDQM8L58mG7ZwBjSsK+jPZ+HXnYZNIPrHH+o3jDD6FbYbRiCdjY0sTCXsN0zXDdN3w3Ru2MjTcUHeWT0tkHr5VDUMUL18mmzYwhnQsK6sP5+FX3caNoHrH3+o3zDC61fYbhgBdjY2sjCVsN8wUzfM3A0zuWEjZ8cFeWf1tEDt5VPVMMD28mmyYQtnQMO64v58Fn7dadgEun/8oX7DCLtfYbthBN7Z2MjCVMJ+w2zdMHs3zOaGjfwdF+Sd1dMCwZdPVcMA4cunyYYtnAEN60r881n4dadhExj/8Yf6DSMcf4XthhGQZ2MjC1MJ+w1zdcPc3TCXGzZyeVyQd1ZPCzRfPlUNA5wvnyYbtnAGNKwr9M9n4dedhk0g/ccf6jeMMP0VthtGoJ6NjSxMJew3zNcN83fDfG7YyOtxQd5ZPS2QfflUNQzQvnyabNjCGdCwrtw/n4Vfdxo2gfcff6jfMML3V9huGAF8NjayMJWw37BQNyzcDQu5YSPHxwV5Z/W0QPnlU9UwwPzyabJhC2dAw7qi/3wWft1omJgxfcFMn4THFTYbRsIHGxtZmErYbZioTV/cpi+y6Yuh6cOCvPP5aQWavkDTF2j6YsX0V854bZjom75omr7YNn0xY/qCmT4JjytsN4yZPhkbWZhK2G9YbfriNn2RTV8MTR8W5J3V06LpCzR9gaYvVkx/5QxoWN/0RdP0xbbpixnTF8z0SXhcYbthzPTJ2MjCVMJ+w2rTF7fpi2z6Ymj6sCDvrJ4WTV+g6Qs0fbFi+itnQMP6pi+api+2TV/MmL5gpk/C4wrbDWOmT8ZGFqYS9htWm764TV9k0xdD04cFeWf1tGj6Ak1foOmLFdNfOQMa1jd90TR9sW36Ysb0BTN9Eh5X2G4YM30yNrIwlbDfsNr0xW36Ipu+GJo+LMg7q6dF0xdo+gJNX6yY/soZ0LC+6Yum6Ytt0xczpi+Y6ZPwuMJ2w5jpk7GRhamE/YbVpi9u0xfZ9MXQ9GFB3lk9LZq+QNMXaPpixfRXzoCG9U1fNE1fbJu+mDF9wUyfhMcVthvGTJ+MjSxMJew3rDZ9cZu+yKYvhqYPC/LO6mnR9AWavkDTFyumv3IGNKxv+qJp+mLb9MWM6Qtm+iQ8rrDdMGb6ZGxkYSphv2G16Yvb9EU2fTE0fViQd1ZPi6Yv0PQFmr5YMf2VM6BhfdMXTdMX26YvZkxfMNMn4XGF7YYx0ydjIwtTCfsNq01f3KYvsumLoenDgryzelo0fYGmL9D0xYrpr5wBDeubvmiavtg2fTFj+oKZPgmPK2w3jJk+GRtZmErYb1ht+uI2fZFNXwxNHxbkndXToukLNH2Bpi9WTH/lDGhY3/RF0/TFtunLGdOXzPRJeFxhs2EkfLCxkYWphN2Gydr05W36Mpu+HJo+LMg7n59WoulLNH2Jpi9XTH/ljNeGyb7py6bpy23TlzOmL5npk/C4wnbDmOmTsZGFqYT9htWmL2/Tl9n05dD0YUHeWT0tmr5E05do+nLF9FfOgIb1TV82TV9um76cMX3JTJ+ExxW2G8ZMn4yNLEwl7DesNn15m77Mpi+Hpg8L8s7qadH0JZq+RNOXK6a/cgY0rG/6smn6ctv05YzpS2b6JDyusN0wZvpkbGRhKmG/YbXpy9v0ZTZ9OTR9WJB3Vk+Lpi/R9CWavlwx/ZUzoGF905dN05fbpi9nTF8y0yfhcYXthjHTJ2MjC1MJ+w2rTV/epi+z6cuh6cOCvLN6WjR9iaYv0fTliumvnAEN65u+bJq+3DZ9OWP6kpk+CY8rbDeMmT4ZG1mYSthvWG368jZ9mU1fDk0fFuSd1dOi6Us0fYmmL1dMf+UMaFjf9GXT9OW26csZ05fM9El4XGG7Ycz0ydjIwlTCfsNq05e36cts+nJo+rAg76yeFk1foulLNH25YvorZ0DD+qYvm6Yvt01fzpi+ZKZPwuMK2w1jpk/GRhamEvYbVpu+vE1fZtOXQ9OHBXln9bRo+hJNX6LpyxXTXzkDGtY3fdk0fblt+nLG9CUzfRIeV9huGDN9MjayMJWw37Da9OVt+jKbvhyaPizIO6unRdOXaPoSTV+umP7KGdCwvunLpunLbdOXM6YvmemT8LjCdsOY6ZOxkYWphP2G1aYvb9OX2fTl0PRhQd5ZPS2avkTTl2j6csX0V86AhvVNXzZNX26bvpoxfcVMn4THFTYbRsIHGxtZmErYbZiqTV/dpq+y6auh6cOCvPP5aRWavkLTV2j6asX0V854bZjqm75qmr7aNn01Y/qKmT4JjytsN4yZPhkbWZhK2G9YbfrqNn2VTV8NTR8W5J3V06LpKzR9haavVkx/5QxoWN/0VdP01bbpqxnTV8z0SXhcYbthzPTJ2MjCVMJ+w2rTV7fpq2z6amj6sCDvrJ4WTV+h6Ss0fbVi+itnQMP6pq+apq+2TV/NmL5ipk/C4wrbDWOmT8ZGFqYS9htWm766TV9l01dD04cFeWf1tGj6Ck1foemrFdNfOQMa1jd91TR9tW36asb0FTN9Eh5X2G4YM30yNrIwlbDfsNr01W36Kpu+Gpo+LMg7q6dF01do+gpNX62Y/soZ0LC+6aum6att01czpq+Y6ZPwuMJ2w5jpk7GRhamE/YbVpq9u01fZ9NXQ9GFB3lk9LZq+QtNXaPpqxfRXzoCG9U1fNU1fbZu+mjF9xUyfhMcVthvGTJ+MjSxMJew3rDZ9dZu+yqavhqYPC/LO6mnR9BWavkLTVyumv3IGNKxv+qpp+mrb9NWM6Stm+iQ8rrDdMGb6ZGxkYSphv2G16avb9FU2fTU0fViQd1ZPi6av0PQVmr5aMf2VM6BhfdNXTdNX26avZkxfMdMn4XGF7YYx0ydjIwtTCfsNq01f3aavsumroenDgryzelo0fYWmr9D01Yrpr5wBDeubvmqavto2fTVj+oqZPgmPK2w3jJk+GRtZmErYb1ht+uo2fZVNXw1NHxbkndXToukrNH2Fpq9WTH/lDGhY3/RV0/TVtunrGdPXzPRJeFxhs2EkfLCxkYWphN2G6dr09W36Opu+Hpo+LMg7n59Wo+lrNH2Npq9XTH/ljNeG6b7p66bp623T1zOmr5npk/C4wnbDmOmTsZGFqYT9htWmr2/T19n09dD0YUHeWT0tmr5G09do+nrF9FfOgIb1TV83TV9vm76eMX3NTJ+ExxW2G8ZMn4yNLEwl7DesNn19m77Opq+Hpg8L8s7qadH0NZq+RtPXK6a/cgY0rG/6umn6etv09Yzpa2b6JDyusN0wZvpkbGRhKmG/YbXp69v0dTZ9PTR9WJB3Vk+Lpq/R9DWavl4x/ZUzoGF909dN09fbpq9nTF8z0yfhcYXthjHTJ2MjC1MJ+w2rTV/fpq+z6euh6cOCvLN6WjR9jaav0fT1iumvnAEN65u+bpq+3jZ9PWP6mpk+CY8rbDeMmT4ZG1mYSthvWG36+jZ9nU1fD00fFuSd1dOi6Ws0fY2mr1dMf+UMaFjf9HXT9PW26esZ09fM9El4XGG7Ycz0ydjIwlTCfsNq09e36ets+npo+rAg76yeFk1fo+lrNH29YvorZ0DD+qavm6avt01fz5i+ZqZPwuMK2w1jpk/GRhamEvYbVpu+vk1fZ9PXQ9OHBXln9bRo+hpNX6Pp6xXTXzkDGtY3fd00fb1t+nrG9DUzfRIeV9huGDN9MjayMJWw37Da9PVt+jqbvh6aPizIO6unRdPXaPoaTV+vmP7KGdCwvunrpunrbdPXM6avmemT8LjCdsOY6ZOxkYWphP2G1aavb9PX2fT10PRhQd5ZPS2avkbT12j6esX0V86AhvVNXzdNX2+bvpkxfcNMn4THFTYbRsIHGxtZmErYbZipTd/cpm+y6Zuh6cOCvPP5aQ2avkHTN2j6ZsX0V854bZjpm75pmr7ZNn0zY/qGmT4JjytsN4yZPhkbWZhK2G9YbfrmNn2TTd8MTR8W5J3V06LpGzR9g6ZvVkx/5QxoWN/0TdP0zbbpmxnTN8z0SXhcYbthzPTJ2MjCVMJ+w2rTN7fpm2z6Zmj6sCDvrJ4WTd+g6Rs0fbNi+itnQMP6pm+apm+2Td/MmL5hpk/C4wrbDWOmT8ZGFqYS9htWm765Td9k0zdD04cFeWf1tGj6Bk3foOmbFdNfOQMa1jd90zR9s236Zsb0DTN9Eh5X2G4YM30yNrIwlbDfsNr0zW36Jpu+GZo+LMg7q6dF0zdo+gZN36yY/soZ0LC+6Zum6Ztt0zczpm+Y6ZPwuMJ2w5jpk7GRhamE/YbVpm9u0zfZ9M3Q9GFB3lk9LZq+QdM3aPpmxfRXzoCG9U3fNE3fbJu+mTF9w0yfhMcVthvGTJ+MjSxMJew3rDZ9c5u+yaZvhqYPC/LO6mnR9A2avkHTNyumv3IGNKxv+qZp+mbb9M2M6Rtm+iQ8rrDdMGb6ZGxkYSphv2G16Zvb9E02fTM0fViQd1ZPi6Zv0PQNmr5ZMf2VM6BhfdM3TdM326ZvZkzfMNMn4XGF7YYx0ydjIwtTCfsNq03f3KZvsumboenDgryzelo0fYOmb9D0zYrpr5wBDeubvmmavtk2fTNj+oaZPgmPK2w3jJk+GRtZmErYb1ht+uY2fZNN3wxNHxbkndXToukbNH2Dpm9WTH/lDGhY3/RN0/TNtunbGdO3zPRJeFxhs2EkfLCxkYWphN2G2dr07W36Npu+HZo+LMg7n5/WoulbNH2Lpm9XTH/ljNeG2b7p26bp223TtzOmb5npk/C4wnbDmOmTsZGFqYT9htWmb2/Tt9n07dD0YUHeWT0tmr5F07do+nbF9FfOgIb1Td82Td9um76dMX3LTJ+ExxW2G8ZMn4yNLEwl7DesNn17m77Npm+Hpg8L8s7qadH0LZq+RdO3K6a/cgY0rG/6tmn6dtv07YzpW2b6JDyusN0wZvpkbGRhKmG/YbXp29v0bTZ9OzR9WJB3Vk+Lpm/R9C2avl0x/ZUzoGF907dN07fbpm9nTN8y0yfhcYXthjHTJ2MjC1MJ+w2rTd/epm+z6duh6cOCvLN6WjR9i6Zv0fTtiumvnAEN65u+bZq+3TZ9O2P6lpk+CY8rbDeMmT4ZG1mYSthvWG369jZ9m03fDk0fFuSd1dOi6Vs0fYumb1dMf+UMaFjf9G3T9O226dsZ07fM9El4XGG7Ycz0ydjIwlTCfsNq07e36dts+nZo+rAg76yeFk3foulbNH27YvorZ0DD+qZvm6Zvt03fzpi+ZaZPwuMK2w1jpk/GRhamEvYbVpu+vU3fZtO3Q9OHBXln9bRo+hZN36Lp2xXTXzkDGtY3fds0fbtt+nbG9C0zfRIeV9huGDN9MjayMJWw37Da9O1t+jabvh2aPizIO6unRdO3aPoWTd+umP7KGdCwvunbpunbbdO3M6ZvmemT8LjCdsOY6ZOxkYWphP2G1aZvb9O32fTt0PRhQd5ZPS2avkXTt2j6dsX0V86AhvVN3zZN326bvpsxfcdMn4THFTYbRsIHGxtZmErYbZirTd/dpu+y6buh6cOCvPP5aR2avkPTd2j6bsX0V854bZjrm75rmr7bNn03Y/qOmT4JjytsN4yZPhkbWZhK2G9YbfruNn2XTd8NTR8W5J3V06LpOzR9h6bvVkx/5QxoWN/0XdP03bbpuxnTd8z0SXhcYbthzPTJ2MjCVMJ+w2rTd7fpu2z6bmj6sCDvrJ4WTd+h6Ts0fbdi+itnQMP6pu+apu+2Td/NmL5jpk/C4wrbDWOmT8ZGFqYS9htWm767Td9l03dD04cFeWf1tGj6Dk3foem7FdNfOQMa1jd91zR9t236bsb0HTN9Eh5X2G4YM30yNrIwlbDfsNr03W36Lpu+G5o+LMg7q6dF03do+g5N362Y/soZ0LC+6bum6btt03czpu+Y6ZPwuMJ2w5jpk7GRhamE/YbVpu9u03fZ9N3Q9GFB3lk9LZq+Q9N3aPpuxfRXzoCG9U3fNU3fbZu+mzF9x0yfhMcVthvGTJ+MjSxMJew3rDZ9d5u+y6bvhqYPC/LO6mnR9B2avkPTdyumv3IGNKxv+q5p+m7b9N2M6Ttm+iQ8rrDdMGb6ZGxkYSphv2G16bvb9F02fTc0fViQd1ZPi6bv0PQdmr5bMf2VM6BhfdN3TdN326bvZkzfMdMn4XGF7YYx0ydjIwtTCfsNq03f3abvsum7oenDgryzelo0fYem79D03Yrpr5wBDeubvmuavts2fTdj+o6ZPgmPK2w3jJk+GRtZmErYb1ht+u42fZdN3w1NHxbkndXTouk7NH2Hpu9WTH/lDGhY3/Rd0/Tdtun7GdP3zPRJeFxhs2EkfLCxkYWphN2G+dr0/W36Ppu+H5o+LMg7n5/Wo+l7NH2Ppu9XTH/ljNeG+b7p+6bp+23T9zOm75npk/C4wnbDmOmTsZGFqYT9htWm72/T99n0/dD0YUHeWT0tmr5H0/do+n7F9FfOgIb1Td83Td9vm76fMX3PTJ+ExxW2G8ZMn4yNLEwl7DesNn1/m77Ppu+Hpg8L8s7qadH0PZq+R9P3K6a/cgY0rG/6vmn6ftv0/Yzpe2b6JDyusN0wZvpkbGRhKmG/YbXp+9v0fTZ9PzR9WJB3Vk+Lpu/R9D2avl8x/ZUzoGF90/dN0/fbpu9nTN8z0yfhcYXthjHTJ2MjC1MJ+w2rTd/fpu+z6fuh6cOCvLN6WjR9j6bv0fT9iumvnAEN65u+b5q+3zZ9P2P6npk+CY8rbDeMmT4ZG1mYSthvWG36/jZ9n03fD00fFuSd1dOi6Xs0fY+m71dMf+UMaFjf9H3T9P226fsZ0/fM9El4XGG7Ycz0ydjIwlTCfsNq0/e36fts+n5o+rAg76yeFk3fo+l7NH2/YvorZ0DD+qbvm6bvt03fz5i+Z6ZPwuMK2w1jpk/GRhamEvYbVpu+v03fZ9P3Q9OHBXln9bRo+h5N36Pp+xXTXzkDGtY3fd80fb9t+n7G9D0zfRIeV9huGDN9MjayMJWw37Da9P1t+j6bvh+aPizIO6unRdP3aPoeTd+vmP7KGdCwvun7pun7bdP3M6bvmemT8LjCdsOY6ZOxkYWphP2G1abvb9P32fT90PRhQd5ZPS2avkfT92j6fsX0V86AhvVN3zdN32+bfpgx/cBMn4THFTYbRsIHGxtZmErYbVioTT/cph+y6Yeh6cOCvPP5aQOafkDTD2j6YcX0V854bVjom35omn7YNv0wY/qBmT4JjytsN4yZPhkbWZhK2G9YbfrhNv2QTT8MTR8W5J3V06LpBzT9gKYfVkx/5QxoWN/0Q9P0w7bphxnTD8z0SXhcYbthzPTJ2MjCVMJ+w2rTD7fph2z6YWj6sCDvrJ4WTT+g6Qc0/bBi+itnQMP6ph+aph+2TT/MmH5gpk/C4wrbDWOmT8ZGFqYS9htWm364TT9k0w9D04cFeWf1tGj6AU0/oOmHFdNfOQMa1jf90DT9sG36Ycb0AzN9Eh5X2G4YM30yNrIwlbDfsNr0w236IZt+GJo+LMg7q6dF0w9o+gFNP6yY/soZ0LC+6Yem6Ydt0w8zph+Y6ZPwuMJ2w5jpk7GRhamE/YbVph9u0w/Z9MPQ9GFB3lk9LZp+QNMPaPphxfRXzoCG9U0/NE0/bJt+mDH9wEyfhMcVthvGTJ+MjSxMJew3rDb9cJt+yKYfhqYPC/LO6mnR9AOafkDTDyumv3IGNKxv+qFp+mHb9MOM6Qdm+iQ8rrDdMGb6ZGxkYSphv2G16Yfb9EM2/TA0fViQd1ZPi6Yf0PQDmn5YMf2VM6BhfdMPTdMP26YfZkw/MNMn4XGF7YYx0ydjIwtTCfsNq00/3KYfsumHoenDgryzelo0/YCmH9D0w4rpr5wBDeubfmiaftg2/TBj+oGZPgmPK2w3jJk+GRtZmErYb1ht+uE2/ZBNPwxNHxbkndXToukHNP2Aph9WTH/lDGhY3/RD0/TDrunLtxOm//GHeg1j4XGFrYax8MHGRhamEvYaJt9Wpp//+Klh53/5ef7zoGG4IO98etrzT68NK5+eGlY+PTWsfJpq2NIZLw17PuelYc9n4dedhk2Y/scf6jeMmP4VthtGTJ+NjSxMJew3TNQNE3fDRG7YyPRxQd5ZPS2YfvlUNQxMv3yabNjCGdCwruk/n4Vfdxo2Yfoff6jfMGL6V9huGDF9NjayMJWw3zBZN0zeDZO5YSPTxwV5Z/W0YPrlU9UwMP3yabJhC2dAw7qm/3wWft1p2ITpf/yhfsOI6V9hu2HE9NnYyMJUwn7DVN0wdTdM5YaNTB8X5J3V04Lpl09Vw8D0y6fJhi2cAQ3rmv7zWfh1p2ETpv/xh/oNI6Z/he2GEdNnYyMLUwn7DdN1w/TdMJ0bNjJ9XJB3Vk8Lpl8+VQ0D0y+fJhu2cAY0rGv6z2fh152GTZj+xx/qN4yY/hW2G0ZMn42NLEwl7DfM1A0zd8NMbtjI9HFB3lk9LZh++VQ1DEy/fJps2MIZ0LCu6T+fhV93GjZh+h9/qN8wYvpX2G4YMX02NrIwlbDfMFs3zN4Ns7lhI9PHBXln9bRg+uVT1TAw/fJpsmELZ0DDuqb/fBZ+3WnYhOl//KF+w4jpX2G7YcT02djIwlTCfsNc3TB3N8zlho1MHxfkndXTgumXT1XDwPTLp8mGLZwBDeua/vNZ+HWnYROm//GH+g0jpn+F7YYR02djIwtTCfsN83XD/N0wnxs2Mn1ckHdWTwumXz5VDQPTL58mG7ZwBjSsa/rPZ+HXnYZNmP7HH+o3jJj+FbYbRkyfjY0sTCXsNyzUDQt3w0Ju2Mj0cUHeWT0tmH75VDUMTL98mmzYwhnQsK7pP5+FXzcaJmZMXzDTJ+Fxhc2GkfDBxkYWphJ2GyZq0xe36Yts+mJo+rAg73x+WoGmL9D0BZq+WDH9lTNeGyb6pi+api+2TV/MmL5gpk/C4wrbDWOmT8ZGFqYS9htWm764TV9k0xdD04cFeWf1tGj6Ak1foOmLFdNfOQMa1jd90TR9sW36Ysb0BTN9Eh5X2G4YM30yNrIwlbDfsNr0xW36Ipu+GJo+LMg7q6dF0xdo+gJNX6yY/soZ0LC+6Yum6Ytt0xczpi+Y6ZPwuMJ2w5jpk7GRhamE/YbVpi9u0xfZ9MXQ9GFB3lk9LZq+QNMXaPpixfRXzoCG9U1fNE1fbJu+mDF9wUyfhMcVthvGTJ+MjSxMJew3rDZ9cZu+yKYvhqYPC/LO6mnR9AWavkDTFyumv3IGNKxv+qJp+mLb9MWM6Qtm+iQ8rrDdMGb6ZGxkYSphv2G16Yvb9EU2fTE0fViQd1ZPi6Yv0PQFmr5YMf2VM6BhfdMXTdMX26YvZkxfMNMn4XGF7YYx0ydjIwtTCfsNq01f3KYvsumLoenDgryzelo0fYGmL9D0xYrpr5wBDeubvmiavtg2fTFj+oKZPgmPK2w3jJk+GRtZmErYb1ht+uI2fZFNXwxNHxbkndXToukLNH2Bpi9WTH/lDGhY3/RF0/TFtumLGdMXzPRJeFxhu2HM9MnYyMJUwn7DatMXt+mLbPpiaPqwIO+snhZNX6DpCzR9sWL6K2dAw/qmL5qmL7ZNX8yYvmCmT8LjCtsNY6ZPxkYWphL2G1abvrhNX2TTF0PThwV5Z/W0aPoCTV+g6YsV0185AxrWN33RNH2xbfpyxvQlM30SHlfYbBgJH2xsZGEqYbdhsjZ9eZu+zKYvh6YPC/LO56eVaPoSTV+i6csV018547Vhsm/6smn6ctv05YzpS2b6JDyusN0wZvpkbGRhKmG/YbXpy9v0ZTZ9OTR9WJB3Vk+Lpi/R9CWavlwx/ZUzoGF905dN05fbpi9nTF8y0yfhcYXthjHTJ2MjC1MJ+w2rTV/epi+z6cuh6cOCvLN6WjR9iaYv0fTliumvnAEN65u+bJq+3DZ9OWP6kpk+CY8rbDeMmT4ZG1mYSthvWG368jZ9mU1fDk0fFuSd1dOi6Us0fYmmL1dMf+UMaFjf9GXT9OW26csZ05fM9El4XGG7Ycz0ydjIwlTCfsNq05e36cts+nJo+rAg76yeFk1foulLNH25YvorZ0DD+qYvm6Yvt01fzpi+ZKZPwuMK2w1jpk/GRhamEvYbVpu+vE1fZtOXQ9OHBXln9bRo+hJNX6LpyxXTXzkDGtY3fdk0fblt+nLG9CUzfRIeV9huGDN9MjayMJWw37Da9OVt+jKbvhyaPizIO6unRdOXaPoSTV+umP7KGdCwvunLpunLbdOXM6YvmemT8LjCdsOY6ZOxkYWphP2G1aYvb9OX2fTl0PRhQd5ZPS2avkTTl2j6csX0V86AhvVNXzZNX26bvpwxfclMn4THFbYbxkyfjI0sTCXsN6w2fXmbvsymL4emDwvyzupp0fQlmr5E05crpr9yBjSsb/qyafpy2/TljOlLZvokPK6w3TBm+mRsZGEqYb9htenL2/RlNn05NH1YkHdWT4umL9H0JZq+XDH9lTOgYX3Tl03Tl9umr2ZMXzHTJ+Fxhc2GkfDBxkYWphJ2G6Zq01e36ats+mpo+rAg73x+WoWmr9D0FZq+WjH9lTNeG6b6pq+apq+2TV/NmL5ipk/C4wrbDWOmT8ZGFqYS9htWm766TV9l01dD04cFeWf1tGj6Ck1foemrFdNfOQMa1jd91TR9tW36asb0FTN9Eh5X2G4YM30yNrIwlbDfsNr01W36Kpu+Gpo+LMg7q6dF01do+gpNX62Y/soZ0LC+6aum6att01czpq+Y6ZPwuMJ2w5jpk7GRhamE/YbVpq9u01fZ9NXQ9GFB3lk9LZq+QtNXaPpqxfRXzoCG9U1fNU1fbZu+mjF9xUyfhMcVthvGTJ+MjSxMJew3rDZ9dZu+yqavhqYPC/LO6mnR9BWavkLTVyumv3IGNKxv+qpp+mrb9NWM6Stm+iQ8rrDdMGb6ZGxkYSphv2G16avb9FU2fTU0fViQd1ZPi6av0PQVmr5aMf2VM6BhfdNXTdNX26avZkxfMdMn4XGF7YYx0ydjIwtTCfsNq01f3aavsumroenDgryzelo0fYWmr9D01Yrpr5wBDeubvmqavto2fTVj+oqZPgmPK2w3jJk+GRtZmErYb1ht+uo2fZVNXw1NHxbkndXToukrNH2Fpq9WTH/lDGhY3/RV0/TVtumrGdNXzPRJeFxhu2HM9MnYyMJUwn7DatNXt+mrbPpqaPqwIO+snhZNX6HpKzR9tWL6K2dAw/qmr5qmr7ZNX82YvmKmT8LjCtsNY6ZPxkYWphL2G1abvrpNX2XTV0PThwV5Z/W0aPoKTV+h6asV0185AxrWN33VNH21bfp6xvQ1M30SHlfYbBgJH2xsZGEqYbdhujZ9fZu+zqavh6YPC/LO56fVaPoaTV+j6esV018547Vhum/6umn6etv09Yzpa2b6JDyusN0wZvpkbGRhKmG/YbXp69v0dTZ9PTR9WJB3Vk+Lpq/R9DWavl4x/ZUzoGF909dN09fbpq9nTF8z0yfhcYXthjHTJ2MjC1MJ+w2rTV/fpq+z6euh6cOCvLN6WjR9jaav0fT1iumvnAEN65u+bpq+3jZ9PWP6mpk+CY8rbDeMmT4ZG1mYSthvWG36+jZ9nU1fD00fFuSd1dOi6Ws0fY2mr1dMf+UMaFjf9HXT9PW26esZ09fM9El4XGG7Ycz0ydjIwlTCfsNq09e36ets+npo+rAg76yeFk1fo+lrNH29YvorZ0DD+qavm6avt01fz5i+ZqZPwuMK2w1jpk/GRhamEvYbVpu+vk1fZ9PXQ9OHBXln9bRo+hpNX6Pp6xXTXzkDGtY3fd00fb1t+nrG9DUzfRIeV9huGDN9MjayMJWw37Da9PVt+jqbvh6aPizIO6unRdPXaPoaTV+vmP7KGdCwvunrpunrbdPXM6avmemT8LjCdsOY6ZOxkYWphP2G1aavb9PX2fT10PRhQd5ZPS2avkbT12j6esX0V86AhvVNXzdNX2+bvp4xfc1Mn4THFbYbxkyfjI0sTCXsN6w2fX2bvs6mr4emDwvyzupp0fQ1mr5G09crpr9yBjSsb/q6afp62/T1jOlrZvokPK6w3TBm+mRsZGEqYb9htenr2/R1Nn09NH1YkHdWT4umr9H0NZq+XjH9lTOgYX3T103T19umb2ZM3zDTJ+Fxhc2GkfDBxkYWphJ2G2Zq0ze36Zts+mZo+rAg73x+WoOmb9D0DZq+WTH9lTNeG2b6pm+apm+2Td/MmL5hpk/C4wrbDWOmT8ZGFqYS9htWm765Td9k0zdD04cFeWf1tGj6Bk3foOmbFdNfOQMa1jd90zR9s236Zsb0DTN9Eh5X2G4YM30yNrIwlbDfsNr0zW36Jpu+GZo+LMg7q6dF0zdo+gZN36yY/soZ0LC+6Zum6Ztt0zczpm+Y6ZPwuMJ2w5jpk7GRhamE/YbVpm9u0zfZ9M3Q9GFB3lk9LZq+QdM3aPpmxfRXzoCG9U3fNE3fbJu+mTF9w0yfhMcVthvGTJ+MjSxMJew3rDZ9c5u+yaZvhqYPC/LO6mnR9A2avkHTNyumv3IGNKxv+qZp+mbb9M2M6Rtm+iQ8rrDdMGb6ZGxkYSphv2G16Zvb9E02fTM0fViQd1ZPi6Zv0PQNmr5ZMf2VM6BhfdM3TdM326ZvZkzfMNMn4XGF7YYx0ydjIwtTCfsNq03f3KZvsumboenDgryzelo0fYOmb9D0zYrpr5wBDeubvmmavtk2fTNj+oaZPgmPK2w3jJk+GRtZmErYb1ht+uY2fZNN3wxNHxbkndXToukbNH2Dpm9WTH/lDGhY3/RN0/TNtumbGdM3zPRJeFxhu2HM9MnYyMJUwn7DatM3t+mbbPpmaPqwIO+snhZN36DpGzR9s2L6K2dAw/qmb5qmb7ZN38yYvmGmT8LjCtsNY6ZPxkYWphL2G1abvrlN32TTN0PThwV5Z/W0aPoGTd+g6ZsV0185AxrWN33TNH2zbfp2xvQtM30SHlfYbBgJH2xsZGEqYbdhtjZ9e5u+zaZvh6YPC/LO56e1aPoWTd+i6dsV018547Vhtm/6tmn6dtv07YzpW2b6JDyusN0wZvpkbGRhKmG/YbXp29v0bTZ9OzR9WJB3Vk+Lpm/R9C2avl0x/ZUzoGF907dN07fbpm9nTN8y0yfhcYXthjHTJ2MjC1MJ+w2rTd/epm+z6duh6cOCvLN6WjR9i6Zv0fTtiumvnAEN65u+bZq+3TZ9O2P6lpk+CY8rbDeMmT4ZG1mYSthvWG369jZ9m03fDk0fFuSd1dOi6Vs0fYumb1dMf+UMaFjf9G3T9O226dsZ07fM9El4XGG7Ycz0ydjIwlTCfsNq07e36dts+nZo+rAg76yeFk3foulbNH27YvorZ0DD+qZvm6Zvt03fzpi+ZaZPwuMK2w1jpk/GRhamEvYbVpu+vU3fZtO3Q9OHBXln9bRo+hZN36Lp2xXTXzkDGtY3fds0fbtt+nbG9C0zfRIeV9huGDN9MjayMJWw37Da9O1t+jabvh2aPizIO6unRdO3aPoWTd+umP7KGdCwvunbpunbbdO3M6ZvmemT8LjCdsOY6ZOxkYWphP2G1aZvb9O32fTt0PRhQd5ZPS2avkXTt2j6dsX0V86AhvVN3zZN326bvp0xfctMn4THFbYbxkyfjI0sTCXsN6w2fXubvs2mb4emDwvyzupp0fQtmr5F07crpr9yBjSsb/q2afp22/TtjOlbZvokPK6w3TBm+mRsZGEqYb9htenb2/RtNn07NH1YkHdWT4umb9H0LZq+XTH9lTOgYX3Tt03Tt9um72ZM3zHTJ+Fxhc2GkfDBxkYWphJ2G+Zq03e36bts+m5o+rAg73x+Woem79D0HZq+WzH9lTNeG+b6pu+apu+2Td/NmL5jpk/C4wrbDWOmT8ZGFqYS9htWm767Td9l03dD04cFeWf1tGj6Dk3foem7FdNfOQMa1jd91zR9t236bsb0HTN9Eh5X2G4YM30yNrIwlbDfsNr03W36Lpu+G5o+LMg7q6dF03do+g5N362Y/soZ0LC+6bum6btt03czpu+Y6ZPwuMJ2w5jpk7GRhamE/YbVpu9u03fZ9N3Q9GFB3lk9LZq+Q9N3aPpuxfRXzoCG9U3fNU3fbZu+mzF9x0yfhMcVthvGTJ+MjSxMJew3rDZ9d5u+y6bvhqYPC/LO6mnR9B2avkPTdyumv3IGNKxv+q5p+m7b9N2M6Ttm+iQ8rrDdMGb6ZGxkYSphv2G16bvb9F02fTc0fViQd1ZPi6bv0PQdmr5bMf2VM6BhfdN3TdN326bvZkzfMdMn4XGF7YYx0ydjIwtTCfsNq03f3abvsum7oenDgryzelo0fYem79D03Yrpr5wBDeubvmuavts2fTdj+o6ZPgmPK2w3jJk+GRtZmErYb1ht+u42fZdN3w1NHxbkndXTouk7NH2Hpu9WTH/lDGhY3/Rd0/Tdtum7GdN3zPRJeFxhu2HM9MnYyMJUwn7DatN3t+m7bPpuaPqwIO+snhZN36HpOzR9t2L6K2dAw/qm75qm77ZN382YvmOmT8LjCtsNY6ZPxkYWphL2G1abvrtN32XTd0PThwV5Z/W0aPoOTd+h6bsV0185AxrWN33XNH23bfp+xvQ9M30SHlfYbBgJH2xsZGEqYbdhvjZ9f5u+z6bvh6YPC/LO56f1aPoeTd+j6fsV018547Vhvm/6vmn6ftv0/Yzpe2b6JDyusN0wZvpkbGRhKmG/YbXp+9v0fTZ9PzR9WJB3Vk+Lpu/R9D2avl8x/ZUzoGF90/dN0/fbpu9nTN8z0yfhcYXthjHTJ2MjC1MJ+w2rTd/fpu+z6fuh6cOCvLN6WjR9j6bv0fT9iumvnAEN65u+b5q+3zZ9P2P6npk+CY8rbDeMmT4ZG1mYSthvWG36/jZ9n03fD00fFuSd1dOi6Xs0fY+m71dMf+UMaFjf9H3T9P226fsZ0/fM9El4XGG7Ycz0ydjIwlTCfsNq0/e36fts+n5o+rAg76yeFk3fo+l7NH2/YvorZ0DD+qbvm6bvt03fz5i+Z6ZPwuMK2w1jpk/GRhamEvYbVpu+v03fZ9P3Q9OHBXln9bRo+h5N36Pp+xXTXzkDGtY3fd80fb9t+n7G9D0zfRIeV9huGDN9MjayMJWw37Da9P1t+j6bvh+aPizIO6unRdP3aPoeTd+vmP7KGdCwvun7pun7bdP3M6bvmemT8LjCdsOY6ZOxkYWphP2G1abvb9P32fT90PRhQd5ZPS2avkfT92j6fsX0V86AhvVN3zdN32+bvp8xfc9Mn4THFbYbxkyfjI0sTCXsN6w2fX+bvs+m74emDwvyzupp0fQ9mr5H0/crpr9yBjSsb/q+afp+2/T9jOl7ZvokPK6w3TBm+mRsZGEqYb9hten72/R9Nn0/NH1YkHdWT4um79H0PZq+XzH9lTOgYX3T903T99umH2ZMPzDTJ+Fxhc2GkfDBxkYWphJ2GxZq0w+36Yds+mFo+rAg73x+2oCmH9D0A5p+WDH9lTNeGxb6ph+aph+2TT/MmH5gpk/C4wrbDWOmT8ZGFqYS9htWm364TT9k0w9D04cFeWf1tGj6AU0/oOmHFdNfOQMa1jf90DT9sG36Ycb0AzN9Eh5X2G4YM30yNrIwlbDfsNr0w236IZt+GJo+LMg7q6dF0w9o+gFNP6yY/soZ0LC+6Yem6Ydt0w8zph+Y6ZPwuMJ2w5jpk7GRhamE/YbVph9u0w/Z9MPQ9GFB3lk9LZp+QNMPaPphxfRXzoCG9U0/NE0/bJt+mDH9wEyfhMcVthvGTJ+MjSxMJew3rDb9cJt+yKYfhqYPC/LO6mnR9AOafkDTDyumv3IGNKxv+qFp+mHb9MOM6Qdm+iQ8rrDdMGb6ZGxkYSphv2G16Yfb9EM2/TA0fViQd1ZPi6Yf0PQDmn5YMf2VM6BhfdMPTdMP26YfZkw/MNMn4XGF7YYx0ydjIwtTCfsNq00/3KYfsumHoenDgryzelo0/YCmH9D0w4rpr5wBDeubfmiaftg2/TBj+oGZPgmPK2w3jJk+GRtZmErYb1ht+uE2/ZBNPwxNHxbkndXToukHNP2Aph9WTH/lDGhY3/RD0/TDtumHGdMPzPRJeFxhu2HM9MnYyMJUwn7DatMPt+mHbPphaPqwIO+snhZNP6DpBzT9sGL6K2dAw/qmH5qmH7ZNP8yYfmCmT8LjCtsNY6ZPxkYWphL2G1abfrhNP2TTD0PThwV5Z/W0aPoBTT+g6YcV0185AxrWN/3QNP2wa/rq7YTpf/yhXsNYeFxhq2EsfLCxkYWphL2GqbeV6ec/fmrY+V9+nv88aBguyDufnvb802vDyqenhpVPTw0rn6YatnTGS8Oez3lp2PNZ+HWnYROm//GH+g0jpn+F7YYR02djIwtTCfsNE3XDxN0wkRs2Mn1ckHdWTwumXz5VDQPTL58mG7ZwBjSsa/rPZ+HXnYZNmP7HH+o3jJj+FbYbRkyfjY0sTCXsN0zWDZN3w2Ru2Mj0cUHeWT0tmH75VDUMTL98mmzYwhnQsK7pP5+FX3caNmH6H3+o3zBi+lfYbhgxfTY2sjCVsN8wVTdM3Q1TuWEj08cFeWf1tGD65VPVMDD98mmyYQtnQMO6pv98Fn7dadiE6X/8oX7DiOlfYbthxPTZ2MjCVMJ+w3TdMH03TOeGjUwfF+Sd1dOC6ZdPVcPA9MunyYYtnAEN65r+81n4dadhE6b/8Yf6DSOmf4XthhHTZ2MjC1MJ+w0zdcPM3TCTGzYyfVyQd1ZPC6ZfPlUNA9MvnyYbtnAGNKxr+s9n4dedhk2Y/scf6jeMmP4VthtGTJ+NjSxMJew3zNYNs3fDbG7YyPRxQd5ZPS2YfvlUNQxMv3yabNjCGdCwruk/n4Vfdxo2Yfoff6jfMGL6V9huGDF9NjayMJWw3zBXN8zdDXO5YSPTxwV5Z/W0YPrlU9UwMP3yabJhC2dAw7qm/3wWft1p2ITpf/yhfsOI6V9hu2HE9NnYyMJUwn7DfN0wfzfM54aNTB8X5J3V04Lpl09Vw8D0y6fJhi2cAQ3rmv7zWfh1p2ETpv/xh/oNI6Z/he2GEdNnYyMLUwn7DQt1w8LdsJAbNjJ9XJB3Vk8Lpl8+VQ0D0y+fJhu2cAY0rGv6z2fh142GiRnTF8z0SXhcYbNhJHywsZGFqYTdhona9MVt+iKbvhiaPizIO5+fVqDpCzR9gaYvVkx/5YzXhom+6Yum6Ytt0xczpi+Y6ZPwuMJ2w5jpk7GRhamE/YbVpi9u0xfZ9MXQ9GFB3lk9LZq+QNMXaPpixfRXzoCG9U1fNE1fbJu+mDF9wUyfhMcVthvGTJ+MjSxMJew3rDZ9cZu+yKYvhqYPC/LO6mnR9AWavkDTFyumv3IGNKxv+qJp+mLb9MWM6Qtm+iQ8rrDdMGb6ZGxkYSphv2G16Yvb9EU2fTE0fViQd1ZPi6Yv0PQFmr5YMf2VM6BhfdMXTdMX26YvZkxfMNMn4XGF7YYx0ydjIwtTCfsNq01f3KYvsumLoenDgryzelo0fYGmL9D0xYrpr5wBDeubvmiavtg2fTFj+oKZPgmPK2w3jJk+GRtZmErYb1ht+uI2fZFNXwxNHxbkndXToukLNH2Bpi9WTH/lDGhY3/RF0/TFtumLGdMXzPRJeFxhu2HM9MnYyMJUwn7DatMXt+mLbPpiaPqwIO+snhZNX6DpCzR9sWL6K2dAw/qmL5qmL7ZNX8yYvmCmT8LjCtsNY6ZPxkYWphL2G1abvrhNX2TTF0PThwV5Z/W0aPoCTV+g6YsV0185AxrWN33RNH2xbfpixvQFM30SHlfYbhgzfTI2sjCVsN+w2vTFbfoim74Ymj4syDurp0XTF2j6Ak1frJj+yhnQsL7pi6bpi23TFzOmL5jpk/C4wnbDmOmTsZGFqYT9htWmL27TF9n0xdD0YUHeWT0tmr5A0xdo+mLF9FfOgIb1TV80TV9sm76cMX3JTJ+ExxU2G0bCBxsbWZhK2G2YrE1f3qYvs+nLoenDgrzz+Wklmr5E05do+nLF9FfOeG2Y7Ju+bJq+3DZ9OWP6kpk+CY8rbDeMmT4ZG1mYSthvWG368jZ9mU1fDk0fFuSd1dOi6Us0fYmmL1dMf+UMaFjf9GXT9OW26csZ05fM9El4XGG7Ycz0ydjIwlTCfsNq05e36cts+nJo+rAg76yeFk1foulLNH25YvorZ0DD+qYvm6Yvt01fzpi+ZKZPwuMK2w1jpk/GRhamEvYbVpu+vE1fZtOXQ9OHBXln9bRo+hJNX6LpyxXTXzkDGtY3fdk0fblt+nLG9CUzfRIeV9huGDN9MjayMJWw37Da9OVt+jKbvhyaPizIO6unRdOXaPoSTV+umP7KGdCwvunLpunLbdOXM6YvmemT8LjCdsOY6ZOxkYWphP2G1aYvb9OX2fTl0PRhQd5ZPS2avkTTl2j6csX0V86AhvVNXzZNX26bvpwxfclMn4THFbYbxkyfjI0sTCXsN6w2fXmbvsymL4emDwvyzupp0fQlmr5E05crpr9yBjSsb/qyafpy2/TljOlLZvokPK6w3TBm+mRsZGEqYb9htenL2/RlNn05NH1YkHdWT4umL9H0JZq+XDH9lTOgYX3Tl03Tl9umL2dMXzLTJ+Fxhe2GMdMnYyMLUwn7DatNX96mL7Ppy6Hpw4K8s3paNH2Jpi/R9OWK6a+cAQ3rm75smr7cNn05Y/qSmT4JjytsN4yZPhkbWZhK2G9YbfryNn2ZTV8OTR8W5J3V06LpSzR9iaYvV0x/5QxoWN/0ZdP05bbpqxnTV8z0SXhcYbNhJHywsZGFqYTdhqna9NVt+iqbvhqaPizIO5+fVqHpKzR9haavVkx/5YzXhqm+6aum6att01czpq+Y6ZPwuMJ2w5jpk7GRhamE/YbVpq9u01fZ9NXQ9GFB3lk9LZq+QtNXaPpqxfRXzoCG9U1fNU1fbZu+mjF9xUyfhMcVthvGTJ+MjSxMJew3rDZ9dZu+yqavhqYPC/LO6mnR9BWavkLTVyumv3IGNKxv+qpp+mrb9NWM6Stm+iQ8rrDdMGb6ZGxkYSphv2G16avb9FU2fTU0fViQd1ZPi6av0PQVmr5aMf2VM6BhfdNXTdNX26avZkxfMdMn4XGF7YYx0ydjIwtTCfsNq01f3aavsumroenDgryzelo0fYWmr9D01Yrpr5wBDeubvmqavto2fTVj+oqZPgmPK2w3jJk+GRtZmErYb1ht+uo2fZVNXw1NHxbkndXToukrNH2Fpq9WTH/lDGhY3/RV0/TVtumrGdNXzPRJeFxhu2HM9MnYyMJUwn7DatNXt+mrbPpqaPqwIO+snhZNX6HpKzR9tWL6K2dAw/qmr5qmr7ZNX82YvmKmT8LjCtsNY6ZPxkYWphL2G1abvrpNX2XTV0PThwV5Z/W0aPoKTV+h6asV0185AxrWN33VNH21bfpqxvQVM30SHlfYbhgzfTI2sjCVsN+w2vTVbfoqm74amj4syDurp0XTV2j6Ck1frZj+yhnQsL7pq6bpq23TVzOmr5jpk/C4wnbDmOmTsZGFqYT9htWmr27TV9n01dD0YUHeWT0tmr5C01do+mrF9FfOgIb1TV81TV9tm76eMX3NTJ+ExxU2G0bCBxsbWZhK2G2Yrk1f36avs+nroenDgrzz+Wk1mr5G09do+nrF9FfOeG2Y7pu+bpq+3jZ9PWP6mpk+CY8rbDeMmT4ZG1mYSthvWG36+jZ9nU1fD00fFuSd1dOi6Ws0fY2mr1dMf+UMaFjf9HXT9PW26esZ09fM9El4XGG7Ycz0ydjIwlTCfsNq09e36ets+npo+rAg76yeFk1fo+lrNH29YvorZ0DD+qavm6avt01fz5i+ZqZPwuMK2w1jpk/GRhamEvYbVpu+vk1fZ9PXQ9OHBXln9bRo+hpNX6Pp6xXTXzkDGtY3fd00fb1t+nrG9DUzfRIeV9huGDN9MjayMJWw37Da9PVt+jqbvh6aPizIO6unRdPXaPoaTV+vmP7KGdCwvunrpunrbdPXM6avmemT8LjCdsOY6ZOxkYWphP2G1aavb9PX2fT10PRhQd5ZPS2avkbT12j6esX0V86AhvVNXzdNX2+bvp4xfc1Mn4THFbYbxkyfjI0sTCXsN6w2fX2bvs6mr4emDwvyzupp0fQ1mr5G09crpr9yBjSsb/q6afp62/T1jOlrZvokPK6w3TBm+mRsZGEqYb9htenr2/R1Nn09NH1YkHdWT4umr9H0NZq+XjH9lTOgYX3T103T19umr2dMXzPTJ+Fxhe2GMdMnYyMLUwn7DatNX9+mr7Pp66Hpw4K8s3paNH2Npq/R9PWK6a+cAQ3rm75umr7eNn09Y/qamT4JjytsN4yZPhkbWZhK2G9Ybfr6Nn2dTV8PTR8W5J3V06LpazR9jaavV0x/5QxoWN/0ddP09bbpmxnTN8z0SXhcYbNhJHywsZGFqYTdhpna9M1t+iabvhmaPizIO5+f1qDpGzR9g6ZvVkx/5YzXhpm+6Zum6Ztt0zczpm+Y6ZPwuMJ2w5jpk7GRhamE/YbVpm9u0zfZ9M3Q9GFB3lk9LZq+QdM3aPpmxfRXzoCG9U3fNE3fbJu+mTF9w0yfhMcVthvGTJ+MjSxMJew3rDZ9c5u+yaZvhqYPC/LO6mnR9A2avkHTNyumv3IGNKxv+qZp+mbb9M2M6Rtm+iQ8rrDdMGb6ZGxkYSphv2G16Zvb9E02fTM0fViQd1ZPi6Zv0PQNmr5ZMf2VM6BhfdM3TdM326ZvZkzfMNMn4XGF7YYx0ydjIwtTCfsNq03f3KZvsumboenDgryzelo0fYOmb9D0zYrpr5wBDeubvmmavtk2fTNj+oaZPgmPK2w3jJk+GRtZmErYb1ht+uY2fZNN3wxNHxbkndXToukbNH2Dpm9WTH/lDGhY3/RN0/TNtumbGdM3zPRJeFxhu2HM9MnYyMJUwn7DatM3t+mbbPpmaPqwIO+snhZN36DpGzR9s2L6K2dAw/qmb5qmb7ZN38yYvmGmT8LjCtsNY6ZPxkYWphL2G1abvrlN32TTN0PThwV5Z/W0aPoGTd+g6ZsV0185AxrWN33TNH2zbfpmxvQNM30SHlfYbhgzfTI2sjCVsN+w2vTNbfomm74Zmj4syDurp0XTN2j6Bk3frJj+yhnQsL7pm6bpm23TNzOmb5jpk/C4wnbDmOmTsZGFqYT9htWmb27TN9n0zdD0YUHeWT0tmr5B0zdo+mbF9FfOgIb1Td80Td9sm76dMX3LTJ+ExxU2G0bCBxsbWZhK2G2YrU3f3qZvs+nboenDgrzz+Wktmr5F07do+nbF9FfOeG2Y7Zu+bZq+3TZ9O2P6lpk+CY8rbDeMmT4ZG1mYSthvWG369jZ9m03fDk0fFuSd1dOi6Vs0fYumb1dMf+UMaFjf9G3T9O226dsZ07fM9El4XGG7Ycz0ydjIwlTCfsNq07e36dts+nZo+rAg76yeFk3foulbNH27YvorZ0DD+qZvm6Zvt03fzpi+ZaZPwuMK2w1jpk/GRhamEvYbVpu+vU3fZtO3Q9OHBXln9bRo+hZN36Lp2xXTXzkDGtY3fds0fbtt+nbG9C0zfRIeV9huGDN9MjayMJWw37Da9O1t+jabvh2aPizIO6unRdO3aPoWTd+umP7KGdCwvunbpunbbdO3M6ZvmemT8LjCdsOY6ZOxkYWphP2G1aZvb9O32fTt0PRhQd5ZPS2avkXTt2j6dsX0V86AhvVN3zZN326bvp0xfctMn4THFbYbxkyfjI0sTCXsN6w2fXubvs2mb4emDwvyzupp0fQtmr5F07crpr9yBjSsb/q2afp22/TtjOlbZvokPK6w3TBm+mRsZGEqYb9htenb2/RtNn07NH1YkHdWT4umb9H0LZq+XTH9lTOgYX3Tt03Tt9umb2dM3zLTJ+Fxhe2GMdMnYyMLUwn7DatN396mb7Pp26Hpw4K8s3paNH2Lpm/R9O2K6a+cAQ3rm75tmr7dNn07Y/qWmT4JjytsN4yZPhkbWZhK2G9Ybfr2Nn2bTd8OTR8W5J3V06LpWzR9i6ZvV0x/5QxoWN/0bdP07bbpuxnTd8z0SXhcYbNhJHywsZGFqYTdhrna9N1t+i6bvhuaPizIO5+f1qHpOzR9h6bvVkx/5YzXhrm+6bum6btt03czpu+Y6ZPwuMJ2w5jpk7GRhamE/YbVpu9u03fZ9N3Q9GFB3lk9LZq+Q9N3aPpuxfRXzoCG9U3fNU3fbZu+mzF9x0yfhMcVthvGTJ+MjSxMJew3rDZ9d5u+y6bvhqYPC/LO6mnR9B2avkPTdyumv3IGNKxv+q5p+m7b9N2M6Ttm+iQ8rrDdMGb6ZGxkYSphv2G16bvb9F02fTc0fViQd1ZPi6bv0PQdmr5bMf2VM6BhfdN3TdN326bvZkzfMdMn4XGF7YYx0ydjIwtTCfsNq03f3abvsum7oenDgryzelo0fYem79D03Yrpr5wBDeubvmuavts2fTdj+o6ZPgmPK2w3jJk+GRtZmErYb1ht+u42fZdN3w1NHxbkndXTouk7NH2Hpu9WTH/lDGhY3/Rd0/Tdtum7GdN3zPRJeFxhu2HM9MnYyMJUwn7DatN3t+m7bPpuaPqwIO+snhZN36HpOzR9t2L6K2dAw/qm75qm77ZN382YvmOmT8LjCtsNY6ZPxkYWphL2G1abvrtN32XTd0PThwV5Z/W0aPoOTd+h6bsV0185AxrWN33XNH23bfpuxvQdM30SHlfYbhgzfTI2sjCVsN+w2vTdbfoum74bmj4syDurp0XTd2j6Dk3frZj+yhnQsL7pu6bpu23TdzOm75jpk/C4wnbDmOmTsZGFqYT9htWm727Td9n03dD0YUHeWT0tmr5D03do+m7F9FfOgIb1Td81Td9tm76fMX3PTJ+ExxU2G0bCBxsbWZhK2G2Yr03f36bvs+n7oenDgrzz+Wk9mr5H0/do+n7F9FfOeG2Y75u+b5q+3zZ9P2P6npk+CY8rbDeMmT4ZG1mYSthvWG36/jZ9n03fD00fFuSd1dOi6Xs0fY+m71dMf+UMaFjf9H3T9P226fsZ0/fM9El4XGG7Ycz0ydjIwlTCfsNq0/e36fts+n5o+rAg76yeFk3fo+l7NH2/YvorZ0DD+qbvm6bvt03fz5i+Z6ZPwuMK2w1jpk/GRhamEvYbVpu+v03fZ9P3Q9OHBXln9bRo+h5N36Pp+xXTXzkDGtY3fd80fb9t+n7G9D0zfRIeV9huGDN9MjayMJWw37Da9P1t+j6bvh+aPizIO6unRdP3aPoeTd+vmP7KGdCwvun7pun7bdP3M6bvmemT8LjCdsOY6ZOxkYWphP2G1abvb9P32fT90PRhQd5ZPS2avkfT92j6fsX0V86AhvVN3zdN32+bvp8xfc9Mn4THFbYbxkyfjI0sTCXsN6w2fX+bvs+m74emDwvyzupp0fQ9mr5H0/crpr9yBjSsb/q+afp+2/T9jOl7ZvokPK6w3TBm+mRsZGEqYb9hten72/R9Nn0/NH1YkHdWT4um79H0PZq+XzH9lTOgYX3T903T99um72dM3zPTJ+Fxhe2GMdMnYyMLUwn7DatN39+m77Pp+6Hpw4K8s3paNH2Ppu/R9P2K6a+cAQ3rm75vmr7fNn0/Y/qemT4JjytsN4yZPhkbWZhK2G9Ybfr+Nn2fTd8PTR8W5J3V06LpezR9j6bvV0x/5QxoWN/0fdP0/bbphxnTD8z0SXhcYbNhJHywsZGFqYTdhoXa9MNt+iGbfhiaPizIO5+fNqDpBzT9gKYfVkx/5YzXhoW+6Yem6Ydt0w8zph+Y6ZPwuMJ2w5jpk7GRhamE/YbVph9u0w/Z9MPQ9GFB3lk9LZp+QNMPaPphxfRXzoCG9U0/NE0/bJt+mDH9wEyfhMcVthvGTJ+MjSxMJew3rDb9cJt+yKYfhqYPC/LO6mnR9AOafkDTDyumv3IGNKxv+qFp+mHb9MOM6Qdm+iQ8rrDdMGb6ZGxkYSphv2G16Yfb9EM2/TA0fViQd1ZPi6Yf0PQDmn5YMf2VM6BhfdMPTdMP26YfZkw/MNMn4XGF7YYx0ydjIwtTCfsNq00/3KYfsumHoenDgryzelo0/YCmH9D0w4rpr5wBDeubfmiaftg2/TBj+oGZPgmPK2w3jJk+GRtZmErYb1ht+uE2/ZBNPwxNHxbkndXToukHNP2Aph9WTH/lDGhY3/RD0/TDtumHGdMPzPRJeFxhu2HM9MnYyMJUwn7DatMPt+mHbPphaPqwIO+snhZNP6DpBzT9sGL6K2dAw/qmH5qmH7ZNP8yYfmCmT8LjCtsNY6ZPxkYWphL2G1abfrhNP2TTD0PThwV5Z/W0aPoBTT+g6YcV0185AxrWN/3QNP2wbfphxvQDM30SHlfYbhgzfTI2sjCVsN+w2vTDbfohm34Ymj4syDurp0XTD2j6AU0/rJj+yhnQsL7ph6bph23TDzOmH5jpk/C4wnbDmOmTsZGF/38nd7NjyXFcAfhVBtxKEJn/mQLJhYtdBS4EGBDh/ZhqkgMNp8c9TRN+e3f0TFbd7JNxKrNWVte5zAgzDrT4FtpqqDesNf1ymH4R0y+npg8DZGZzWjT9gqZf0PTLjOnPrAEN002/dE2/XDV9/82A6b/8SGsYC5c97DWMhXfs2ZWFWw21hvlvGtOXP7807Pk//kX+PmkYDpCZN6d9/ut1w+qnm4bVTzcNq5+GGja1xquG3a7zqmG3a+HXKw0bMP2XH+kNI6a/h/2GEdNnz64s3GqoN8y0DTNHw4w07Mz0cYDMbE4Lpl8/NQ0D06+fBhs2sQY0TDX927Xw65WGDZj+y4/0hhHT38N+w4jps2dXFm411Btm24bZo2FWGnZm+jhAZjanBdOvn5qGgenXT4MNm1gDGqaa/u1a+PVKwwZM/+VHesOI6e9hv2HE9NmzKwu3GuoNc23D3NEwJw07M30cIDOb04Lp109Nw8D066fBhk2sAQ1TTf92Lfx6pWEDpv/yI71hxPT3sN8wYvrs2ZWFWw31hvm2Yf5omJeGnZk+DpCZzWnB9OunpmFg+vXTYMMm1oCGqaZ/uxZ+vdKwAdN/+ZHeMGL6e9hvGDF99uzKwq2GesNC27BwNCxIw85MHwfIzOa0YPr1U9MwMP36abBhE2tAw1TTv10Lv15p2IDpv/xIbxgx/T3sN4yYPnt2ZeFWQ71hsW1YPBoWpWFnpo8DZGZzWjD9+qlpGJh+/TTYsIk1oGGq6d+uhV+vNGzA9F9+pDeMmP4e9htGTJ89u7Jwq6HesNQ2LB0NS9KwM9PHATKzOS2Yfv3UNAxMv34abNjEGtAw1fRv18KvVxo2YPovP9IbRkx/D/sNI6bPnl1ZuNVQb1huG5aPhmVp2Jnp4wCZ2ZwWTL9+ahoGpl8/DTZsYg1omGr6t2vh1ysNGzD9lx/pDSOmv4f9hhHTZ8+uLNxqqDestA0rR8OKNOzM9HGAzGxOC6ZfPzUNA9OvnwYbNrEGNEw1/du18OuFhpkR0zfM9Em47GG3YSS8Y8+uLNxqqDbMtKZvDtM3Yvrm1PRhgMy8Pa1B0zdo+gZN38yY/swarxtmdNM3XdM3l03fjJi+YaZPwmUP+w1jpk+eXVm41VBvWGv65jB9I6ZvTk0fBsjM5rRo+gZN36DpmxnTn1kDGqabvumavrls+mbE9A0zfRIue9hvGDN98uzKwq2GesNa0zeH6RsxfXNq+jBAZjanRdM3aPoGTd/MmP7MGtAw3fRN1/TNZdM3I6ZvmOmTcNnDfsOY6ZNnVxZuNdQb1pq+OUzfiOmbU9OHATKzOS2avkHTN2j6Zsb0Z9aAhummb7qmby6bvhkxfcNMn4TLHvYbxkyfPLuycKuh3rDW9M1h+kZM35yaPgyQmc1p0fQNmr5B0zczpj+zBjRMN33TNX1z2fTNiOkbZvokXPaw3zBm+uTZlYVbDfWGtaZvDtM3Yvrm1PRhgMxsToumb9D0DZq+mTH9mTWgYbrpm67pm8umb0ZM3zDTJ+Gyh/2GMdMnz64s3GqoN6w1fXOYvhHTN6emDwNkZnNaNH2Dpm/Q9M2M6c+sAQ3TTd90Td9cNn0zYvqGmT4Jlz3sN4yZPnl2ZeFWQ71hrembw/SNmL45NX0YIDOb06LpGzR9g6ZvZkx/Zg1omG76pmv65rLpmxHTN8z0SbjsYb9hzPTJsysLtxrqDWtN3xymb8T0zanpwwCZ2ZwWTd+g6Rs0fTNj+jNrQMN00zdd0zeXTd+MmL5hpk/CZQ/7DWOmT55dWbjVUG9Ya/rmMH0jpm9OTR8GyMzmtGj6Bk3foOmbGdOfWQMappu+6Zq+uWz6dsT0LTN9Ei572G0YCe/YsysLtxqqDbOt6dvD9K2Yvj01fRggM29Pa9H0LZq+RdO3M6Y/s8brhlnd9G3X9O1l07cjpm+Z6ZNw2cN+w5jpk2dXFm411BvWmr49TN+K6dtT04cBMrM5LZq+RdO3aPp2xvRn1oCG6aZvu6ZvL5u+HTF9y0yfhMse9hvGTJ88u7Jwq6HesNb07WH6Vkzfnpo+DJCZzWnR9C2avkXTtzOmP7MGNEw3fds1fXvZ9O2I6Vtm+iRc9rDfMGb65NmVhVsN9Ya1pm8P07di+vbU9GGAzGxOi6Zv0fQtmr6dMf2ZNaBhuunbrunby6ZvR0zfMtMn4bKH/YYx0yfPrizcaqg3rDV9e5i+FdO3p6YPA2Rmc1o0fYumb9H07Yzpz6wBDdNN33ZN3142fTti+paZPgmXPew3jJk+eXZl4VZDvWGt6dvD9K2Yvj01fRggM5vToulbNH2Lpm9nTH9mDWiYbvq2a/r2sunbEdO3zPRJuOxhv2HM9MmzKwu3GuoNa03fHqZvxfTtqenDAJnZnBZN36LpWzR9O2P6M2tAw3TTt13Tt5dN346YvmWmT8JlD/sNY6ZPnl1ZuNVQb1hr+vYwfSumb09NHwbIzOa0aPoWTd+i6dsZ059ZAxqmm77tmr69bPp2xPQtM30SLnvYbxgzffLsysKthnrDWtO3h+lbMX17avowQGY2p0XTt2j6Fk3fzpj+zBrQMN30bdf07WXTtyOmb5npk3DZw37DmOmTZ1cWbjXUG9aavj1M34rp21PThwEyszktmr5F07do+nbG9GfWgIbppm+7pm8vm74bMX3HTJ+Eyx52G0bCO/bsysKthmrDXGv67jB9J6bvTk0fBsjM29M6NH2Hpu/Q9N2M6c+s8bphTjd91zV9d9n03YjpO2b6JFz2sN8wZvrk2ZWFWw31hrWm7w7Td2L67tT0YYDMbE6Lpu/Q9B2avpsx/Zk1oGG66buu6bvLpu9GTN8x0yfhsof9hjHTJ8+uLNxqqDesNX13mL4T03enpg8DZGZzWjR9h6bv0PTdjOnPrAEN003fdU3fXTZ9N2L6jpk+CZc97DeMmT55dmXhVkO9Ya3pu8P0nZi+OzV9GCAzm9Oi6Ts0fYem72ZMf2YNaJhu+q5r+u6y6bsR03fM9Em47GG/Ycz0ybMrC7ca6g1rTd8dpu/E9N2p6cMAmdmcFk3foek7NH03Y/oza0DDdNN3XdN3l03fjZi+Y6ZPwmUP+w1jpk+eXVm41VBvWGv67jB9J6bvTk0fBsjM5rRo+g5N36HpuxnTn1kDGqabvuuavrts+m7E9B0zfRIue9hvGDN98uzKwq2GesNa03eH6TsxfXdq+jBAZjanRdN3aPoOTd/NmP7MGtAw3fRd1/TdZdN3I6bvmOmTcNnDfsOY6ZNnVxZuNdQb1pq+O0zfiem7U9OHATKzOS2avkPTd2j6bsb0Z9aAhumm77qm7y6bvhsxfcdMn4TLHvYbxkyfPLuycKuh3rDW9N1h+k5M352aPgyQmc1p0fQdmr5D03czpj+zBjRMN33XNX132fTdiOk7ZvokXPaw3zBm+uTZlYVbDfWGtabvDtN3Yvru1PRhgMxsToum79D0HZq+mzH9mTWgYbrpu67pu8um70dM3zPTJ+Gyh92GkfCOPbuycKuh2jDfmr4/TN+L6ftT04cBMvP2tB5N36PpezR9P2P6M2u8bpjXTd93Td9fNn0/YvqemT4Jlz3sN4yZPnl2ZeFWQ71hren7w/S9mL4/NX0YIDOb06LpezR9j6bvZ0x/Zg1omG76vmv6/rLp+xHT98z0SbjsYb9hzPTJsysLtxrqDWtN3x+m78X0/anpwwCZ2ZwWTd+j6Xs0fT9j+jNrQMN00/dd0/eXTd+PmL5npk/CZQ/7DWOmT55dWbjVUG9Ya/r+MH0vpu9PTR8GyMzmtGj6Hk3fo+n7GdOfWQMappu+75q+v2z6fsT0PTN9Ei572G8YM33y7MrCrYZ6w1rT94fpezF9f2r6MEBmNqdF0/do+h5N38+Y/swa0DDd9H3X9P1l0/cjpu+Z6ZNw2cN+w5jpk2dXFm411BvWmr4/TN+L6ftT04cBMrM5LZq+R9P3aPp+xvRn1oCG6abvu6bvL5u+HzF9z0yfhMse9hvGTJ88u7Jwq6HesNb0/WH6Xkzfn5o+DJCZzWnR9D2avkfT9zOmP7MGNEw3fd81fX/Z9P2I6Xtm+iRc9rDfMGb65NmVhVsN9Ya1pu8P0/di+v7U9GGAzGxOi6bv0fQ9mr6fMf2ZNaBhuun7run7y6bvR0zfM9Mn4bKH/YYx0yfPrizcaqg3rDV9f5i+F9P3p6YPA2Rmc1o0fY+m79H0/Yzpz6wBDdNN33dN3182fT9i+p6ZPgmXPew3jJk+eXZl4VZDvWGt6fvD9L2Yvj81fRggM5vToul7NH2Ppu9nTH9mDWiYbvq+a/r+sumHEdMPzPRJuOxht2EkvGPPrizcaqg2LLSmHw7TD2L64dT0YYDMvD1tQNMPaPoBTT/MmP7MGq8bFnTTD13TD5dNP4yYfmCmT8JlD/sNY6ZPnl1ZuNVQb1hr+uEw/SCmH05NHwbIzOa0aPoBTT+g6YcZ059ZAxqmm37omn64bPphxPQDM30SLnvYbxgzffLsysKthnrDWtMPh+kHMf1wavowQGY2p0XTD2j6AU0/zJj+zBrQMN30Q9f0w2XTDyOmH5jpk3DZw37DmOmTZ1cWbjXUG9aafjhMP4jph1PThwEyszktmn5A0w9o+mHG9GfWgIbpph+6ph8um34YMf3ATJ+Eyx72G8ZMnzy7snCrod6w1vTDYfpBTD+cmj4MkJnNadH0A5p+QNMPM6Y/swY0TDf90DX9cNn0w4jpB2b6JFz2sN8wZvrk2ZWFWw31hrWmHw7TD2L64dT0YYDMbE6Lph/Q9AOafpgx/Zk1oGG66Yeu6YfLph9GTD8w0yfhsof9hjHTJ8+uLNxqqDesNf1wmH4Q0w+npg8DZGZzWjT9gKYf0PTDjOnPrAEN000/dE0/XDb9MGL6gZk+CZc97DeMmT55dmXhVkO9Ya3ph8P0g5h+ODV9GCAzm9Oi6Qc0/YCmH2ZMf2YNaJhu+qFr+uGy6YcR0w/M9Em47GG/Ycz0ybMrC7ca6g1rTT8cph/E9MOp6cMAmdmcFk0/oOkHNP0wY/oza0DDdNMPXdMPl00/jJh+YKZPwmUP+w1jpk+eXVm41VBvWGv64TD9IKYfTk0fBsjM5rRo+gFNP6DphxnTn1kDGqabfuiafrhs+nHE9CMzfRIue9htGAnv2LMrC7caqg2LrenHw/SjmH48NX0YIDNvTxvR9COafkTTjzOmP7PG64ZF3fRj1/TjZdOPI6YfmemTcNnDfsOY6ZNnVxZuNdQb1pp+PEw/iunHU9OHATKzOS2afkTTj2j6ccb0Z9aAhummH7umHy+bfhwx/chMn4TLHvYbxkyfPLuycKuh3rDW9ONh+lFMP56aPgyQmc1p0fQjmn5E048zpj+zBjRMN/3YNf142fTjiOlHZvokXPaw3zBm+uTZlYVbDfWGtaYfD9OPYvrx1PRhgMxsToumH9H0I5p+nDH9mTWgYbrpx67px8umH0dMPzLTJ+Gyh/2GMdMnz64s3GqoN6w1/XiYfhTTj6emDwNkZnNaNP2Iph/R9OOM6c+sAQ3TTT92TT9eNv04YvqRmT4Jlz3sN4yZPnl2ZeFWQ71hrenHw/SjmH48NX0YIDOb06LpRzT9iKYfZ0x/Zg1omG76sWv68bLpxxHTj8z0SbjsYb9hzPTJsysLtxrqDWtNPx6mH8X046npwwCZ2ZwWTT+i6Uc0/Thj+jNrQMN0049d04+XTT+OmH5kpk/CZQ/7DWOmT55dWbjVUG9Ya/rxMP0oph9PTR8GyMzmtGj6EU0/ounHGdOfWQMappt+7Jp+vGz6ccT0IzN9Ei572G8YM33y7MrCrYZ6w1rTj4fpRzH9eGr6MEBmNqdF049o+hFNP86Y/swa0DDd9GPX9ONl048jph+Z6ZNw2cN+w5jpk2dXFm411BvWmn48TD+K6cdT04cBMrM5LZp+RNOPaPpxxvRn1oCG6aYfu6YfL5t+GjH9xEyfhMsedhtGwjv27MrCrYZqw1Jr+ukw/SSmn05NHwbIzNvTJjT9hKaf0PTTjOnPrPG6YUk3/dQ1/XTZ9NOI6Sdm+iRc9rDfMGb65NmVhVsN9Ya1pp8O009i+unU9GGAzGxOi6af0PQTmn6aMf2ZNaBhuumnrumny6afRkw/MdMn4bKH/YYx0yfPrizcaqg3rDX9dJh+EtNPp6YPA2Rmc1o0/YSmn9D004zpz6wBDdNNP3VNP102/TRi+omZPgmXPew3jJk+eXZl4VZDvWGt6afD9JOYfjo1fRggM5vTouknNP2Epp9mTH9mDWiYbvqpa/rpsumnEdNPzPRJuOxhv2HM9MmzKwu3GuoNa00/HaafxPTTqenDAJnZnBZNP6HpJzT9NGP6M2tAw3TTT13TT5dNP42YfmKmT8JlD/sNY6ZPnl1ZuNVQb1hr+ukw/SSmn05NHwbIzOa0aPoJTT+h6acZ059ZAxqmm37qmn66bPppxPQTM30SLnvYbxgzffLsysKthnrDWtNPh+knMf10avowQGY2p0XTT2j6CU0/zZj+zBrQMN30U9f002XTTyOmn5jpk3DZw37DmOmTZ1cWbjXUG9aafjpMP4npp1PThwEyszktmn5C009o+mnG9GfWgIbppp+6pp8um34aMf3ETJ+Eyx72G8ZMnzy7snCrod6w1vTTYfpJTD+dmj4MkJnNadH0E5p+QtNPM6Y/swY0TDf91DX9dNn004jpJ2b6JFz2sN8wZvrk2ZWFWw31hrWmnw7TT2L66dT0YYDMbE6Lpp/Q9BOafpox/Zk1oGG66aeu6afLpp9HTD8z0yfhsofdhpHwjj27snCrodqw3Jp+Pkw/i+nnU9OHATLz9rQZTT+j6Wc0/Txj+jNrvG5Y1k0/d00/Xzb9PGL6mZk+CZc97DeMmT55dmXhVkO9Ya3p58P0s5h+PjV9GCAzm9Oi6Wc0/Yymn2dMf2YNaJhu+rlr+vmy6ecR08/M9Em47GG/Ycz0ybMrC7ca6g1rTT8fpp/F9POp6cMAmdmcFk0/o+lnNP08Y/oza0DDdNPPXdPPl00/j5h+ZqZPwmUP+w1jpk+eXVm41VBvWGv6+TD9LKafT00fBsjM5rRo+hlNP6Pp5xnTn1kDGqabfu6afr5s+nnE9DMzfRIue9hvGDN98uzKwq2GesNa08+H6Wcx/Xxq+jBAZjanRdPPaPoZTT/PmP7MGtAw3fRz1/TzZdPPI6afmemTcNnDfsOY6ZNnVxZuNdQb1pp+Pkw/i+nnU9OHATKzOS2afkbTz2j6ecb0Z9aAhummn7umny+bfh4x/cxMn4TLHvYbxkyfPLuycKuh3rDW9PNh+llMP5+aPgyQmc1p0fQzmn5G088zpj+zBjRMN/3cNf182fTziOlnZvokXPaw3zBm+uTZlYVbDfWGtaafD9PPYvr51PRhgMxsToumn9H0M5p+njH9mTWgYbrp567p58umn0dMPzPTJ+Gyh/2GMdMnz64s3GqoN6w1/XyYfhbTz6emDwNkZnNaNP2Mpp/R9POM6c+sAQ3TTT93TT9fNv08YvqZmT4Jlz3sN4yZPnl2ZeFWQ71hrennw/SzmH4+NX0YIDOb06LpZzT9jKafZ0x/Zg1omG76uWv6+bLplxHTL8z0SbjsYbdhJLxjz64s3GqoNqy0pl8O0y9i+uXU9GGAzLw9bUHTL2j6BU2/zJj+zBqvG1Z00y9d0y+XTb+MmH5hpk/CZQ/7DWOmT55dWbjVUG9Ya/rlMP0ipl9OTR8GyMzmtGj6BU2/oOmXGdOfWQMappt+6Zp+uWz6ZcT0CzN9Ei572G8YM33y7MrCrYZ6w1rTL4fpFzH9cmr6MEBmNqdF0y9o+gVNv8yY/swa0DDd9EvX9Mtl0y8jpl+Y6ZNw2cN+w5jpk2dXFm411BvWmn45TL+I6ZdT04cBMrM5LZp+QdMvaPplxvRn1oCG6aZfuqZfLpt+GTH9wkyfhMse9hvGTJ88u7Jwq6HesNb0y2H6RUy/nJo+DJCZzWnR9AuafkHTLzOmP7MGNEw3/dI1/XLZ9MuI6Rdm+iRc9rDfMGb65NmVhVsN9Ya1pl8O0y9i+uXU9GGAzGxOi6Zf0PQLmn6ZMf2ZNaBhuumXrumXy6ZfRky/MNMn4bKH/YYx0yfPrizcaqg3rDX9cph+EdMvp6YPA2Rmc1o0/YKmX9D0y4zpz6wBDdNNv3RNv1w2/TJi+oWZPgmXPew3jJk+eXZl4VZDvWGt6ZfD9IuYfjk1fRggM5vToukXNP2Cpl9mTH9mDWiYbvqla/rlsumXEdMvzPRJuOxhv2HM9MmzKwu3GuoNa02/HKZfxPTLqenDAJnZnBZNv6DpFzT9MmP6M2tAw3TTL13TL5dNv4yYfmGmT8JlD/sNY6ZPnl1ZuNVQb1hr+uUw/SKmX05NHwbIzOa0aPoFTb+g6ZcZ059ZAxqmm37pmn65avrhmwHTf/mR1jAWLnvYaxgL79izKwu3GmoNC980pi9/fmnY83/8i/x90jAcIDNvTvv81+uG1U83DaufbhpWPw01bGqNVw27XedVw27Xwq9XGjZg+i8/0htGTH8P+w0jps+eXVm41VBvmGkbZo6GGWnYmenjAJnZnBZMv35qGgamXz8NNmxiDWiYavq3a+HXKw0bMP2XH+kNI6a/h/2GEdNnz64s3GqoN8y2DbNHw6w07Mz0cYDMbE4Lpl8/NQ0D06+fBhs2sQY0TDX927Xw60TDvv702/390w9vn95+/+3v94+/3i/PG3x68/PDHx++tGv/+ubx/pfnnpm//2i++vr5nzx+/v23/3p+4L/evn/3/H/fPXxo/vk2evPpf16euXN//9Ke3x7+/OHx4eMPD39++O6rbz5/+PHDxz+e/nH/6dPbX+/3j3ePjw+Ptx/fvn//8Od/vH/74d8vf95L/tO7p/fP6Y8f/ldGvvnp/vH3L8l3X/3n+/u3n+7ffLp/f//z05u3bz7/5On5J29+eXz4/c3Tb/dv3r/79PS3r958fP7749OXxz4/8vnTd1/98/M//vTy8en/Pj7/QP4hOe/D4+9/vH9rvv9qfff46ell+F//ef/zw4fPi/z1p9/ePX7Z6fka9dffft3+K4IPz/9+Pz7///yPt4+/vnv+d/v+/pfnNb75m/zvVTx+/m+Bz388PXyUf+Vv/vvh6fm/IV7+42/3b/91/yg/eM5/eXh4qn/IAf98ePz3y/m//39QSwMEFAAAAAgAe4JZXCDqsz/RAwAAgRsAAA0AAAB4bC9zdHlsZXMueG1s3Vltb+I4EP4rUX7AJcSQkhMgtVkinXS3Wmn7Yb8a4oAl5+Uc04P99etJAgnU0w0lXbEHqrA9fp55POOJMZ2V6iDY1y1jytqnIivn9lap4k/HKddbltLyj7xgmbYkuUyp0l25ccpCMhqXAEqF47mu76SUZ/Zilu3SKFWltc53mZrbru0sZkmetSMj165H9FyaMuuFirkdUsFXkleTacrFoR72YGCdi1xaSmthGg0j5ffaPKp7ILPhSXmWSxh0ag+Xfh4lpwLsq4ahdSA3Ky3XjarXmRd/aEL3JsLRkjxOzgiDPnxnHORhPJqMbuN4p45rAjW+MVBeQJ6uFshRPt+fkPHVfKbJ1UepQVyIi8rQI4tZQZViMot0pwJVg69MVtN+PhS6NDaSHkbexO4NKHPBY3C5Cc15dTrQG0m9iU+WTwOTLqPIj4ZWGi0jEj4MTepGn6Lx0KTT6DEKhyY9VeGwSqNoipJWH7oaVrmMmTzVg2cfhxYzwRKl4ZJvtvCp8gIqP1cqT3Uj5nSTZ7SqlSOii7SqM25uq211Rp1Vdfj0abKsit2BqY2PnohqbiWnJ0DPPOruiagndxbWNHS81kyIr0DyLWkfIppqn1j1MfxXDCewBQ+bY1NHumnWNHUHHHXZau4Orfc+XqvgL7l62uklZFX/312u2BfJEr6v+vvkJABjH7Xs3gU7LQpxeBR8k6WsXnxvh4sZPeKsbS75d+0NntJrPcCkbb0wqfi6MwIh2ie9gnApc4AgeC07+fggQCEYQmDxLG5cXBGNS70DRIO07OMu+2iwaNyy9vFdq3NxdQNkZnLXa++om9yfuvFdq3NxdQPsG//3eMg/fHiKesm0/pO0eGb7XonraPZ/F82dUnj4eM3IcXdfIt+9Z6f3kf+fyQxamdPhny9vsH9cEK7ITPDLRTnNN/zONeLsEnEateA3jbn9GX7+E60ba7XjQvGs6W15rE+SV3cJTa/oSrBzfj0/ZgndCfV8Ms7ttv0Pi/kuDU6zvsDSm1lt+2+4fNW/zlWXJ+0LjrM9i8Omq29TZ/fQ+gWAS0t77X1twTC1zWwBG+YHU4BhahTm5/+0nim6ntqGaZsaLVMUM0UxNcpkCas35seMCfTLvNIgIMT3sYiGoVFBiMXN9+HPzIZpAwTmBzxdF2s82/gOeXsfYDl9a4dgK8V3IrZSPNZgMccNEEFgzjbmBxBYFrC9A/7NfmBPmTGEQFYxbVgF45YgwCywF8171PeR6PjwNucHqxJCgsBsAZtZASGYBaoRt2AKQANmIaQ6By/OI+d4TjntP90WPwBQSwMEFAAAAAgAe4JZXJeKuxzAAAAAEwIAAAsAAABfcmVscy8ucmVsc52SuW7DMAxAf8XQnjAH0CGIM2XxFgT5AVaiD9gSBYpFnb+v2qVxkAsZeT08EtweaUDtOKS2i6kY/RBSaVrVuAFItiWPac6RQq7ULB41h9JARNtjQ7BaLD5ALhlmt71kFqdzpFeIXNedpT3bL09Bb4CvOkxxQmlISzMO8M3SfzL38ww1ReVKI5VbGnjT5f524EnRoSJYFppFydOiHaV/Hcf2kNPpr2MitHpb6PlxaFQKjtxjJYxxYrT+NYLJD+x+AFBLAwQUAAAACAB7gllcANM1ZU4BAAC8AgAADwAAAHhsL3dvcmtib29rLnhtbLVS22rCQBD9lbAf0GhohYrxpfYilFa0+L4mEzO4lzAz0erXd7MhVCiUvvRpds4MZ885u7OTp8PO+0PyaY3jXNUizTRNuajBar7xDbgwqTxZLaGlfcoNgS65BhBr0mw0mqRWo1Pz2cC1ovS68QKFoHcB7IAtwom/512bHJFxhwblnKt4NqASiw4tXqDM1UglXPvTiye8eCfabAryxuRq3A+2QILFD3jTifzQO46I6N1aByG5mowCYYXEEjcivw4ajxCW+64V/4RGgBZa4Jl826DbdzTBRXplI+Yw1D7EKf0lRl9VWMDCF60FJ32OBKYT6LjGhlXitIVcLR0LtTFB7myFe5Zlb1GCtqvAaIphQMsyqvw/RWvg1ggnj07ofCUp+0VSFoMb0iqhQgflW6DjgIeXK1aUdCVay27vxvfhhVpjHgL27l69Lofwh48z/wJQSwMEFAAAAAgAe4JZXI33LFq0AAAAiQIAABoAAAB4bC9fcmVscy93b3JrYm9vay54bWwucmVsc8WSTQqDMBBGrxJygI7a0kVRV924LV4g6PiD0YTMlOrta3WhgS66ka7CNyHvezCJH6gVt2agprUkxl4PlMiG2d4AqGiwV3QyFof5pjKuVzxHV4NVRadqhCgIruD2DJnGe6bIJ4u/EE1VtQXeTfHsceAvYHgZ11GDyFLkytXIiYRRb2OC5QhPM1mKrEyky8pQwr+FIk8oOlCIeNJIm82avfrzgfU8v8WtfYnr0N/J5eMA3s9L31BLAwQUAAAACAB7gllcbqckvB4BAABXBAAAEwAAAFtDb250ZW50X1R5cGVzXS54bWzFlM9OwzAMxl+lynVqMnbggNZdgCvswAuE1l2j5p9ib3Rvj9tuk0CjYioSl0aN7e/n+IuyfjtGwKxz1mMhGqL4oBSWDTiNMkTwHKlDcpr4N+1U1GWrd6BWy+W9KoMn8JRTryE26yeo9d5S9tzxNprgC5HAosgex8SeVQgdozWlJo6rg6++UfITQXLlkIONibjgBKGuEvrIz4BT3esBUjIVZFud6EU7zlKdVUhHCyinJa70GOralFCFcu+4RGJMoCtsAMhZOYoupsnEE4bxezebP8hMATlzm0JEdizB7bizJX11HlkIEpnpI16ILD37fNC7XUH1SzaP9yOkdvAD1bDMn/FXjy/6N/ax+sc+3kNo//qq96t02vgzXw3vyeYTUEsBAhQDFAAAAAgAe4JZXEbHTUiVAAAAzQAAABAAAAAAAAAAAAAAAIABAAAAAGRvY1Byb3BzL2FwcC54bWxQSwECFAMUAAAACAB7gllcM9AR6e8AAAArAgAAEQAAAAAAAAAAAAAAgAHDAAAAZG9jUHJvcHMvY29yZS54bWxQSwECFAMUAAAACAB7gllcmVycIxAGAACcJwAAEwAAAAAAAAAAAAAAgAHhAQAAeGwvdGhlbWUvdGhlbWUxLnhtbFBLAQIUAxQAAAAIAHuCWVwADWJM+wQAAEIUAAAYAAAAAAAAAAAAAACAgSIIAAB4bC93b3Jrc2hlZXRzL3NoZWV0MS54bWxQSwECFAMUAAAACAB7gllckrrIRIJ/AACTqAQAGAAAAAAAAAAAAAAAgIFTDQAAeGwvd29ya3NoZWV0cy9zaGVldDIueG1sUEsBAhQDFAAAAAgAe4JZXCDqsz/RAwAAgRsAAA0AAAAAAAAAAAAAAIABC40AAHhsL3N0eWxlcy54bWxQSwECFAMUAAAACAB7gllcl4q7HMAAAAATAgAACwAAAAAAAAAAAAAAgAEHkQAAX3JlbHMvLnJlbHNQSwECFAMUAAAACAB7gllcANM1ZU4BAAC8AgAADwAAAAAAAAAAAAAAgAHwkQAAeGwvd29ya2Jvb2sueG1sUEsBAhQDFAAAAAgAe4JZXI33LFq0AAAAiQIAABoAAAAAAAAAAAAAAIABa5MAAHhsL19yZWxzL3dvcmtib29rLnhtbC5yZWxzUEsBAhQDFAAAAAgAe4JZXG6nJLweAQAAVwQAABMAAAAAAAAAAAAAAIABV5QAAFtDb250ZW50X1R5cGVzXS54bWxQSwUGAAAAAAoACgCEAgAAppUAAAAA";

/* Download the embedded template as an .xlsx file */
window.downloadResultsTemplate = function () {
  const bytes  = Uint8Array.from(atob(RESULTS_TEMPLATE_B64), c => c.charCodeAt(0));
  const blob   = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url    = URL.createObjectURL(blob);
  const a      = Object.assign(document.createElement('a'), { href: url, download: 'results_bulk_template.xlsx' });
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  toast('Template downloaded!', 'success');
};

/* ── EXCEL IMPORT HELPERS ───────────────────────────────────────────────────
   We use SheetJS (xlsx) which is typically bundled in school apps.
   If not present we show a clear error.
   ─────────────────────────────────────────────────────────────────────────── */

/** Parse an uploaded .xlsx/.xls file; returns an array of row-objects from "Results Entry" sheet */
function parseResultsExcel(file) {
  return new Promise((resolve, reject) => {
    if (typeof XLSX === 'undefined') {
      reject(new Error('SheetJS (XLSX) library not loaded. Please add it to your project.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const wb   = XLSX.read(e.target.result, { type: 'array' });
        /* Accept either the named sheet or the first sheet */
        const name = wb.SheetNames.includes('Results Entry') ? 'Results Entry' : wb.SheetNames[0];
        const ws   = wb.Sheets[name];
        /* header: row 2 → skip row 1 (title) */
        const rows = XLSX.utils.sheet_to_json(ws, { range: 1, defval: '' });
        resolve(rows);
      } catch (err) { reject(err); }
    };
    reader.onerror = () => reject(new Error('File read failed.'));
    reader.readAsArrayBuffer(file);
  });
}

/** Map raw SheetJS row keys → normalised field names */
function normaliseRow(raw, idx) {
  /* The template headers contain decorators like "CA Score * (0-40)";
     we strip those and do a fuzzy match so renaming the header doesn't break import. */
  const get = (...keys) => {
    for (const k of keys) {
      const match = Object.keys(raw).find(rk => rk.toLowerCase().includes(k.toLowerCase()));
      if (match && String(raw[match]).trim() !== '') return String(raw[match]).trim();
    }
    return '';
  };

  const sid     = get('student id', 'studentid', 'student');
  const subject = get('subject');
  const caRaw   = get('ca score', 'ca');
  const examRaw = get('exam score', 'exam');
  const term    = get('term');
  const session = get('session');

  const ca   = parseFloat(caRaw);
  const exam = parseFloat(examRaw);

  const errors = [];
  if (!sid)                              errors.push('Missing Student ID');
  if (!subject)                          errors.push('Missing Subject');
  if (isNaN(ca)   || ca < 0   || ca > 40)   errors.push(`CA score invalid (${caRaw})`);
  if (isNaN(exam) || exam < 0 || exam > 60) errors.push(`Exam score invalid (${examRaw})`);
  if (!term)                             errors.push('Missing Term');

  return { rowNum: idx + 3, sid, subject, ca, exam, term, session, errors, ok: errors.length === 0 };
}

/* ── MAIN RENDER ─────────────────────────────────────────────────────────── */
function renderResults() {
  const section = document.getElementById('results');

  /* ── PARENT VIEW ────────────────────────────────────── */
  if (priv.isParent()) {
    const studentId = App.currentUser.studentId;
    if (!studentId) { section.innerHTML = '<p style="padding:2rem;color:#ef4444;">No student linked to this account.</p>'; return; }
    const student = App.data.students.find(s => s.id === studentId);
    if (!student)  { section.innerHTML = '<p style="padding:2rem;color:#ef4444;">Student record not found.</p>'; return; }

    const results = App.data.results.filter(r => r.studentId === studentId);
    const terms   = [...new Set(results.map(r => r.term))];

    section.innerHTML = `
      <div style="margin-bottom:1.5rem;">
        <h2 style="margin:0 0 .25rem;">Results — ${student.name}</h2>
        <p style="margin:0;color:#6b7280;font-size:.9rem;">${student.class} ${student.arm} &nbsp;|&nbsp; Attendance: <strong style="color:${student.attendance<75?'#ef4444':'#22c55e'}">${student.attendance}%</strong></p>
      </div>
      ${!results.length
        ? `<div style="background:#fff;border-radius:12px;padding:3rem;text-align:center;color:#9ca3af;box-shadow:0 2px 8px rgba(0,0,0,.07);">No results have been recorded for this student yet.</div>`
        : terms.map(term => {
            const termResults = results.filter(r => r.term === term);
            const avg = (termResults.reduce((a,b)=>a+b.total,0)/termResults.length).toFixed(1);
            return `
              <div style="background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.07);margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem;">
                  <h3 style="margin:0;">${term}</h3>
                  <div style="display:flex;gap:.75rem;">
                    <span style="${badgeStyle('info')}">Average: ${avg}%</span>
                    <span style="${badgeStyle(parseFloat(avg)>=50?'success':'danger')}">Grade: ${grade(parseFloat(avg)).letter}</span>
                  </div>
                </div>
                <div style="overflow-x:auto;">
                <table style="${tableStyle()}">
                  <thead><tr style="${thRowStyle()}">
                    <th style="${thStyle()}">Subject</th><th style="${thStyle()}">CA (40)</th>
                    <th style="${thStyle()}">Exam (60)</th><th style="${thStyle()}">Total</th>
                    <th style="${thStyle()}">Grade</th><th style="${thStyle()}">Remark</th>
                  </tr></thead>
                  <tbody>
                    ${termResults.map(r => {
                      const g = grade(r.total);
                      return `<tr style="${trStyle()}">
                        <td style="${tdStyle()};font-weight:500;">${r.subject}</td>
                        <td style="${tdStyle()}">${r.ca}</td><td style="${tdStyle()}">${r.exam}</td>
                        <td style="${tdStyle()}"><strong>${r.total}</strong></td>
                        <td style="${tdStyle()}"><span style="${badgeStyle(r.total>=50?'success':r.total>=40?'warning':'danger')}">${g.letter}</span></td>
                        <td style="${tdStyle()};color:#6b7280;">${g.remark}</td>
                      </tr>`;
                    }).join('')}
                  </tbody>
                </table></div>
              </div>`;
          }).join('')
      }`;
    return;
  }

  /* ── ADMIN / TEACHER VIEW ───────────────────────────── */
  const isTeacher    = priv.isTeacher();
  const preClass     = App.currentUser.assignedClass || '';
  const preArm       = App.currentUser.assignedArm   || '';
  const classOptions = App.data.classes.map(c => `<option ${preClass===c.name?'selected':''}>${c.name}</option>`).join('');
  const subjOptions  = App.data.subjects.map(s => `<option>${s.name}</option>`).join('');

  section.innerHTML = `
    <h2 style="margin-bottom:1.5rem;">Results Entry
      ${isTeacher ? `<span style="${badgeStyle('success')}">${preClass} ${preArm}</span>` : ''}
    </h2>
    <div style="display:flex;gap:.5rem;margin-bottom:1.5rem;flex-wrap:wrap;">
      <button id="tab-single" onclick="switchResultTab('single')" style="${btnStyle('primary')}">📝 Single Entry</button>
      <button id="tab-bulk"   onclick="switchResultTab('bulk')"   style="${btnStyle('secondary')}">📊 Bulk Excel</button>
    </div>

    <!-- Single Entry -->
    <div id="result-tab-single">
      <div style="background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.07);margin-bottom:2rem;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:1rem;">
          <div><label style="${labelStyle()}">Class</label>
            <select id="res-class" style="${inputStyle()}" onchange="populateResultStudents()" ${isTeacher?'disabled':''}>
              ${classOptions}
            </select>
          </div>
          <div><label style="${labelStyle()}">Arm</label>
            <select id="res-arm" style="${inputStyle()}" onchange="populateResultStudents()" ${isTeacher?'disabled':''}>
              <option>${preArm||'A'}</option>
            </select>
          </div>
          <div><label style="${labelStyle()}">Subject</label><select id="res-subject" style="${inputStyle()}">${subjOptions}</select></div>
          <div><label style="${labelStyle()}">Term</label>
            <select id="res-term" style="${inputStyle()}">
              <option>First Term</option><option>Second Term</option><option>Third Term</option>
            </select>
          </div>
          <div><label style="${labelStyle()}">Session</label><input id="res-session" value="${App.data.schoolInfo.session}" style="${inputStyle()}"></div>
        </div>
        <button onclick="loadResultEntry()" style="${btnStyle('primary')}">Load Students</button>
      </div>
      <div id="result-entry-table"></div>
    </div>

    <!-- Bulk Excel Entry -->
    <div id="result-tab-bulk" style="display:none;">

      <!-- Step 1: Download template -->
      <div style="background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.07);margin-bottom:1.25rem;">
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
          <div style="flex:1;min-width:220px;">
            <h4 style="margin:0 0 .35rem;color:#1e3a5f;">Step 1 — Download Template</h4>
            <p style="margin:0;font-size:.85rem;color:#6b7280;">Get the pre-formatted Excel file with instructions, dropdowns&nbsp;&amp; auto-calculated grade columns.</p>
          </div>
          <button onclick="downloadResultsTemplate()" style="${btnStyle('secondary')}">⬇ Download Excel Template</button>
        </div>
      </div>

      <!-- Step 2: Class / Arm selectors -->
      <div style="background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.07);margin-bottom:1.25rem;">
        <h4 style="margin:0 0 1rem;color:#1e3a5f;">Step 2 — Select Class &amp; Arm</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;">
          <div><label style="${labelStyle()}">Class</label>
            <select id="bulk-res-class" style="${inputStyle()}" onchange="populateBulkArms()" ${isTeacher?'disabled':''}>${classOptions}</select>
          </div>
          <div><label style="${labelStyle()}">Arm</label>
            <select id="bulk-res-arm" style="${inputStyle()}" ${isTeacher?'disabled':''}>
              <option>${preArm||'A'}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Step 3: Upload -->
      <div style="background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.07);margin-bottom:1.25rem;">
        <h4 style="margin:0 0 .5rem;color:#1e3a5f;">Step 3 — Upload Completed Excel</h4>
        <p style="margin:0 0 1rem;font-size:.85rem;color:#6b7280;">Accepted formats: <code style="background:#f3f4f6;padding:.15rem .4rem;border-radius:4px;">.xlsx</code> or <code style="background:#f3f4f6;padding:.15rem .4rem;border-radius:4px;">.xls</code></p>

        <!-- Drop zone -->
        <div id="excel-drop-zone"
          ondragover="event.preventDefault();this.style.borderColor='#2563eb';this.style.background='#eff6ff';"
          ondragleave="this.style.borderColor='#d1d5db';this.style.background='#f9fafb';"
          ondrop="handleExcelDrop(event)"
          style="border:2px dashed #d1d5db;border-radius:10px;padding:2.5rem;text-align:center;background:#f9fafb;cursor:pointer;transition:all .2s;"
          onclick="document.getElementById('excel-file-input').click()">
          <div style="font-size:2.5rem;margin-bottom:.5rem;">📊</div>
          <p style="margin:0;font-weight:600;color:#374151;">Click to browse or drag &amp; drop</p>
          <p style="margin:.25rem 0 0;font-size:.8rem;color:#9ca3af;">Excel files only (.xlsx / .xls)</p>
        </div>
        <input type="file" id="excel-file-input" accept=".xlsx,.xls" style="display:none" onchange="handleExcelFileSelect(this)">

        <div id="excel-file-info" style="margin-top:.75rem;"></div>
      </div>

      <!-- Step 4: Preview & import -->
      <div id="bulk-excel-preview-section" style="display:none;">
        <div style="background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.07);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.75rem;margin-bottom:1rem;">
            <h4 style="margin:0;color:#1e3a5f;">Step 4 — Preview &amp; Import</h4>
            <div style="display:flex;gap:.75rem;">
              <span id="preview-stats" style="${badgeStyle('info')}"></span>
            </div>
          </div>
          <div id="bulk-result-preview" style="overflow-x:auto;max-height:360px;overflow-y:auto;"></div>
          <div style="display:flex;gap:.75rem;margin-top:1.25rem;justify-content:flex-end;flex-wrap:wrap;">
            <button onclick="clearExcelImport()" style="${btnStyle('secondary')}">✖ Clear</button>
            <button id="btn-import-excel" onclick="saveBulkExcelResults()" style="${btnStyle('primary')}" disabled>💾 Import Valid Results</button>
          </div>
        </div>
      </div>
    </div>`;

  if (isTeacher) {
    const classData = App.data.classes.find(c => c.name === preClass);
    const armSel    = document.getElementById('res-arm');
    if (armSel && classData) armSel.innerHTML = classData.arms.map(a=>`<option ${a===preArm?'selected':''}>${a}</option>`).join('');
    const bArmSel   = document.getElementById('bulk-res-arm');
    if (bArmSel && classData) bArmSel.innerHTML = classData.arms.map(a=>`<option ${a===preArm?'selected':''}>${a}</option>`).join('');
  } else {
    populateResultStudents();
    populateBulkArms();
  }
}

/* ── TAB SWITCHING ──────────────────────────────────────────────────────── */
window.switchResultTab = function(tab) {
  document.getElementById('result-tab-single').style.display = tab === 'single' ? '' : 'none';
  document.getElementById('result-tab-bulk').style.display   = tab === 'bulk'   ? '' : 'none';
  document.getElementById('tab-single').style.cssText = btnStyle(tab==='single'?'primary':'secondary');
  document.getElementById('tab-bulk').style.cssText   = btnStyle(tab==='bulk'?'primary':'secondary');
};

/* ── ARM POPULATION ─────────────────────────────────────────────────────── */
window.populateResultStudents = function() {
  const cls = document.getElementById('res-class')?.value;
  if (!cls) return;
  const classData = App.data.classes.find(c => c.name === cls);
  const armSel = document.getElementById('res-arm');
  if (armSel && classData) armSel.innerHTML = classData.arms.map(a=>`<option>${a}</option>`).join('');
};

window.populateBulkArms = function() {
  const cls = document.getElementById('bulk-res-class')?.value;
  if (!cls) return;
  const classData = App.data.classes.find(c => c.name === cls);
  const armSel = document.getElementById('bulk-res-arm');
  if (armSel && classData) armSel.innerHTML = classData.arms.map(a=>`<option>${a}</option>`).join('');
};

/* ── SINGLE ENTRY ───────────────────────────────────────────────────────── */
window.loadResultEntry = function() {
  const cls     = document.getElementById('res-class').value;
  const arm     = document.getElementById('res-arm').value;
  const subject = document.getElementById('res-subject').value;
  const term    = document.getElementById('res-term').value;
  const session = document.getElementById('res-session').value;

  if (!priv.canEnterResults())       { denyAccess('You do not have permission to enter results.'); return; }
  if (!priv.canActOnClass(cls, arm)) { denyAccess('You can only enter results for your assigned class.'); return; }

  const students = App.data.students.filter(s => s.class===cls && s.arm===arm);
  if (!students.length) return toast('No students found for this class/arm.', 'warning');

  document.getElementById('result-entry-table').innerHTML = `
    <div style="background:#fff;border-radius:12px;padding:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.07);">
      <h4 style="margin:0 0 1rem;">${cls} ${arm} • ${subject} • ${term} ${session}</h4>
      <div style="overflow-x:auto;">
      <table style="${tableStyle()}">
        <thead><tr style="${thRowStyle()}">
          <th style="${thStyle()}">Student ID</th><th style="${thStyle()}">Name</th>
          <th style="${thStyle()}">CA (40)</th><th style="${thStyle()}">Exam (60)</th>
          <th style="${thStyle()}">Total</th><th style="${thStyle()}">Grade</th><th style="${thStyle()}">Remark</th>
        </tr></thead>
        <tbody id="result-rows">
          ${students.map(s => {
            const ex = App.data.results.find(r => r.studentId===s.id && r.subject===subject && r.term===term && r.session===session);
            return `<tr style="${trStyle()}" data-sid="${s.id}">
              <td style="${tdStyle()}">${s.id}</td><td style="${tdStyle()}">${s.name}</td>
              <td style="${tdStyle()}"><input type="number" min="0" max="40" class="ca-input" value="${ex?.ca??''}" placeholder="0-40" style="${inputStyle('sm')}" oninput="calcTotal(this)"></td>
              <td style="${tdStyle()}"><input type="number" min="0" max="60" class="exam-input" value="${ex?.exam??''}" placeholder="0-60" style="${inputStyle('sm')}" oninput="calcTotal(this)"></td>
              <td style="${tdStyle()}" class="total-cell">${ex?.total??'-'}</td>
              <td style="${tdStyle()}" class="grade-cell">${ex ? grade(ex.total).letter : '-'}</td>
              <td style="${tdStyle()}" class="remark-cell">${ex ? grade(ex.total).remark : '-'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table></div>
      <div style="display:flex;gap:.75rem;margin-top:1.25rem;justify-content:flex-end;">
        <button onclick="saveAllResults('${cls}','${arm}','${subject}','${term}','${session}')" style="${btnStyle('primary')}">💾 Save All Results</button>
      </div>
    </div>`;
};

window.calcTotal = function(input) {
  const row  = input.closest('tr');
  const ca   = parseFloat(row.querySelector('.ca-input').value)   || 0;
  const exam = parseFloat(row.querySelector('.exam-input').value) || 0;
  const total = Math.min(ca + exam, 100);
  const g = grade(total);
  row.querySelector('.total-cell').textContent  = total;
  row.querySelector('.grade-cell').textContent  = g.letter;
  row.querySelector('.remark-cell').textContent = g.remark;
};

window.saveAllResults = function(cls, arm, subject, term, session) {
  if (!priv.canEnterResults())       { denyAccess('You do not have permission to save results.'); return; }
  if (!priv.canActOnClass(cls, arm)) { denyAccess('You can only save results for your assigned class.'); return; }

  let saved = 0;
  $$('#result-rows tr').forEach(row => {
    const sid  = row.dataset.sid;
    const ca   = parseFloat(row.querySelector('.ca-input').value);
    const exam = parseFloat(row.querySelector('.exam-input').value);
    if (isNaN(ca) || isNaN(exam)) return;
    const total = Math.min(ca + exam, 100);
    const entry = { studentId: sid, class: cls, arm, subject, term, session, ca, exam, total };
    const idx = App.data.results.findIndex(r => r.studentId===sid && r.subject===subject && r.term===term && r.session===session);
    if (idx >= 0) App.data.results[idx] = entry;
    else App.data.results.push(entry);
    saved++;
  });
  toast(`${saved} result(s) saved!`, 'success');
};

/* ── EXCEL BULK IMPORT ──────────────────────────────────────────────────── */

/* Drag-and-drop handler */
window.handleExcelDrop = function(e) {
  e.preventDefault();
  const zone = document.getElementById('excel-drop-zone');
  zone.style.borderColor = '#d1d5db'; zone.style.background = '#f9fafb';
  const file = e.dataTransfer.files[0];
  if (file) processExcelFile(file);
};

window.handleExcelFileSelect = function(input) {
  if (input.files[0]) processExcelFile(input.files[0]);
};

/* Shared processing */
function processExcelFile(file) {
  const info = document.getElementById('excel-file-info');
  const ext  = file.name.split('.').pop().toLowerCase();
  if (!['xlsx','xls'].includes(ext)) {
    info.innerHTML = `<p style="color:#ef4444;font-size:.875rem;">⚠ Please upload an .xlsx or .xls file.</p>`;
    return;
  }
  info.innerHTML = `<p style="color:#6b7280;font-size:.85rem;">⏳ Reading <strong>${file.name}</strong>…</p>`;

  parseResultsExcel(file).then(rawRows => {
    const parsed = rawRows.map(normaliseRow);
    window._parsedExcelRows = parsed;

    const valid   = parsed.filter(p => p.ok);
    const invalid = parsed.filter(p => !p.ok);

    info.innerHTML = `<p style="font-size:.85rem;color:#374151;">✅ File loaded: <strong>${file.name}</strong> — ${parsed.length} row(s) found.</p>`;

    document.getElementById('preview-stats').textContent =
      `${valid.length} valid · ${invalid.length} invalid`;
    document.getElementById('preview-stats').style.cssText =
      badgeStyle(invalid.length > 0 ? 'warning' : 'success');

    document.getElementById('bulk-excel-preview-section').style.display = '';
    document.getElementById('btn-import-excel').disabled = valid.length === 0;

    const rows = parsed.map(p => `
      <tr style="${trStyle()}">
        <td style="${tdStyle()}">${p.rowNum}</td>
        <td style="${tdStyle()}">${p.sid||'—'}</td>
        <td style="${tdStyle()}">${p.subject||'—'}</td>
        <td style="${tdStyle()};text-align:center;">${isNaN(p.ca)?'—':p.ca}</td>
        <td style="${tdStyle()};text-align:center;">${isNaN(p.exam)?'—':p.exam}</td>
        <td style="${tdStyle()};text-align:center;">${p.ok ? Math.min(p.ca+p.exam,100) : '—'}</td>
        <td style="${tdStyle()}">${p.term||'—'}</td>
        <td style="${tdStyle()}">
          ${p.ok
            ? `<span style="${badgeStyle('success')}">✔ OK</span>`
            : `<span style="${badgeStyle('danger')}" title="${p.errors.join('; ')}">✘ ${p.errors[0]}${p.errors.length>1?' +'+(p.errors.length-1):''}</span>`}
        </td>
      </tr>`).join('');

    document.getElementById('bulk-result-preview').innerHTML = `
      <table style="${tableStyle()}font-size:.82rem;">
        <thead><tr style="${thRowStyle()}">
          <th style="${thStyle()}">#</th>
          <th style="${thStyle()}">Student ID</th>
          <th style="${thStyle()}">Subject</th>
          <th style="${thStyle()}">CA</th>
          <th style="${thStyle()}">Exam</th>
          <th style="${thStyle()}">Total</th>
          <th style="${thStyle()}">Term</th>
          <th style="${thStyle()}">Status</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }).catch(err => {
    info.innerHTML = `<p style="color:#ef4444;font-size:.875rem;">⚠ Could not read file: ${err.message}</p>`;
  });
}

window.clearExcelImport = function() {
  window._parsedExcelRows = null;
  document.getElementById('excel-file-input').value = '';
  document.getElementById('excel-file-info').innerHTML = '';
  document.getElementById('bulk-excel-preview-section').style.display = 'none';
  document.getElementById('bulk-result-preview').innerHTML = '';
};

window.saveBulkExcelResults = function() {
  const cls = document.getElementById('bulk-res-class').value;
  const arm = document.getElementById('bulk-res-arm').value;
  if (!priv.canEnterResults())       { denyAccess('You do not have permission to enter results.'); return; }
  if (!priv.canActOnClass(cls, arm)) { denyAccess('You can only enter results for your assigned class.'); return; }

  const rows = (window._parsedExcelRows || []).filter(r => r.ok);
  if (!rows.length) { toast('No valid rows to import.', 'warning'); return; }

  const defaultSession = App.data.schoolInfo.session;
  let saved = 0, skipped = 0;

  rows.forEach(r => {
    const student = App.data.students.find(s => s.id === r.sid);
    if (!student) { skipped++; return; }
    const session = r.session || defaultSession;
    const total   = Math.min(r.ca + r.exam, 100);
    const entry   = { studentId: r.sid, class: cls, arm, subject: r.subject, term: r.term, session, ca: r.ca, exam: r.exam, total };
    const idx     = App.data.results.findIndex(res =>
      res.studentId===r.sid && res.subject===r.subject && res.term===r.term && res.session===session);
    if (idx >= 0) App.data.results[idx] = entry;
    else App.data.results.push(entry);
    saved++;
  });

  toast(`${saved} result(s) imported!${skipped ? ` ${skipped} skipped (student not found).` : ''}`, saved > 0 ? 'success' : 'warning');
  if (saved > 0) clearExcelImport();
};
/* ─────────────────────────────────────────
   13. REPORT CARDS
   Admin   → full access + add all remarks
   Teacher → view only (their class), can add teacher remark for their arm
   Parent  → not accessible (redirected to results)
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   REPORT CARDS – Enhanced Version
   • School header with logo placeholder & name
   • Cognitive / Affective / Psychomotor domains display
   • Better card styling (modern, clean, print-ready)
   • Resumption date, announcements from school settings
   • Signatures + school stamp area
───────────────────────────────────────── */

function renderReportCards() {
  if (priv.isParent()) { navigate('results'); return; }

  const section = document.getElementById('report-cards');
  const isTeacher = priv.isTeacher();
  const userClass = App.currentUser.assignedClass || '';
  const userArm   = App.currentUser.assignedArm   || '';

  const classOptions = App.data.classes
    .map(c => `<option value="${c.name}" ${userClass === c.name ? 'selected' : ''}>${c.name}</option>`)
    .join('');

  section.innerHTML = `
    <h2 style="margin-bottom:1.5rem; color:#1e40af;">Student Report Cards</h2>

    <div style="background:#ffffff; border-radius:12px; padding:1.75rem; box-shadow:0 4px 16px rgba(0,0,0,0.08); margin-bottom:2.5rem;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:1.25rem; margin-bottom:1.5rem;">
        <div>
          <label style="${labelStyle()}">Class</label>
          <select id="rc-class" style="${inputStyle()}" onchange="updateRCArms()" ${isTeacher?'disabled':''}>
            <option value="">— Select —</option>${classOptions}
          </select>
        </div>
        <div>
          <label style="${labelStyle()}">Arm / Section</label>
          <select id="rc-arm" style="${inputStyle()}" ${isTeacher?'disabled':''}>
            <option value="">— Select —</option>
          </select>
        </div>
        <div>
          <label style="${labelStyle()}">Term</label>
          <select id="rc-term" style="${inputStyle()}">
            <option>First Term</option>
            <option selected>Second Term</option>
            <option>Third Term</option>
          </select>
        </div>
        <div>
          <label style="${labelStyle()}">Academic Session</label>
          <input id="rc-session" value="${App.data.schoolInfo?.session || '2025/2026'}" style="${inputStyle()}" placeholder="e.g. 2025/2026">
        </div>
      </div>
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <button onclick="generateReportCards()" style="${btnStyle('primary')}">Generate Report Cards</button>
        <button onclick="clearReportOutput()" style="${btnStyle('secondary')}">Clear</button>
      </div>
    </div>

    <div id="report-cards-output" style="display:grid; gap:2.5rem;"></div>`;
  
  if (!isTeacher && userClass) updateRCArms();
}

window.updateRCArms = function() {
  const cls = document.getElementById('rc-class')?.value;
  const armSel = document.getElementById('rc-arm');
  if (!armSel) return;
  armSel.innerHTML = '<option value="">— Select arm —</option>';
  if (!cls) return;
  const classData = App.data.classes.find(c => c.name === cls);
  if (classData?.arms) {
    armSel.innerHTML += classData.arms.map(a => `<option value="${a}">${a}</option>`).join('');
  }
};

window.generateReportCards = function() {
  const cls     = document.getElementById('rc-class')?.value;
  const arm     = document.getElementById('rc-arm')?.value;
  const term    = document.getElementById('rc-term')?.value;
  const session = document.getElementById('rc-session')?.value;

  if (!cls || !arm || !term || !session) {
    return toast('Please complete all fields.', 'warning');
  }

  if (priv.isTeacher() && !priv.canActOnClass(cls, arm)) {
    return denyAccess('You can only generate report cards for your assigned class/arm.');
  }

  const students = App.data.students.filter(s => s.class === cls && s.arm === arm);
  if (!students.length) return toast('No students found in this class/arm.', 'warning');

  const output = document.getElementById('report-cards-output');
  const school = App.data.schoolInfo || {};
  const resumptionDate = school.resumptionDate || 'Not set';
  const announcements = school.announcements || 'No school announcements at this time.';

  output.innerHTML = students.map(student => {
    const results = App.data.results.filter(r => 
      r.studentId === student.id && r.term === term && r.session === session
    );

    const totalScore = results.reduce((sum, r) => sum + (r.total || 0), 0);
    const subjectCount = results.length;
    const average = subjectCount ? (totalScore / subjectCount).toFixed(1) : 'N/A';
    const overallGrade = subjectCount ? grade(parseFloat(average)) : { letter: 'N/A', remark: 'No results recorded' };

    const position = computePosition(student.id, cls, arm, term, session);
    const remarkEntry = App.data.remarks.find(r => 
      r.studentId === student.id && r.term === term && r.session === session
    ) || {};

    // Domain scores – assume stored in App.data.domainAssessments or student.domains[term/session]
    const domains = getDomainScores(student.id, term, session); // helper below

    const canEditTeacherRemark = priv.isAdmin() || (priv.isTeacher() && priv.canActOnClass(cls, arm));
    const canEditPrincipalRemark = priv.isAdmin();

    const teacher = App.data.teachers.find(t => t.class === cls && t.arm === arm);

    return `
      <div class="report-card" data-sid="${student.id}" style="background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.1); max-width:900px; margin:0 auto; border:1px solid #e2e8f0;">

        <!-- HEADER -->
        <div style="background:linear-gradient(135deg, #1e3a8a, #3b82f6); color:white; padding:2rem 1.5rem; text-align:center; position:relative;">
          ${school.logo ? `<img src="${school.logo}" alt="School Logo" style="height:80px; margin-bottom:1rem; border-radius:8px; background:white; padding:8px;">` : ''}
          <h1 style="margin:0; font-size:1.8rem; letter-spacing:1px;">${school.name || 'School Name'}</h1>
          <p style="margin:0.5rem 0 0; font-size:1rem; opacity:0.9;">${school.address || ''}</p>
          <p style="margin:1.5rem 0 0.5rem; font-size:1.1rem; font-weight:500;">${term} Report Card • ${session} Academic Session</p>
        </div>

        <!-- STUDENT INFO -->
        <div style="padding:1.5rem; background:#f8fafc; border-bottom:1px solid #e2e8f0;">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px,1fr)); gap:1.25rem;">
            <div><strong>Name:</strong> ${student.name}</div>
            <div><strong>Class:</strong> ${cls} ${arm}</div>
            <div><strong>Admission No:</strong> ${student.id}</div>
            <div><strong>Resumption Date:</strong> ${resumptionDate}</div>
          </div>
        </div>

        <!-- SUBJECTS TABLE -->
        ${results.length ? `
          <div style="padding:1.5rem;">
            <h3 style="margin:0 0 1rem; color:#1e40af; font-size:1.15rem;">Academic Performance</h3>
            <div style="overflow-x:auto;">
              <table style="${tableStyle('80%')} border-collapse:collapse; width:100%;">
                <thead>
                  <tr style="background:#eff6ff; color:#1e40af;">
                    <th style="${thStyle('auto')}">Subject</th>
                    <th style="${thStyle('90px')}">CA (40)</th>
                    <th style="${thStyle('90px')}">Exam (60)</th>
                    <th style="${thStyle('100px')}">Total</th>
                    <th style="${thStyle('70px')}">Grade</th>
                    <th style="${thStyle('auto')}">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  ${results.map(r => {
                    const g = grade(r.total);
                    const color = r.total >= 70 ? '#16a34a' : r.total >= 50 ? '#2563eb' : r.total >= 40 ? '#d97706' : '#dc2626';
                    return `
                      <tr>
                        <td style="${tdStyle()} font-weight:500;">${r.subject}</td>
                        <td style="${tdStyle('text-align:center;')}">${r.ca || '—'}</td>
                        <td style="${tdStyle('text-align:center;')}">${r.exam || '—'}</td>
                        <td style="${tdStyle('text-align:center;')}">
                          <div style="width:100%; height:8px; background:#e5e7eb; border-radius:4px; overflow:hidden; margin:4px 0;">
                            <div style="width:${r.total}%; height:100%; background:${color};"></div>
                          </div>
                          <strong>${r.total}</strong>
                        </td>
                        <td style="${tdStyle('text-align:center;')}"><span style="${badgeStyle(g.letter === 'A' || g.letter === 'B' ? 'success' : g.letter === 'C' ? 'warning' : 'danger')}">${g.letter}</span></td>
                        <td style="${tdStyle()}">${g.remark}</td>
                      </tr>`;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <!-- SUMMARY STATS -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px,1fr)); gap:1rem; margin-top:1.5rem; padding:1.25rem; background:linear-gradient(135deg, #1e40af, #3b82f6); color:white; border-radius:12px;">
              <div style="text-align:center;">
                <div style="font-size:0.9rem; opacity:0.9;">Total Score</div>
                <div style="font-size:1.8rem; font-weight:700;">${totalScore}</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.9rem; opacity:0.9;">Average</div>
                <div style="font-size:1.8rem; font-weight:700;">${average}%</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.9rem; opacity:0.9;">Grade</div>
                <div style="font-size:1.8rem; font-weight:700;">${overallGrade.letter}</div>
              </div>
              <div style="text-align:center;">
                <div style="font-size:0.9rem; opacity:0.9;">Position</div>
                <div style="font-size:1.8rem; font-weight:700;">${position}</div>
              </div>
            </div>
          </div>
        ` : '<div style="padding:2.5rem; text-align:center; color:#6b7280; font-style:italic;">No academic results recorded for this term yet.</div>'}

        <!-- DOMAINS -->
        <div style="padding:1.5rem; border-top:1px solid #e2e8f0;">
          <h3 style="margin:0 0 1.25rem; color:#1e40af; font-size:1.15rem;">Behaviour & Skills (Domains)</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); gap:1.25rem;">
            <div style="background:#f0f9ff; border-radius:10px; padding:1.25rem; border:1px solid #bfdbfe;">
              <div style="font-weight:600; color:#1e40af; margin-bottom:0.5rem;">Cognitive Domain</div>
              <div style="font-size:1.4rem; font-weight:700; color:#1e40af;">${domains.cognitive || '—'} / 5</div>
              <div style="color:#64748b; font-size:0.9rem;">(${domainLabel(domains.cognitive)})</div>
            </div>
            <div style="background:#fef2f8; border-radius:10px; padding:1.25rem; border:1px solid #fbcfe8;">
              <div style="font-weight:600; color:#be185d; margin-bottom:0.5rem;">Affective Domain</div>
              <div style="font-size:1.4rem; font-weight:700; color:#be185d;">${domains.affective || '—'} / 5</div>
              <div style="color:#64748b; font-size:0.9rem;">(${domainLabel(domains.affective)})</div>
            </div>
            <div style="background:#f0fdf4; border-radius:10px; padding:1.25rem; border:1px solid #bbf7d0;">
              <div style="font-weight:600; color:#15803d; margin-bottom:0.5rem;">Psychomotor Domain</div>
              <div style="font-size:1.4rem; font-weight:700; color:#15803d;">${domains.psychomotor || '—'} / 5</div>
              <div style="color:#64748b; font-size:0.9rem;">(${domainLabel(domains.psychomotor)})</div>
            </div>
          </div>
        </div>

        <!-- ATTENDANCE -->
        <div style="padding:0 1.5rem 1.5rem;">
          <div style="display:flex; align-items:center; gap:1rem; padding:1rem; background:#f1f5f9; border-radius:10px;">
            <span style="font-weight:600; min-width:100px;">Attendance</span>
            <div style="flex:1; height:12px; background:#e2e8f0; border-radius:6px; overflow:hidden;">
              <div style="width:${student.attendance || 0}%; height:100%; background:${student.attendance < 75 ? '#ef4444' : student.attendance < 90 ? '#f59e0b' : '#22c55e'};"></div>
            </div>
            <strong style="min-width:80px; text-align:right;">${student.attendance || 0}%</strong>
          </div>
        </div>

        <!-- REMARKS -->
        <div style="padding:1.5rem; border-top:1px solid #e2e8f0; display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
          <div>
            <div style="font-weight:600; color:#334155; margin-bottom:0.5rem;">Class Teacher's Remark ${teacher ? `— ${teacher.name}` : ''}</div>
            ${canEditTeacherRemark ? `
              <textarea id="t-rem-${student.id}" rows="3" style="${inputStyle()}; resize:vertical;">${remarkEntry.teacherRemark || ''}</textarea>
              <button onclick="saveRemark('${student.id}','${term}','${session}','teacher')" style="${btnStyle('primary','sm')}; margin-top:0.5rem;">Save</button>
            ` : `<p style="margin:0.5rem 0 0; white-space:pre-wrap;">${remarkEntry.teacherRemark || '—'}</p>`}
          </div>
          <div>
            <div style="font-weight:600; color:#334155; margin-bottom:0.5rem;">Principal's Remark — ${school.principal || 'Principal'}</div>
            ${canEditPrincipalRemark ? `
              <textarea id="p-rem-${student.id}" rows="3" style="${inputStyle()}; resize:vertical;">${remarkEntry.principalRemark || ''}</textarea>
              <button onclick="saveRemark('${student.id}','${term}','${session}','principal')" style="${btnStyle('primary','sm')}; margin-top:0.5rem;">Save</button>
            ` : `<p style="margin:0.5rem 0 0; white-space:pre-wrap;">${remarkEntry.principalRemark || '—'}</p>`}
          </div>
        </div>

        <!-- SIGNATURES & STAMP -->
        <div style="padding:2rem 1.5rem; border-top:1px dashed #cbd5e1; display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; text-align:center; background:#f8fafc;">
          <div>
            <div style="height:60px; border-bottom:2px solid #334155; margin:0 auto 0.5rem; width:180px;"></div>
            <div style="font-size:0.9rem; color:#475569;">Class Teacher's Signature</div>
          </div>
          <div>
            <div style="height:60px; border-bottom:2px solid #334155; margin:0 auto 0.5rem; width:180px;"></div>
            <div style="font-size:0.9rem; color:#475569;">Parent/Guardian Signature</div>
          </div>
          <div>
            <div style="height:60px; border-bottom:2px solid #334155; margin:0 auto 0.5rem; width:180px;"></div>
            <div style="font-size:0.9rem; color:#475569;">Principal's Signature</div>
          </div>
        </div>
        <div style="text-align:center; padding:1rem; font-size:0.85rem; color:#64748b; border-top:1px solid #e2e8f0;">
          Official School Stamp □
        </div>

        <!-- ANNOUNCEMENTS -->
        <div style="padding:1.25rem; background:#fefce8; border-top:1px solid #fef08a; font-size:0.9rem; color:#854d0e;">
          <strong>School Announcements:</strong> ${announcements}
        </div>

        <div style="padding:1rem; text-align:right; background:#f8fafc;">
          <button onclick="printReportCard(this)" style="${btnStyle('primary')}">🖨️ Print / Download</button>
        </div>
      </div>`;
  }).join('');

  toast(`Generated ${students.length} report card(s)`, 'success');
};

// Helper: Get domain scores (you'll need to implement storage logic)
function getDomainScores(studentId, term, session) {
  // Example lookup – adjust to your actual data structure
  const record = App.data.domainAssessments?.find(d => 
    d.studentId === studentId && d.term === term && d.session === session
  ) || {};
  return {
    cognitive: record.cognitive || null,
    affective: record.affective || null,
    psychomotor: record.psychomotor || null
  };
}

// Simple label for domains (1-5 scale)
function domainLabel(score) {
  if (!score) return 'Not assessed';
  if (score >= 4.5) return 'Excellent';
  if (score >= 3.5) return 'Very Good';
  if (score >= 2.5) return 'Good';
  if (score >= 1.5) return 'Fair';
  return 'Needs Improvement';
}

window.clearReportOutput = function() {
  document.getElementById('report-cards-output').innerHTML = '';
};

// Keep your existing saveRemark, computePosition, printReportCard functions
// You can enhance printReportCard to include logo & better CSS for print
window.saveRemark = function(studentId, term, session, type) {
  if (type === 'principal' && !priv.isAdmin()) { denyAccess('Only Admin can save the principal\'s remark.'); return; }
  if (type === 'teacher' && !priv.canEnterResults()) { denyAccess('You do not have permission to save remarks.'); return; }

  const key     = type === 'teacher' ? 'teacherRemark' : 'principalRemark';
  const inputId = type === 'teacher' ? `teacher-remark-${studentId}` : `principal-remark-${studentId}`;
  const value   = document.getElementById(inputId)?.value || '';

  let entry = App.data.remarks.find(r => r.studentId===studentId && r.term===term && r.session===session);
  if (entry) { entry[key] = value; }
  else {
    entry = { studentId, term, session, teacherRemark: '', principalRemark: '' };
    entry[key] = value;
    App.data.remarks.push(entry);
  }
  toast(`${type==='teacher'?'Teacher':'Principal'}'s remark saved!`, 'success');
};

function computePosition(studentId, cls, arm, term, session) {
  const students = App.data.students.filter(s => s.class===cls && s.arm===arm);
  const scores = students.map(s => {
    const results = App.data.results.filter(r => r.studentId===s.id && r.term===term && r.session===session);
    return { id: s.id, avg: results.length ? results.reduce((a,b)=>a+b.total,0)/results.length : 0 };
  }).sort((a,b) => b.avg - a.avg);
  const idx = scores.findIndex(s => s.id === studentId);
  return idx < 0 ? 'N/A' : `${ordinal(idx+1)} / ${students.length}`;
}

/**
 * Opens a new window with clean, print-optimized version of the report card
 * Removes interactive elements and applies better print styling
 */
window.printReportCard = function(btn) {
    const originalCard = btn.closest('.report-card');
    if (!originalCard) return;

    // Clone the card
    const cardClone = originalCard.cloneNode(true);

    // 1. Remove all interactive elements
    cardClone.querySelectorAll('button, input, select, textarea').forEach(el => el.remove());

    // 2. Replace textareas with plain paragraphs (already done, but improved)
    // (we already removed textareas above, but keeping safe replacement just in case)
    cardClone.querySelectorAll('[id^="t-rem-"], [id^="p-rem-"]').forEach(el => {
        const p = document.createElement('p');
        p.style.cssText = 'margin:0.5em 0; font-size:0.95rem; line-height:1.4; white-space:pre-wrap; min-height:2.5em;';
        p.textContent = el.value || el.textContent || '(No remark entered)';
        el.replaceWith(p);
    });

    // 3. Clean up empty signature lines & make them more visible
    cardClone.querySelectorAll('.signature-line').forEach(line => {
        line.style.borderBottom = '2px solid #000';
        line.style.width = '220px';
        line.style.margin = '2.5rem auto 0.6rem';
    });

    // 4. Prepare clean print document
    const printWindow = window.open('', '_blank', 'width=900,height=1100,scrollbars=yes');
    if (!printWindow) {
        alert('Popup blocked. Please allow popups for this site to print report cards.');
        return;
    }

    const title = `Report Card - ${originalCard.querySelector('[data-sid]')?.dataset.sid || 'Student'}`;

    // Much better print stylesheet
    printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        @page {
            size: A4;
            margin: 1.2cm 1.5cm;
        }

        body {
            font-family: "Georgia", "Times New Roman", serif;
            font-size: 11pt;
            line-height: 1.45;
            color: #111;
            margin: 0;
            padding: 0;
        }

        .report-card {
            max-width: 21cm;
            margin: 0 auto;
        }

        h1, h2, h3 {
            color: #0f172a;
            margin: 0.8em 0 0.4em;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
            font-size: 9.5pt;
        }

        th, td {
            border: 1px solid #666;
            padding: 0.45em 0.7em;
            text-align: left;
        }

        th {
            background-color: #f1f5f9;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 9pt;
            color: #334155;
        }

        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0;
            padding: 1.2rem;
            background: #eff6ff;
            border-radius: 8px;
        }

        .domain-card {
            padding: 1rem;
            border-radius: 6px;
            background: white;
            border: 1px solid #cbd5e1;
        }

        .signature-area {
            margin-top: 3rem;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            text-align: center;
        }

        .signature-line {
            border-bottom: 2px solid #000;
            width: 80%;
            margin: 2.8rem auto 0.5rem;
        }

        .no-print {
            display: none !important;
        }

        @media print {
            body { margin: 0; }
            .report-card { box-shadow: none; border: none; }
        }
    </style>
</head>
<body>
    <div class="report-card">
        ${cardClone.innerHTML}
    </div>

    <script>
        // Auto-trigger print dialog after content loads
        window.onload = function() {
            setTimeout(() => window.print(), 800);
        };
    </script>
</body>
</html>`);

// Add this before printWindow.document.write if you want school logo/header on every page
const headerHTML = `
    <div style="text-align:center; margin-bottom:1.5cm; border-bottom:1px solid #999; padding-bottom:1rem;">
        <h1 style="margin:0; font-size:18pt;">${schoolName || 'School Name'}</h1>
        <p style="margin:0.3rem 0 0; font-size:11pt;">${term || ''} • ${session || ''}</p>
    </div>`;

// Then insert it at the beginning of .report-card
cardClone.insertAdjacentHTML('afterbegin', headerHTML);

// Or repeat header on every page using running header (CSS Paged Media) – more advanced

    printWindow.document.close();
};

/* ─────────────────────────────────────────
   14. ATTENDANCE + DOMAIN-BASED ASSESSMENT
   Features:
   • Admin → any class/arm
   • Teacher → only assigned class/arm
   • Parent → no access
   • Attendance (Present / Late / Absent / Excused)
   • Quick per-student domain scoring (1–5 scale)
   • Summary statistics & alerts
   • Save both attendance & domain marks in one flow
───────────────────────────────────────── */

function renderAttendance() {
  if (priv.isParent()) {
    navigate('results');
    return;
  }

  const section = document.getElementById('attendance');
  const isTeacher = priv.isTeacher();
  const userClass = App.currentUser.assignedClass || '';
  const userArm   = App.currentUser.assignedArm   || '';

  const classOptions = App.data.classes
    .map(c => `<option value="${c.name}" ${userClass === c.name ? 'selected' : ''}>${c.name}</option>`)
    .join('');

  section.innerHTML = `
    <h2 style="margin-bottom:1.5rem; display:flex; align-items:center; gap:1rem;">
      Attendance & Assessment
      ${isTeacher ? `<span style="${badgeStyle('success')}">${userClass} ${userArm}</span>` : ''}
    </h2>

    <div style="background:#ffffff; border-radius:12px; padding:1.75rem; box-shadow:0 4px 12px rgba(0,0,0,0.08); margin-bottom:2.5rem;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1.25rem; margin-bottom:1.5rem;">
        <div>
          <label style="${labelStyle()}">Class</label>
          <select id="att-class" style="${inputStyle()}" onchange="updateAttArms()" ${isTeacher ? 'disabled' : ''}>
            <option value="">— Select class —</option>
            ${classOptions}
          </select>
        </div>
        <div>
          <label style="${labelStyle()}">Arm / Section</label>
          <select id="att-arm" style="${inputStyle()}" ${isTeacher ? 'disabled' : ''}>
            <option value="">— Select arm —</option>
          </select>
        </div>
        <div>
          <label style="${labelStyle()}">Date</label>
          <input type="date" id="att-date" value="${new Date().toISOString().split('T')[0]}" style="${inputStyle()}">
        </div>
      </div>

      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <button onclick="loadAttendance()" style="${btnStyle('primary')}">Load Students</button>
        <button onclick="clearAttendanceForm()" style="${btnStyle('secondary')}">Clear</button>
      </div>
    </div>

    <div id="attendance-table" style="min-height:200px;"></div>

    <div id="summary-section" style="margin-top:2.5rem; display:none;">
      <h3 style="margin-bottom:1.25rem;">Class Summary – ${new Date().toLocaleDateString()}</h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:1.25rem;">
        ${generateSummaryCards()}
      </div>
    </div>`;
  
  if (!isTeacher && userClass) updateAttArms();
}

// ── Helpers ────────────────────────────────────────

window.updateAttArms = function() {
  const cls = document.getElementById('att-class')?.value;
  const armSelect = document.getElementById('att-arm');
  if (!armSelect) return;

  armSelect.innerHTML = '<option value="">— Select arm —</option>';
  if (!cls) return;

  const classData = App.data.classes.find(c => c.name === cls);
  if (classData?.arms) {
    armSelect.innerHTML += classData.arms.map(a => `<option value="${a}">${a}</option>`).join('');
  }
};

window.loadAttendance = function() {
  const cls  = document.getElementById('att-class')?.value;
  const arm  = document.getElementById('att-arm')?.value;
  const date = document.getElementById('att-date')?.value;

  if (!cls || !arm || !date) {
    return toast('Please select class, arm and date.', 'warning');
  }

  if (!priv.canTakeAttendance()) return denyAccess('No permission to take attendance.');
  if (!priv.canActOnClass(cls, arm)) return denyAccess('You can only manage your assigned class/arm.');

  const students = App.data.students.filter(s => s.class === cls && s.arm === arm);
  if (!students.length) return toast('No students found in this class/arm.', 'warning');

  const existing = App.data.attendanceRecords?.filter?.(a => a.date === date && a.class === cls && a.arm === arm) || [];

  document.getElementById('attendance-table').innerHTML = `
    <div style="background:#ffffff; border-radius:12px; padding:1.75rem; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <h4 style="margin:0; font-size:1.25rem;">${cls} ${arm} – ${date}</h4>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
          <button onclick="markAll('present')"  style="${btnStyle('success','sm')}">✔ All Present</button>
          <button onclick="markAll('absent')"   style="${btnStyle('danger','sm')}">✘ All Absent</button>
          <button onclick="markAll('late')"     style="${btnStyle('warning','sm')}">🕒 All Late</button>
        </div>
      </div>

      <div style="overflow-x:auto; max-height:65vh;">
        <table style="${tableStyle()}">
          <thead>
            <tr style="${thRowStyle()}">
              <th style="${thStyle('80px')}">ID</th>
              <th style="${thStyle('minmax(140px,2fr)')}">Student</th>
              <th style="${thStyle('110px')}">Attendance</th>
              <th style="${thStyle('90px')}">Cogni­tive</th>
              <th style="${thStyle('90px')}">Affective</th>
              <th style="${thStyle('90px')}">Psycho­motor</th>
              <th style="${thStyle('minmax(140px,1fr)')}">Remarks</th>
            </tr>
          </thead>
          <tbody id="att-rows">
            ${students.map(s => {
              const rec = existing.find(r => r.studentId === s.id) || {};
              return `
                <tr style="${trStyle()}" data-sid="${s.id}">
                  <td style="${tdStyle()}">${s.id}</td>
                  <td style="${tdStyle()}">${s.name}</td>
                  <td style="${tdStyle()}">
                    <select class="att-status" style="${inputStyle('sm')}">
                      <option value="present"  ${rec.status==='present'  || !rec.status ? 'selected' : ''}>Present</option>
                      <option value="late"     ${rec.status==='late'     ? 'selected' : ''}>Late</option>
                      <option value="absent"   ${rec.status==='absent'   ? 'selected' : ''}>Absent</option>
                      <option value="excused"  ${rec.status==='excused'  ? 'selected' : ''}>Excused</option>
                    </select>
                  </td>
                  <td style="${tdStyle('text-align:center;')}">
                    <select class="domain-cog" style="${inputStyle('sm')}">
                      ${[ '',1,2,3,4,5 ].map(v => `<option value="${v}" ${rec.cognitive==v?'selected':''}>${v||'—'}</option>`).join('')}
                    </select>
                  </td>
                  <td style="${tdStyle('text-align:center;')}">
                    <select class="domain-aff" style="${inputStyle('sm')}">
                      ${[ '',1,2,3,4,5 ].map(v => `<option value="${v}" ${rec.affective==v?'selected':''}>${v||'—'}</option>`).join('')}
                    </select>
                  </td>
                  <td style="${tdStyle('text-align:center;')}">
                    <select class="domain-psy" style="${inputStyle('sm')}">
                      ${[ '',1,2,3,4,5 ].map(v => `<option value="${v}" ${rec.psychomotor==v?'selected':''}>${v||'—'}</option>`).join('')}
                    </select>
                  </td>
                  <td style="${tdStyle()}">
                    <input class="att-remark" value="${rec.remark||''}" placeholder="Note / reason..." style="${inputStyle('sm')}">
                  </td>
                </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div style="text-align:right; margin-top:1.5rem;">
        <button onclick="saveAttendanceAndMarks('${cls}','${arm}','${date}')" style="${btnStyle('primary', 'lg')}">
          💾 Save Attendance & Marks
        </button>
      </div>
    </div>`;

  document.getElementById('summary-section').style.display = 'block';
};

window.markAll = function(status) {
  document.querySelectorAll('.att-status').forEach(el => el.value = status);
};

window.saveAttendanceAndMarks = function(cls, arm, date) {
  if (!priv.canTakeAttendance()) return denyAccess('No permission to save.');
  if (!priv.canActOnClass(cls, arm)) return denyAccess('Restricted to your class only.');

  const today = new Date().toISOString().split('T')[0];
  if (date > today) return toast("Cannot save future attendance", 'warning');

  const records = [];
  let hasChanges = false;

  document.querySelectorAll('#att-rows tr').forEach(row => {
    const sid = row.dataset.sid;
    const status    = row.querySelector('.att-status')?.value    || 'absent';
    const cognitive  = row.querySelector('.domain-cog')?.value   || '';
    const affective  = row.querySelector('.domain-aff')?.value   || '';
    const psychomotor = row.querySelector('.domain-psy')?.value  || '';
    const remark     = row.querySelector('.att-remark')?.value   || '';

    if (status || cognitive || affective || psychomotor || remark) {
      hasChanges = true;
    }

    records.push({
      studentId: sid,
      class: cls,
      arm,
      date,
      status,
      cognitive: cognitive ? Number(cognitive) : null,
      affective: affective ? Number(affective) : null,
      psychomotor: psychomotor ? Number(psychomotor) : null,
      remark,
      savedAt: new Date().toISOString()
    });
  });

  if (!hasChanges) return toast('No changes to save.', 'info');

  // Merge / upsert
  records.forEach(newRec => {
    const idx = App.data.attendanceRecords.findIndex(r =>
      r.studentId === newRec.studentId && r.date === newRec.date
    );
    if (idx >= 0) {
      App.data.attendanceRecords[idx] = { ...App.data.attendanceRecords[idx], ...newRec };
    } else {
      App.data.attendanceRecords.push(newRec);
    }

    // Optional: update student-level aggregates / averages (if you want)
    updateStudentAggregates(newRec.studentId);
  });

  toast('Attendance & domain marks saved successfully', 'success');
};

// Placeholder – implement according to your needs
function updateStudentAggregates(studentId) {
  // Example: recalculate overall attendance %, average domain scores, etc.
  // You can store them in App.data.students or separate aggregates collection
}

// Simple summary cards (can be expanded with real calculations)
function generateSummaryCards() {
  // These are placeholders → replace with real counts/averages from App.data.attendanceRecords
  const data = [
    { label: 'Present Today',      count: '—', color: '#22c55e', icon: '✔' },
    { label: 'Late / Excused',     count: '—', color: '#f59e0b', icon: '🕒' },
    { label: 'Absent Today',       count: '—', color: '#ef4444', icon: '✘' },
    { label: 'Avg. Cognitive',     count: '—', color: '#3b82f6' },
    { label: 'Avg. Affective',     count: '—', color: '#8b5cf6' },
    { label: 'Avg. Psychomotor',   count: '—', color: '#ec4899' },
  ];

  return data.map(d => `
    <div style="background:#fff; border-radius:12px; padding:1.25rem; box-shadow:0 3px 10px rgba(0,0,0,0.06); border-left:5px solid ${d.color};">
      <div style="font-size:0.9rem; color:#6b7280; margin-bottom:0.4rem;">${d.label}</div>
      <div style="font-size:2.1rem; font-weight:700; color:${d.color};">
        ${d.icon ? d.icon + ' ' : ''}${d.count}
      </div>
    </div>
  `).join('');
}

window.clearAttendanceForm = function() {
  if (confirm('Clear form? Unsaved changes will be lost.')) {
    document.getElementById('attendance-table').innerHTML = '';
    document.getElementById('summary-section').style.display = 'none';
  }
};
/* ─────────────────────────────────────────
   15. FIXTURES & HONOURS
   All roles can view; only Admin can add/delete/record results
───────────────────────────────────────── */
function renderFixtures() {
  const section = document.getElementById('fixtures');
  const honoursPerSubject = computeSubjectHonours();
  const overallBest       = computeOverallBest();
  const canAdmin          = priv.isAdmin();

  section.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem;">
      <h2 style="margin:0;">Fixtures & Events</h2>
      ${canAdmin ? `<button onclick="openFixtureModal()" style="${btnStyle('primary')}">+ Add Fixture</button>` : ''}
    </div>

    <div style="background:linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 60%,#7c3aed 100%);border-radius:16px;padding:2rem;margin-bottom:2.5rem;color:#fff;box-shadow:0 8px 32px rgba(30,58,95,.35);">
      <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;">
        <span style="font-size:1.75rem;">🏆</span>
        <div>
          <h3 style="margin:0;font-size:1.1rem;text-transform:uppercase;letter-spacing:.1em;">Honours Board</h3>
          <p style="margin:0;opacity:.7;font-size:.85rem;">${App.data.schoolInfo.term} • ${App.data.schoolInfo.session}</p>
        </div>
      </div>
      ${overallBest ? `
        <div style="background:rgba(255,255,255,.12);border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
          <div style="font-size:2.5rem;">👑</div>
          <div>
            <div style="font-size:.75rem;opacity:.7;text-transform:uppercase;letter-spacing:.08em;">Best Overall Student</div>
            <div style="font-size:1.4rem;font-weight:800;">${overallBest.name}</div>
            <div style="font-size:.875rem;opacity:.8;">${overallBest.class} ${overallBest.arm} · Average: <strong>${overallBest.avg}%</strong> · Grade: <strong>${grade(parseFloat(overallBest.avg)).letter}</strong></div>
          </div>
        </div>` : `<div style="background:rgba(255,255,255,.08);border-radius:12px;padding:1rem 1.5rem;margin-bottom:1.5rem;opacity:.7;font-size:.9rem;">No result data yet. Enter results to see the honours board.</div>`}
      ${honoursPerSubject.length ? `
        <h4 style="margin:0 0 1rem;font-size:.85rem;text-transform:uppercase;letter-spacing:.08em;opacity:.8;">Best Student Per Subject</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:.75rem;">
          ${honoursPerSubject.map(h=>`
            <div style="background:rgba(255,255,255,.1);border-radius:10px;padding:.875rem 1rem;display:flex;align-items:center;gap:.75rem;">
              <div style="font-size:1.5rem;">${subjectEmoji(h.subject)}</div>
              <div>
                <div style="font-size:.7rem;opacity:.65;text-transform:uppercase;">${h.subject}</div>
                <div style="font-weight:700;font-size:.95rem;">${h.name}</div>
                <div style="font-size:.8rem;opacity:.75;">${h.class} ${h.arm} · ${h.total}/100 (${grade(h.total).letter})</div>
              </div>
            </div>`).join('')}
        </div>` : ''}
    </div>

    <h3 style="margin-bottom:1rem;">Scheduled Fixtures</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.25rem;">
      ${App.data.fixtures.map(f => `
        <div style="background:#fff;border-radius:12px;padding:1.25rem;box-shadow:0 2px 8px rgba(0,0,0,.07);border-top:4px solid ${f.status==='Completed'?'#22c55e':'#3b82f6'};">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem;">
            <span style="${badgeStyle('info')}">${f.type}</span>
            <span style="${badgeStyle(f.status==='Completed'?'success':'info')}">${f.status}</span>
          </div>
          ${f.status==='Completed' ? `
            <div style="text-align:center;padding:.75rem 0;">
              <div style="font-size:1rem;font-weight:700;">${f.teamA} vs ${f.teamB}</div>
              <div style="font-size:2.5rem;font-weight:900;color:#1f2937;margin:.5rem 0;">${f.scoreA} – ${f.scoreB}</div>
              <div style="${badgeStyle(f.scoreA>f.scoreB?'success':f.scoreA<f.scoreB?'danger':'warning')}">${f.scoreA>f.scoreB?f.teamA+' Wins':f.scoreA<f.scoreB?f.teamB+' Wins':'Draw'}</div>
            </div>` : `
            <div style="text-align:center;padding:.5rem 0;">
              <div style="font-size:1.1rem;font-weight:700;">${f.teamA} vs ${f.teamB}</div>
            </div>`}
          <div style="font-size:.85rem;color:#6b7280;margin-top:.75rem;">
            <div>📅 ${f.date} at ${f.time}</div><div>📍 ${f.venue}</div>
          </div>
          ${canAdmin ? `
            <div style="display:flex;gap:.5rem;margin-top:1rem;">
              ${f.status==='Upcoming' ? `<button onclick="recordResult(${f.id})" style="${btnStyle('success','sm')}">Record Result</button>` : ''}
              <button onclick="deleteFixture(${f.id})" style="${btnStyle('danger','sm')}">Delete</button>
            </div>` : ''}
        </div>`).join('')}
    </div>`;
}

function subjectEmoji(subject) {
  const map = { 'Mathematics':'📐','English Language':'📝','Biology':'🧬','Chemistry':'⚗️','Physics':'⚛️','Economics':'📊','Government':'🏛️','Literature':'📚','Fine Art':'🎨','Music':'🎵','Computer Studies':'💻','Geography':'🌍','Accounting':'📈','French':'🇫🇷','Further Maths':'🔢' };
  return map[subject] || '🏅';
}

function computeSubjectHonours() {
  const { term, session } = App.data.schoolInfo;
  return [...new Set(App.data.results.filter(r=>r.term===term&&r.session===session).map(r=>r.subject))]
    .map(subject => {
      const entries = App.data.results.filter(r=>r.subject===subject&&r.term===term&&r.session===session);
      if (!entries.length) return null;
      const best = entries.reduce((a,b)=>b.total>a.total?b:a);
      const student = App.data.students.find(s=>s.id===best.studentId);
      return student ? { subject, name: student.name, class: student.class, arm: student.arm, total: best.total } : null;
    }).filter(Boolean).sort((a,b)=>a.subject.localeCompare(b.subject));
}

function computeOverallBest() {
  const { term, session } = App.data.schoolInfo;
  if (!App.data.students.length || !App.data.results.length) return null;
  const withScores = App.data.students.map(s => {
    const results = App.data.results.filter(r=>r.studentId===s.id&&r.term===term&&r.session===session);
    if (!results.length) return null;
    const avg = (results.reduce((a,b)=>a+b.total,0)/results.length).toFixed(1);
    return { ...s, avg: parseFloat(avg), avgStr: avg };
  }).filter(Boolean);
  if (!withScores.length) return null;
  const best = withScores.reduce((a,b)=>b.avg>a.avg?b:a);
  return { name: best.name, class: best.class, arm: best.arm, avg: best.avgStr };
}

window.openFixtureModal = function() {
  if (!priv.isAdmin() && denyAccess()) return;
  const teams = [...new Set(App.data.classes.flatMap(c=>c.arms.map(a=>`${c.name} ${a}`)))];
  const teamOpts = teams.map(t=>`<option>${t}</option>`).join('');
  showModal(`
    <h3 style="margin:0 0 1.5rem;">Add Fixture</h3>
    <form id="fixture-form">
      <label style="${labelStyle()}">Type</label>
      <select id="fix-type" style="${inputStyle()}">
        <option>Football</option><option>Athletics</option><option>Debate</option>
        <option>Quiz Competition</option><option>Basketball</option><option>Other</option>
      </select>
      <label style="${labelStyle()}">Team A</label><select id="fix-teamA" style="${inputStyle()}">${teamOpts}</select>
      <label style="${labelStyle()}">Team B</label><select id="fix-teamB" style="${inputStyle()}">${teamOpts}</select>
      <label style="${labelStyle()}">Date</label><input type="date" id="fix-date" style="${inputStyle()}" required>
      <label style="${labelStyle()}">Time</label><input type="time" id="fix-time" style="${inputStyle()}">
      <label style="${labelStyle()}">Venue</label><input id="fix-venue" placeholder="e.g. School Field" style="${inputStyle()}">
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:flex-end;">
        <button type="button" onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button type="submit" style="${btnStyle('primary')}">Add Fixture</button>
      </div>
    </form>`);
  document.getElementById('fixture-form').onsubmit = (e) => {
    e.preventDefault();
    const teamA = document.getElementById('fix-teamA').value;
    const teamB = document.getElementById('fix-teamB').value;
    if (teamA === teamB) return toast('Teams must be different.', 'error');
    App.data.fixtures.push({
      id: Date.now(), type: document.getElementById('fix-type').value,
      teamA, teamB, date: document.getElementById('fix-date').value,
      time: document.getElementById('fix-time').value||'10:00',
      venue: document.getElementById('fix-venue').value||'School Field',
      status: 'Upcoming', scoreA: null, scoreB: null,
    });
    closeModal(); renderFixtures(); toast('Fixture added!', 'success');
  };
};

window.recordResult = function(id) {
  if (!priv.isAdmin() && denyAccess()) return;
  const f = App.data.fixtures.find(x => x.id === id);
  showModal(`
    <h3 style="margin:0 0 1.5rem;">Record Result</h3>
    <div style="text-align:center;margin-bottom:1.5rem;font-size:1.2rem;font-weight:700;">${f.teamA} vs ${f.teamB}</div>
    <form id="result-fix-form">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <div><label style="${labelStyle()}">${f.teamA} Score</label><input type="number" id="scoreA" min="0" style="${inputStyle()}" required></div>
        <div><label style="${labelStyle()}">${f.teamB} Score</label><input type="number" id="scoreB" min="0" style="${inputStyle()}" required></div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:flex-end;">
        <button type="button" onclick="closeModal()" style="${btnStyle('secondary')}">Cancel</button>
        <button type="submit" style="${btnStyle('primary')}">Save Result</button>
      </div>
    </form>`);
  document.getElementById('result-fix-form').onsubmit = (e) => {
    e.preventDefault();
    f.scoreA = parseInt(document.getElementById('scoreA').value);
    f.scoreB = parseInt(document.getElementById('scoreB').value);
    f.status = 'Completed';
    closeModal(); renderFixtures(); toast('Result recorded!', 'success');
  };
};

window.deleteFixture = function(id) {
  if (!priv.isAdmin() && denyAccess()) return;
  if (!confirmDlg('Delete this fixture?')) return;
  App.data.fixtures = App.data.fixtures.filter(f => f.id !== id); renderFixtures(); toast('Fixture deleted.', 'warning');
};

/* ─────────────────────────────────────────
   16. SETTINGS  (Admin only)
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   SETTINGS PAGE – Enhanced Version
   Improvements:
   • More school info fields (address, logo URL, resumption date, announcements)
   • Editable grading scale (add/edit/delete ranges)
   • Role & permission management (basic)
   • Domain assessment labels & scale configuration
   • Class & arm management (CRUD)
   • Backup/restore + import students
   • UI grouped into tabs/sections for better organization
   • Better validation & feedback
───────────────────────────────────────── */

function renderSettings() {
  if (!priv.canAccessSettings()) {
    accessDeniedPage('settings');
    return;
  }

  const isSuperAdmin = priv.isSuperAdmin?.() || false; // Assume you add this check for full control

  const section = document.getElementById('settings');
  section.innerHTML = `
    <h2 style="margin-bottom:1.5rem; color:#1e40af;">System Settings</h2>

    <div style="display:flex; gap:1rem; margin-bottom:1.5rem; flex-wrap:wrap;">
      <button onclick="showSettingsTab('school')" class="tab-btn active" style="${btnStyle('outline')}">School Info</button>
      <button onclick="showSettingsTab('grading')" class="tab-btn" style="${btnStyle('outline')}">Grading & Domains</button>
      <button onclick="showSettingsTab('classes')" class="tab-btn" style="${btnStyle('outline')}">Classes & Arms</button>
      ${isSuperAdmin ? `<button onclick="showSettingsTab('roles')" class="tab-btn" style="${btnStyle('outline')}">Roles & Privileges</button>` : ''}
      <button onclick="showSettingsTab('data')" class="tab-btn" style="${btnStyle('outline')}">Data Management</button>
    </div>

    <div id="settings-content" style="background:#fff; border-radius:12px; padding:2rem; box-shadow:0 4px 16px rgba(0,0,0,0.08); min-height:500px;">

      <!-- SCHOOL INFO TAB -->
      <div id="tab-school" class="settings-tab active">
        <h3 style="margin:0 0 1.5rem; color:#1e40af;">School Information</h3>
        <form id="school-form" style="display:grid; gap:1.25rem; max-width:700px;">
          <div>
            <label style="${labelStyle()}">School Name *</label>
            <input id="set-name" value="${App.data.schoolInfo.name || ''}" required style="${inputStyle()}">
          </div>
          <div>
            <label style="${labelStyle()}">Address</label>
            <input id="set-address" value="${App.data.schoolInfo.address || ''}" style="${inputStyle()}">
          </div>
          <div>
            <label style="${labelStyle()}">Logo URL (optional)</label>
            <input id="set-logo" value="${App.data.schoolInfo.logo || ''}" placeholder="https://..." style="${inputStyle()}">
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
            <div>
              <label style="${labelStyle()}">Current Session *</label>
              <input id="set-session" value="${App.data.schoolInfo.session || '2025/2026'}" required style="${inputStyle()}">
            </div>
            <div>
              <label style="${labelStyle()}">Current Term</label>
              <select id="set-term" style="${inputStyle()}">
                ${['First Term','Second Term','Third Term'].map(t=>`<option ${App.data.schoolInfo.term===t?'selected':''}>${t}</option>`).join('')}
              </select>
            </div>
          </div>
          <div>
            <label style="${labelStyle()}">Principal's Name</label>
            <input id="set-principal" value="${App.data.schoolInfo.principal || ''}" style="${inputStyle()}">
          </div>
          <div>
            <label style="${labelStyle()}">Next Resumption Date</label>
            <input type="date" id="set-resumption" value="${App.data.schoolInfo.resumptionDate || ''}" style="${inputStyle()}">
          </div>
          <div>
            <label style="${labelStyle()}">School Announcements / Notice</label>
            <textarea id="set-announcements" rows="3" style="${inputStyle()}; resize:vertical;">${App.data.schoolInfo.announcements || ''}</textarea>
          </div>
          <button type="submit" style="${btnStyle('primary')}; width:200px; justify-self:start;">Save School Settings</button>
        </form>
      </div>

      <!-- GRADING & DOMAINS TAB -->
      <div id="tab-grading" class="settings-tab" style="display:none;">
        <h3 style="margin:0 0 1.5rem; color:#1e40af;">Grading Scale & Domain Assessment</h3>
        
        <div style="margin-bottom:2rem;">
          <h4 style="margin:0 0 0.75rem;">Academic Grading Scale</h4>
          <table id="grading-table" style="${tableStyle()}">
            <thead><tr style="${thRowStyle()}">
              <th style="${thStyle('140px')}">Min Score</th>
              <th style="${thStyle('140px')}">Max Score</th>
              <th style="${thStyle('80px')}">Grade</th>
              <th style="${thStyle('auto')}">Remark</th>
              <th style="${thStyle('90px')}">Actions</th>
            </tr></thead>
            <tbody>
              ${App.data.gradingScale?.map((item,i)=>`
                <tr data-index="${i}">
                  <td><input type="number" value="${item.min}" min="0" max="100" style="${inputStyle('sm')}"></td>
                  <td><input type="number" value="${item.max}" min="0" max="100" style="${inputStyle('sm')}"></td>
                  <td><input value="${item.grade}" maxlength="2" style="${inputStyle('sm')}"></td>
                  <td><input value="${item.remark}" style="${inputStyle('sm')}"></td>
                  <td><button onclick="removeGradingRow(this)" style="${btnStyle('danger','xs')}">×</button></td>
                </tr>
              `).join('') || '<tr><td colspan="5" style="text-align:center;padding:1rem;color:#9ca3af;">No grading scale defined</td></tr>'}
            </tbody>
          </table>
          <button onclick="addGradingRow()" style="${btnStyle('success','sm')}; margin-top:0.75rem;">+ Add Grade Range</button>
        </div>

        <div>
          <h4 style="margin:1.5rem 0 0.75rem;">Domain Assessment Labels (1–5 Scale)</h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1rem;">
            ${[1,2,3,4,5].map(score => `
              <div>
                <label style="${labelStyle()}">${score} =</label>
                <input id="domain-label-${score}" value="${App.data.domainLabels?.[score] || getDefaultDomainLabel(score)}" style="${inputStyle()}">
              </div>
            `).join('')}
          </div>
        </div>

        <button onclick="saveGradingAndDomains()" style="${btnStyle('primary')}; margin-top:2rem;">Save Grading & Domain Settings</button>
      </div>

      <!-- CLASSES & ARMS TAB -->
      <div id="tab-classes" class="settings-tab" style="display:none;">
        <h3 style="margin:0 0 1.5rem; color:#1e40af;">Classes & Sections/Arms</h3>
        <div id="classes-list"></div>
        <button onclick="addNewClass()" style="${btnStyle('success')}; margin-top:1rem;">+ Add New Class</button>
      </div>

      <!-- ROLES & PRIVILEGES TAB (Super Admin only) -->
      <div id="tab-roles" class="settings-tab" style="display:none;">
        <h3 style="margin:0 0 1.5rem; color:#1e40af;">User Roles & Permissions</h3>
        <p style="color:#64748b; margin-bottom:1.5rem;">Manage what each role can do in the system.</p>
        <!-- Basic table or cards showing roles and toggles for key permissions -->
        <div style="display:grid; gap:1rem;">
          ${['Admin','Principal','Vice Principal','Teacher','Bursar','Parent','Student'].map(role => `
            <div style="border:1px solid #e2e8f0; border-radius:8px; padding:1rem;">
              <div style="font-weight:600; margin-bottom:0.75rem;">${role}</div>
              <div style="display:flex; flex-wrap:wrap; gap:1.5rem;">
                <label style="display:flex; align-items:center; gap:0.5rem;">
                  <input type="checkbox" ${role==='Admin'?'checked disabled':''}> Can access settings
                </label>
                <label style="display:flex; align-items:center; gap:0.5rem;">
                  <input type="checkbox" ${role==='Teacher'?'checked':''}> Can enter results
                </label>
                <!-- Add more permission toggles: take attendance, view reports, manage fees, etc. -->
              </div>
            </div>
          `).join('')}
        </div>
        <p style="margin-top:2rem; color:#9ca3af; font-style:italic;">Advanced role customization coming soon...</p>
      </div>

      <!-- DATA MANAGEMENT TAB -->
      <div id="tab-data" class="settings-tab" style="display:none;">
        <h3 style="margin:0 0 1.5rem; color:#1e40af;">Data Management & Backup</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.5rem;">
          <div style="border:1px solid #e2e8f0; border-radius:8px; padding:1.5rem;">
            <h4 style="margin:0 0 1rem;">Export / Backup</h4>
            <button onclick="exportData()" style="${btnStyle('secondary')}; width:100%;">📥 Export Full Data (JSON)</button>
          </div>
          <div style="border:1px solid #e2e8f0; border-radius:8px; padding:1.5rem;">
            <h4 style="margin:0 0 1rem;">Danger Zone</h4>
            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              <button onclick="clearResults()" style="${btnStyle('danger')}">🗑️ Clear All Academic Results</button>
              <button onclick="clearAttendance()" style="${btnStyle('danger')}">🗑️ Clear Attendance Records</button>
              <button onclick="resetAllData()" style="${btnStyle('danger')}">☢️ Reset Entire Database</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  // Tab switching
  window.showSettingsTab = function(tabId) {
    document.querySelectorAll('.settings-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).style.display = 'block';
    document.querySelector(`button[onclick="showSettingsTab('${tabId}')"]`).classList.add('active');
  };

  // School form submit
  document.getElementById('school-form').onsubmit = e => {
    e.preventDefault();
    App.data.schoolInfo = {
      ...(App.data.schoolInfo || {}),
      name: document.getElementById('set-name').value.trim(),
      address: document.getElementById('set-address').value.trim(),
      logo: document.getElementById('set-logo').value.trim(),
      session: document.getElementById('set-session').value.trim(),
      term: document.getElementById('set-term').value,
      principal: document.getElementById('set-principal').value.trim(),
      resumptionDate: document.getElementById('set-resumption').value,
      announcements: document.getElementById('set-announcements').value.trim()
    };
    toast('School settings saved successfully', 'success');
  };

  // Load classes list (implement addNewClass, etc.)
  renderClassesList();

  // Load grading scale if not present
  if (!App.data.gradingScale) {
    App.data.gradingScale = [
      {min:70, max:100, grade:'A', remark:'Excellent'},
      {min:60, max:69, grade:'B', remark:'Very Good'},
      {min:50, max:59, grade:'C', remark:'Good'},
      {min:45, max:49, grade:'D', remark:'Pass'},
      {min:40, max:44, grade:'E', remark:'Weak Pass'},
      {min:0,  max:39, grade:'F', remark:'Fail'}
    ];
  }
}

// ── Helper functions ─────────────────────────────────────

function renderClassesList() {
  const container = document.getElementById('classes-list');
  if (!container) return;
  container.innerHTML = App.data.classes?.map(cls => `
    <div style="border:1px solid #e2e8f0; border-radius:8px; padding:1rem; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <strong style="font-size:1.1rem;">${cls.name}</strong>
        <button onclick="deleteClass('${cls.name}')" style="${btnStyle('danger','sm')}">Delete</button>
      </div>
      <div style="margin-top:0.5rem;">
        <strong>Arms/Sections:</strong>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
          ${cls.arms?.map(arm => `
            <span style="background:#e0f2fe; padding:0.35rem 0.75rem; border-radius:999px; font-size:0.9rem;">
              ${arm}
              <button onclick="removeArm('${cls.name}','${arm}')" style="border:none;background:none;color:#ef4444;font-size:1.1rem;line-height:1;cursor:pointer;">×</button>
            </span>
          `).join('') || '<span style="color:#9ca3af;">No arms defined</span>'}
        </div>
        <input id="new-arm-${cls.name}" placeholder="Add new arm (e.g. A)" style="${inputStyle('sm')}; margin-top:0.75rem; width:180px;">
        <button onclick="addArm('${cls.name}')" style="${btnStyle('success','sm')}; margin-left:0.5rem;">+ Add</button>
      </div>
    </div>
  `).join('') || '<p style="color:#9ca3af;text-align:center;padding:2rem;">No classes defined yet.</p>';
}

window.addNewClass = function() {
  const name = prompt('Enter new class name (e.g. JSS 1, SSS 2):');
  if (!name?.trim()) return;
  if (App.data.classes.some(c => c.name === name)) return toast('Class already exists', 'warning');
  App.data.classes = App.data.classes || [];
  App.data.classes.push({ name: name.trim(), arms: [] });
  renderClassesList();
  toast('Class added', 'success');
};

window.deleteClass = function(name) {
  if (!confirm(`Delete class ${name} and all related data?`)) return;
  App.data.classes = App.data.classes.filter(c => c.name !== name);
  // Optional: clean up students, results, etc.
  renderClassesList();
  toast('Class removed', 'warning');
};

window.addArm = function(className) {
  const input = document.getElementById(`new-arm-${className}`);
  const arm = input?.value.trim();
  if (!arm) return;
  const cls = App.data.classes.find(c => c.name === className);
  if (cls) {
    cls.arms = cls.arms || [];
    if (cls.arms.includes(arm)) return toast('Arm already exists', 'warning');
    cls.arms.push(arm);
    input.value = '';
    renderClassesList();
    toast('Arm added', 'success');
  }
};

window.removeArm = function(className, arm) {
  const cls = App.data.classes.find(c => c.name === className);
  if (cls) {
    cls.arms = cls.arms.filter(a => a !== arm);
    renderClassesList();
    toast('Arm removed', 'warning');
  }
};

window.addGradingRow = function() {
  const tbody = document.querySelector('#grading-table tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="number" min="0" max="100" style="${inputStyle('sm')}"></td>
    <td><input type="number" min="0" max="100" style="${inputStyle('sm')}"></td>
    <td><input maxlength="2" style="${inputStyle('sm')}"></td>
    <td><input style="${inputStyle('sm')}"></td>
    <td><button onclick="this.closest('tr').remove()" style="${btnStyle('danger','xs')}">×</button></td>
  `;
  tbody.appendChild(row);
};

window.removeGradingRow = function(btn) {
  btn.closest('tr').remove();
};

window.saveGradingAndDomains = function() {
  const rows = document.querySelectorAll('#grading-table tbody tr');
  const scale = [];
  rows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    const min = Number(inputs[0].value);
    const max = Number(inputs[1].value);
    if (!isNaN(min) && !isNaN(max)) {
      scale.push({
        min, max,
        grade: inputs[2].value.trim(),
        remark: inputs[3].value.trim()
      });
    }
  });
  App.data.gradingScale = scale.sort((a,b) => b.min - a.min);

  // Domain labels
  App.data.domainLabels = {};
  [1,2,3,4,5].forEach(s => {
    const val = document.getElementById(`domain-label-${s}`)?.value.trim();
    if (val) App.data.domainLabels[s] = val;
  });

  toast('Grading scale & domain labels saved', 'success');
};

function getDefaultDomainLabel(score) {
  const map = {1:'Excellent',2:'Very Good',3:'Good',4:'Fair',5:'Poor'};
  return map[score] || 'Not rated';
}

// Keep your existing exportData, clearResults, clearAttendance
// Add resetAllData() with strong confirmation if needed
/**
 * Completely resets the application data to a minimal empty state.
 * Requires explicit typed confirmation to prevent accidental data loss.
 */
window.resetAllData = function() {
    // Step 1: First-level confirmation (prevent fat-finger resets)
    if (!confirm("This action will PERMANENTLY DELETE ALL school data (students, results, attendance, classes, teachers, remarks, etc.)\n\nAre you sure you want to continue?")) {
        toast("Reset cancelled.", "info");
        return;
    }

    // Step 2: Require user to type exact confirmation phrase
    const confirmation = prompt(
        "Type the following phrase exactly to confirm full data reset:\n\n" +
        "   RESET DATABASE NOW\n\n" +
        "(case-sensitive, including spaces)"
    );

    if (confirmation !== "RESET DATABASE NOW") {
        toast("Reset aborted — confirmation phrase did not match.", "warning");
        return;
    }

    // Step 3: Optional third layer — time delay + final warning (anti-impulse)
    if (!confirm("Last chance!\n\nThis cannot be undone.\n\nProceed with full reset?")) {
        toast("Reset cancelled at final confirmation.", "info");
        return;
    }

    // Step 4: Perform the reset
    try {
        // Preserve essential non-user-data structures if they exist
        const preserved = {
            schoolInfo: App.data.schoolInfo || {},
            gradingScale: App.data.gradingScale || [],
            domainLabels: App.data.domainLabels || {},
            // add other global configs you want to keep
        };

        // Reset to minimal viable empty state
        App.data = {
            // Core collections
            students: [],
            results: [],
            attendanceRecords: [],     // ← use consistent name if you renamed it
            attendance: [],            // ← keep if still used
            remarks: [],
            classes: [],
            teachers: [],
            // Optional / future collections
            domainAssessments: [],
            users: App.data.users || [],     // preserve accounts if needed
            // Preserved global settings
            ...preserved
        };

        // Optional: Reset any derived/cached student fields
        // (if you store aggregates like attendance % directly on students)
        // App.data.students.forEach(s => { s.attendance = 0; /* etc */ });

        // Optional: Clear any localStorage / session data if used
        // localStorage.removeItem('app-state');

        toast("Full database reset completed.", "warning");
        
        // Optional: Force UI refresh / redirect
        // navigate('dashboard');  // or reload page, etc.
        // location.reload();     // most aggressive

    } catch (err) {
        console.error("Reset failed:", err);
        toast("Reset failed — check console for details.", "error");
    }
};
/* ─────────────────────────────────────────
   17. MODAL SYSTEM
───────────────────────────────────────── */
function showModal(html) {
  let overlay = document.getElementById('modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:1rem;';
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:2rem;max-width:680px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.2);animation:slideUp .2s ease;">
      ${html}
    </div>`;
  if (!document.getElementById('modal-style')) {
    const s = document.createElement('style'); s.id = 'modal-style';
    s.textContent = '@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}';
    document.head.appendChild(s);
  }
}

function closeModal() { document.getElementById('modal-overlay')?.remove(); }
window.closeModal = closeModal;

/* ─────────────────────────────────────────
   18. ACCESS DENIED PAGE
───────────────────────────────────────── */
function accessDeniedPage(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  el.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;text-align:center;">
      <div style="font-size:4rem;margin-bottom:1rem;">🔒</div>
      <h2 style="color:#1e3a5f;margin:0 0 .5rem;">Access Denied</h2>
      <p style="color:#6b7280;max-width:400px;">You do not have permission to view this section.
      Please contact the school admin if you think this is an error.</p>
      <button onclick="navigate('${priv.isParent()?'results':'dashboard'}')" style="${btnStyle('primary')};margin-top:1.5rem;">← Go Back</button>
    </div>`;
}

/* ─────────────────────────────────────────
   19. STYLE HELPERS
───────────────────────────────────────── */
function btnStyle(type = 'primary', size = 'md') {
  const pad  = size === 'sm' ? '.3rem .7rem'  : '.6rem 1.25rem';
  const font = size === 'sm' ? '.8rem'         : '.9rem';
  const colors = {
    primary:   'background:#1e3a5f;color:#fff;border:none;',
    secondary: 'background:#e5e7eb;color:#374151;border:none;',
    danger:    'background:#ef4444;color:#fff;border:none;',
    success:   'background:#22c55e;color:#fff;border:none;',
    info:      'background:#06b6d4;color:#fff;border:none;',
    warning:   'background:#f59e0b;color:#fff;border:none;',
    outline:   'background:transparent;color:#1e3a5f;border:1px solid #1e3a5f;',
  };
  return `${colors[type]||colors.primary}padding:${pad};border-radius:8px;font-size:${font};cursor:pointer;font-weight:500;transition:opacity .15s;margin:.1rem;`;
}

function infoBanner() {
  return 'background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:.75rem 1rem;font-size:.875rem;color:#1d4ed8;margin-bottom:1rem;display:block;';
}

function tableStyle()  { return 'width:100%;border-collapse:collapse;font-size:.9rem;'; }
function thRowStyle()  { return 'background:#f9fafb;'; }
function thStyle()     { return 'padding:.75rem 1rem;text-align:left;font-size:.8rem;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #e5e7eb;white-space:nowrap;'; }
function tdStyle()     { return 'padding:.75rem 1rem;border-bottom:1px solid #f3f4f6;color:#374151;vertical-align:middle;'; }
function trStyle()     { return 'transition:background .1s;'; }
function labelStyle()  { return 'display:block;font-size:.85rem;font-weight:500;color:#374151;margin:.75rem 0 .25rem;'; }
function inputStyle(size = 'md') {
  const pad  = size === 'sm' ? '.35rem .6rem' : '.6rem .85rem';
  const font = size === 'sm' ? '.85rem'        : '.9rem';
  return `display:block;width:100%;padding:${pad};border:1px solid #d1d5db;border-radius:8px;font-size:${font};color:#1f2937;background:#fff;box-sizing:border-box;outline:none;font-family:inherit;`;
}
function badgeStyle(type = 'info') {
  const colors = { info:'background:#dbeafe;color:#1d4ed8;', success:'background:#dcfce7;color:#166534;', warning:'background:#fef3c7;color:#92400e;', danger:'background:#fee2e2;color:#991b1b;' };
  return `display:inline-block;padding:.2rem .6rem;border-radius:9999px;font-size:.75rem;font-weight:600;${colors[type]||colors.info}`;
}

/* ─────────────────────────────────────────
   20. LOGOUT
───────────────────────────────────────── */
function handleLogout() {
  if (!confirmDlg('Are you sure you want to logout?')) return;
  /* Clear auth session if login.js is present */
  window.SHC_Auth?.clearSession();
  toast('Logged out. Goodbye, ' + App.currentUser.name + '!', 'info');
  setTimeout(() => { window.location.href = 'login.html'; }, 700);
}

/* ─────────────────────────────────────────
   21. INIT  — single, merged entry point
   Reads session from login.js (SHC_Auth) if available,
   falls back to default Admin for standalone testing.
───────────────────────────────────────── */
function init() {
  /* ── Auth Session ── */
  const s = window.SHC_Auth?.getSession();
  if (s) {
    App.currentUser = {
      name:          s.name,
      role:          s.role,
      email:         s.email         || '',
      teacherId:     s.teacherId     || null,
      assignedClass: s.assignedClass || null,
      assignedArm:   s.assignedArm   || null,
      studentId:     s.studentId     || null,
      privileges:    s.privileges,
    };
  } else if (window.SHC_Auth) {
    /* login.js is loaded but no session → force login */
    window.location.href = 'login.html';
    return;
  }
  /* else: SHC_Auth not loaded → standalone dev mode (Admin default) */

  /* ── User Info Display ── */
  const userEl = document.getElementById('current-user-name-role');
  if (userEl) userEl.textContent = `${App.currentUser.name} (${App.currentUser.role})`;
  const roleEl = document.querySelector('.user-role');
  if (roleEl) roleEl.textContent = `${App.currentUser.role} • ${App.currentUser.name}`;

  /* ── Sidebar + Logout ── */
  initSidebar();
  document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
  document.getElementById('logout-btn-top')?.addEventListener('click', handleLogout);

  /* ── Keyboard ── */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── Hash Routing ── */
  function handleHash() {
    const hash = window.location.hash.replace('#', '') || (priv.isParent() ? 'results' : 'dashboard');
    navigate(hash);
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();

  /* ── Base Styles ── */
  if (!document.getElementById('app-base-style')) {
    const st = document.createElement('style');
    st.id = 'app-base-style';
    st.textContent = `
      .content-section { animation: fadeIn .2s ease; }
      .content-section.hidden { display: none !important; }
      tr:hover td { background: #f9fafb !important; }
      button:hover { opacity: 0.88; }
      input:focus, select:focus, textarea:focus {
        border-color: #1e3a5f !important;
        box-shadow: 0 0 0 3px rgba(30,58,95,.12);
      }
      .sidebar.collapsed { width: 0; min-width: 0; overflow: hidden; }
      .main-container.sidebar-collapsed { margin-left: 0; }
      @media (max-width: 768px) {
        #sidebar { position: fixed; z-index: 200; transform: translateX(-100%); transition: transform .25s; }
        #sidebar:not(.collapsed) { transform: translateX(0); }
        .main-container { margin-left: 0 !important; }
      }
      @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(st);
  }
}

document.addEventListener('DOMContentLoaded', init);