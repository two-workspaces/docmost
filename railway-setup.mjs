// Runs beside the server: waits for it, then creates the workspace and its owner through the setup
// endpoint. The endpoint refuses once a workspace exists, so this is a no-op after the first boot.
const { DOCMOST_ADMIN_EMAIL: email, DOCMOST_ADMIN_PASSWORD: password, PORT = "3000" } = process.env;
const workspaceName = process.env.DOCMOST_WORKSPACE || "Docmost";
const api = `http://127.0.0.1:${PORT}/api`;

if (!email || !password) {
  console.log("railway-setup: DOCMOST_ADMIN_EMAIL or DOCMOST_ADMIN_PASSWORD is empty, setup page left open");
  process.exit(0);
}
for (let up = false; !up; await new Promise((r) => setTimeout(r, 2000))) {
  up = await fetch(`${api}/health`).then((r) => r.ok, () => false);
}
const res = await fetch(`${api}/auth/setup`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: email.split("@")[0].slice(0, 50), email, password, workspaceName }),
});
console.log(res.ok ? `railway-setup: created workspace "${workspaceName}" with owner ${email}`
  : res.status === 403 ? "railway-setup: workspace exists, nothing to do"
  : `railway-setup: setup failed (${res.status}): ${await res.text()}`);
