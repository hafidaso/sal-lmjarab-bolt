// RBAC Test Suite
// This file contains tests to verify the role-based access control implementation

import { 
  PERMISSIONS, 
  PROTECTED_ROUTES, 
  RBAC_UTILS, 
  ROLE_DISPLAY_NAMES, 
  ROLE_DESCRIPTIONS,
  UserRole 
} from './rbac';

// Test RBAC Configuration
export const testRBACConfiguration = () => {
  console.log('🧪 Testing RBAC Configuration...');
  
  const results = {
    permissions: testPermissions(),
    routes: testProtectedRoutes(),
    utilities: testRBACUtilities(),
    roleDefinitions: testRoleDefinitions(),
    overall: true
  };

  // Check overall results
  results.overall = Object.values(results).every(result => 
    typeof result === 'boolean' ? result : result.passed
  );

  return results;
};

// Test permissions configuration
const testPermissions = () => {
  console.log('  📋 Testing Permissions...');
  
  const tests = {
    patientPermissions: PERMISSIONS.filter(p => p.roles.includes('patient')).length >= 5,
    providerPermissions: PERMISSIONS.filter(p => p.roles.includes('provider')).length >= 5,
    adminPermissions: PERMISSIONS.filter(p => p.roles.includes('admin')).length >= 5,
    uniqueIds: PERMISSIONS.length === new Set(PERMISSIONS.map(p => p.id)).size,
    validRoles: PERMISSIONS.every(p => p.roles.every(role => ['patient', 'provider', 'admin'].includes(role)))
  };

  const passed = Object.values(tests).every(test => test);
  
  console.log(`    ✅ Patient permissions: ${tests.patientPermissions}`);
  console.log(`    ✅ Provider permissions: ${tests.providerPermissions}`);
  console.log(`    ✅ Admin permissions: ${tests.adminPermissions}`);
  console.log(`    ✅ Unique permission IDs: ${tests.uniqueIds}`);
  console.log(`    ✅ Valid role assignments: ${tests.validRoles}`);

  return { passed, tests };
};

// Test protected routes configuration
const testProtectedRoutes = () => {
  console.log('  🛣️  Testing Protected Routes...');
  
  const tests = {
    patientRoutes: PROTECTED_ROUTES.filter(r => r.allowedRoles.includes('patient')).length >= 3,
    providerRoutes: PROTECTED_ROUTES.filter(r => r.allowedRoles.includes('provider')).length >= 3,
    adminRoutes: PROTECTED_ROUTES.filter(r => r.allowedRoles.includes('admin')).length >= 3,
    uniquePaths: PROTECTED_ROUTES.length === new Set(PROTECTED_ROUTES.map(r => r.path)).size,
    validRoles: PROTECTED_ROUTES.every(r => r.allowedRoles.every(role => ['patient', 'provider', 'admin'].includes(role)))
  };

  const passed = Object.values(tests).every(test => test);
  
  console.log(`    ✅ Patient routes: ${tests.patientRoutes}`);
  console.log(`    ✅ Provider routes: ${tests.providerRoutes}`);
  console.log(`    ✅ Admin routes: ${tests.adminRoutes}`);
  console.log(`    ✅ Unique route paths: ${tests.uniquePaths}`);
  console.log(`    ✅ Valid role assignments: ${tests.validRoles}`);

  return { passed, tests };
};

// Test RBAC utilities
const testRBACUtilities = () => {
  console.log('  🔧 Testing RBAC Utilities...');
  
  const tests = {
    hasPermission: RBAC_UTILS.hasPermission('admin', 'admin:manage_users') === true,
    getRolePermissions: RBAC_UTILS.getRolePermissions('patient').length >= 5,
    canAccessRoute: RBAC_UTILS.canAccessRoute('patient', '/patient/dashboard') === true,
    cannotAccessRoute: RBAC_UTILS.canAccessRoute('patient', '/admin/dashboard') === false,
    getAccessibleRoutes: RBAC_UTILS.getAccessibleRoutes('provider').length >= 3,
    isValidRole: RBAC_UTILS.isValidRole('patient') === true && RBAC_UTILS.isValidRole('invalid') === false
  };

  const passed = Object.values(tests).every(test => test);
  
  console.log(`    ✅ Permission checking: ${tests.hasPermission}`);
  console.log(`    ✅ Role permissions retrieval: ${tests.getRolePermissions}`);
  console.log(`    ✅ Route access validation: ${tests.canAccessRoute}`);
  console.log(`    ✅ Route access denial: ${tests.cannotAccessRoute}`);
  console.log(`    ✅ Accessible routes retrieval: ${tests.getAccessibleRoutes}`);
  console.log(`    ✅ Role validation: ${tests.isValidRole}`);

  return { passed, tests };
};

