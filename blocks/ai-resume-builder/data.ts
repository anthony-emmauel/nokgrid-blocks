import type { IconName } from '@nokgridcore/ui/icon';
import type { ResumeSection } from './resume-sheet';

// Placeholder data for the AI resume builder block ("Draftwell"). Swap any of it.

export type Screen = 'dashboard' | 'sample-library' | 'job-search' | 'project-editor' | 'review' | 'settings';

export const app = { name: 'Draftwell', tagline: 'AI resume builder' };

export const user = {
	name: 'Sam Okafor',
	firstName: 'Sam',
	initials: 'SO',
	email: 'sam.okafor@example.com',
	plan: 'Free plan · 0 of 10 AI credits',
};

export interface NavItem {
	label: string;
	icon: IconName;
	/** Opens this screen. Pro items open the Upgrade modal instead. */
	screen?: Screen;
	pro?: boolean;
}

export const workspaceNav: NavItem[] = [
	{ label: 'My dashboard', icon: 'LayoutGrid', screen: 'dashboard' },
	{ label: 'AI resume agent', icon: 'Zap', pro: true },
	{ label: 'AI interview', icon: 'Play', pro: true },
	{ label: 'Job search', icon: 'Building2', screen: 'job-search' },
	{ label: 'Sample library', icon: 'FileText', screen: 'sample-library' },
	{ label: 'Review my resume', icon: 'FileCheck', screen: 'review' },
];

export const extrasNav: NavItem[] = [
	{ label: 'Browser extension', icon: 'Globe', pro: true },
	{ label: 'Connect MCP', icon: 'PlugZap', pro: true },
];

// Dashboard

export const stats: { title: string; detail: string; icon: IconName }[] = [
	{ title: '2 resumes', detail: '1 added this month', icon: 'FileText' },
	{ title: 'Score 58', detail: 'Up 6 since last review', icon: 'FileCheck' },
	{ title: '3 applications', detail: '2 sent this week', icon: 'Building2' },
	{ title: '0 of 10 AI credits', detail: 'Resets in 9 days', icon: 'Zap' },
];

export interface Tool {
	title: string;
	description: string;
	icon: IconName;
	action: string;
	screen?: Screen;
	pro?: boolean;
}

export const tools: Tool[] = [
	{ title: 'Resume builder', description: 'Start from scratch or a template', icon: 'FilePlus', action: 'Create', screen: 'project-editor' },
	{ title: 'AI resume agent', description: 'Let AI draft and tailor your resume', icon: 'Zap', action: 'Try it', pro: true },
	{ title: 'AI interview', description: 'Practise answers with instant feedback', icon: 'Play', action: 'Start', pro: true },
	{ title: 'Job search', description: 'Find roles and track applications', icon: 'Building2', action: 'Search', screen: 'job-search' },
	{ title: 'Sample library', description: 'Browse resumes by role and industry', icon: 'FileText', action: 'Browse', screen: 'sample-library' },
	{ title: 'Review my resume', description: 'Get a score and line-by-line fixes', icon: 'FileCheck', action: 'Review', screen: 'review' },
	{ title: 'Browser extension', description: 'Save jobs from any job board', icon: 'Globe', action: 'Install', pro: true },
	{ title: 'Connect MCP', description: 'Use Draftwell in your AI assistant', icon: 'PlugZap', action: 'Connect', pro: true },
];

export const recentResumes = [
	{ title: 'Sample resume 2026', detail: 'Edited 2 hours ago · Score 58' },
	{ title: 'Product designer — Halden Capital', detail: 'Edited yesterday · Tailored' },
	{ title: 'Cover letter — Tern Health', detail: 'Edited 3 days ago' },
];

export const resumeProgress = [
	{ section: 'Contact & summary', value: 100 },
	{ section: 'Experience', value: 80 },
	{ section: 'Projects', value: 40 },
	{ section: 'Skills', value: 20 },
];

// Sample library

export const sampleCategories = [
	'Pro',
	'Business',
	'Programming',
	'Engineering',
	'Marketing',
	'Design',
	'Student',
	'Medical',
	'Finance',
	'Education',
	'Legal',
	'Other',
];

export interface Sample {
	title: string;
	company: string;
	author: string;
	categories: string[];
	pro: boolean;
}

