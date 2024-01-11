# Eval

The open assessment platform

## Overview

Eval is an open source platform designed to revolutionize the way companies assess technical candidates. By leveraging real-world open source issues, the platform provides a more accurate and effective way to evaluate a candidate's actual coding and problem-solving skills.

## Development

1.  clone the Eval repository in your local environment

```
git clone https://github.com/openeval/eval.git
```

2. go to the project folder

```
cd eval
```

3. install dependencies

```
pnpm i
```

4. Start Supabase local environment

https://supabase.com/docs/guides/cli/local-development

```
pnpm supabase start

```

5. Set up your .env file

- Duplicate .env.example to .env and adjust to your new local environment

```

Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
        anon key: eyJh......
service_role key: eyJh......

```

6. Init & seed database

```
 pnpm prisma migrate dev --name init
```

```
 pnpm run db:seed

```

## Usage

to start the app just run the command

```
yarn run dev
```

check package.json to see other available commands

## Contributing

Please see our [contributing guide](/CONTRIBUTING.md).

## Acknowledgements

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
