import { z } from "zod";

const projectSchema = z.object({
    title: z.string().min(1, {message: 'Title is required.'}).max(60, {message: 'Title must be 60 or fewer characters long'}),
    description: z.string().min(1, {message: 'Description is required.'}).max(140, {message: 'Description must be 140 or fewer characters long'}),
    leader: z.string().uuid({message: 'Invalid user uuid'}),
    status: z.string().includes('Planned')
})
const incidentStatus = ["open", "inprogress" , "resolved" , "closed" , "deffered" , "duplicated" , "reopen" ] as const;
const incidentPriority = ["low" , "medium" , "high" , "urgent"] as const;
const incidentSeverity = ["minor" , "major" , "critical" , "blocker"] as const;

const incidentSchema = z.object({
    title: z.string().min(1, {message: 'Title is required'}).max(40, {message: 'Title must be 40 or fewer characters long'}),
    description: z.string().min(1, {message: 'Description is required.'}).max(300, {message: 'Description must be 300 or fewer characters long'}),
    projectId: z.string().uuid({message: 'Invalid project ID'}),
    createdBy: z.string().uuid({message: 'Invalid user ID'}),
    status: z.enum(incidentStatus),
    priority: z.enum(incidentPriority),
    severity: z.enum(incidentSeverity),
    stepsToReproduce: z.string(), //change
    actualResult: z.string().min(1, {message: 'Actual result is required'}).max(500, {message: 'Actual result must be 500 or fewer characters'}),
    expectedResult: z.string().min(1, {message: 'Expected result is required'}).max(500, {message: 'Expected result must be 500 or fewer characters'})

})

export {projectSchema, incidentSchema}

/* 

create table
  public."Incidents" (
    id uuid not null default gen_random_uuid (),
    title text not null,
    "projectId" uuid not null,
    "assignedTo" uuid null,
    "createdBy" uuid not null,
    status character varying not null,
    priority character varying not null,
    severity character varying not null,
    description text not null,
    "stepsToReproduce" text[] not null,
    "actualResult" text not null,
    "expectedResult" text not null,
    "createdAt" timestamp without time zone not null default now(),
    "updatedAt" timestamp without time zone null,
    constraint Incidents_pkey primary key (id),
    constraint Incidents_assignedTo_fkey foreign key ("assignedTo") references users (id) on update cascade on delete set null,
    constraint Incidents_createdBy_fkey foreign key ("createdBy") references users (id) on update cascade on delete set null,
    constraint Incidents_projectId_fkey foreign key ("projectId") references "Projects" (id) on update cascade on delete cascade,
    constraint Incidents_description_check check ((length(description) < 300)),
    constraint Incidents_title_check check ((length(title) < 40))
  ) tablespace pg_default; */