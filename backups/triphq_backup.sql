--
-- PostgreSQL database dump
--

-- \restrict E7jmdExb23vUF7uJCceYMO2IjQFKXUqVjWJK9tSB48KUnZFdUeyqjhQ5Zuvby9v

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
-- SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.user_onboarding DROP CONSTRAINT IF EXISTS user_onboarding_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.trip_members DROP CONSTRAINT IF EXISTS trip_members_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.trip_members DROP CONSTRAINT IF EXISTS trip_members_group_id_fkey;
ALTER TABLE IF EXISTS ONLY public.trip_groups DROP CONSTRAINT IF EXISTS trip_groups_destination_id_fkey;
ALTER TABLE IF EXISTS ONLY public.trip_groups DROP CONSTRAINT IF EXISTS trip_groups_created_by_fkey;
ALTER TABLE IF EXISTS ONLY public.trip_group_invites DROP CONSTRAINT IF EXISTS trip_group_invites_invited_by_fkey;
ALTER TABLE IF EXISTS ONLY public.trip_group_invites DROP CONSTRAINT IF EXISTS trip_group_invites_group_id_fkey;
ALTER TABLE IF EXISTS ONLY public.itinerary_days DROP CONSTRAINT IF EXISTS itinerary_days_group_id_fkey;
ALTER TABLE IF EXISTS ONLY public.itinerary_days DROP CONSTRAINT IF EXISTS itinerary_days_created_by_fkey;
ALTER TABLE IF EXISTS ONLY public.itinerary_activities DROP CONSTRAINT IF EXISTS itinerary_activities_day_id_fkey;
ALTER TABLE IF EXISTS ONLY public.itinerary_activities DROP CONSTRAINT IF EXISTS itinerary_activities_created_by_fkey;
ALTER TABLE IF EXISTS ONLY public.expenses DROP CONSTRAINT IF EXISTS expenses_paid_by_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expenses DROP CONSTRAINT IF EXISTS expenses_group_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expenses DROP CONSTRAINT IF EXISTS expenses_created_by_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_shares DROP CONSTRAINT IF EXISTS expense_shares_paid_by_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_shares DROP CONSTRAINT IF EXISTS expense_shares_member_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_shares DROP CONSTRAINT IF EXISTS expense_shares_expense_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_settlements DROP CONSTRAINT IF EXISTS expense_settlements_receiver_member_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_settlements DROP CONSTRAINT IF EXISTS expense_settlements_payer_member_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_settlements DROP CONSTRAINT IF EXISTS expense_settlements_group_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_activities DROP CONSTRAINT IF EXISTS expense_activities_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.expense_activities DROP CONSTRAINT IF EXISTS expense_activities_expense_id_fkey;
ALTER TABLE IF EXISTS ONLY public.destinations DROP CONSTRAINT IF EXISTS destinations_country_code_fkey;
ALTER TABLE IF EXISTS ONLY public.checklist_items DROP CONSTRAINT IF EXISTS checklist_items_group_id_fkey;
ALTER TABLE IF EXISTS ONLY public.checklist_items DROP CONSTRAINT IF EXISTS checklist_items_assigned_to_fkey;
ALTER TABLE IF EXISTS ONLY public.checklist_items DROP CONSTRAINT IF EXISTS checklist_items_assigned_by_fkey;
ALTER TABLE IF EXISTS ONLY public.checklist_activity DROP CONSTRAINT IF EXISTS checklist_activity_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.checklist_activity DROP CONSTRAINT IF EXISTS checklist_activity_item_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_sender_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_conversation_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chat_message_attachments DROP CONSTRAINT IF EXISTS chat_message_attachments_message_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chat_conversations DROP CONSTRAINT IF EXISTS chat_conversations_group_id_fkey;
ALTER TABLE IF EXISTS ONLY public.calls DROP CONSTRAINT IF EXISTS calls_trip_group_id_fkey;
ALTER TABLE IF EXISTS ONLY public.calls DROP CONSTRAINT IF EXISTS calls_caller_id_fkey;
ALTER TABLE IF EXISTS ONLY public.call_participants DROP CONSTRAINT IF EXISTS call_participants_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.call_participants DROP CONSTRAINT IF EXISTS call_participants_call_id_fkey;
DROP INDEX IF EXISTS public.trip_members_user_id_idx;
DROP INDEX IF EXISTS public.trip_members_group_id_user_id_key;
DROP INDEX IF EXISTS public.trip_members_group_id_idx;
DROP INDEX IF EXISTS public.trip_groups_status_code_idx;
DROP INDEX IF EXISTS public.trip_groups_invite_code_key;
DROP INDEX IF EXISTS public.trip_groups_destination_id_idx;
DROP INDEX IF EXISTS public.trip_groups_created_by_idx;
DROP INDEX IF EXISTS public.trip_group_invites_invited_user_email_idx;
DROP INDEX IF EXISTS public.trip_group_invites_group_id_idx;
DROP INDEX IF EXISTS public.itinerary_days_group_id_idx;
DROP INDEX IF EXISTS public.itinerary_days_group_id_date_key;
DROP INDEX IF EXISTS public.itinerary_activities_day_id_idx;
DROP INDEX IF EXISTS public.expenses_paid_by_id_idx;
DROP INDEX IF EXISTS public.expenses_group_id_idx;
DROP INDEX IF EXISTS public.expenses_expense_date_idx;
DROP INDEX IF EXISTS public.expenses_category_code_idx;
DROP INDEX IF EXISTS public.expense_shares_member_id_idx;
DROP INDEX IF EXISTS public.expense_shares_expense_id_member_id_key;
DROP INDEX IF EXISTS public.expense_settlements_receiver_member_id_idx;
DROP INDEX IF EXISTS public.expense_settlements_payer_member_id_idx;
DROP INDEX IF EXISTS public.expense_settlements_group_id_idx;
DROP INDEX IF EXISTS public.expense_activities_expense_id_idx;
DROP INDEX IF EXISTS public.destinations_state_idx;
DROP INDEX IF EXISTS public.destinations_place_id_key;
DROP INDEX IF EXISTS public.destinations_place_id_idx;
DROP INDEX IF EXISTS public.destinations_country_code_idx;
DROP INDEX IF EXISTS public.checklist_items_group_id_idx;
DROP INDEX IF EXISTS public.checklist_items_category_code_idx;
DROP INDEX IF EXISTS public.checklist_items_assigned_to_idx;
DROP INDEX IF EXISTS public.checklist_activity_item_id_idx;
DROP INDEX IF EXISTS public.chat_messages_sender_id_idx;
DROP INDEX IF EXISTS public.chat_messages_conversation_id_sender_id_status_idx;
DROP INDEX IF EXISTS public.chat_messages_conversation_id_created_at_idx;
DROP INDEX IF EXISTS public.chat_message_attachments_storage_key_idx;
DROP INDEX IF EXISTS public.chat_message_attachments_message_id_key;
DROP INDEX IF EXISTS public.chat_conversations_group_id_key;
DROP INDEX IF EXISTS public.chat_conversations_group_id_idx;
DROP INDEX IF EXISTS public.calls_trip_group_id_status_idx;
DROP INDEX IF EXISTS public.calls_caller_id_idx;
DROP INDEX IF EXISTS public.call_participants_user_id_status_idx;
DROP INDEX IF EXISTS public.call_participants_call_id_user_id_key;
DROP INDEX IF EXISTS public."User_phone_key";
DROP INDEX IF EXISTS public."User_email_key";
DROP INDEX IF EXISTS public."User_email_idx";
ALTER TABLE IF EXISTS ONLY public.user_onboarding DROP CONSTRAINT IF EXISTS user_onboarding_pkey;
ALTER TABLE IF EXISTS ONLY public.trip_members DROP CONSTRAINT IF EXISTS trip_members_pkey;
ALTER TABLE IF EXISTS ONLY public.trip_groups DROP CONSTRAINT IF EXISTS trip_groups_pkey;
ALTER TABLE IF EXISTS ONLY public.trip_group_invites DROP CONSTRAINT IF EXISTS trip_group_invites_pkey;
ALTER TABLE IF EXISTS ONLY public.itinerary_days DROP CONSTRAINT IF EXISTS itinerary_days_pkey;
ALTER TABLE IF EXISTS ONLY public.itinerary_activities DROP CONSTRAINT IF EXISTS itinerary_activities_pkey;
ALTER TABLE IF EXISTS ONLY public.expenses DROP CONSTRAINT IF EXISTS expenses_pkey;
ALTER TABLE IF EXISTS ONLY public.expense_shares DROP CONSTRAINT IF EXISTS expense_shares_pkey;
ALTER TABLE IF EXISTS ONLY public.expense_settlements DROP CONSTRAINT IF EXISTS expense_settlements_pkey;
ALTER TABLE IF EXISTS ONLY public.expense_activities DROP CONSTRAINT IF EXISTS expense_activities_pkey;
ALTER TABLE IF EXISTS ONLY public.destinations DROP CONSTRAINT IF EXISTS destinations_pkey;
ALTER TABLE IF EXISTS ONLY public.countries DROP CONSTRAINT IF EXISTS countries_pkey;
ALTER TABLE IF EXISTS ONLY public.checklist_items DROP CONSTRAINT IF EXISTS checklist_items_pkey;
ALTER TABLE IF EXISTS ONLY public.checklist_activity DROP CONSTRAINT IF EXISTS checklist_activity_pkey;
ALTER TABLE IF EXISTS ONLY public.chat_messages DROP CONSTRAINT IF EXISTS chat_messages_pkey;
ALTER TABLE IF EXISTS ONLY public.chat_message_attachments DROP CONSTRAINT IF EXISTS chat_message_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.chat_conversations DROP CONSTRAINT IF EXISTS chat_conversations_pkey;
ALTER TABLE IF EXISTS ONLY public.calls DROP CONSTRAINT IF EXISTS calls_pkey;
ALTER TABLE IF EXISTS ONLY public.call_participants DROP CONSTRAINT IF EXISTS call_participants_pkey;
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
DROP TABLE IF EXISTS public.user_onboarding;
DROP TABLE IF EXISTS public.trip_members;
DROP TABLE IF EXISTS public.trip_groups;
DROP TABLE IF EXISTS public.trip_group_invites;
DROP TABLE IF EXISTS public.itinerary_days;
DROP TABLE IF EXISTS public.itinerary_activities;
DROP TABLE IF EXISTS public.expenses;
DROP TABLE IF EXISTS public.expense_shares;
DROP TABLE IF EXISTS public.expense_settlements;
DROP TABLE IF EXISTS public.expense_activities;
DROP TABLE IF EXISTS public.destinations;
DROP TABLE IF EXISTS public.countries;
DROP TABLE IF EXISTS public.checklist_items;
DROP TABLE IF EXISTS public.checklist_activity;
DROP TABLE IF EXISTS public.chat_messages;
DROP TABLE IF EXISTS public.chat_message_attachments;
DROP TABLE IF EXISTS public.chat_conversations;
DROP TABLE IF EXISTS public.calls;
DROP TABLE IF EXISTS public.call_participants;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."User";
DROP TYPE IF EXISTS public."TripMemberRole";
DROP TYPE IF EXISTS public."TripInviteStatus";
DROP TYPE IF EXISTS public."MessageStatus";
DROP TYPE IF EXISTS public."ExpenseSplitMethod";
DROP TYPE IF EXISTS public."ExpenseCategory";
DROP TYPE IF EXISTS public."ExpenseActivityType";
DROP TYPE IF EXISTS public."ChecklistPriority";
DROP TYPE IF EXISTS public."ChecklistCategory";
DROP TYPE IF EXISTS public."ChecklistActivityType";
DROP TYPE IF EXISTS public."ChatMessageType";
DROP TYPE IF EXISTS public."CallStatus";
DROP TYPE IF EXISTS public."CallParticipantStatus";
DROP TYPE IF EXISTS public."CallMediaType";
DROP TYPE IF EXISTS public."ActivityCategory";
DROP TYPE IF EXISTS public."AccountStatus";
--
-- Name: AccountStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AccountStatus" AS ENUM (
    'ACTIVE',
    'SUSPENDED',
    'BANNED',
    'DEACTIVATED'
);


