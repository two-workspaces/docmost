# Deploy and Host Docmost on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/docmost-wiki?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=docmost-wiki)

[Docmost](https://docmost.com/) is the open-source wiki and documentation platform, an alternative to Confluence and Notion: real-time collaborative editing, spaces with their own permissions, page history, comments, diagrams and full-text search. This template runs Docmost's official image on a pinned release and creates the workspace with your account as owner on first boot, so the setup page is never open to whoever finds the URL first.

## About Hosting Docmost

The stack is three services: Docmost, Postgres and Redis.

- **Owner ready on boot.** The first boot creates the workspace and its owner from your email and a generated password. Log in and invite your team.
- **A pinned release.** Docmost, Postgres and Redis run fixed versions, so a redeploy never pulls in an untested upgrade. Docmost migrates its database on start, so bumping the image tag is the whole upgrade.
- **Attachments that persist.** Uploads live on a volume on the Docmost service; pages live in Postgres.
- **Private by default.** Only Docmost has a public address. Postgres and Redis are on the private network, and both require a password.

## Common Use Cases

- A team wiki for processes, onboarding and meeting notes
- Product and engineering documentation with diagrams and page history
- Replacing Confluence or Notion with a self-hosted wiki and no per-seat fees

## Dependencies for Docmost Hosting

- Postgres 18 (included, private network only)
- Redis 8 (included, private network only)

### Deployment Dependencies

- [Docmost documentation](https://docmost.com/docs/)
- [Docmost on GitHub](https://github.com/docmost/docmost)
- [Template source on GitHub](https://github.com/two-workspaces/docmost)

### Implementation Details

**Sign in** at the Docmost service's Railway domain with the email you entered at deploy time and the `DOCMOST_ADMIN_PASSWORD` value from the Docmost service's Variables tab. Change the password afterwards under Settings → Account; the variable is only read on first boot.

**Email.** Docmost sends invitations and password resets by email. Railway only allows outbound SMTP on the Pro plan, so on other plans use [Postmark](https://postmarkapp.com/), which Docmost supports over HTTPS: on the Docmost service set `MAIL_DRIVER=postmark`, `POSTMARK_TOKEN` and `MAIL_FROM_ADDRESS`. On Pro, any SMTP provider works with `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD` and `MAIL_FROM_ADDRESS`. Without email, add members from Settings → Members and share the invite link yourself.

**Memory.** Around 650 MB at idle: about 500 MB for Docmost, 140 MB for Postgres and a few MB for Redis. It runs on the Trial plan and above; the Free plan's 0.5 GB per service is too tight for Docmost.

**Backups.** Enable Railway's volume backups on the Postgres volume (pages, users, history) and the Docmost volume (attachments). To keep attachments in S3 or R2 instead, set `STORAGE_DRIVER=s3` and the `AWS_S3_*` variables on the Docmost service.

**Custom domain.** Add it in the Docmost service's Settings → Networking, then set `APP_URL` to `https://` plus your domain. Docmost uses it in links and emails after the next deploy.

## Why Deploy Docmost on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Docmost on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.
