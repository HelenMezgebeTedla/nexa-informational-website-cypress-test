import { Resend } from "resend";

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let body = {};

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "New Contact Message").trim();
    const message = String(body.message || "").trim();

    if (!email || !message) {
      return Response.json(
        { success: false, error: "Please provide your email and message." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (name.length > 200 || subject.length > 200 || message.length > 10000) {
      return Response.json(
        { success: false, error: "One or more fields are too long." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_TO_EMAIL;
    const sender =
      process.env.CONTACT_FROM_EMAIL ||
      "ZamLine Contact <onboarding@resend.dev>";

    if (!apiKey || !recipient) {
      console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL.");
      return Response.json(
        {
          success: false,
          error: "The email service is not configured correctly.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: email,
      subject: `ZamLine Contact: ${subject}`,
      text: `Name: ${name || "Not provided"}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        {
          success: false,
          error: "The email could not be sent. Please try again.",
          ...(process.env.NODE_ENV !== "production" && {
            debug: error.message,
          }),
        },
        { status: 502 },
      );
    }

    return Response.json(
      { success: true, message: "Your message has been sent.", id: data?.id },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json(
      {
        success: false,
        error: "Something went wrong while sending your message.",
      },
      { status: 500 },
    );
  }
}
