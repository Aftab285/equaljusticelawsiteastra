export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method === 'POST' && (url.pathname === '/api/contact' || url.pathname === '/api/submit')) {
      try {
        const data = await request.json();

        const apiKey = env.RESEND_API_KEY;
        const recipient = 'aftabnew77@gmail.com';
        const fromEmail = env.RESEND_FROM_EMAIL || 'Equal Justice Lawyers <onboarding@resend.dev>';

        const source = data.source || 'Website Contact / Evaluation Form';
        const fullName = data.full_name || data.name || data.contactName || 'Anonymous / Not Provided';
        const email = data.email || 'Not Provided';
        const phone = data.phone || data.contactPhone || data.contact || 'Not Provided';
        const caseType = data.case_type || data.caseType || 'General Legal Inquiry';
        const county = data.county || 'Not Specified';
        const timeframe = data.timeframe || 'Not Specified';
        const hasAttorney = data.has_attorney || data.hasAttorney || 'No';
        const summary = data.incident_summary || data.summary || data.notes || 'No description provided';
        const lang = data.preferred_language || (data.isSpanish ? 'Español' : 'English');

        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4eee3; margin: 0; padding: 24px; color: #1c2822; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #c8a04a; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
              .header { background: #122019; padding: 24px; text-align: center; border-bottom: 3px solid #c8a04a; }
              .header h1 { margin: 0; color: #ffffff; font-size: 20px; letter-spacing: 0.05em; }
              .header p { margin: 6px 0 0; color: #c8a04a; font-size: 13px; font-weight: 600; text-transform: uppercase; }
              .body { padding: 28px 24px; }
              .badge { display: inline-block; background: #c8a04a; color: #122019; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 20px; margin-bottom: 18px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
              td { padding: 12px 8px; border-bottom: 1px solid #e8e0d0; font-size: 14px; }
              td.label { width: 35%; color: #536359; font-weight: 600; }
              td.value { width: 65%; color: #1c2822; font-weight: 500; }
              .summary-box { background: #fbf8f2; border-left: 3px solid #c8a04a; padding: 14px 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; }
              .footer { background: #122019; padding: 16px; text-align: center; font-size: 12px; color: #c5bfb3; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>EQUAL JUSTICE LAWYERS</h1>
                <p>New Confidential Case Intake Lead</p>
              </div>
              <div class="body">
                <span class="badge">${source}</span>
                <table>
                  <tr>
                    <td class="label">Full Name:</td>
                    <td class="value"><strong>${fullName}</strong></td>
                  </tr>
                  <tr>
                    <td class="label">Email Address:</td>
                    <td class="value"><a href="mailto:${email}">${email}</a></td>
                  </tr>
                  <tr>
                    <td class="label">Phone / Contact:</td>
                    <td class="value">${phone}</td>
                  </tr>
                  <tr>
                    <td class="label">Case Category:</td>
                    <td class="value"><strong>${caseType}</strong></td>
                  </tr>
                  <tr>
                    <td class="label">California County:</td>
                    <td class="value">${county}</td>
                  </tr>
                  <tr>
                    <td class="label">Incident Timeframe:</td>
                    <td class="value">${timeframe}</td>
                  </tr>
                  <tr>
                    <td class="label">Current Attorney:</td>
                    <td class="value">${hasAttorney}</td>
                  </tr>
                  <tr>
                    <td class="label">Language:</td>
                    <td class="value">${lang}</td>
                  </tr>
                </table>

                <div style="font-weight: 600; font-size: 14px; margin-bottom: 8px;">Incident Description / Notes:</div>
                <div class="summary-box">${String(summary).replace(/\n/g, '<br>')}</div>
              </div>
              <div class="footer">
                Equal Justice Lawyers California Intake Network • Transmitted Confidentially
              </div>
            </div>
          </body>
          </html>
        `;

        if (!apiKey) {
          console.warn('RESEND_API_KEY environment secret is not set.');
          return new Response(JSON.stringify({
            success: false,
            error: 'Email service configuration missing. Please set RESEND_API_KEY in Cloudflare Pages environment variables.'
          }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [recipient],
            subject: `[New Lead: ${caseType}] ${fullName}`,
            html: html,
          }),
        });

        const resendData = await resendRes.json();

        if (!resendRes.ok) {
          console.error('Resend API error:', resendData);
          return new Response(JSON.stringify({ success: false, error: resendData }), {
            status: resendRes.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({ success: true, id: resendData.id }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err) {
        console.error('Contact handler error:', err);
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Pass all other traffic directly to static assets
    return env.ASSETS.fetch(request);
  }
};
