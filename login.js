/* ============================================================
   Sacred Heart College – Login Portal
   login.js – Authentication & Role Management
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────
   CREDENTIAL STORE
   Roles: Admin | Teacher | Parent
   In production, replace with a real API/backend call.
───────────────────────────────────────── */
const USERS = [
  /* ── Admins ──────────────────────────────────────── */
  {
    username: 'admin',
    password: 'admin',
    role: 'Admin',
    name: 'Samuel',
    email: 'admin@shc.edu',
  },

  /* ── Teachers (can enter results & take attendance) ── */
  {
    username: 'enwosu',
    password: 'teacher123',
    role: 'Teacher',
    name: 'Mr Emeka Nwosu',
    email: 'enwosu@shc.edu',
    teacherId: 'T001',
    assignedClass: 'SS 1',
    assignedArm: 'A',
  },
  {
    username: 'anze',
    password: 'teacher123',
    role: 'Teacher',
    name: 'Mrs Adaora Nze',
    email: 'anze@shc.edu',
    teacherId: 'T004',
    assignedClass: 'SS 3',
    assignedArm: 'A',
  },
  {
    username: 'ngeze',
    password: 'teacher123',
    role: 'Teacher',
    name: 'Mrs Ngozi Eze',
    email: 'ngeze@shc.edu',
    teacherId: 'T002',
    assignedClass: 'JSS 2',
    assignedArm: 'B',
  },
  {
    username: 'cobi',
    password: 'teacher123',
    role: 'Teacher',
    name: 'Mr Chibuike Obi',
    email: 'cobi@shc.edu',
    teacherId: 'T003',
    assignedClass: 'SS 2',
    assignedArm: 'A',
  },
  {
    username: 'snnaji',
    password: 'teacher123',
    role: 'Teacher',
    name: 'Mr Samuel Nnaji',
    email: 'snnaji@shc.edu',
    teacherId: 'T005',
    assignedClass: 'SS 2',
    assignedArm: 'B',
  },
  {
    username: 'iokeke',
    password: 'teacher123',
    role: 'Teacher',
    name: 'Mrs Ifeoma Okeke',
    email: 'iokeke@shc.edu',
    teacherId: 'T006',
    assignedClass: 'JSS 1',
    assignedArm: 'A',
  },

  /* ── Parents (view child's results only) ─────────── */
  { username: 'parent_shc001', password: '5678', role: 'Parent', name: 'Mrs Okonkwo', studentId: 'SHC/001' },
  { username: 'parent_shc002', password: '6789', role: 'Parent', name: 'Mr Eze',      studentId: 'SHC/002' },
  { username: 'parent_shc003', password: '7890', role: 'Parent', name: 'Mr Nwosu',    studentId: 'SHC/003' },
  { username: 'parent_shc004', password: '8901', role: 'Parent', name: 'Mrs Okafor',  studentId: 'SHC/004' },
  { username: 'parent_shc005', password: '9012', role: 'Parent', name: 'Mr Chukwu',   studentId: 'SHC/005' },
  { username: 'parent_shc006', password: '0123', role: 'Parent', name: 'Mrs Ani',     studentId: 'SHC/006' },
  { username: 'parent_shc007', password: '1234', role: 'Parent', name: 'Mr Uche',     studentId: 'SHC/007' },
  { username: 'parent_shc008', password: '2345', role: 'Parent', name: 'Mrs Obi',     studentId: 'SHC/008' },
];

