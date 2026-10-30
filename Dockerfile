FROM docmost/docmost:0.97.0

# First boot: claim the setup page with the admin from DOCMOST_ADMIN_EMAIL and DOCMOST_ADMIN_PASSWORD,
# so it is never open to whoever finds the URL first. Later boots find the workspace and skip it.
COPY railway-setup.mjs /app/railway-setup.mjs
CMD ["sh", "-c", "node /app/railway-setup.mjs & exec pnpm start"]
