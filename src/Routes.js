import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import Members from './components/Members'
import Member from './components/Member'
import Roles from './components/Roles'
import Role from './components/Role'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
            breadCrumbs: [
                {
                    text: 'Home',
                    active: true
                }
            ]
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false,
            breadCrumbs: [
                {
                    text: 'Login',
                    active: true
                }
            ]
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
        meta: {
            requiresAuth: false,
            breadCrumbs: [
                {
                    text: 'Logout',
                    active: true
                }
            ]
        }
    },
    {
        path: '/members',
        name: 'Members',
        component: Members,
        meta: {
            requiresAuth: false,
            breadCrumbs: [
                {
                    text: 'Members',
                    active: true
                }
            ]
        }
    },
    {
        path: '/members/:MemberId',
        name: 'Member',
        component: Member,
        meta: {
            requiresAuth: false,
            breadCrumbs: [
                {
                    text: 'Members',
                    to: { name: 'Members' }
                },
                {
                    text: 'Member',
                    active: true
                }
            ]
        }
    },
    {
        path: '/roles',
        name: 'Roles',
        component: Roles,
        meta: {
            requiresAuth: false,
            breadCrumbs: [
                {
                    text: 'Roles',
                    active: true
                }
            ]
        }
    },
    {
        path: '/roles/:RoleId',
        name: 'Role',
        component: Role,
        meta: {
            requiresAuth: false,
            breadCrumbs: [
                {
                    text: 'Roles',
                    to: { name: 'Roles' }
                },
                {
                    text: 'Role',
                    active: true
                }
            ]
        }
    }
];

export default routes