/* ─────────────────────────────────────────
   PRIVILEGE MAP
   Admin    → full access to everything
   Teacher  → can enter results & take attendance for their class/arm
   Parent   → can only view their child's results
───────────────────────────────────────── */
const PRIVILEGES = {

  Admin: {
    allowedSections: [
      'dashboard', 'classes', 'arms', 'students', 'teachers',
      'subjects', 'results', 'report-cards', 'attendance',
      'fixtures', 'parent-portal', 'settings',
    ],
    canEnterResults:    true,   // all classes
    canTakeAttendance:  true,   // all classes
    canViewResults:     true,
    canAddRemarks:      true,
    canViewReports:     true,
    canManageStaff:     true,
    canManageStudents:  true,
    canViewParentPortal: true,
    canAccessSettings:  true,
  },

  Teacher: {
    allowedSections: [
      'dashboard', 'students', 'results', 'report-cards', 'attendance', 'fixtures',
    ],
    canEnterResults:    true,   // for their assigned class/arm only
    canTakeAttendance:  true,   // for their assigned class/arm only
    canViewResults:     true,
    canAddRemarks:      true,   // for their assigned class/arm only
    canViewReports:     true,
    canManageStaff:     false,
    canManageStudents:  false,
    canViewParentPortal: false,
    canAccessSettings:  false,
  },

  Parent: {
    allowedSections: ['results'],  // scoped to their child only via studentId
    canEnterResults:    false,
    canTakeAttendance:  false,
    canViewResults:     true,      // their child's results only
    canAddRemarks:      false,
    canViewReports:     false,
    canManageStaff:     false,
    canManageStudents:  false,
    canViewParentPortal: false,
    canAccessSettings:  false,
  },
};

/* ─────────────────────────────────────────
   PRIVILEGE GUARD
   Call this in script2.js before any privileged action.
   Usage: if (!hasPrivilege('canEnterResults')) return;
───────────────────────────────────────── */
function hasPrivilege(privilegeKey) {
  const session = getSession();
  if (!session) return false;
  return session.privileges[privilegeKey] === true;
}

/* ─────────────────────────────────────────
   SECTION ACCESS GUARD
   Checks if the current user may view a given section.
   Usage: if (!canAccessSection('settings')) redirectToDashboard();
───────────────────────────────────────── */
function canAccessSection(sectionName) {
  const session = getSession();
  if (!session) return false;
  return session.privileges.allowedSections.includes(sectionName);
}

/* ─────────────────────────────────────────
   CLASS/ARM GUARD
   Teachers may only act on their assigned class/arm.
   Admins bypass this check automatically.
   Usage: if (!canActOnClass('SS 1', 'A')) showAccessDenied();
───────────────────────────────────────── */
function canActOnClass(className, arm) {
  const session = getSession();
  if (!session) return false;
  if (session.role === 'Admin') return true;
  return session.assignedClass === className && session.assignedArm === arm;
}

/* ─────────────────────────────────────────
   STORAGE HELPERS
   Session stored in sessionStorage — clears on tab close.
───────────────────────────────────────── */
const SESSION_KEY = 'shc_session';

