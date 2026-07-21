// ─────────────────────────────────────────────────────────────────────────────
// emailer.js  —  ALL EMAIL SENDING FOR BOFFO'S
//
// Requires: npm install nodemailer dotenv
// Credentials come from .env — see that file for setup instructions.
//
// If EMAIL_USER / EMAIL_PASS are not set, emails are silently skipped
// so the server and ordering flow keep working regardless.
// ─────────────────────────────────────────────────────────────────────────────

const nodemailer = require('nodemailer');

const BIZ_NAME    = process.env.BUSINESS_NAME    || "Boffo's Fine Foods";
const BIZ_EMAIL   = process.env.BUSINESS_EMAIL   || process.env.EMAIL_USER || '';
const BIZ_PHONE   = process.env.BUSINESS_PHONE   || '905-845-9303';
const BIZ_ADDRESS = process.env.BUSINESS_ADDRESS || '334 Kerr St, Oakville, ON L6K 3B5';
const SITE_URL    = process.env.SITE_URL          || 'http://localhost:3000';

// Lazily created so the server still starts if credentials aren't set yet
let _transporter = null;

function getTransporter(){
    if (_transporter) return _transporter;
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS ||
        process.env.EMAIL_PASS === 'your-app-password-here') {
        console.warn('[email] EMAIL_USER / EMAIL_PASS not configured in .env — emails are disabled.');
        return null;
    }
    _transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    return _transporter;
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function formatPickupDate(dateStr){
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-CA', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

// Wraps any body HTML in the Boffo's branded email shell
function wrap(body){
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Boffo's Fine Foods</title>
</head>
<body style="margin:0;padding:0;background:#f0ece4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece4;padding:30px 10px;">
  <tr><td align="center">
    <table cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.1);">

      <!-- HEADER -->
      <tr>
        <td style="background:#8B1E1E;padding:28px 32px;text-align:center;">
          <div style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">${BIZ_NAME.toUpperCase()}</div>
          <div style="color:rgba(255,255,255,.65);font-size:11px;margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Oakville, Ontario</div>
        </td>
      </tr>

      <!-- BODY -->
      <tr><td style="padding:32px 32px 24px;">${body}</td></tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:#f5f0e8;padding:18px 32px;text-align:center;border-top:1px solid #e0d8cc;">
          <p style="margin:0 0 4px;font-size:11px;color:#999;">${BIZ_ADDRESS}</p>
          <p style="margin:0;font-size:11px;color:#999;">
            ${BIZ_PHONE} &nbsp;·&nbsp;
            <a href="mailto:${BIZ_EMAIL}" style="color:#8B1E1E;text-decoration:none;">${BIZ_EMAIL}</a>
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// Renders a styled items table (shared by all three emails)
function itemsTable(items, total){
    const rows = items.map(i => `
      <tr>
        <td style="padding:9px 12px;font-size:13px;color:#333;border-bottom:1px solid #f0ece4;">
          ${i.name}
          ${i.notes ? `<div style="font-size:11px;color:#888;margin-top:2px;font-style:italic;">Note: ${i.notes}</div>` : ''}
        </td>
        <td style="padding:9px 12px;font-size:13px;color:#555;text-align:center;border-bottom:1px solid #f0ece4;">${i.qty}</td>
        <td style="padding:9px 12px;font-size:13px;color:#333;text-align:right;border-bottom:1px solid #f0ece4;">$${(i.price * i.qty).toFixed(2)}</td>
      </tr>`).join('');

    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d0;border-radius:4px;overflow:hidden;margin:14px 0;">
      <thead>
        <tr style="background:#8B1E1E;">
          <th style="padding:9px 12px;color:#fff;font-size:11px;font-weight:700;text-align:left;letter-spacing:.5px;text-transform:uppercase;">Item</th>
          <th style="padding:9px 12px;color:#fff;font-size:11px;font-weight:700;text-align:center;letter-spacing:.5px;text-transform:uppercase;">Qty</th>
          <th style="padding:9px 12px;color:#fff;font-size:11px;font-weight:700;text-align:right;letter-spacing:.5px;text-transform:uppercase;">Price</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr style="background:#f5f0e8;">
          <td colspan="2" style="padding:10px 12px;font-size:14px;font-weight:700;color:#333;">Total</td>
          <td style="padding:10px 12px;font-size:14px;font-weight:700;color:#8B1E1E;text-align:right;">$${Number(total).toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>`;
}

function pickupBadge(pickup, time, bgColor='#f5f0e8', textColor='#8B1E1E'){
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="background:${bgColor};padding:12px 16px;border-radius:4px;">
          <div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px;">Pickup</div>
          <div style="font-size:17px;font-weight:700;color:${textColor};">${pickup}</div>
          ${time ? `<div style="font-size:14px;font-weight:600;color:${textColor};margin-top:3px;">${time}</div>` : ''}
        </td>
      </tr>
    </table>`;
}

function formatTime(timeStr){
    if (!timeStr) return '';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${h12}:${String(m).padStart(2,'0')} ${period}`;
}

// ── EMAIL 1: CUSTOMER ORDER CONFIRMATION ─────────────────────────────────────

async function sendOrderConfirmation({ name, email, pickupDate, pickupTime, items, total, menuSlug }){
    const t = getTransporter(); if (!t) return;
    const pickup = formatPickupDate(pickupDate);
    const time   = formatTime(pickupTime);
    const menuLabels = { christmas:'🎄 Christmas', thanksgiving:'🦃 Thanksgiving', easter:'🐣 Easter' };
    const menuLabel = menuLabels[menuSlug] || 'Seasonal';

    const html = wrap(`
        <h2 style="margin:0 0 8px;font-size:22px;color:#8B1E1E;">Thank you for your order!</h2>
        <p style="margin:0 0 22px;font-size:14px;color:#666;line-height:1.6;">
          Hi <strong>${name}</strong>, we've received your ${menuLabel} order and we're so excited to have it ready for you.
        </p>

        ${pickupBadge(pickup, time)}

        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.5px;">Order Summary</p>
        ${itemsTable(items, total)}

        <div style="background:#fff8e6;border:1px solid #C9A55B;border-radius:4px;padding:14px 16px;margin-top:20px;">
          <p style="margin:0;font-size:14px;color:#7a5000;line-height:1.6;">
            <strong>Need to make a change?</strong><br>
            Send your request to
            <a href="mailto:${BIZ_EMAIL}" style="color:#8B1E1E;font-weight:600;">${BIZ_EMAIL}</a>
            or call us at <strong>${BIZ_PHONE}</strong> and we'll take care of it.
          </p>
        </div>

        <p style="margin:22px 0 0;font-size:13px;color:#999;text-align:center;line-height:1.6;">
          Pickup is at <strong style="color:#555;">${BIZ_ADDRESS}</strong>.<br>
          We'll be in touch when your order is ready.
        </p>
    `);

    try {
        await t.sendMail({
            from: `"${BIZ_NAME}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Your ${menuLabel} Order is Confirmed — Pickup ${pickup}`,
            html,
        });
        console.log(`[email] Confirmation sent to ${email}`);
    } catch (err) {
        console.error('[email] Failed to send confirmation:', err.message);
    }
}