export const samples: Sample[] = [
	{ title: 'Project Manager', company: 'Lumen Bank', author: 'Jordan Avery', categories: ['Business', 'Finance'], pro: true },
	{ title: 'Graduate Program', company: 'Halcyon Studios', author: 'Jordan Avery', categories: ['Student', 'Design'], pro: true },
	{ title: 'Senior Project Manager', company: 'Northpeak Outdoor', author: 'Jordan Avery', categories: ['Business'], pro: true },
	{ title: 'Corporate Rotational Program', company: 'Orbitworks', author: 'Jordan Avery', categories: ['Student', 'Business'], pro: true },
	{ title: 'Policy Intern', company: 'Brightline Consulting', author: 'Jordan Avery', categories: ['Student', 'Legal'], pro: true },
	{ title: 'Senior Business Analyst', company: 'Meridian Partners', author: 'Jordan Avery', categories: ['Business', 'Finance'], pro: true },
	{ title: 'IT Security Architect', company: 'Ferrovia State University', author: 'Jordan Avery', categories: ['Engineering', 'Education'], pro: true },
	{ title: 'Data Engineer', company: 'Kestrel Labs', author: 'Jordan Avery', categories: ['Engineering', 'Programming'], pro: true },
	{ title: 'ERP Developer', company: 'Atlas Systems', author: 'Jordan Avery', categories: ['Programming'], pro: true },
	{ title: 'Software Developer', company: 'Juniper Cloud', author: 'Jordan Avery', categories: ['Programming', 'Engineering'], pro: true },
	{ title: 'Creative Producer', company: 'Voltaic Motors', author: 'Jordan Avery', categories: ['Marketing', 'Design'], pro: true },
	{ title: 'Senior Data Analyst', company: 'Pixelforge Games', author: 'Jordan Avery', categories: ['Programming', 'Other'], pro: true },
];

// Job search

export type JobStatus = 'saved' | 'matched' | 'applied' | 'interviewing' | 'rejected';

export const jobTabs: { label: string; status?: JobStatus; count?: number }[] = [
	{ label: 'All jobs' },
	{ label: 'Saved', status: 'saved', count: 4 },
	{ label: 'Matched', status: 'matched', count: 12 },
	{ label: 'Applied', status: 'applied', count: 3 },
	{ label: 'Interviewing', status: 'interviewing', count: 1 },
	{ label: 'Rejected', status: 'rejected', count: 0 },
];

export const jobSearch = { title: 'Senior Product Designer', location: 'United States', total: 128 };

export interface Job {
	id: string;
	title: string;
	company: string;
	initials: string;
	location: string;
	type: string;
	posted: string;
	match: number;
	status: JobStatus[];
}

export const jobs: Job[] = [
	{ id: 'halden', title: 'Senior Product Designer', company: 'Halden Capital', initials: 'HC', location: 'United States', type: 'Full-time', posted: '3 days ago', match: 86, status: ['saved', 'matched'] },
	{ id: 'ashford', title: 'Senior Product Designer', company: 'City of Ashford', initials: 'CA', location: 'United States', type: 'Full-time', posted: '2 days ago', match: 74, status: ['matched'] },
	{ id: 'tern', title: 'Senior Product Designer', company: 'Tern Health', initials: 'TH', location: 'United States', type: 'Full-time', posted: '1 day ago', match: 81, status: ['saved', 'applied'] },
	{ id: 'corvid', title: 'Senior Product Designer', company: 'Corvid Systems', initials: 'CS', location: 'United States', type: 'Contract', posted: '5 days ago', match: 69, status: ['matched'] },
	{ id: 'radiant', title: 'Senior Product Designer', company: 'Radiant Maps', initials: 'RM', location: 'United States', type: 'Full-time', posted: '2 days ago', match: 77, status: ['saved', 'applied', 'interviewing'] },
	{ id: 'outfield', title: 'Senior Product Designer', company: 'Outfield', initials: 'OF', location: 'United States', type: 'Full-time', posted: '1 day ago', match: 72, status: ['matched'] },
	{ id: 'narwhal', title: 'Senior Product Designer', company: 'Narwhal Finance', initials: 'NF', location: 'United States', type: 'Full-time', posted: '1 day ago', match: 80, status: ['saved', 'applied'] },
	{ id: 'nimbus', title: 'Senior Product Designer', company: 'Nimbus Bank', initials: 'NB', location: 'United States', type: 'Full-time', posted: '5 days ago', match: 66, status: ['matched'] },
];

export const jobDetail = {
	about:
		'is looking for a Senior Product Designer to shape the tools our clients use to manage their portfolios. You will work with a small cross-functional team on financial dashboards, onboarding and automation features.',
	responsibilities: [
		'Partner with product and engineering to set direction and scope for your area.',
		'Design flows and prototypes for a web platform, from discovery through delivery.',
		'Grow the design system and component library with the rest of the design team.',
		'Use data and customer feedback to guide decisions and measure outcomes.',
		'Spot product gaps and bring forward fully formed concepts.',
	],
	requirements: [
		'5+ years designing complex web products.',
		'Strong command of accessibility and responsive design.',
		'Comfortable working in a design system built on tokens and slots.',
		'Clear writing and the ability to influence without authority.',
	],
};

// Project editor

export const editorDocument = 'Sample resume 2026';