function saveSession(user) {
  const session = {
    name:          user.name,
    role:          user.role,
    email:         user.email         || '',
    teacherId:     user.teacherId     || null,
    assignedClass: user.assignedClass || null,
    assignedArm:   user.assignedArm   || null,
    studentId:     user.studentId     || null,
    privileges:    PRIVILEGES[user.role],
    loggedInAt:    Date.now(),
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

/* ─────────────────────────────────────────
   REDIRECT TARGET
───────────────────────────────────────── */
function getDashboardUrl(role) {
  const base = 'dashboard.html';
  const anchors = {
    Admin:   '#dashboard',
    Teacher: '#dashboard',
    Parent:  '#results',    // parents land directly on results view
  };
  return `${base}${anchors[role] || '#dashboard'}`;
}

/* ─────────────────────────────────────────
   AUTHENTICATION
───────────────────────────────────────── */
function authenticate(roleInput, username, password) {
  // Normalise the role dropdown value → internal role name
  const roleMap = {
    admin:   'Admin',
    teacher: 'Teacher',
    parent:  'Parent',
  };
  const expectedRole = roleMap[roleInput];
  if (!expectedRole) return null;

  return USERS.find(u =>
    (u.username === username || u.email === username) &&
    u.password === password &&
    u.role === expectedRole
  ) || null;
}

/* ─────────────────────────────────────────
   FORM HELPERS
───────────────────────────────────────── */
function showError(id, message) {
  const el = document.getElementById(id);
  if (el) { el.textContent = message; el.classList.add('show'); }
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('show');
}

function clearAllErrors(prefix) {
  document.querySelectorAll(`[id^="${prefix}"][id$="-error"]`)
    .forEach(el => el.classList.remove('show'));
}

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (loading) {
    btn.classList.add('loading');
    btn.textContent = '';
  } else {
    btn.classList.remove('loading');
    btn.textContent = btnId === 'login-btn' ? 'Sign In' : 'Create Account';
  }
}

/* ─────────────────────────────────────────
   LOGIN HANDLER
───────────────────────────────────────── */
function handleLogin(e) {
  e.preventDefault();
  clearAllErrors('login');

  const role     = document.getElementById('login-role').value;
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  let valid = true;

  if (!role)     { showError('login-role-error',     'Please select your role.');               valid = false; }
  if (!username) { showError('login-username-error', 'Please enter your username or email.');   valid = false; }
  if (!password) { showError('login-password-error', 'Please enter your password.');            valid = false; }
  if (!valid) return;

  setLoading('login-btn', true);

  // Replace setTimeout with a real fetch() in production
  setTimeout(() => {
    const user = authenticate(role, username, password);

    if (!user) {
      setLoading('login-btn', false);
      showError('login-password-error', 'Invalid credentials. Please try again.');
      const pwField = document.getElementById('login-password');
      pwField.value = '';
      pwField.focus();
      return;
    }

    const session = saveSession(user);

    const btn = document.getElementById('login-btn');
    if (btn) {
      btn.classList.remove('loading');
      btn.style.background = '#22c55e';
      btn.textContent = '✔ Signed in!';
    }

    setTimeout(() => {
      window.location.href = getDashboardUrl(session.role);
    }, 700);

  }, 800);
}

/* ─────────────────────────────────────────
   SIGNUP HANDLER
   Creates a pending account; Admin must approve.
   Parents cannot self-register (security policy).
───────────────────────────────────────── */
function handleSignup(e) {
  e.preventDefault();
  clearAllErrors('signup');
  clearError('terms-error');

  const role     = document.getElementById('signup-role').value;
  const name     = document.getElementById('signup-name').value.trim();
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm  = document.getElementById('signup-confirm').value;
  const terms    = document.getElementById('terms').checked;
  let valid = true;

  if (!role)                               { showError('signup-role-error',    'Please select your role.');                          valid = false; }
  if (role === 'parent')                   { showError('signup-role-error',    'Parents are registered by the school admin only.');  valid = false; }
  if (!name || name.length < 3)            { showError('signup-name-error',    'Please enter your full name (min. 3 characters).');  valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                           { showError('signup-email-error',   'Please enter a valid email address.');              valid = false; }
  if (!password || password.length < 6)   { showError('signup-password-error','Password must be at least 6 characters.');          valid = false; }
  if (password !== confirm)               { showError('signup-confirm-error', 'Passwords do not match.');                          valid = false; }
  if (!terms)                             { showError('terms-error',          'You must agree to the Terms of Service.');          valid = false; }
  if (!valid) return;

  setLoading('signup-btn', true);

  setTimeout(() => {
    setLoading('signup-btn', false);
    const form = document.getElementById('signup-form');
    if (form) {
      form.innerHTML = `
        <div style="text-align:center;padding:1.5rem 0;">
          <div style="font-size:3rem;margin-bottom:1rem;">📬</div>
          <h3 style="margin:0 0 .5rem;color:#1e293b;">Registration Submitted</h3>
          <p style="color:#64748b;font-size:.9rem;margin:0 0 1rem;">
            Your account request as <strong>Teacher</strong> has been sent to the school admin for approval.
            You will receive your login credentials via email at <strong>${email}</strong>.
          </p>
          <p style="color:#64748b;font-size:.85rem;margin:0;">
            For urgent access, contact the school office directly.
          </p>
        </div>
      `;
    }
  }, 900);
}

/* ─────────────────────────────────────────
   PASSWORD STRENGTH METER
───────────────────────────────────────── */
function checkPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8)        score++;
  if (/[A-Z]/.test(password))      score++;
  if (/[0-9]/.test(password))      score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const bar = document.getElementById('strength-bar');
  if (!bar) return;
  bar.className = 'password-strength-bar';
  if (!password) { bar.style.width = '0'; return; }

  const levels = ['', 'strength-weak', 'strength-fair', 'strength-good', 'strength-strong'];
  bar.classList.add(levels[score] || 'strength-weak');
}