// ── EMAIL 2: BUSINESS ORDER NOTIFICATION ─────────────────────────────────────

async function sendOrderNotification({ name, email, phone, pickupDate, pickupTime, items, total, orderId, menuSlug }){
    const t = getTransporter(); if (!t) return;
    const pickup = formatPickupDate(pickupDate);
    const time   = formatTime(pickupTime);
    const menuLabels = { christmas:'🎄 Christmas', thanksgiving:'🦃 Thanksgiving', easter:'🐣 Easter' };
    const menuLabel = menuLabels[menuSlug] || 'Seasonal';
    const placedAt = new Date().toLocaleString('en-CA', { dateStyle:'medium', timeStyle:'short' });

    const html = wrap(`
        <h2 style="margin:0 0 6px;font-size:20px;color:#8B1E1E;">New ${menuLabel} Order</h2>
        <p style="margin:0 0 22px;font-size:13px;color:#999;">Order #${orderId} · Placed ${placedAt}</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d0;border-radius:4px;overflow:hidden;margin-bottom:20px;">
          <tr style="background:#f5f0e8;">
            <td colspan="2" style="padding:10px 14px;font-size:11px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.5px;">Customer</td>
          </tr>
          <tr>
            <td style="padding:9px 14px;font-size:13px;color:#888;width:100px;">Name</td>
            <td style="padding:9px 14px;font-size:13px;font-weight:600;color:#333;">${name}</td>
          </tr>
          <tr style="background:#f9f7f3;">
            <td style="padding:9px 14px;font-size:13px;color:#888;">Email</td>
            <td style="padding:9px 14px;font-size:13px;">
              <a href="mailto:${email}" style="color:#8B1E1E;text-decoration:none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:9px 14px;font-size:13px;color:#888;">Phone</td>
            <td style="padding:9px 14px;font-size:13px;">
              <a href="tel:${phone}" style="color:#8B1E1E;text-decoration:none;">${phone}</a>
            </td>
          </tr>
          <tr style="background:#f9f7f3;">
            <td style="padding:9px 14px;font-size:13px;color:#888;">Pickup</td>
            <td style="padding:9px 14px;font-size:13px;font-weight:700;color:#8B1E1E;">${pickup}${time ? ' at ' + time : ''}</td>
          </tr>
        </table>

        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.5px;">Items Ordered</p>
        ${itemsTable(items, total)}

        <p style="margin:18px 0 0;font-size:12px;color:#aaa;text-align:center;">
          <a href="${SITE_URL}/admin/dashboard.html" style="color:#8B1E1E;text-decoration:none;">View in Admin Dashboard →</a>
        </p>
    `);

    try {
        await t.sendMail({
            from: `"${BIZ_NAME} Orders" <${process.env.EMAIL_USER}>`,
            to: BIZ_EMAIL,
            subject: `New Order — ${name} · ${menuLabel} · Pickup ${pickup}`,
            html,
        });
        console.log(`[email] Business notification sent to ${BIZ_EMAIL}`);
    } catch (err) {
        console.error('[email] Failed to send business notification:', err.message);
    }
}