export const editorSections = [
	'Contact',
	'Experience',
	'Project',
	'Education',
	'Coursework',
	'Involvement',
	'Awards',
	'Skills',
	'Summary',
	'Finish & preview',
	'Cover letter',
];

export const videoGuide = {
	title: 'How to write project bullets',
	detail: '2 min video guide',
	image: '/blocks/ai-resume-builder/video-guide.jpg',
};

export const editorScore = { value: 58, label: 'Your resume score', verdict: 'Needs improvement' };

export const projects = [
	{
		id: 'survey',
		title: 'Marketing research: student satisfaction survey',
		organization: '',
		start: 'Aug 2026',
		end: 'Dec 2026',
		url: '',
		bullets:
			'• Wrote and tested survey questions; used sampling for data collection and SPSS for analysis.\n• Presented findings to the class with three recommendations to raise satisfaction.',
	},
	{ id: 'consulting', title: 'University small business consulting', organization: '', start: '', end: '', url: '', bullets: '' },
	{ id: 'scenarios', title: 'Marketing scenarios team project', organization: '', start: '', end: '', url: '', bullets: '' },
];

export type CheckState = 'failed' | 'locked' | 'warning' | 'passed';

export const projectChecks: { label: string; state: CheckState }[] = [
	{ label: 'Punctuated bullet points', state: 'failed' },
	{ label: 'Personal pronouns', state: 'locked' },
	{ label: 'Buzzwords', state: 'locked' },
	{ label: 'Passive voice', state: 'locked' },
	{ label: 'Filler words', state: 'locked' },
	{ label: 'Dates are missing', state: 'failed' },
	{ label: 'Number of bullet points', state: 'warning' },
	{ label: 'Quantified bullet points', state: 'warning' },
	{ label: '3 best practices applied', state: 'passed' },
];

export const bulletLimit = 200;

// Review my resume

export const review = {
	document: 'Sample resume 2026 · reviewed 2 minutes ago',
	score: 72,
	verdict: 'Good, with room to grow',
	next: 'Fix the 5 issues below to reach about 85.',
	subScores: [
		{ label: 'Content', value: 68 },
		{ label: 'Format', value: 80 },
		{ label: 'ATS', value: 74 },
	],
};

export const reviewSheet: { name: string; subtitle: string; sections: ResumeSection[] } = {
	name: 'Sam Okafor',
	subtitle: 'Product Designer · Lagos · sam.okafor@example.com',
	sections: [
		{ title: 'Summary', lines: 3, flagged: [2] },
		{ title: 'Experience', lines: 9, flagged: [2, 7] },
		{ title: 'Projects', lines: 3 },
		{ title: 'Education', lines: 2 },
		{ title: 'Skills', lines: 2 },
	],
};

export type IssueKind = 'error' | 'warning' | 'info' | 'success';
export type IssueGroup = 'Content' | 'Format' | 'ATS';

export const issues: { title: string; detail: string; kind: IssueKind; group: IssueGroup; fixable: boolean }[] = [
	{ title: 'Dates are missing', detail: 'Two roles have no start or end date. Recruiters skip resumes with gaps they can’t read.', kind: 'error', group: 'Content', fixable: true },
	{ title: 'Bullets lack numbers', detail: '6 of 14 bullets have no result. Add a number, like “cut onboarding time by 30%”.', kind: 'warning', group: 'Content', fixable: true },
	{ title: 'Passive voice', detail: '3 bullets start with “Was responsible for”. Lead with a verb instead.', kind: 'warning', group: 'Content', fixable: true },
	{ title: 'Add a skills section near the top', detail: 'ATS tools look for skills early. Move it above Education.', kind: 'info', group: 'ATS', fixable: true },
	{ title: 'Contact details are complete', detail: 'Email, location and portfolio link are all present.', kind: 'success', group: 'Format', fixable: false },
];

// Settings

export const settingsTabs = ['Account', 'Notifications', 'Billing'];
export const languages = ['English (US)', 'English (UK)', 'Français', 'Español', 'Português'];
export const currencies = ['$ USD', '€ EUR', '£ GBP'];

// Upgrade to Pro

export const upgrade = {
	title: 'Upgrade to Pro',
	subtitle: 'Unlock every tool and write without limits.',
	features: [
		'Unlimited AI writer',
		'Unlimited resumes, cover letters and resignation letters',
		'Keyword targeting and content analysis',
		'One free resume review every month',
		'Every other Pro feature',
	],
	plans: [
		{ id: 'monthly', label: 'Monthly', price: '$29/mo' },
		{ id: 'quarterly', label: 'Quarterly', price: '$19/mo', badge: 'Most popular · save 34%' },
		{ id: 'lifetime', label: 'Lifetime', price: '$149 once' },
	],
	teams: { prompt: 'Recruiter, educator or career coach?', link: 'See Draftwell for Teams' },
};