ALTER TYPE public."AccountStatus" OWNER TO postgres;

--
-- Name: ActivityCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ActivityCategory" AS ENUM (
    'ACCOMMODATION',
    'ACTIVITY',
    'FOOD',
    'OTHER',
    'SIGHTSEEING',
    'TRANSPORT'
);


ALTER TYPE public."ActivityCategory" OWNER TO postgres;

--
-- Name: CallMediaType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CallMediaType" AS ENUM (
    'AUDIO',
    'VIDEO'
);


ALTER TYPE public."CallMediaType" OWNER TO postgres;

--
-- Name: CallParticipantStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CallParticipantStatus" AS ENUM (
    'INVITED',
    'JOINED',
    'DECLINED',
    'LEFT',
    'MISSED'
);


ALTER TYPE public."CallParticipantStatus" OWNER TO postgres;

--
-- Name: CallStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CallStatus" AS ENUM (
    'RINGING',
    'ACTIVE',
    'ENDED',
    'CANCELLED'
);


ALTER TYPE public."CallStatus" OWNER TO postgres;

--
-- Name: ChatMessageType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ChatMessageType" AS ENUM (
    'TEXT',
    'IMAGE'
);


ALTER TYPE public."ChatMessageType" OWNER TO postgres;

--
-- Name: ChecklistActivityType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ChecklistActivityType" AS ENUM (
    'ASSIGNED',
    'COMPLETED',
    'CREATED',
    'REMOVED',
    'UPDATED'
);


ALTER TYPE public."ChecklistActivityType" OWNER TO postgres;

--
-- Name: ChecklistCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ChecklistCategory" AS ENUM (
    'CLOTHING',
    'DOCUMENTS',
    'ELECTRONICS',
    'ESSENTIALS',
    'TOILETRIES',
    'OTHER'
);


ALTER TYPE public."ChecklistCategory" OWNER TO postgres;

--
-- Name: ChecklistPriority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ChecklistPriority" AS ENUM (
    'HIGH',
    'LOW',
    'MEDIUM'
);


ALTER TYPE public."ChecklistPriority" OWNER TO postgres;

--
-- Name: ExpenseActivityType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ExpenseActivityType" AS ENUM (
    'CREATED',
    'DELETED',
    'SETTLED',
    'UNSETTLED',
    'UPDATED'
);


ALTER TYPE public."ExpenseActivityType" OWNER TO postgres;

--
-- Name: ExpenseCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ExpenseCategory" AS ENUM (
    'ACCOMMODATION',
    'ACTIVITIES',
    'ENTERTAINMENT',
    'FOOD',
    'MEDICAL',
    'OTHERS',
    'SHOPPING',
    'TICKETS',
    'TRANSPORT'
);


ALTER TYPE public."ExpenseCategory" OWNER TO postgres;

--
-- Name: ExpenseSplitMethod; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ExpenseSplitMethod" AS ENUM (
    'CUSTOM',
    'EQUAL',
    'PERCENTAGE',
    'SHARES'
);


ALTER TYPE public."ExpenseSplitMethod" OWNER TO postgres;

--
-- Name: MessageStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."MessageStatus" AS ENUM (
    'SENT',
    'DELIVERED',
    'READ'
);


ALTER TYPE public."MessageStatus" OWNER TO postgres;

--
-- Name: TripInviteStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TripInviteStatus" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'EXPIRED',
    'CANCELLED'
);


ALTER TYPE public."TripInviteStatus" OWNER TO postgres;

--
-- Name: TripMemberRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TripMemberRole" AS ENUM (
    'ADMIN',
    'MEMBER'
);


ALTER TYPE public."TripMemberRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id uuid NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(20),
    password_hash character varying(255),
    avatar_url character varying(500),
    is_email_verified boolean DEFAULT false NOT NULL,
    email_verified_at timestamp(6) with time zone,
    account_status_code public."AccountStatus" DEFAULT 'ACTIVE'::public."AccountStatus" NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: call_participants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.call_participants (
    id uuid NOT NULL,
    call_id uuid NOT NULL,
    user_id uuid NOT NULL,
    status public."CallParticipantStatus" DEFAULT 'INVITED'::public."CallParticipantStatus" NOT NULL,
    joined_at timestamp(6) with time zone,
    left_at timestamp(6) with time zone
);


ALTER TABLE public.call_participants OWNER TO postgres;