// ── EMAIL 3: CUSTOMER ORDER COMPLETION ───────────────────────────────────────

async function sendCompletionEmail({ name, email, pickupDate, pickupTime, items, total, orderId, menuSlug }){
    const t = getTransporter(); if (!t) return;
    const pickup = formatPickupDate(pickupDate);
    const time   = formatTime(pickupTime);
    const menuEmojis = { christmas:'🎄', thanksgiving:'🦃', easter:'🐣' };
    const emoji = menuEmojis[menuSlug] || '🎉';

    const html = wrap(`
        <h2 style="margin:0 0 8px;font-size:22px;color:#1a6b3c;">Your order is ready! ${emoji}</h2>
        <p style="margin:0 0 22px;font-size:14px;color:#666;line-height:1.6;">
          Hi <strong>${name}</strong>, great news — your order is packed and waiting for you!
        </p>

        ${pickupBadge(pickup, time, '#e8f5eb', '#1a6b3c')}

        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.5px;">Your Order</p>
        ${itemsTable(items, total)}

        <div style="background:#f5f0e8;border-radius:4px;padding:14px 16px;margin-top:20px;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#333;">📍 Where to pick up</p>
          <p style="margin:0 0 6px;font-size:14px;color:#555;">${BIZ_ADDRESS}</p>
          <p style="margin:0;font-size:12px;color:#999;">Tue–Fri 11am–6pm (closes 4pm Wed/Thu) · Sat 9am–5pm · Closed Sun & Mon</p>
        </div>

        <div style="background:#fff8e6;border:1px solid #C9A55B;border-radius:4px;padding:14px 16px;margin-top:12px;">
          <p style="margin:0;font-size:14px;color:#7a5000;line-height:1.6;">
            <strong>Questions?</strong>
            Call us at <strong>${BIZ_PHONE}</strong> or email
            <a href="mailto:${BIZ_EMAIL}" style="color:#8B1E1E;font-weight:600;">${BIZ_EMAIL}</a>.
          </p>
        </div>

        <p style="margin:24px 0 0;font-size:15px;color:#333;text-align:center;font-weight:600;line-height:1.6;">
          See you soon — from everyone at Boffo's! ${emoji}
        </p>
    `);

    try {
        await t.sendMail({
            from: `"${BIZ_NAME}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Your Order is Ready for Pickup! ${emoji}`,
            html,
        });
        console.log(`[email] Completion email sent to ${email}`);
    } catch (err) {
        console.error('[email] Failed to send completion email:', err.message);
    }
}

