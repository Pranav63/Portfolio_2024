import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 540px; color: #1a1a1a;">
          <div style="background: #090C18; padding: 24px 28px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #C9A84C; margin: 0; font-size: 1.1rem; letter-spacing: 0.05em;">
              NEW MESSAGE — PORTFOLIO
            </h2>
          </div>
          <div style="background: #f9f9f9; padding: 28px; border-radius: 0 0 12px 12px; border: 1px solid #eee;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 0.85rem; width: 80px;">Name</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 0.95rem;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 0.85rem;">Email</td>
                <td style="padding: 8px 0; font-size: 0.95rem;">
                  <a href="mailto:${email}" style="color: #C9A84C; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #888; font-size: 0.85rem; margin: 0 0 10px;">Message</p>
            <p style="line-height: 1.75; font-size: 0.95rem; margin: 0; white-space: pre-wrap;">${message}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 16px;" />
            <p style="color: #bbb; font-size: 0.75rem; margin: 0;">
              Sent from pranavarora.vercel.app · Reply directly to this email to respond.
            </p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error('sendEmail error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }
}