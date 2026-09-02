# COEP ENTC 1983 Reunion — V2

Release baseline: 2026-09-02

## Included
- Successful end-to-end magic-link login test.
- Visible sign-in resend countdown to reduce repeated requests and Supabase email rate limiting.
- Clear first-login guidance for Supabase's "Confirm your email address" message.
- Admin authorization remains role-based through Supabase RLS and the reunion_roles table.

## Security review
A configuration/code-level penetration review was performed against the production Supabase project and the repository.

Current controls verified:
- RLS enabled on all primary reunion data tables.
- Private profile rows are restricted to the owner or an admin.
- Admin writes/deletes are protected by reunion_is_admin().
- Storage upload/update/delete paths are restricted to the authenticated user's UUID or an admin.
- The public directory view uses security_invoker=true, so it does not bypass the underlying reunion_members RLS.
- No service-role key or hard-coded administrator email was found in the repository search.

Follow-up hardening noted:
- The public email-registration RPC intentionally reveals whether an email is present in the class list. This supports the current login UX but permits email-list enumeration by an unauthenticated caller. Consider replacing it with a non-enumerating login response or moving the check server-side.
- The authenticated self-update policy permits a member to update all columns of their own reunion_members row. This should be narrowed to profile-editable columns in a future hardening pass, especially auth_user_id and role-related identity fields.
- The unused authenticated claim-by-phone RPC should be reviewed/removed or tightened if no longer required.

This release is a tested application baseline, not a guarantee of immunity from all attacks.
