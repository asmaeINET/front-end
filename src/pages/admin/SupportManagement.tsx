import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Reply,
  Archive,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupportMessage {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  message: string;
  category: "booking" | "technical" | "general" | "complaint" | "refund";
  priority: "low" | "medium" | "high" | "urgent";
  status: "new" | "open" | "replied" | "resolved" | "closed";
  createdAt: string;
  lastReply?: string;
  replies?: {
    id: string;
    sender: "customer" | "admin";
    message: string;
    timestamp: string;
  }[];
}

const SupportManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(
    null,
  );
  const [replyText, setReplyText] = useState("");

  // Mock support messages data
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: "SUP001",
      customer: {
        name: "Alex Brown",
        email: "alex.brown@email.com",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      subject: "Question about wine tour inclusions",
      message:
        "Hi, I'm planning to book the Tuscany Wine Tour for next month. Could you please tell me what's included in the tour? Specifically, I'd like to know about meals, transportation, and wine tastings. Also, is there a minimum age requirement?",
      category: "booking",
      priority: "medium",
      status: "new",
      createdAt: "2024-01-14T10:30:00Z",
    },
    {
      id: "SUP002",
      customer: {
        name: "Lisa Green",
        email: "lisa.green@email.com",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      },
      subject: "Booking cancellation request",
      message:
        "I need to cancel my booking for the Florence Art Walk scheduled for January 20th due to a family emergency. My booking reference is BK123. Please let me know the cancellation policy and if I can get a refund.",
      category: "refund",
      priority: "high",
      status: "open",
      createdAt: "2024-01-13T14:15:00Z",
      lastReply: "2024-01-13T16:30:00Z",
      replies: [
        {
          id: "R001",
          sender: "admin",
          message:
            "I understand your situation and I'm sorry to hear about your family emergency. Let me check your booking details and our cancellation policy for you.",
          timestamp: "2024-01-13T16:30:00Z",
        },
      ],
    },
    {
      id: "SUP003",
      customer: {
        name: "Tom White",
        email: "tom.white@email.com",
      },
      subject: "Group booking inquiry for corporate event",
      message:
        "We're looking to organize a corporate team building event for 25 people. Do you offer group discounts? We're interested in the Chianti Countryside tour and would like to know about customization options and catering arrangements.",
      category: "booking",
      priority: "medium",
      status: "replied",
      createdAt: "2024-01-12T09:00:00Z",
      lastReply: "2024-01-12T11:45:00Z",
      replies: [
        {
          id: "R002",
          sender: "admin",
          message:
            "Thank you for your interest in our tours for your corporate event. We do offer group discounts for 20+ people. Let me prepare a custom quote for you with all the details.",
          timestamp: "2024-01-12T11:45:00Z",
        },
        {
          id: "R003",
          sender: "customer",
          message:
            "That sounds great! When can we expect to receive the quote? We need to finalize this by the end of the week.",
          timestamp: "2024-01-12T15:20:00Z",
        },
      ],
    },
    {
      id: "SUP004",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b602cf90?w=100&h=100&fit=crop&crop=face",
      },
      subject: "Website login issues",
      message:
        "I'm having trouble logging into my account on your website. I've tried resetting my password multiple times but I'm not receiving the reset email. Can you help me resolve this issue?",
      category: "technical",
      priority: "medium",
      status: "resolved",
      createdAt: "2024-01-11T13:20:00Z",
      lastReply: "2024-01-11T15:10:00Z",
    },
    {
      id: "SUP005",
      customer: {
        name: "Mike Davis",
        email: "mike.davis@email.com",
      },
      subject: "Complaint about tour guide",
      message:
        "I'm very disappointed with our recent Pisa & Lucca tour. The guide was unprofessional, arrived late, and seemed uninterested throughout the day. This ruined our anniversary celebration. I expect some form of compensation.",
      category: "complaint",
      priority: "urgent",
      status: "open",
      createdAt: "2024-01-10T16:45:00Z",
    },
  ]);

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.customer.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      message.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || message.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const updateMessageStatus = (
    messageId: string,
    newStatus: SupportMessage["status"],
  ) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, status: newStatus } : msg,
      ),
    );
    toast({
      title: "Message updated",
      description: `Status changed to ${newStatus}`,
    });
  };

  const sendReply = (messageId: string) => {
    if (!replyText.trim()) return;

    const updatedMessages = messages.map((msg) => {
      if (msg.id === messageId) {
        const newReply = {
          id: `R${Date.now()}`,
          sender: "admin" as const,
          message: replyText,
          timestamp: new Date().toISOString(),
        };
        return {
          ...msg,
          status: "replied" as const,
          lastReply: new Date().toISOString(),
          replies: [...(msg.replies || []), newReply],
        };
      }
      return msg;
    });

    setMessages(updatedMessages);
    setReplyText("");

    toast({
      title: "Reply sent",
      description: "Your response has been sent to the customer",
    });
  };

  const getStatusColor = (status: SupportMessage["status"]) => {
    switch (status) {
      case "new":
        return "default";
      case "open":
        return "secondary";
      case "replied":
        return "outline";
      case "resolved":
        return "default";
      case "closed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority: SupportMessage["priority"]) => {
    switch (priority) {
      case "low":
        return "outline";
      case "medium":
        return "secondary";
      case "high":
        return "default";
      case "urgent":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityIcon = (priority: SupportMessage["priority"]) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-4 w-4" />;
      case "high":
        return <Star className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Support Management
            </h1>
            <p className="text-gray-600">
              Manage customer inquiries and support requests
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {messages.filter((m) => m.status === "new").length}
                </p>
                <p className="text-sm text-gray-600">New</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {messages.filter((m) => m.status === "open").length}
                </p>
                <p className="text-sm text-gray-600">Open</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {messages.filter((m) => m.status === "replied").length}
                </p>
                <p className="text-sm text-gray-600">Replied</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {messages.filter((m) => m.status === "resolved").length}
                </p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {messages.filter((m) => m.priority === "urgent").length}
                </p>
                <p className="text-sm text-gray-600">Urgent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <Card>
          <CardHeader>
            <CardTitle>Support Messages ({filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={message.customer.avatar}
                          alt={message.customer.name}
                        />
                        <AvatarFallback>
                          {getInitials(message.customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">
                            {message.customer.name}
                          </h4>
                          <Badge variant={getStatusColor(message.status)}>
                            {message.status}
                          </Badge>
                          <Badge
                            variant={getPriorityColor(message.priority)}
                            className="gap-1"
                          >
                            {getPriorityIcon(message.priority)}
                            {message.priority}
                          </Badge>
                          <Badge variant="outline">{message.category}</Badge>
                        </div>
                        <h5 className="font-medium text-gray-900 mb-1">
                          {message.subject}
                        </h5>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                          {message.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>ID: {message.id}</span>
                          <span>{message.customer.email}</span>
                          <span>{formatTime(message.createdAt)}</span>
                          {message.lastReply && (
                            <span>
                              Last reply: {formatTime(message.lastReply)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMessage(message)}
                          >
                            <Reply className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {selectedMessage?.subject}
                              <Badge
                                variant={
                                  selectedMessage
                                    ? getStatusColor(selectedMessage.status)
                                    : "secondary"
                                }
                              >
                                {selectedMessage?.status}
                              </Badge>
                            </DialogTitle>
                            <DialogDescription>
                              Conversation with {selectedMessage?.customer.name}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedMessage && (
                            <div className="space-y-6">
                              {/* Original Message */}
                              <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="flex items-center gap-3 mb-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage
                                      src={selectedMessage.customer.avatar}
                                      alt={selectedMessage.customer.name}
                                    />
                                    <AvatarFallback>
                                      {getInitials(
                                        selectedMessage.customer.name,
                                      )}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {selectedMessage.customer.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {formatTime(selectedMessage.createdAt)}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-gray-700">
                                  {selectedMessage.message}
                                </p>
                              </div>

                              {/* Replies */}
                              {selectedMessage.replies &&
                                selectedMessage.replies.length > 0 && (
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">
                                      Conversation History
                                    </h4>
                                    {selectedMessage.replies.map((reply) => (
                                      <div
                                        key={reply.id}
                                        className={`border rounded-lg p-4 ${
                                          reply.sender === "admin"
                                            ? "bg-blue-50 ml-8"
                                            : "bg-gray-50 mr-8"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 mb-2">
                                          <p className="font-medium">
                                            {reply.sender === "admin"
                                              ? "You (Admin)"
                                              : selectedMessage.customer.name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {formatTime(reply.timestamp)}
                                          </p>
                                        </div>
                                        <p className="text-gray-700">
                                          {reply.message}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}

                              {/* Reply Form */}
                              <div className="space-y-4">
                                <Label htmlFor="reply">Your Reply</Label>
                                <Textarea
                                  id="reply"
                                  placeholder="Type your response here..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  rows={4}
                                />
                                <div className="flex justify-between">
                                  <div className="flex gap-2">
                                    <Select
                                      value={selectedMessage.status}
                                      onValueChange={(
                                        value: SupportMessage["status"],
                                      ) =>
                                        updateMessageStatus(
                                          selectedMessage.id,
                                          value,
                                        )
                                      }
                                    >
                                      <SelectTrigger className="w-32">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="open">
                                          Open
                                        </SelectItem>
                                        <SelectItem value="replied">
                                          Replied
                                        </SelectItem>
                                        <SelectItem value="resolved">
                                          Resolved
                                        </SelectItem>
                                        <SelectItem value="closed">
                                          Closed
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button
                                    onClick={() =>
                                      sendReply(selectedMessage.id)
                                    }
                                    disabled={!replyText.trim()}
                                  >
                                    Send Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Select
                        value={message.status}
                        onValueChange={(value: SupportMessage["status"]) =>
                          updateMessageStatus(message.id, value)
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredMessages.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No messages found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SupportManagement;
