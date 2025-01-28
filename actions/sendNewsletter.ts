import { AppContext } from "../apps/site.ts";

interface Props {
  email: string;
}

export default async function action(
  props: Props,
  _req: Request,
  _ctx: AppContext,
) {
  const serviceId = "service_3171aym";
  const templateId = "template_qvx224r";
  const publicKey = "wXuElPf2NB7DdV69z";
  const privateKey = "Iw7uNYXwk5V91CxeYo9hy";

  const emailData = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      ...props,
    },
    accessToken: privateKey,
  };

  try {
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