// ── EMAIL 4: DAY-BEFORE REMINDER ─────────────────────────────────────────────

async function sendReminderEmail({ name, email, pickupDate, pickupTime, items, total, orderId, menuSlug }){
    const t = getTransporter(); if (!t) return;
    const pickup = formatPickupDate(pickupDate);
    const time   = formatTime(pickupTime);
    const menuLabels = { christmas:'🎄 Christmas', thanksgiving:'🦃 Thanksgiving', easter:'🐣 Easter' };
    const menuEmojis = { christmas:'🎄', thanksgiving:'🦃', easter:'🐣' };
    const menuLabel  = menuLabels[menuSlug] || 'Seasonal';
    const emoji      = menuEmojis[menuSlug] || '🎉';

    const html = wrap(`
        <h2 style="margin:0 0 8px;font-size:22px;color:#8B1E1E;">Your order is tomorrow! ${emoji}</h2>
        <p style="margin:0 0 22px;font-size:14px;color:#666;line-height:1.6;">
            Hi <strong>${name}</strong>, just a friendly reminder that your ${menuLabel} order is scheduled for pickup tomorrow.
        </p>

        ${pickupBadge(pickup, time)}

        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.5px;">Your Order</p>
        ${itemsTable(items, total)}

        <div style="background:#f5f0e8;border-radius:4px;padding:14px 16px;margin-top:20px;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#333;">📍 Pickup Location</p>
            <p style="margin:0 0 6px;font-size:14px;color:#555;">${BIZ_ADDRESS}</p>
            <p style="margin:0;font-size:12px;color:#999;">Tue–Fri 11am–6pm (closes 4pm Wed/Thu) · Sat 9am–5pm</p>
        </div>

        <div style="background:#fff8e6;border:1px solid #C9A55B;border-radius:4px;padding:14px 16px;margin-top:12px;">
            <p style="margin:0;font-size:14px;color:#7a5000;line-height:1.6;">
                <strong>Need to make a last-minute change?</strong><br>
                Call us at <strong>${BIZ_PHONE}</strong> or email
                <a href="mailto:${BIZ_EMAIL}" style="color:#8B1E1E;font-weight:600;">${BIZ_EMAIL}</a>.
            </p>
        </div>

        <p style="margin:24px 0 0;font-size:14px;color:#333;text-align:center;">
            We can't wait to see you tomorrow! ${emoji}
        </p>
    `);

    try {
        await t.sendMail({
            from:    `"${BIZ_NAME}" <${process.env.EMAIL_USER}>`,
            to:      email,
            subject: `Reminder: Your Boffo's ${menuLabel} Order is Tomorrow! ${emoji}`,
            html,
        });
        console.log(`[email] Reminder sent to ${email} for order #${orderId}`);
    } catch (err) {
        console.error('[email] Failed to send reminder:', err.message);
        throw err; // re-throw so the cron job can mark it unsent and retry tomorrow
    }
}

// ── EMAIL 5: MEAT PRICING CONFIRMATION ───────────────────────────────────────

