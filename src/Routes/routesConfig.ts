import React  from 'react';
import PageNotFound from '../pages/PageNotFound';
import PostId from '../pages/Posts/PostId';
//import EditProfile from '@/pages/Users/EditProfile';

const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Login = React.lazy(() => import('../pages/Auth/Login'));
const Register = React.lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = React.lazy(() => import('../pages/Auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('../pages/Auth/ResetPassword'));
const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'));
const AllPosts = React.lazy(() => import('../pages/AllPosts'));
// const Post = React.lazy(() => import('../pages/Post'));
// const AllTags = React.lazy(() => import('../pages/AllTags'));
// const Tag = React.lazy(() => import('../pages/Tag'));
// const AllUsers = React.lazy(() => import('../pages/AllUsers'));
// const User = React.lazy(() => import('../pages/User'));
// const SearchResults = React.lazy(() => import('../pages/SearchResults'));
// const DashboardOverview = React.lazy(() => import('../pages/DashboardOverview'));
const Posts = React.lazy(() => import('../pages/Dashboard/Posts'));
// const DashboardComments = React.lazy(() => import('../pages/DashboardComments'));
const Analytics = React.lazy(() => import('../pages/Dashboard/Analytics'));
const Profile = React.lazy(() => import('../pages/Dashboard/Profile'));
const Settings = React.lazy(() => import('../pages/Dashboard/Settings'));
const CreateNewPost = React.lazy(() => import('../pages/Dashboard/CreateNewPost'));
// const DraftPosts = React.lazy(() => import('../pages/DraftPosts'));
// const PublishedPosts = React.lazy(() => import('../pages/PublishedPosts'));
// const ScheduledPosts = React.lazy(() => import('../pages/ScheduledPosts'));

const routesConfig = [
 { path: '/', exact: true, component: Home, protected: false },
 { path: '/about', component: About, protected: false },
 { path: '/contact', component: Contact, protected: false },
 { path: '/auth/login', component: Login, protected: false },
 { path: '/auth/register', component: Register, protected: false },
 { path: '/auth/forgot-password', component: ForgotPassword, protected: false },
 { path: '/auth/reset-password/:token', component: ResetPassword, protected: false },
 { path: '/dashboard', component: Dashboard, protected: true },
 { path: '/dashboard/posts', exact: true, component: Posts, protected: true },
 { path: '/dashboard/posts/create', component: CreateNewPost, protected: true },
 // { path: '/dashboard/posts/drafts', component: DraftPosts, protected: true },
 // { path: '/dashboard/posts/scheduled', component: ScheduledPosts, protected: true },
 // { path: '/dashboard/posts/published', component: PublishedPosts, protected: true },
 // { path: '/dashboard/comments', component: DashboardComments, protected: true },
 { path: '/dashboard/analytics', component: Analytics, protected: true },
 { path: '/dashboard/profile', component: Profile, protected: true },
 { path: '/dashboard/settings', component: Settings, protected: true },
 { path: '/posts/all', component: AllPosts, protected: false },
 { path: '/posts/:postId', component: PostId, protected: false },
 // { path: '/tags/all', component: AllTags, protected: false },
 // { path: '/tags/:tagId', component: Tag, protected: false },
 // { path: '/users/all', component: AllUsers, protected: false },
 // { path: '/users/:userId', component: User, protected: false },
 // { path: '/search', component: SearchResults, protected: false }
 { path: '*', component: PageNotFound, protected: false }
];

export default routesConfig;