// Test role definitions
const testRoleDefinitions = () => {
  console.log('  👥 Testing Role Definitions...');
  
  const tests = {
    displayNames: Object.keys(ROLE_DISPLAY_NAMES).length === 3,
    descriptions: Object.keys(ROLE_DESCRIPTIONS).length === 3,
    validDisplayNames: Object.values(ROLE_DISPLAY_NAMES).every(name => typeof name === 'string' && name.length > 0),
    validDescriptions: Object.values(ROLE_DESCRIPTIONS).every(desc => typeof desc === 'string' && desc.length > 50)
  };

  const passed = Object.values(tests).every(test => test);
  
  console.log(`    ✅ Display names count: ${tests.displayNames}`);
  console.log(`    ✅ Descriptions count: ${tests.descriptions}`);
  console.log(`    ✅ Valid display names: ${tests.validDisplayNames}`);
  console.log(`    ✅ Valid descriptions: ${tests.validDescriptions}`);

  return { passed, tests };
};

// Test specific role access scenarios
export const testRoleAccessScenarios = () => {
  console.log('🎭 Testing Role Access Scenarios...');
  
  const scenarios = [
    {
      name: 'Patient accessing patient dashboard',
      userRole: 'patient' as UserRole,
      route: '/patient/dashboard',
      expected: true
    },
    {
      name: 'Patient accessing admin dashboard',
      userRole: 'patient' as UserRole,
      route: '/admin/dashboard',
      expected: false
    },
    {
      name: 'Provider accessing provider profile',
      userRole: 'provider' as UserRole,
      route: '/provider/profile',
      expected: true
    },
    {
      name: 'Provider accessing patient dashboard',
      userRole: 'provider' as UserRole,
      route: '/patient/dashboard',
      expected: false
    },
    {
      name: 'Admin accessing admin moderation',
      userRole: 'admin' as UserRole,
      route: '/admin/moderation',
      expected: true
    },
    {
      name: 'Admin accessing provider dashboard',
      userRole: 'admin' as UserRole,
      route: '/provider/dashboard',
      expected: false
    }
  ];

  const results = scenarios.map(scenario => {
    const actual = RBAC_UTILS.canAccessRoute(scenario.userRole, scenario.route);
    const passed = actual === scenario.expected;
    
    console.log(`    ${passed ? '✅' : '❌'} ${scenario.name}: ${passed ? 'PASS' : 'FAIL'}`);
    
    return {
      ...scenario,
      actual,
      passed
    };
  });

  const allPassed = results.every(r => r.passed);
  console.log(`  Overall: ${allPassed ? '✅ ALL PASSED' : '❌ SOME FAILED'}`);

  return { passed: allPassed, scenarios: results };
};

// Test permission inheritance
export const testPermissionInheritance = () => {
  console.log('🏗️  Testing Permission Inheritance...');
  
  const testCases = [
    {
      role: 'patient' as UserRole,
      permissions: ['patient:view_dashboard', 'patient:manage_appointments', 'patient:view_medical_records']
    },
    {
      role: 'provider' as UserRole,
      permissions: ['provider:view_dashboard', 'provider:manage_appointments', 'provider:manage_reviews']
    },
    {
      role: 'admin' as UserRole,
      permissions: ['admin:view_dashboard', 'admin:manage_users', 'admin:moderate_content']
    }
  ];

  const results = testCases.map(testCase => {
    const rolePermissions = RBAC_UTILS.getRolePermissions(testCase.role);
    const hasAllPermissions = testCase.permissions.every(permissionId => 
      rolePermissions.some(p => p.id === permissionId)
    );
    
    console.log(`    ${hasAllPermissions ? '✅' : '❌'} ${testCase.role}: ${hasAllPermissions ? 'HAS ALL PERMISSIONS' : 'MISSING PERMISSIONS'}`);
    
    return {
      role: testCase.role,
      expectedPermissions: testCase.permissions,
      actualPermissions: rolePermissions.map(p => p.id),
      passed: hasAllPermissions
    };
  });

  const allPassed = results.every(r => r.passed);
  console.log(`  Overall: ${allPassed ? '✅ ALL PASSED' : '❌ SOME FAILED'}`);

  return { passed: allPassed, results };
};

// Run all RBAC tests
export const runAllRBACTests = () => {
  console.log('🚀 Running Complete RBAC Test Suite...\n');
  
  const results = {
    configuration: testRBACConfiguration(),
    scenarios: testRoleAccessScenarios(),
    inheritance: testPermissionInheritance()
  };

  const overallPassed = results.configuration.overall && 
                       results.scenarios.passed && 
                       results.inheritance.passed;

  console.log('\n📊 RBAC Test Results Summary:');
  console.log(`  Configuration Tests: ${results.configuration.overall ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`  Access Scenarios: ${results.scenarios.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`  Permission Inheritance: ${results.inheritance.passed ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`  Overall Result: ${overallPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

  return {
    passed: overallPassed,
    results
  };
}; 