async function sendMeatPricingEmail({ name, email, pickupDate, pickupTime, pricedItems, orderId, menuSlug }){
    const t = getTransporter(); if (!t) return;
    const pickup = formatPickupDate(pickupDate);
    const time   = formatTime(pickupTime);
    const menuEmojis = { christmas:'🎄', thanksgiving:'🦃', easter:'🐣' };
    const emoji      = menuEmojis[menuSlug] || '🎉';

    const itemRows = pricedItems.map(i => `
      <tr>
        <td style="padding:9px 12px;font-size:13px;color:#333;border-bottom:1px solid #f0ece4;">${i.name}</td>
        <td style="padding:9px 12px;font-size:13px;color:#555;text-align:center;border-bottom:1px solid #f0ece4;">${Number(i.weightLbs).toFixed(2)} lbs</td>
        <td style="padding:9px 12px;font-size:13px;font-weight:700;color:#333;text-align:right;border-bottom:1px solid #f0ece4;">$${Number(i.confirmedPrice).toFixed(2)}</td>
      </tr>`).join('');

    const meatTotal = pricedItems.reduce((s, i) => s + Number(i.confirmedPrice), 0);

    const html = wrap(`
        <h2 style="margin:0 0 8px;font-size:22px;color:#8B1E1E;">Your meat order is confirmed! ${emoji}</h2>
        <p style="margin:0 0 22px;font-size:14px;color:#666;line-height:1.6;">
            Hi <strong>${name}</strong>, we've weighed your meat order and can now confirm the final pricing below.
        </p>

        ${pickupBadge(pickup, time)}

        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#555;text-transform:uppercase;letter-spacing:.5px;">Meat Pricing Confirmed</p>

        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e0d0;border-radius:4px;overflow:hidden;margin:14px 0;">
          <thead>
            <tr style="background:#8B1E1E;">
              <th style="padding:9px 12px;color:#fff;font-size:11px;font-weight:700;text-align:left;letter-spacing:.5px;text-transform:uppercase;">Item</th>
              <th style="padding:9px 12px;color:#fff;font-size:11px;font-weight:700;text-align:center;letter-spacing:.5px;text-transform:uppercase;">Weight</th>
              <th style="padding:9px 12px;color:#fff;font-size:11px;font-weight:700;text-align:right;letter-spacing:.5px;text-transform:uppercase;">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr style="background:#f5f0e8;">
              <td colspan="2" style="padding:10px 12px;font-size:14px;font-weight:700;color:#333;">Meat Total</td>
              <td style="padding:10px 12px;font-size:14px;font-weight:700;color:#8B1E1E;text-align:right;">$${meatTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <p style="margin:0 0 20px;font-size:13px;color:#888;line-height:1.6;">
            Any other items in your order remain at their original price. Your updated total will be provided at pickup.
        </p>

        <div style="background:#fff8e6;border:1px solid #C9A55B;border-radius:4px;padding:14px 16px;">
            <p style="margin:0;font-size:14px;color:#7a5000;line-height:1.6;">
                <strong>Questions about your pricing?</strong><br>
                Call us at <strong>${BIZ_PHONE}</strong> or email
                <a href="mailto:${BIZ_EMAIL}" style="color:#8B1E1E;font-weight:600;">${BIZ_EMAIL}</a>.
            </p>
        </div>

        <p style="margin:24px 0 0;font-size:13px;color:#888;text-align:center;">
            We look forward to seeing you at pickup! ${emoji}
        </p>
    `);

    try {
        await t.sendMail({
            from:    `"${BIZ_NAME}" <${process.env.EMAIL_USER}>`,
            to:      email,
            subject: `Your Meat Order Pricing is Confirmed — Order #${orderId}`,
            html,
        });
        console.log(`[email] Meat pricing confirmation sent to ${email} for order #${orderId}`);
    } catch (err) {
        console.error('[email] Failed to send meat pricing email:', err.message);
    }
}

module.exports = { sendOrderConfirmation, sendOrderNotification, sendCompletionEmail, sendReminderEmail, sendMeatPricingEmail };
