import { Form, Link, redirect } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { ActionFunctionArgs } from "@remix-run/node";
import { ticketSystem } from "~/lib/ticketmanager";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const subject = data.subject as string;
  const description = data.description as string;
  const orderNumber = data.orderNumber as string;
  ticketSystem.createTicket(subject, description, orderNumber);

  return redirect(`/support?text=Your request has been submitted&type=success&currentTab=view-requests`);
};
const SupportForm = () => {
  return (
    <Form
      method="POST"
      className="flex flex-col gap-2 min-h-screen w-full justify-start items-center px-6 pt-6 "
    >
      <h3 className="font-bold text-lg">Support</h3>
      <div className="grid gap-6 mx-auto mt-10">
        <div className="grid gap-3">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="Brief description of your issue"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="orderNumber">Order Number (if applicable)</Label>
          <Input id="orderNumber" name="orderNumber" placeholder="e.g. 12345" />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Please provide detailed information about your issue"
            rows={5}
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mx-auto ">
        <Button type="submit" className="w-full mt-6">
          Submit Request
        </Button>
        <Link to="/support">
          <Button type="button" className="w-full mt-6">
            Cancel Request
          </Button>
        </Link>
      </div>
    </Form>
  );
};

export default SupportForm;
