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
    project_id: z.string().uuid({message: 'Invalid project ID'}),
    created_by: z.string().uuid({message: 'Invalid user ID'}),
    status: z.enum(incidentStatus),
    priority: z.enum(incidentPriority),
    severity: z.enum(incidentSeverity),
    steps_to_reproduce: z.string().array().nonempty(),
    actual_result: z.string().min(1, {message: 'Actual result is required'}).max(500, {message: 'Actual result must be 500 or fewer characters'}),
    expected_result: z.string().min(1, {message: 'Expected result is required'}).max(500, {message: 'Expected result must be 500 or fewer characters'})

})

export {projectSchema, incidentSchema}