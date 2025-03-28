import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Form, useLoaderData } from "@remix-run/react";
import { fetchTickets } from "~/lib/mocks";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { tickets } = await fetchTickets();
  const url = new URL(request.url);
  const type =  url.searchParams.get('type');
  const text = url.searchParams.get('text');
  const currentTab = url.searchParams.get('currentTab');
  return { tickets, submitMessage: { type, text }, currentTab };
};

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState("new-request");
  const {
    tickets: existingRequests,
    submitMessage,
    currentTab,
  } = useLoaderData<typeof loader>();

  useEffect(() => {
    if(currentTab) {
      setActiveTab(currentTab);
    }
  }, [currentTab]);
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">
              Customer Support
            </h1>
            <p className="text-gray-600 text-center mb-8">
              We&apos;re here to help! Submit a new request or view the status
              of your existing requests.
            </p>

            {submitMessage.text && (
              <div
                className={`p-4 mb-6 rounded-md ${
                  submitMessage.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full flex flex-col gap-4"
            >
              <TabsList className="grid w-full h-max grid-cols-2 gap-2 p-2 items-center justify-center">
                <TabsTrigger value="new-request">
                  <Form action="new">
                    <button type="submit">New</button>
                  </Form>
                </TabsTrigger>
                <TabsTrigger value="view-requests">
                  <Form>
                    <button type="submit">View Existing Requests</button>
                  </Form>
                </TabsTrigger>
              </TabsList>

              {/* New Request Form */}
              <TabsContent value="new-request">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Support Request</CardTitle>
                    <CardDescription className="space-y-4 mt-2">
                      <p>
                        {" "}
                        Please provide details about your issue and we&apos;ll
                        get back to you as soon as possible.
                      </p>
                      <Form action="new">
                        <Button variant="outline" type="submit">
                          Create New Request
                        </Button>
                      </Form>
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </TabsContent>

              {/* View Existing Requests */}
              <TabsContent value="view-requests">
                {existingRequests?.length ? (
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Button
                            variant="ghost"
                            className="mb-2 -ml-4 text-gray-500 hover:text-gray-700"
                          >
                            ← Back to Requests
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {existingRequests.map((selectedRequest, i) => {
                        return (
                          <div key={i} className="mb-4">
                            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                              <div>
                                <span className="font-medium text-gray-500">
                                  Created:
                                </span>{" "}
                                {new Date(selectedRequest.createdAt).toUTCString()}
                              </div>
                              <div>
                                <span className="font-medium text-gray-500">
                                  Order Number:
                                </span>{" "}
                                {selectedRequest.orderNumber}
                              </div>
                            </div>

                            <div className="mb-6">
                              <h3 className="font-medium text-gray-700 mb-2">
                              {selectedRequest.subject}
                              </h3>
                              <div className="space-y-4">
                                {selectedRequest.description}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Support Requests</CardTitle>
                      <CardDescription>
                        View and manage your existing support requests.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {existingRequests.length === 0 ? (
                        <div className="text-center py-6">
                          <p className="text-gray-500">
                            You don&apos;t have any support requests yet.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {existingRequests.map((request) => (
                            <div
                              key={request.id}
                              className="border rounded-lg p-4 hover:border-gray-300 cursor-pointer transition-colors"
                            >
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="font-medium mb-1">
                                    {request.subject}
                                  </h3>
                                  <div className="text-sm text-gray-500 mb-2">
                                    {request.id} •{" "}
                                    {new Date(request.createdAt).toUTCString()}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {request.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <p className="text-sm text-gray-500">
                        Showing {existingRequests.length} requests
                      </p>
                    </CardFooter>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