/* ─────────────────────────────────────────
   PASSWORD VISIBILITY TOGGLE
───────────────────────────────────────── */
function initPasswordToggles() {
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.password-wrapper')
        ?.querySelector('input[type="password"], input[type="text"]');
      if (!input) return;
      const hidden = input.type === 'password';
      input.type   = hidden ? 'text' : 'password';
      btn.textContent = hidden ? '🙈' : '👁';
    });
  });
}

/* ─────────────────────────────────────────
   TAB SWITCHING
───────────────────────────────────────── */
function switchView(view) {
  const loginView  = document.getElementById('login-view');
  const signupView = document.getElementById('signup-view');
  const title      = document.getElementById('auth-title');
  const subtitle   = document.getElementById('auth-subtitle');

  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.view === view);
  });

  if (view === 'login') {
    loginView?.classList.add('active');
    signupView?.classList.remove('active');
    if (title)    title.textContent    = 'Welcome Back';
    if (subtitle) subtitle.textContent = 'Sign in to your school portal';
  } else {
    signupView?.classList.add('active');
    loginView?.classList.remove('active');
    if (title)    title.textContent    = 'Create Account';
    if (subtitle) subtitle.textContent = 'Join the Sacred Heart College portal';
  }
}

/* ─────────────────────────────────────────
   SSO PLACEHOLDER HANDLERS
───────────────────────────────────────── */
function handleGoogleSSO() {
  alert('Google SSO is not yet configured.\nPlease use your username and password.');
}
function handleMicrosoftSSO() {
  alert('Microsoft SSO is not yet configured.\nPlease use your username and password.');
}

/* ─────────────────────────────────────────
   ROLE HINT
───────────────────────────────────────── */
function showRoleHint(role) {
  const input = document.getElementById('login-username');
  if (!input) return;
  const hints = {
    admin:   'e.g. admin',
    teacher: 'e.g. enwosu or ngeze',
    parent:  'e.g. parent_shc001',
  };
  input.placeholder = hints[role] || 'Username or Email';
}

/* ─────────────────────────────────────────
   AUTO-REDIRECT IF ALREADY LOGGED IN
───────────────────────────────────────── */
function checkExistingSession() {
  const session = getSession();
  if (session) window.location.href = getDashboardUrl(session.role);
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  checkExistingSession();

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  document.querySelectorAll('[data-switch]').forEach(link => {
    link.addEventListener('click', e => { e.preventDefault(); switchView(link.dataset.switch); });
  });

  document.getElementById('login-form')  ?.addEventListener('submit', handleLogin);
  document.getElementById('signup-form') ?.addEventListener('submit', handleSignup);

  const signupPassword = document.getElementById('signup-password');
  signupPassword?.addEventListener('input', () => checkPasswordStrength(signupPassword.value));

  initPasswordToggles();

  document.getElementById('login-role')
    ?.addEventListener('change', e => showRoleHint(e.target.value));

  document.getElementById('google-btn')?.addEventListener('click', handleGoogleSSO);
  document.getElementById('ms-btn')    ?.addEventListener('click', handleMicrosoftSSO);

  document.querySelectorAll('#login-form input, #login-form select')
    .forEach(el => el.addEventListener('input', () => clearAllErrors('login')));
  document.querySelectorAll('#signup-form input, #signup-form select')
    .forEach(el => el.addEventListener('input', () => clearAllErrors('signup')));
});

/* ─────────────────────────────────────────
   EXPORTED SESSION & AUTH API
   Usage in script2.js / dashboard.html:

     const s = SHC_Auth.getSession();
     if (!s) { window.location.href = 'login.html'; return; }
     App.currentUser = { name: s.name, role: s.role, ... };

     // Gate any privileged action:
     if (!SHC_Auth.hasPrivilege('canEnterResults')) return showAccessDenied();
     if (!SHC_Auth.canActOnClass('SS 1', 'A'))     return showAccessDenied();
     if (!SHC_Auth.canAccessSection('settings'))   return showAccessDenied();
───────────────────────────────────────── */
window.SHC_Auth = {
  getSession,
  saveSession,
  clearSession,
  hasPrivilege,
  canAccessSection,
  canActOnClass,
  PRIVILEGES,
};