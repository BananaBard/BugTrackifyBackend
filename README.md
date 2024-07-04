To create a copy of this project and run it locally, you will need:
- Node.js installed
- A supabase account with a proyect created
- A .env file with the following variables:
  - PORT (The desired port to run the server, only for development)
  - SUPABASE_URL, the URL of your database provided by supabase
  - PUBLIC_KEY, the public key of your supabase proyect, safe to expose in the client, better to have it in env
  - SECRET_KEY, dangerous to expose, it gives total control over your database, must keep in the env.

Cloning this proyect and running npm i should install every dependency you need, anyways you can see the needed ones below.

Needed dependencies to run project
- nodemon
- ts-node
- typescript
- cors
- helmet
- @types/express
- @types/node
- @types/cors


Developer dependencies:
- supabase/supabase-js
- dotenv
- express
