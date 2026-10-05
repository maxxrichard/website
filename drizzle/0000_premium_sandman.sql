CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`content_markdown` text DEFAULT '' NOT NULL,
	`cover_image` text,
	`tags` text,
	`external_url` text,
	`reading_minutes` integer,
	`published_at` text NOT NULL,
	`published` integer DEFAULT true NOT NULL,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE `education` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`degree` text NOT NULL,
	`institution` text NOT NULL,
	`location` text,
	`start_year` text,
	`end_year` text,
	`thesis` text,
	`thesis_url` text,
	`code_url` text,
	`coursework` text,
	`description` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `experience` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`role` text NOT NULL,
	`organization` text NOT NULL,
	`organization_url` text,
	`location` text,
	`start_date` text,
	`end_date` text,
	`description` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL,
	`read` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`title` text NOT NULL,
	`body_markdown` text DEFAULT '' NOT NULL,
	`category` text DEFAULT 'News' NOT NULL,
	`url` text,
	`published` integer DEFAULT true NOT NULL,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `press` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`outlet` text NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`video_url` text,
	`image` text,
	`url` text,
	`language` text,
	`published` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` integer PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`short_name` text,
	`job_title` text NOT NULL,
	`tagline` text,
	`avatar` text,
	`about_markdown` text DEFAULT '' NOT NULL,
	`email` text,
	`secondary_email` text,
	`phone` text,
	`location` text,
	`affiliation` text,
	`affiliation_url` text,
	`cv_url` text,
	`map_embed_url` text,
	`site_title` text,
	`site_description` text,
	`footer_text` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`category` text DEFAULT 'Research' NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`content_markdown` text DEFAULT '' NOT NULL,
	`image` text,
	`url` text,
	`code_url` text,
	`partners` text,
	`start_year` text,
	`end_year` text,
	`status` text DEFAULT 'Ongoing' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`published` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `publications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` integer NOT NULL,
	`authors` text NOT NULL,
	`title` text NOT NULL,
	`venue` text NOT NULL,
	`venue_short` text,
	`type` text DEFAULT 'Conference' NOT NULL,
	`paper_url` text,
	`pdf_url` text,
	`code_url` text,
	`doi` text,
	`abstract` text,
	`award` text,
	`bibtex` text,
	`status` text DEFAULT 'Published' NOT NULL,
	`highlight` integer DEFAULT false NOT NULL,
	`published` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `research_areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` text DEFAULT 'flask' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `social_links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`platform` text NOT NULL,
	`label` text NOT NULL,
	`url` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`visible` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `teaching` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`term` text NOT NULL,
	`course` text NOT NULL,
	`role` text DEFAULT 'Teaching Assistant' NOT NULL,
	`institution` text,
	`description` text,
	`url` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
