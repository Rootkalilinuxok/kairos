# Pull request conflict resolution

PR #2 intentionally keeps the deployable Next.js variants when merging `main`:

- `app/admin/layout.tsx` and `app/admin/page.tsx` do not import modules that are
  absent from the recovered snapshot;
- `package.json` and `package-lock.json` retain the Node.js 22 and standard
  Next.js build configuration;
- `tsconfig.json` type-checks the deployable `app/` tree while the incomplete
  handoff sources remain isolated under `migration-pages/`.

The merge commit containing this note has both the PR branch and `main` as
parents. This is required to resolve GitHub's add/add conflicts rather than
merely editing conflict markers in a separate history.
