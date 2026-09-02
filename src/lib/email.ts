import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.EMAIL_FROM ?? 'RegenUS <noreply@regenus.org>';
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://regenus.org';

async function send(to: string, subject: string, html: string) {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping email to', to);
    return;
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
  } catch (e) {
    console.error('[email] send failed:', e);
  }
}

function base(previewText: string, content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${previewText}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">${previewText}</span>
  <div style="max-width:580px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:#0f172a;border-radius:12px 12px 0 0;padding:24px 32px;">
      <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">RegenUS</p>
      <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">Farms &amp; Farm-to-Table Directory</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;border-radius:0 0 12px 12px;padding:36px 32px;border:1px solid #e7e5e4;border-top:none;">
      ${content}
    </div>

    <!-- Footer -->
    <p style="text-align:center;font-size:11px;color:#a8a29e;margin-top:20px;line-height:1.6;">
      © ${new Date().getFullYear()} RegenUS &nbsp;·&nbsp;
      <a href="${SITE}" style="color:#a8a29e;text-decoration:underline;">regenus.org</a>
    </p>

  </div>
</body>
</html>`;
}

function btn(text: string, url: string) {
  return `<a href="${url}" style="display:inline-block;background:#1e293b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;margin-top:8px;">${text}</a>`;
}

function statusColor(status: string) {
  if (status === 'approved') return '#1e293b';
  if (status === 'rejected') return '#991b1b';
  if (status === 'needs_clarification') return '#92400e';
  return '#44403c';
}

function statusLabel(status: string) {
  if (status === 'approved') return 'Approved';
  if (status === 'rejected') return 'Not Approved';
  if (status === 'needs_clarification') return 'Needs Clarification';
  return status;
}

// ─── Application Received ───────────────────────────────────────────────────

export async function sendApplicationConfirmation(
  to: string,
  entityName: string,
  type: 'restaurant' | 'farm'
) {
  const label = type === 'restaurant' ? 'restaurant application' : 'farm registration';
  const dashboard = type === 'restaurant' ? `${SITE}/dashboard/restaurant` : `${SITE}/dashboard/farm`;

  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1c1917;">We received your application</h1>
    <p style="margin:0 0 20px;font-size:14px;color:#78716c;">Thank you for submitting your ${label}.</p>

    <div style="background:#f1f5f9;border:1px solid #cbd5e1;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0;font-size:13px;font-weight:600;color:#1e293b;">${entityName}</p>
      <p style="margin:4px 0 0;font-size:13px;color:#334155;">Application received — pending review</p>
    </div>

    <p style="margin:0 0 8px;font-size:14px;color:#57534e;">What happens next:</p>
    <ul style="margin:0 0 24px;padding-left:20px;font-size:14px;color:#57534e;line-height:1.8;">
      <li>Our team will review your ${type === 'restaurant' ? 'restaurant profile' : 'farm profile and certifications'}</li>
      <li>We may reach out if we need additional information</li>
      <li>You'll receive an email once a decision has been made</li>
    </ul>

    <p style="margin:0 0 20px;font-size:14px;color:#57534e;">You can check your application status at any time from your dashboard.</p>
    ${btn('Go to Dashboard', dashboard)}
  `;

  await send(to, `Application received — ${entityName}`, base(`We received your ${label} for ${entityName}`, content));
}

// ─── Restaurant Decision ──────────────────────────────────────────────────────

export async function sendRestaurantDecision(to: string, restaurantName: string, status: string) {
  const color = statusColor(status);
  const label = statusLabel(status);

  let headline = '';
  let body = '';

  if (status === 'approved') {
    headline = 'Your restaurant has been approved!';
    body = `<p style="margin:0 0 16px;font-size:14px;color:#57534e;">Welcome to the RegenUS network. <strong>${restaurantName}</strong> is now listed in the public directory as a farm-to-table partner.</p>`;
  } else {
    headline = 'Your restaurant application was not approved';
    body = `<p style="margin:0 0 16px;font-size:14px;color:#57534e;">After review, we were unable to approve the listing for <strong>${restaurantName}</strong> at this time. If you have questions or would like to discuss your application, please reach out to us directly.</p>`;
  }

  const content = `
    <div style="display:inline-block;background:${color}20;border:1px solid ${color}40;border-radius:20px;padding:4px 12px;margin-bottom:16px;">
      <span style="font-size:12px;font-weight:600;color:${color};">${label}</span>
    </div>
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1c1917;">${headline}</h1>
    ${body}
    ${btn('View Dashboard', `${SITE}/dashboard/restaurant`)}
    <p style="margin:20px 0 0;font-size:13px;color:#a8a29e;">
      Questions? Email us at <a href="mailto:info@regenus.org" style="color:#1e293b;">info@regenus.org</a>
    </p>
  `;

  await send(to, `${label} — ${restaurantName}`, base(headline, content));
}

// ─── Password Reset ───────────────────────────────────────────────────────────

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const content = `
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1c1917;">Reset your password</h1>
    <p style="margin:0 0 20px;font-size:14px;color:#78716c;">
      A password reset was requested for your RegenUS account. Click the button below to set a new password.
      This link expires in 24 hours.
    </p>
    ${btn('Reset Password', resetLink)}
    <p style="margin:20px 0 0;font-size:12px;color:#a8a29e;">
      If you didn't request this, you can safely ignore this email. Your password will not change.
    </p>
  `;
  await send(to, 'Reset your RegenUS password', base('Reset your password', content));
}

// ─── Farm Decision ────────────────────────────────────────────────────────────

export async function sendFarmDecision(to: string, farmName: string, status: string) {
  const color = statusColor(status);
  const label = statusLabel(status);

  let headline = '';
  let body = '';

  if (status === 'approved') {
    headline = 'Your farm has been approved!';
    body = `<p style="margin:0 0 16px;font-size:14px;color:#57534e;">Welcome to the RegenUS network. <strong>${farmName}</strong> is now listed in the public directory and visible to restaurants looking for verified local suppliers.</p>`;
  } else {
    headline = 'Your farm application was not approved';
    body = `<p style="margin:0 0 16px;font-size:14px;color:#57534e;">After review, we were unable to approve the listing for <strong>${farmName}</strong> at this time. If you have questions or would like to discuss your application, please reach out to us directly.</p>`;
  }

  const content = `
    <div style="display:inline-block;background:${color}20;border:1px solid ${color}40;border-radius:20px;padding:4px 12px;margin-bottom:16px;">
      <span style="font-size:12px;font-weight:600;color:${color};">${label}</span>
    </div>
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1c1917;">${headline}</h1>
    ${body}
    ${btn('View Dashboard', `${SITE}/dashboard/farm`)}
    <p style="margin:20px 0 0;font-size:13px;color:#a8a29e;">
      Questions? Email us at <a href="mailto:info@regenus.org" style="color:#1e293b;">info@regenus.org</a>
    </p>
  `;

  await send(to, `${label} — ${farmName}`, base(headline, content));
}