--
-- Name: calls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calls (
    id uuid NOT NULL,
    "mediaType" public."CallMediaType" NOT NULL,
    status public."CallStatus" DEFAULT 'RINGING'::public."CallStatus" NOT NULL,
    caller_id uuid NOT NULL,
    trip_group_id uuid NOT NULL,
    started_at timestamp(6) with time zone,
    ended_at timestamp(6) with time zone,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.calls OWNER TO postgres;

--
-- Name: chat_conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_conversations (
    id uuid NOT NULL,
    group_id uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.chat_conversations OWNER TO postgres;

--
-- Name: chat_message_attachments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_message_attachments (
    id uuid NOT NULL,
    message_id uuid NOT NULL,
    storage_key text NOT NULL,
    mime_type text NOT NULL,
    file_name text,
    file_size integer,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.chat_message_attachments OWNER TO postgres;

--
-- Name: chat_messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_messages (
    id uuid NOT NULL,
    type public."ChatMessageType" DEFAULT 'TEXT'::public."ChatMessageType" NOT NULL,
    conversation_id uuid NOT NULL,
    sender_id uuid NOT NULL,
    content text NOT NULL,
    status public."MessageStatus" DEFAULT 'SENT'::public."MessageStatus" NOT NULL,
    read_at timestamp(6) with time zone,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.chat_messages OWNER TO postgres;

--
-- Name: checklist_activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checklist_activity (
    id uuid NOT NULL,
    item_id uuid NOT NULL,
    user_id uuid NOT NULL,
    action_code public."ChecklistActivityType" NOT NULL,
    message text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.checklist_activity OWNER TO postgres;

--
-- Name: checklist_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.checklist_items (
    id uuid NOT NULL,
    group_id uuid NOT NULL,
    category_code public."ChecklistCategory" NOT NULL,
    title text NOT NULL,
    notes text,
    priority_code public."ChecklistPriority" DEFAULT 'MEDIUM'::public."ChecklistPriority" NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    assigned_to uuid,
    assigned_by uuid NOT NULL,
    completed_at timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.checklist_items OWNER TO postgres;

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    code character varying(10) NOT NULL,
    name character varying(100) NOT NULL,
    phone_prefix character varying(10)
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: destinations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.destinations (
    id uuid NOT NULL,
    place_id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    city character varying(255),
    state character varying(255),
    country_code character varying(10) NOT NULL,
    latitude numeric(10,8) NOT NULL,
    longitude numeric(11,8) NOT NULL,
    cover_url character varying(500),
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.destinations OWNER TO postgres;

--
-- Name: expense_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense_activities (
    id uuid NOT NULL,
    expense_id uuid NOT NULL,
    user_id uuid NOT NULL,
    action_code public."ExpenseActivityType" NOT NULL,
    message text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.expense_activities OWNER TO postgres;

--
-- Name: expense_settlements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense_settlements (
    id uuid NOT NULL,
    group_id uuid NOT NULL,
    payer_member_id uuid NOT NULL,
    receiver_member_id uuid NOT NULL,
    amount numeric(12,2) NOT NULL,
    note text,
    settled_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.expense_settlements OWNER TO postgres;

--
-- Name: expense_shares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense_shares (
    id uuid NOT NULL,
    expense_id uuid NOT NULL,
    member_id uuid NOT NULL,
    paid_by_id uuid NOT NULL,
    amount numeric(12,2) NOT NULL,
    percentage numeric(5,2),
    shares numeric(10,2),
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.expense_shares OWNER TO postgres;

--
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses (
    id uuid NOT NULL,
    group_id uuid NOT NULL,
    title character varying(200) NOT NULL,
    description text,
    amount numeric(12,2) NOT NULL,
    expense_date date NOT NULL,
    category_code public."ExpenseCategory" NOT NULL,
    split_method_code public."ExpenseSplitMethod" NOT NULL,
    paid_by_id uuid NOT NULL,
    created_by uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.expenses OWNER TO postgres;

--
-- Name: itinerary_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.itinerary_activities (
    id uuid NOT NULL,
    day_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    location text NOT NULL,
    latitude numeric(10,7),
    longitude numeric(10,7),
    category_code public."ActivityCategory" NOT NULL,
    "startTime" character varying(10) NOT NULL,
    "durationMinutes" integer NOT NULL,
    notes text,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    created_by uuid NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.itinerary_activities OWNER TO postgres;

--
-- Name: itinerary_days; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.itinerary_days (
    id uuid NOT NULL,
    group_id uuid NOT NULL,
    date date NOT NULL,
    location character varying(255),
    latitude numeric(10,7),
    longitude numeric(10,7),
    summary text,
    created_by uuid NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.itinerary_days OWNER TO postgres;

--
-- Name: trip_group_invites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_group_invites (
    id uuid NOT NULL,
    group_id uuid NOT NULL,
    invited_by uuid NOT NULL,
    invited_user_email text,
    message text,
    status_code public."TripInviteStatus" DEFAULT 'PENDING'::public."TripInviteStatus" NOT NULL,
    expires_at timestamp(6) with time zone,
    responded_at timestamp(6) with time zone,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.trip_group_invites OWNER TO postgres;

--
-- Name: trip_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_groups (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    destination_id uuid NOT NULL,
    date_from date NOT NULL,
    date_to date NOT NULL,
    cover_url character varying(500),
    currency_code character varying(10) DEFAULT 'USD'::character varying NOT NULL,
    status_code character varying(20) DEFAULT 'upcoming'::character varying NOT NULL,
    invite_code character varying(20) NOT NULL,
    created_by uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone NOT NULL
);


ALTER TABLE public.trip_groups OWNER TO postgres;

--
-- Name: trip_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_members (
    id uuid NOT NULL,
    group_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role_code public."TripMemberRole" DEFAULT 'MEMBER'::public."TripMemberRole" NOT NULL,
    added_by uuid,
    joined_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    left_at timestamp(6) with time zone,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.trip_members OWNER TO postgres;

--
-- Name: user_onboarding; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_onboarding (
    user_id uuid NOT NULL,
    onboarding_source_code character varying(50),
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_onboarding OWNER TO postgres;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, full_name, email, phone, password_hash, avatar_url, is_email_verified, email_verified_at, account_status_code, created_at, updated_at) FROM stdin;
7e68af5a-33a7-4923-a110-97daf442be40	Muhammad Nasif	nasifhima@gmail.com	\N	$2b$12$0Wm8qUb4GCuV7RQ5O3JXY.1mIDto85eBxLQiyfFCeNloTyZ69b2JG	\N	t	2026-09-27 10:10:29.918+05:30	ACTIVE	2026-09-27 10:09:27.612+05:30	2026-09-27 10:10:29.94+05:30
5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	Sinan Muhammad	nasifnasi313@gmail.com	\N	$2b$12$gIHG/LiojlIis34AE2xIFeM2TfdOIPTSS9ZpoabWhV6W08cUQirHe	\N	t	2026-09-29 05:46:42.42+05:30	ACTIVE	2026-09-29 05:45:27.443+05:30	2026-09-29 05:46:42.462+05:30
7af56a55-374d-43cb-85e3-6f6bc49ec06e	John	john@gmail.com	\N	$2b$12$09y8dKkPl1ItLUKblnq2z.k8l8VTHxCMu35xasvpC3maprcXdDI4m	\N	t	2026-10-12 08:25:41.537+05:30	ACTIVE	2026-10-12 08:25:01.326+05:30	2026-10-12 08:25:41.555+05:30
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7047571c-c1da-4f14-bbb5-d286d22fcdfd	d8f396d22aa1981ba92fedb3e6bb158c583e203780a4103ded78392fc8ff0cc0	2026-09-27 14:55:02.757738+05:30	20260927092502_init	\N	\N	2026-09-27 14:55:02.307519+05:30	1
\.


--
-- Data for Name: call_participants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.call_participants (id, call_id, user_id, status, joined_at, left_at) FROM stdin;
d64ea62c-b53b-4c49-b6b4-dec116cda19e	7544dad4-00a3-4af9-a731-bae4e373b1a3	7e68af5a-33a7-4923-a110-97daf442be40	JOINED	\N	\N
ea8db440-e898-4baf-97e8-e3daede27532	7544dad4-00a3-4af9-a731-bae4e373b1a3	5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	LEFT	\N	\N
7aa7ec53-5132-4a3e-8fd9-1eb95b4d693f	f50a9230-af0d-4d71-97b5-58f6da549a30	7e68af5a-33a7-4923-a110-97daf442be40	JOINED	\N	\N
9fe06157-9c11-4492-8a6a-e4d4163c5a59	f50a9230-af0d-4d71-97b5-58f6da549a30	5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	LEFT	\N	\N
d3ce186d-dbe1-405e-8c99-a0f05cad7b63	3157ca58-98ef-4e38-84e9-17a573fb11d5	5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	INVITED	\N	\N
21d14c99-32a3-469e-8916-7b5ca5c03b0c	3157ca58-98ef-4e38-84e9-17a573fb11d5	7e68af5a-33a7-4923-a110-97daf442be40	LEFT	\N	\N
17278cc1-3e29-462b-88c3-baab33fc5a60	5df534da-865b-43df-b358-e10d25df8799	7e68af5a-33a7-4923-a110-97daf442be40	LEFT	\N	\N
b2a72da9-a7bd-421f-865f-0627d6f373e0	5df534da-865b-43df-b358-e10d25df8799	5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	LEFT	\N	\N
\.


--
-- Data for Name: calls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calls (id, "mediaType", status, caller_id, trip_group_id, started_at, ended_at, created_at) FROM stdin;
7544dad4-00a3-4af9-a731-bae4e373b1a3	VIDEO	ACTIVE	5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	208c993b-fb97-418c-b144-acac3c0729e2	2026-09-29 05:47:54.452+05:30	\N	2026-09-29 05:47:54.399+05:30
f50a9230-af0d-4d71-97b5-58f6da549a30	VIDEO	ACTIVE	5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	208c993b-fb97-418c-b144-acac3c0729e2	2026-09-29 05:48:09.263+05:30	\N	2026-09-29 05:48:09.25+05:30
3157ca58-98ef-4e38-84e9-17a573fb11d5	VIDEO	ENDED	7e68af5a-33a7-4923-a110-97daf442be40	208c993b-fb97-418c-b144-acac3c0729e2	2026-09-29 06:12:29.149+05:30	2026-09-29 06:12:33.733+05:30	2026-09-29 06:12:29.053+05:30
5df534da-865b-43df-b358-e10d25df8799	VIDEO	ENDED	7e68af5a-33a7-4923-a110-97daf442be40	208c993b-fb97-418c-b144-acac3c0729e2	2026-09-29 06:12:41.257+05:30	2026-09-29 06:13:17.017+05:30	2026-09-29 06:12:41.245+05:30
\.


--
-- Data for Name: chat_conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_conversations (id, group_id, created_at, updated_at) FROM stdin;
121a8ed4-dcbc-483f-a039-642fb7763b54	208c993b-fb97-418c-b144-acac3c0729e2	2026-09-27 10:21:56.376+05:30	2026-09-29 06:13:25.081+05:30
de8183a9-ab7d-49c2-99c4-71514d5609a3	334e6787-a557-4a10-bb6d-b12b9e0015cc	2026-09-30 06:59:30.041+05:30	2026-09-30 06:59:30.041+05:30
\.


--
-- Data for Name: chat_message_attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_message_attachments (id, message_id, storage_key, mime_type, file_name, file_size, created_at) FROM stdin;
\.


--
-- Data for Name: chat_messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_messages (id, type, conversation_id, sender_id, content, status, read_at, created_at, updated_at) FROM stdin;
3f84126b-0fb9-405d-8f21-c8ad4575268b	TEXT	121a8ed4-dcbc-483f-a039-642fb7763b54	5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	hello	SENT	\N	2026-09-29 06:13:25.054+05:30	2026-09-29 06:13:25.054+05:30
\.


--
-- Data for Name: checklist_activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checklist_activity (id, item_id, user_id, action_code, message, created_at) FROM stdin;
\.


--
-- Data for Name: checklist_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.checklist_items (id, group_id, category_code, title, notes, priority_code, is_completed, assigned_to, assigned_by, completed_at, created_at, updated_at) FROM stdin;
6e81e44a-d76e-4981-a8ac-97d634a067a9	208c993b-fb97-418c-b144-acac3c0729e2	CLOTHING	asdfasd	asdf	MEDIUM	t	fec6248e-4a2c-41d6-a87e-97e19331cd6a	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-29 06:13:44.295	2026-09-29 06:13:41.665	2026-09-29 06:13:44.297
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (code, name, phone_prefix) FROM stdin;
IN	IN	\N
\.


--
-- Data for Name: destinations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.destinations (id, place_id, name, city, state, country_code, latitude, longitude, cover_url, created_at) FROM stdin;
9f94ae11-81d4-4e8c-8617-6d4f1bbd3b6d	places/ChIJm8At9A6kBjkROaIyEamDtVI	Spiti Valley, Marango Rangarik, Himachal Pradesh	Marango Rangarik	Himachal Pradesh	IN	32.24613700	78.03491600	https://images.unsplash.com/photo-1651317741360-42af8c912556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxTcGl0aSUyMFZhbGxleSUyQyUyME1hcmFuZ28lMjBSYW5nYXJpayUyQyUyMEhpbWFjaGFsJTIwUHJhZGVzaHxlbnwwfDB8fHwxNzkwNTA0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080	2026-09-27 10:17:18.967+05:30
83738bc4-1a2a-450a-a810-64e4f16bfd8d	places/ChIJP9A_FgiHBDkRzXZQvg6oKYE	Manali, Himachal Pradesh, India	Manali	Himachal Pradesh	IN	32.24318720	77.18917610	https://images.unsplash.com/photo-1597167231350-d057a45dc868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxNYW5hbGklMkMlMjBIaW1hY2hhbCUyMFByYWRlc2glMkMlMjBJbmRpYXxlbnwwfDB8fHwxNzkwNjY2OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080	2026-09-29 07:28:50.63+05:30
e5e2ef56-fc4b-4b19-a3f5-e5402bece6fa	places/ChIJQbc2YxC6vzsRkkDzYv-H-Oo	Goa, India	\N	Goa	IN	15.29932650	74.12399600	https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxHb2ElMkMlMjBJbmRpYXxlbnwwfDB8fHwxNzkwNjk5MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080	2026-09-29 16:28:02.068+05:30
2af68ccd-03a4-4bbc-950e-563858415dd2	places/ChIJU6essrkipDsRbE_iHKEFBjg	Kannur, Keralam, India	Kannur	Keralam	IN	11.87047030	75.36788200	https://images.unsplash.com/photo-1545082475-287a0d0de7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxLYW5udXJ8ZW58MHwwfHx8MTc5MDcwMDY3NXww&ixlib=rb-4.1.0&q=80&w=1080	2026-09-29 16:44:18.059+05:30
9b5a2fcc-b444-4f61-880d-c23b7774d73d	places/ChIJv8a-SlENCDsRkkGEpcqC1Qs	Kochi, Keralam, India	Kochi	Keralam	IN	9.93123280	76.26730410	https://images.unsplash.com/photo-1605955794720-651b9ae7f5e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxLb2NoaXxlbnwwfDB8fHwxNzkwNzAwNjc1fDA&ixlib=rb-4.1.0&q=80&w=1080	2026-09-29 16:45:48.758+05:30
\.


--
-- Data for Name: expense_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense_activities (id, expense_id, user_id, action_code, message, created_at) FROM stdin;
a4c75f1b-ceaf-49d7-be26-982ce4b2727b	92eac18e-802c-4ee5-9955-4032fb5bdc87	7e68af5a-33a7-4923-a110-97daf442be40	CREATED	\N	2026-09-30 06:21:48.799+05:30
bc20590f-bc55-4c08-874c-bcb9d7ce1e06	1db2bbdf-79dd-4d2f-9823-26a04e05345d	7e68af5a-33a7-4923-a110-97daf442be40	CREATED	\N	2026-09-30 06:22:15.408+05:30
9428263b-a2be-4f41-a7f7-3ab9b36da189	d1003bdc-4cd4-4b1c-a29d-c053c5bfec80	7e68af5a-33a7-4923-a110-97daf442be40	CREATED	\N	2026-09-30 06:23:17.743+05:30
\.


--
-- Data for Name: expense_settlements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense_settlements (id, group_id, payer_member_id, receiver_member_id, amount, note, settled_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: expense_shares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense_shares (id, expense_id, member_id, paid_by_id, amount, percentage, shares, created_at) FROM stdin;
22dab3cb-5895-492d-bab7-ea3b087e4422	92eac18e-802c-4ee5-9955-4032fb5bdc87	5cfb7216-b00c-4832-b406-7c62015011d3	5cfb7216-b00c-4832-b406-7c62015011d3	100.00	\N	\N	2026-09-30 06:21:48.782+05:30
ad60094f-5c0e-4907-8887-55c95b8030aa	1db2bbdf-79dd-4d2f-9823-26a04e05345d	5cfb7216-b00c-4832-b406-7c62015011d3	5cfb7216-b00c-4832-b406-7c62015011d3	500.00	\N	\N	2026-09-30 06:22:15.401+05:30
8f2fe0e9-b841-4948-a9ab-8d3fc5712716	d1003bdc-4cd4-4b1c-a29d-c053c5bfec80	5cfb7216-b00c-4832-b406-7c62015011d3	5cfb7216-b00c-4832-b406-7c62015011d3	100.00	\N	\N	2026-09-30 06:23:17.734+05:30
\.


--
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenses (id, group_id, title, description, amount, expense_date, category_code, split_method_code, paid_by_id, created_by, created_at, updated_at) FROM stdin;
92eac18e-802c-4ee5-9955-4032fb5bdc87	334e6787-a557-4a10-bb6d-b12b9e0015cc	food	\N	100.00	2026-09-30	FOOD	EQUAL	5cfb7216-b00c-4832-b406-7c62015011d3	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-30 06:21:48.723+05:30	2026-09-30 06:21:48.723+05:30
1db2bbdf-79dd-4d2f-9823-26a04e05345d	334e6787-a557-4a10-bb6d-b12b9e0015cc	Cab	\N	500.00	2026-09-30	TRANSPORT	EQUAL	5cfb7216-b00c-4832-b406-7c62015011d3	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-30 06:22:15.373+05:30	2026-09-30 06:22:15.373+05:30
d1003bdc-4cd4-4b1c-a29d-c053c5bfec80	334e6787-a557-4a10-bb6d-b12b9e0015cc	asdf	\N	100.00	2026-09-30	SHOPPING	EQUAL	5cfb7216-b00c-4832-b406-7c62015011d3	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-30 06:23:17.705+05:30	2026-09-30 06:23:17.705+05:30
\.


--
-- Data for Name: itinerary_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.itinerary_activities (id, day_id, title, description, location, latitude, longitude, category_code, "startTime", "durationMinutes", notes, "sortOrder", "isCompleted", created_by, "createdAt", "updatedAt") FROM stdin;
66218536-0873-4b6a-8633-5104937c897d	fb208d7c-eb67-425b-bef4-4cb61e2a4e26	Arrival & Check-in	Arrive at Manali and check-in at the pre-booked accommodation near Mall Road.	Near Mall Road	\N	\N	ACCOMMODATION	12:00	60	\N	0	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.354	2026-09-29 08:54:25.354
c3f5f61e-5956-4667-8450-6af42d7d2250	fb208d7c-eb67-425b-bef4-4cb61e2a4e26	Lunch at a Local Dhabha	Experience authentic Himachali cuisine at a local dhaba near Mall Road.	Near Mall Road, Manali	\N	\N	FOOD	13:30	60	\N	1	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.354	2026-09-29 08:54:25.354
28e3c6f6-c635-427a-9182-df76187bc325	fb208d7c-eb67-425b-bef4-4cb61e2a4e26	Explore Mall Road	Stroll along Mall Road, enjoy local shopping and street food.	Mall Road Market Manali	\N	\N	ACTIVITY	15:00	90	\N	2	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.354	2026-09-29 08:54:25.354
06d93134-81a2-4800-8c20-50896ce3520d	bcbbcfc8-aa8f-464b-bc6f-c5d6d85a302a	Breakfast	Start the day with breakfast at The Johnson's Cafe.	The Johnson's Cafe, Circuit House Road	\N	\N	FOOD	08:00	30	\N	0	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.405	2026-09-29 08:54:25.405
00838246-707a-4d0d-9edc-885907cb7c9d	bcbbcfc8-aa8f-464b-bc6f-c5d6d85a302a	Hadimba Devi Temple	Visit the ancient Hadimba Devi Temple.	Hadimba Devi Temple	\N	\N	SIGHTSEEING	09:00	60	\N	1	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.405	2026-09-29 08:54:25.405
2b2258b2-06d7-49ab-b207-91c7b3cf086a	bcbbcfc8-aa8f-464b-bc6f-c5d6d85a302a	Van Vihar National Park	Explore the beautiful Van Vihar National Park.	Van Vihar National Park	\N	\N	ACTIVITY	10:30	90	\N	2	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.405	2026-09-29 08:54:25.405
8d9ca6e2-cbcc-47a6-988b-368113e45efd	bcbbcfc8-aa8f-464b-bc6f-c5d6d85a302a	Lunch	Have lunch at a local restaurant near the park.	Local Restaurant	\N	\N	FOOD	12:30	60	\N	3	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.405	2026-09-29 08:54:25.405
16bbb2b1-cbf3-42b7-a5ee-ebc67000eb6f	bcbbcfc8-aa8f-464b-bc6f-c5d6d85a302a	Shri Anjani Mahadev Mandir	Visit the scenic Shri Anjani Mahadev Mandir.	Shri Anjani Mahadev Mandir	\N	\N	SIGHTSEEING	14:00	60	\N	4	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.405	2026-09-29 08:54:25.405
66e31227-e6b1-49ba-a1bf-fe3dd7884a7d	14ba30c7-3fd2-4c20-b48a-3cacc30f0f97	Breakfast	Have breakfast at your accommodation.	Accommodation	\N	\N	FOOD	08:00	30	\N	0	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.451	2026-09-29 08:54:25.451
41a4ca15-6e3b-4b46-a2c3-6f39fc85de2a	14ba30c7-3fd2-4c20-b48a-3cacc30f0f97	Jogini Falls	Hike to the beautiful Jogini Falls.	Jogini Falls	\N	\N	ACTIVITY	09:00	120	\N	1	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.451	2026-09-29 08:54:25.451
018ebe57-18da-40be-b4ff-f346306ee9ac	14ba30c7-3fd2-4c20-b48a-3cacc30f0f97	Lunch	Have lunch at a local cafe near the falls.	Local Cafe	\N	\N	FOOD	11:30	60	\N	2	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.451	2026-09-29 08:54:25.451
19dec546-f52d-4ef8-8365-52ffb523ebfc	14ba30c7-3fd2-4c20-b48a-3cacc30f0f97	Naggar Castle	Visit the historic Naggar Castle.	Naggar Castle	\N	\N	SIGHTSEEING	13:00	60	\N	3	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.451	2026-09-29 08:54:25.451
a3242406-5e9b-4513-aea2-995b702aada7	14ba30c7-3fd2-4c20-b48a-3cacc30f0f97	Dinner	Enjoy dinner at a local restaurant in Naggar.	Local Restaurant, Naggar	\N	\N	FOOD	15:30	60	\N	4	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.451	2026-09-29 08:54:25.451
6feded5d-4de5-4a9d-9424-a0873c1bd2e5	b8664b05-b588-4f91-957f-68a8adceb722	Breakfast	Have breakfast at your accommodation.	Accommodation	\N	\N	FOOD	08:00	30	\N	0	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.555	2026-09-29 08:54:25.555
1db2eaaa-00e5-40c2-9b56-58c97e3d283a	b8664b05-b588-4f91-957f-68a8adceb722	Last-minute shopping	Do some last-minute shopping at Mall Road.	Mall Road Market Manali	\N	\N	ACTIVITY	09:00	60	\N	1	f	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.555	2026-09-29 08:54:25.555
8b80ae4b-26bb-4f8e-9f5c-a0f4ab3ac32a	97897217-ec2c-4cc3-99c7-6e9b74fd930c	Hotel Check-In at Nirvana Hill Resort	Arrive in Goa and check into your comfortable 3-star hotel base.	Nirvana Hill Resort	15.2893334	74.0177340	ACCOMMODATION	12:00	90	Settle in and refresh after your journey.	0	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.676	2026-09-30 05:52:57.676
eaffcc24-cbc8-4a88-866c-9af8c53fe6fd	97897217-ec2c-4cc3-99c7-6e9b74fd930c	Relaxing Cafe Snack at Crumbs Bakery	Enjoy a casual afternoon snack and coffee to kick off your trip.	Crumbs Bakery	15.2896918	74.0227868	FOOD	14:00	60	Located nearby in Curtorim.	1	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.676	2026-09-30 05:52:57.676
689f69f5-6092-4d87-9699-166f8b522419	97897217-ec2c-4cc3-99c7-6e9b74fd930c	Evening Walk at Party kingdom	Stroll around the local area and shake off the travel fatigue with friends.	Party kingdom	15.2734281	74.0178747	ACTIVITY	16:00	90	Great way to unwind.	2	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.676	2026-09-30 05:52:57.676
1e376d09-3b07-464f-958f-3c9c5b724437	97897217-ec2c-4cc3-99c7-6e9b74fd930c	Dinner at Hot Bite Restaurant	Savor a delightful dinner featuring local flavors with your friends.	Hot Bite Restaurant	15.2851641	74.0027871	FOOD	18:00	90	Highly rated spot for a casual dinner.	3	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.676	2026-09-30 05:52:57.676
5f39dec4-b569-4546-b169-6a8387ad8cd6	e0639da2-a820-42d2-92b2-a3bfa6a2d9be	Heritage Tour of Menezes Braganca House	Step back in time exploring this magnificent historical mansion showcasing Indo-Portuguese architecture.	Menezes Braganca House	15.2613849	74.0434265	SIGHTSEEING	09:30	120	A fascinating cultural experience.	0	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.723	2026-09-30 05:52:57.723
909e99ff-ecd2-4977-bdfe-db4bb97eb99d	e0639da2-a820-42d2-92b2-a3bfa6a2d9be	Cafe Break at Flames Garden Cafe & Plants Nursery	Relax amidst lush greenery and enjoy refreshing drinks.	Flames Garden Cafe & Plants Nursery	15.2598132	74.0476968	FOOD	12:00	60	Right opposite Chandor Club.	1	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.723	2026-09-30 05:52:57.723
75ca7095-4136-494e-8416-fd1e0252b371	e0639da2-a820-42d2-92b2-a3bfa6a2d9be	Dinner at O' Cuzinero	Enjoy authentic local meals in a cozy setting.	O' Cuzinero	15.2479092	74.0329111	FOOD	18:00	90	Great local cuisine.	2	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.723	2026-09-30 05:52:57.723
86fc5b60-4d89-4f85-8f35-d0cca18eb858	e0639da2-a820-42d2-92b2-a3bfa6a2d9be	Discovering Buddha Statue	Visit the serene Buddha Statue located nearby for some peaceful sightseeing.	Buddha Statue	15.2389341	74.0351654	SIGHTSEEING	19:50	60	Calm and quiet spot.	3	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.723	2026-09-30 05:52:57.723
e4828b29-490d-4d77-bdaa-7cc5aac7e394	d40d4965-0d33-4e34-9ca9-db564745c8b4	Explore Palácio do Deão	Wander through the historic estate and its beautiful gardens overlooking the river.	Palácio do Deão	15.2135835	74.0736286	SIGHTSEEING	09:30	120	Rich in history and scenic beauty.	0	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.743	2026-09-30 05:52:57.743
57efab39-4aa3-4f1f-a715-f65a03e8c3bb	d40d4965-0d33-4e34-9ca9-db564745c8b4	Visit Dragon Waterfall Ambaulim	Take in the natural beauty of this lesser-known cascade.	Dragon Waterfall Ambaulim	15.2107335	74.0429012	SIGHTSEEING	16:30	60	Great for adventure and nature enthusiasts.	1	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.743	2026-09-30 05:52:57.743
844f44db-0027-4a0e-935d-9ab754d4dfeb	d40d4965-0d33-4e34-9ca9-db564745c8b4	Lunch at Hill-View Bar and Restaurant	Enjoy a hearty lunch with great views and local delicacies.	Hill-View Bar and Restaurant	15.2469953	74.0772891	FOOD	17:55	75	Relaxed environment for friends.	2	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.743	2026-09-30 05:52:57.743
0014cc3e-1006-4fa5-896e-0095abacab0f	d40d4965-0d33-4e34-9ca9-db564745c8b4	Sightseeing at Salaulim Dam	Witness the engineering marvel and surrounding lush landscapes.	Salaulim Dam	15.2127043	74.1788677	SIGHTSEEING	19:45	90	Scenic spot for nature lovers.	3	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.743	2026-09-30 05:52:57.743
42842aec-f17f-45c5-84fa-c3484b81823b	fa909593-6fa4-468e-808b-8c16ae3d2cdc	Dudhsagar Waterfalls Visit & Tour	Embark on an exciting jeep safari and view the majestic Dudhsagar waterfalls.	Official Dudhsagar Waterfalls Booking	15.3363533	74.2443160	ACTIVITY	09:00	180	A must-do adventure experience in Goa.	0	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.764	2026-09-30 05:52:57.764
2d499d7b-40b7-4120-b695-35ca0abb9cd6	fa909593-6fa4-468e-808b-8c16ae3d2cdc	Explore Biodiversity Park Mollem	Walk through the rich biodiversity park observing local flora and fauna.	Biodiversity Park, Mollem Goa	15.3639855	74.2002537	SIGHTSEEING	14:30	120	Perfect for nature lovers.	1	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.764	2026-09-30 05:52:57.764
1e765434-48fa-438a-a886-8aa17a92a6fd	fa909593-6fa4-468e-808b-8c16ae3d2cdc	Lunch at Natures Nest Goa	Enjoy a wholesome meal surrounded by nature near the sanctuary.	Natures Nest Goa	15.4107870	74.2005296	FOOD	16:55	75	Eco-friendly dining experience.	2	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.764	2026-09-30 05:52:57.764
df3ca567-71ca-4630-ad9b-293b6250d34f	fa909593-6fa4-468e-808b-8c16ae3d2cdc	Dinner at Anoshka Family Restaurant	Wind down the day with a delicious dinner with friends.	Anoshka Family Restaurant	15.3358213	73.9949791	FOOD	19:15	90	Friendly atmosphere and tasty dishes.	3	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.764	2026-09-30 05:52:57.764
d8b7fdda-8cf2-4087-ae5b-ba24a9ebd5a9	dac4fc0f-b021-48fc-83c7-4ead64b6fbcd	Morning Walk at Ilha de Rachol Fields	Take a tranquil morning stroll across the scenic fields before heading home.	Ilha de Rachol fields	15.3212099	74.0005914	SIGHTSEEING	09:30	90	Peaceful landscape views.	0	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.78	2026-09-30 05:52:57.78
ca7a1d4e-a566-4f02-8dca-d91ded61652e	dac4fc0f-b021-48fc-83c7-4ead64b6fbcd	Farewell Snack at Veggie Delight @ Sugar & Spice	Grab a light bite and coffee before concluding your Goa trip.	Veggie Delight @ Sugar & Spice	15.3260205	73.9898067	FOOD	11:15	60	Relaxed final stop.	1	f	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.78	2026-09-30 05:52:57.78
\.


--
-- Data for Name: itinerary_days; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.itinerary_days (id, group_id, date, location, latitude, longitude, summary, created_by, "createdAt", "updatedAt") FROM stdin;
e6e77ef6-8918-4cea-a6fc-fba3c08acb59	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-01	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
07da7226-f045-486a-b491-2e27d6be1d49	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-02	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
e631764f-9bc4-4ff8-aef9-5f998ae0ad68	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-03	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
15749f88-b00a-4520-8f82-cc8a000fb38e	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-04	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
815f788a-a14d-4517-bcd7-304afda8d495	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-05	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
4e4515af-82a2-4974-b3fd-78393f71c03d	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-06	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
bfb28f60-abeb-48f2-9d0f-91b10ff1bcbf	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-07	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
bcdc707d-22fd-4325-8147-d1fd813b5474	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-08	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
7d39b312-ef76-4b51-958b-8525e40db0b9	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-09	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
34b602bd-7abb-4c42-a896-a1c57f9a3369	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-10	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
f68e8c71-4aa2-43a7-b776-896fabc10952	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-11	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
253d4287-f319-49de-958f-fd962f7ca67f	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-12	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
38fe107b-21dd-4549-b7c6-c247e1d313a1	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-13	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
92d0c5c0-c22f-427a-b63e-49eb75b3a456	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-14	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
272fc2e5-324a-48a4-8ee5-4213e1ad8a17	208c993b-fb97-418c-b144-acac3c0729e2	2026-10-15	\N	\N	\N	\N	fec6248e-4a2c-41d6-a87e-97e19331cd6a	2026-09-29 16:12:40.201	2026-09-29 16:12:40.201
97897217-ec2c-4cc3-99c7-6e9b74fd930c	334e6787-a557-4a10-bb6d-b12b9e0015cc	2026-09-30	Goa	15.2893334	74.0177340	Arrival in Goa, hotel check-in at Nirvana Hill Resort, and a relaxed evening by Curtorim lake.	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.58	2026-09-30 05:52:57.58
e0639da2-a820-42d2-92b2-a3bfa6a2d9be	334e6787-a557-4a10-bb6d-b12b9e0015cc	2026-10-01	Goa	15.2613849	74.0434265	Explore heritage homes and cultural landmarks in Chandor and surrounding areas.	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.712	2026-09-30 05:52:57.712
d40d4965-0d33-4e34-9ca9-db564745c8b4	334e6787-a557-4a10-bb6d-b12b9e0015cc	2026-10-02	Goa	15.2135835	74.0736286	Immerse in nature with visits to Palácio do Deão, Salaulim Dam, and Dragon Waterfall.	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.734	2026-09-30 05:52:57.734
fa909593-6fa4-468e-808b-8c16ae3d2cdc	334e6787-a557-4a10-bb6d-b12b9e0015cc	2026-10-03	Goa	15.3639855	74.2002537	Adventure day out towards Mollem National Park and Dudhsagar region.	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.752	2026-09-30 05:52:57.752
dac4fc0f-b021-48fc-83c7-4ead64b6fbcd	334e6787-a557-4a10-bb6d-b12b9e0015cc	2026-10-04	Goa	15.3212099	74.0005914	Morning peaceful stroll at Ilha de Rachol fields before departure.	5cfb7216-b00c-4832-b406-7c62015011d3	2026-09-30 05:52:57.774	2026-09-30 05:52:57.774
bcbbcfc8-aa8f-464b-bc6f-c5d6d85a302a	f077e93a-79ee-4856-bbb2-f97c58254ade	2026-10-11	Manali	\N	\N	Temple & Nature	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.378	2026-09-29 17:24:24.132
b8664b05-b588-4f91-957f-68a8adceb722	f077e93a-79ee-4856-bbb2-f97c58254ade	2026-10-13	Manali	\N	\N	Departure	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.538	2026-09-29 17:24:24.136
4a29f944-0a40-4723-b6ce-a317b90294b5	f077e93a-79ee-4856-bbb2-f97c58254ade	2026-10-14	\N	\N	\N	\N	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 17:24:24.146	2026-09-29 17:24:24.146
14ba30c7-3fd2-4c20-b48a-3cacc30f0f97	f077e93a-79ee-4856-bbb2-f97c58254ade	2026-10-10	Manali & Naggar	\N	\N	Waterfalls & Castle	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.423	2026-09-29 17:25:24.251
fb208d7c-eb67-425b-bef4-4cb61e2a4e26	f077e93a-79ee-4856-bbb2-f97c58254ade	2026-10-12	Manali	\N	\N	Arrival & Relaxation	900ab88a-f370-4828-a867-92a67851dbc7	2026-09-29 08:54:25.195	2026-09-29 17:25:24.256
\.


--
-- Data for Name: trip_group_invites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_group_invites (id, group_id, invited_by, invited_user_email, message, status_code, expires_at, responded_at, created_at) FROM stdin;
\.


--
-- Data for Name: trip_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_groups (id, name, description, destination_id, date_from, date_to, cover_url, currency_code, status_code, invite_code, created_by, created_at, updated_at) FROM stdin;
208c993b-fb97-418c-b144-acac3c0729e2	spit	asdf	9f94ae11-81d4-4e8c-8617-6d4f1bbd3b6d	2026-10-01	2026-10-15	https://images.unsplash.com/photo-1651317741360-42af8c912556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxTcGl0aSUyMFZhbGxleSUyQyUyME1hcmFuZ28lMjBSYW5nYXJpayUyQyUyMEhpbWFjaGFsJTIwUHJhZGVzaHxlbnwwfDB8fHwxNzkwNTA0MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080	INR	upcoming	F0893F64	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-27 10:17:18.989+05:30	2026-09-27 10:17:18.989+05:30
3942c5e6-f6b5-4faf-b9a6-00766e14e2b3	Manali	asdf	83738bc4-1a2a-450a-a810-64e4f16bfd8d	2026-10-01	2026-10-30	https://images.unsplash.com/photo-1597167231350-d057a45dc868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxNYW5hbGklMkMlMjBIaW1hY2hhbCUyMFByYWRlc2glMkMlMjBJbmRpYXxlbnwwfDB8fHwxNzkwNjY2OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080	INR	upcoming	1506C86C	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-29 16:45:27.904+05:30	2026-09-29 16:45:27.904+05:30
06d19d10-4c42-4b08-887b-8365e36e28e8	kann	\N	2af68ccd-03a4-4bbc-950e-563858415dd2	2026-09-30	2026-10-01	https://images.unsplash.com/photo-1545082475-287a0d0de7c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxLYW5udXJ8ZW58MHwwfHx8MTc5MDcwMDY3NXww&ixlib=rb-4.1.0&q=80&w=1080	INR	upcoming	D1BB482E	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-29 16:45:10.025+05:30	2026-09-29 16:57:31.283+05:30
0814bffb-d11b-4a5f-a4f5-69a909da6a31	kochi	asd	9b5a2fcc-b444-4f61-880d-c23b7774d73d	2026-09-30	2026-10-01	https://images.unsplash.com/photo-1605955794720-651b9ae7f5e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxLb2NoaXxlbnwwfDB8fHwxNzkwNzAwNjc1fDA&ixlib=rb-4.1.0&q=80&w=1080	INR	upcoming	08AC1342	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-29 16:45:48.773+05:30	2026-09-29 16:57:31.332+05:30
f077e93a-79ee-4856-bbb2-f97c58254ade	Manali Trip	\N	83738bc4-1a2a-450a-a810-64e4f16bfd8d	2026-10-10	2026-10-14	https://images.unsplash.com/photo-1597167231350-d057a45dc868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxNYW5hbGklMkMlMjBIaW1hY2hhbCUyMFByYWRlc2glMkMlMjBJbmRpYXxlbnwwfDB8fHwxNzkwNjY2OTMwfDA&ixlib=rb-4.1.0&q=80&w=1080	INR	upcoming	B2BE8A0B	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-29 07:28:50.654+05:30	2026-09-29 17:24:24.156+05:30
334e6787-a557-4a10-bb6d-b12b9e0015cc	Goa Trip	\N	e5e2ef56-fc4b-4b19-a3f5-e5402bece6fa	2026-09-30	2026-10-04	https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NzgzMTV8MHwxfHNlYXJjaHwxfHxHb2ElMkMlMjBJbmRpYXxlbnwwfDB8fHwxNzkwNjk5MjgxfDA&ixlib=rb-4.1.0&q=80&w=1080	INR	upcoming	BD29A5FD	7e68af5a-33a7-4923-a110-97daf442be40	2026-09-29 16:28:02.086+05:30	2026-09-29 18:36:49.748+05:30
\.


--
-- Data for Name: trip_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_members (id, group_id, user_id, role_code, added_by, joined_at, left_at, is_active) FROM stdin;
fec6248e-4a2c-41d6-a87e-97e19331cd6a	208c993b-fb97-418c-b144-acac3c0729e2	7e68af5a-33a7-4923-a110-97daf442be40	ADMIN	\N	2026-09-27 10:17:19.004+05:30	\N	t
282f166e-8c99-4088-8a32-88eff16e4cd1	208c993b-fb97-418c-b144-acac3c0729e2	5fe14ce1-f4ef-4d2d-9ae9-4c48a61540c4	MEMBER	\N	2026-09-29 05:47:36.833+05:30	\N	t
900ab88a-f370-4828-a867-92a67851dbc7	f077e93a-79ee-4856-bbb2-f97c58254ade	7e68af5a-33a7-4923-a110-97daf442be40	ADMIN	\N	2026-09-29 07:28:50.672+05:30	\N	t
5cfb7216-b00c-4832-b406-7c62015011d3	334e6787-a557-4a10-bb6d-b12b9e0015cc	7e68af5a-33a7-4923-a110-97daf442be40	ADMIN	\N	2026-09-29 16:28:02.096+05:30	\N	t
e6dde13c-e483-4d2a-95a3-5960cbd9f0c2	06d19d10-4c42-4b08-887b-8365e36e28e8	7e68af5a-33a7-4923-a110-97daf442be40	ADMIN	\N	2026-09-29 16:45:10.045+05:30	\N	t
8140ff50-b91f-4060-817f-cf3d9c4031e2	3942c5e6-f6b5-4faf-b9a6-00766e14e2b3	7e68af5a-33a7-4923-a110-97daf442be40	ADMIN	\N	2026-09-29 16:45:27.914+05:30	\N	t
01b66b50-81f0-4f13-aa4f-19e0bd64e9eb	0814bffb-d11b-4a5f-a4f5-69a909da6a31	7e68af5a-33a7-4923-a110-97daf442be40	ADMIN	\N	2026-09-29 16:45:48.786+05:30	\N	t
\.


--
-- Data for Name: user_onboarding; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_onboarding (user_id, onboarding_source_code, created_at) FROM stdin;
7e68af5a-33a7-4923-a110-97daf442be40	Friends or Family	2026-09-27 10:10:35.012+05:30
\.


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: call_participants call_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_participants
    ADD CONSTRAINT call_participants_pkey PRIMARY KEY (id);


--
-- Name: calls calls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calls
    ADD CONSTRAINT calls_pkey PRIMARY KEY (id);


--
-- Name: chat_conversations chat_conversations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_conversations
    ADD CONSTRAINT chat_conversations_pkey PRIMARY KEY (id);


--
-- Name: chat_message_attachments chat_message_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message_attachments
    ADD CONSTRAINT chat_message_attachments_pkey PRIMARY KEY (id);


--
-- Name: chat_messages chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);


--
-- Name: checklist_activity checklist_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_activity
    ADD CONSTRAINT checklist_activity_pkey PRIMARY KEY (id);


--
-- Name: checklist_items checklist_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT checklist_items_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (code);


--
-- Name: destinations destinations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinations
    ADD CONSTRAINT destinations_pkey PRIMARY KEY (id);


--
-- Name: expense_activities expense_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_activities
    ADD CONSTRAINT expense_activities_pkey PRIMARY KEY (id);


--
-- Name: expense_settlements expense_settlements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_settlements
    ADD CONSTRAINT expense_settlements_pkey PRIMARY KEY (id);


--
-- Name: expense_shares expense_shares_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_shares
    ADD CONSTRAINT expense_shares_pkey PRIMARY KEY (id);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- Name: itinerary_activities itinerary_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_activities
    ADD CONSTRAINT itinerary_activities_pkey PRIMARY KEY (id);


--
-- Name: itinerary_days itinerary_days_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_days
    ADD CONSTRAINT itinerary_days_pkey PRIMARY KEY (id);


--
-- Name: trip_group_invites trip_group_invites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_group_invites
    ADD CONSTRAINT trip_group_invites_pkey PRIMARY KEY (id);


--
-- Name: trip_groups trip_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_groups
    ADD CONSTRAINT trip_groups_pkey PRIMARY KEY (id);


--
-- Name: trip_members trip_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_members
    ADD CONSTRAINT trip_members_pkey PRIMARY KEY (id);


--
-- Name: user_onboarding user_onboarding_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_onboarding
    ADD CONSTRAINT user_onboarding_pkey PRIMARY KEY (user_id);


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_phone_key" ON public."User" USING btree (phone);


--
-- Name: call_participants_call_id_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX call_participants_call_id_user_id_key ON public.call_participants USING btree (call_id, user_id);


--
-- Name: call_participants_user_id_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX call_participants_user_id_status_idx ON public.call_participants USING btree (user_id, status);


--
-- Name: calls_caller_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX calls_caller_id_idx ON public.calls USING btree (caller_id);


--
-- Name: calls_trip_group_id_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX calls_trip_group_id_status_idx ON public.calls USING btree (trip_group_id, status);


--
-- Name: chat_conversations_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_conversations_group_id_idx ON public.chat_conversations USING btree (group_id);


--
-- Name: chat_conversations_group_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX chat_conversations_group_id_key ON public.chat_conversations USING btree (group_id);


--
-- Name: chat_message_attachments_message_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX chat_message_attachments_message_id_key ON public.chat_message_attachments USING btree (message_id);


--
-- Name: chat_message_attachments_storage_key_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_message_attachments_storage_key_idx ON public.chat_message_attachments USING btree (storage_key);


--
-- Name: chat_messages_conversation_id_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_messages_conversation_id_created_at_idx ON public.chat_messages USING btree (conversation_id, created_at);


--
-- Name: chat_messages_conversation_id_sender_id_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_messages_conversation_id_sender_id_status_idx ON public.chat_messages USING btree (conversation_id, sender_id, status);


--
-- Name: chat_messages_sender_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_messages_sender_id_idx ON public.chat_messages USING btree (sender_id);


--
-- Name: checklist_activity_item_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX checklist_activity_item_id_idx ON public.checklist_activity USING btree (item_id);


--
-- Name: checklist_items_assigned_to_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX checklist_items_assigned_to_idx ON public.checklist_items USING btree (assigned_to);


--
-- Name: checklist_items_category_code_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX checklist_items_category_code_idx ON public.checklist_items USING btree (category_code);


--
-- Name: checklist_items_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX checklist_items_group_id_idx ON public.checklist_items USING btree (group_id);


--
-- Name: destinations_country_code_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX destinations_country_code_idx ON public.destinations USING btree (country_code);


--
-- Name: destinations_place_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX destinations_place_id_idx ON public.destinations USING btree (place_id);


--
-- Name: destinations_place_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX destinations_place_id_key ON public.destinations USING btree (place_id);


--
-- Name: destinations_state_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX destinations_state_idx ON public.destinations USING btree (state);


--
-- Name: expense_activities_expense_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expense_activities_expense_id_idx ON public.expense_activities USING btree (expense_id);


--
-- Name: expense_settlements_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expense_settlements_group_id_idx ON public.expense_settlements USING btree (group_id);


--
-- Name: expense_settlements_payer_member_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expense_settlements_payer_member_id_idx ON public.expense_settlements USING btree (payer_member_id);


--
-- Name: expense_settlements_receiver_member_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expense_settlements_receiver_member_id_idx ON public.expense_settlements USING btree (receiver_member_id);


--
-- Name: expense_shares_expense_id_member_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX expense_shares_expense_id_member_id_key ON public.expense_shares USING btree (expense_id, member_id);


--
-- Name: expense_shares_member_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expense_shares_member_id_idx ON public.expense_shares USING btree (member_id);


--
-- Name: expenses_category_code_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expenses_category_code_idx ON public.expenses USING btree (category_code);


--
-- Name: expenses_expense_date_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expenses_expense_date_idx ON public.expenses USING btree (expense_date);


--
-- Name: expenses_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expenses_group_id_idx ON public.expenses USING btree (group_id);


--
-- Name: expenses_paid_by_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX expenses_paid_by_id_idx ON public.expenses USING btree (paid_by_id);


--
-- Name: itinerary_activities_day_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX itinerary_activities_day_id_idx ON public.itinerary_activities USING btree (day_id);


--
-- Name: itinerary_days_group_id_date_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX itinerary_days_group_id_date_key ON public.itinerary_days USING btree (group_id, date);


--
-- Name: itinerary_days_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX itinerary_days_group_id_idx ON public.itinerary_days USING btree (group_id);


--
-- Name: trip_group_invites_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trip_group_invites_group_id_idx ON public.trip_group_invites USING btree (group_id);


--
-- Name: trip_group_invites_invited_user_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trip_group_invites_invited_user_email_idx ON public.trip_group_invites USING btree (invited_user_email);


--
-- Name: trip_groups_created_by_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trip_groups_created_by_idx ON public.trip_groups USING btree (created_by);


--
-- Name: trip_groups_destination_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trip_groups_destination_id_idx ON public.trip_groups USING btree (destination_id);


--
-- Name: trip_groups_invite_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX trip_groups_invite_code_key ON public.trip_groups USING btree (invite_code);


--
-- Name: trip_groups_status_code_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trip_groups_status_code_idx ON public.trip_groups USING btree (status_code);


--
-- Name: trip_members_group_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trip_members_group_id_idx ON public.trip_members USING btree (group_id);


--
-- Name: trip_members_group_id_user_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX trip_members_group_id_user_id_key ON public.trip_members USING btree (group_id, user_id);


--
-- Name: trip_members_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trip_members_user_id_idx ON public.trip_members USING btree (user_id);


--
-- Name: call_participants call_participants_call_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_participants
    ADD CONSTRAINT call_participants_call_id_fkey FOREIGN KEY (call_id) REFERENCES public.calls(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: call_participants call_participants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.call_participants
    ADD CONSTRAINT call_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: calls calls_caller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calls
    ADD CONSTRAINT calls_caller_id_fkey FOREIGN KEY (caller_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: calls calls_trip_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calls
    ADD CONSTRAINT calls_trip_group_id_fkey FOREIGN KEY (trip_group_id) REFERENCES public.trip_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chat_conversations chat_conversations_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_conversations
    ADD CONSTRAINT chat_conversations_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.trip_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chat_message_attachments chat_message_attachments_message_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_message_attachments
    ADD CONSTRAINT chat_message_attachments_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.chat_messages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chat_messages chat_messages_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.chat_conversations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chat_messages chat_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: checklist_activity checklist_activity_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_activity
    ADD CONSTRAINT checklist_activity_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.checklist_items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: checklist_activity checklist_activity_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_activity
    ADD CONSTRAINT checklist_activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: checklist_items checklist_items_assigned_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT checklist_items_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: checklist_items checklist_items_assigned_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT checklist_items_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.trip_members(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: checklist_items checklist_items_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.checklist_items
    ADD CONSTRAINT checklist_items_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.trip_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: destinations destinations_country_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destinations
    ADD CONSTRAINT destinations_country_code_fkey FOREIGN KEY (country_code) REFERENCES public.countries(code) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expense_activities expense_activities_expense_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_activities
    ADD CONSTRAINT expense_activities_expense_id_fkey FOREIGN KEY (expense_id) REFERENCES public.expenses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: expense_activities expense_activities_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_activities
    ADD CONSTRAINT expense_activities_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expense_settlements expense_settlements_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_settlements
    ADD CONSTRAINT expense_settlements_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.trip_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: expense_settlements expense_settlements_payer_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_settlements
    ADD CONSTRAINT expense_settlements_payer_member_id_fkey FOREIGN KEY (payer_member_id) REFERENCES public.trip_members(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expense_settlements expense_settlements_receiver_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_settlements
    ADD CONSTRAINT expense_settlements_receiver_member_id_fkey FOREIGN KEY (receiver_member_id) REFERENCES public.trip_members(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expense_shares expense_shares_expense_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_shares
    ADD CONSTRAINT expense_shares_expense_id_fkey FOREIGN KEY (expense_id) REFERENCES public.expenses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: expense_shares expense_shares_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_shares
    ADD CONSTRAINT expense_shares_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.trip_members(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expense_shares expense_shares_paid_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense_shares
    ADD CONSTRAINT expense_shares_paid_by_id_fkey FOREIGN KEY (paid_by_id) REFERENCES public.trip_members(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expenses expenses_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: expenses expenses_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.trip_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: expenses expenses_paid_by_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_paid_by_id_fkey FOREIGN KEY (paid_by_id) REFERENCES public.trip_members(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: itinerary_activities itinerary_activities_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_activities
    ADD CONSTRAINT itinerary_activities_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.trip_members(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: itinerary_activities itinerary_activities_day_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_activities
    ADD CONSTRAINT itinerary_activities_day_id_fkey FOREIGN KEY (day_id) REFERENCES public.itinerary_days(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: itinerary_days itinerary_days_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_days
    ADD CONSTRAINT itinerary_days_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.trip_members(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: itinerary_days itinerary_days_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.itinerary_days
    ADD CONSTRAINT itinerary_days_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.trip_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: trip_group_invites trip_group_invites_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_group_invites
    ADD CONSTRAINT trip_group_invites_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.trip_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: trip_group_invites trip_group_invites_invited_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_group_invites
    ADD CONSTRAINT trip_group_invites_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trip_groups trip_groups_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_groups
    ADD CONSTRAINT trip_groups_created_by_fkey FOREIGN KEY (created_by) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trip_groups trip_groups_destination_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_groups
    ADD CONSTRAINT trip_groups_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.destinations(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: trip_members trip_members_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_members
    ADD CONSTRAINT trip_members_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.trip_groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: trip_members trip_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_members
    ADD CONSTRAINT trip_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_onboarding user_onboarding_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_onboarding
    ADD CONSTRAINT user_onboarding_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

-- \unrestrict E7jmdExb23vUF7uJCceYMO2IjQFKXUqVjWJK9tSB48KUnZFdUeyqjhQ5Zuvby9v

