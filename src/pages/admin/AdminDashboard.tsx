import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  MapPin,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Bookings",
      value: 1247,
      change: "12%",
      changeType: "increase" as const,
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Active Tours",
      value: 23,
      change: "3 new",
      changeType: "increase" as const,
      icon: <MapPin className="h-6 w-6 text-green-600" />,
    },
    {
      title: "Total Users",
      value: 8542,
      change: "156",
      changeType: "increase" as const,
      icon: <Users className="h-6 w-6 text-purple-600" />,
    },
    {
      title: "Monthly Revenue",
      value: "$47,521",
      change: "8.2%",
      changeType: "increase" as const,
      icon: <DollarSign className="h-6 w-6 text-orange-600" />,
    },
  ];

  const recentBookings = [
    {
      id: "BK001",
      customer: "John Smith",
      tour: "Tuscany Wine Tour",
      date: "2024-01-15",
      status: "confirmed",
      amount: "$299",
    },
    {
      id: "BK002",
      customer: "Sarah Johnson",
      tour: "Florence Art Walk",
      date: "2024-01-16",
      status: "pending",
      amount: "$149",
    },
    {
      id: "BK003",
      customer: "Mike Davis",
      tour: "Chianti Countryside",
      date: "2024-01-17",
      status: "confirmed",
      amount: "$399",
    },
    {
      id: "BK004",
      customer: "Emma Wilson",
      tour: "Pisa & Lucca Day Trip",
      date: "2024-01-18",
      status: "pending",
      amount: "$199",
    },
  ];

  const supportMessages = [
    {
      id: 1,
      customer: "Alex Brown",
      subject: "Question about wine tour",
      time: "2 hours ago",
      status: "unread",
    },
    {
      id: 2,
      customer: "Lisa Green",
      subject: "Booking cancellation",
      time: "4 hours ago",
      status: "read",
    },
    {
      id: 3,
      customer: "Tom White",
      subject: "Group booking inquiry",
      time: "1 day ago",
      status: "replied",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your tours today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Bookings
              </CardTitle>
              <CardDescription>
                Latest tour bookings and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {booking.customer}
                      </p>
                      <p className="text-sm text-gray-600">{booking.tour}</p>
                      <p className="text-xs text-gray-500">{booking.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {booking.amount}
                      </p>
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Bookings
              </Button>
            </CardContent>
          </Card>

          {/* Support Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Support Messages
              </CardTitle>
              <CardDescription>Recent customer inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      {message.status === "unread" ? (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      ) : message.status === "replied" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {message.customer}
                      </p>
                      <p className="text-sm text-gray-600">{message.subject}</p>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Messages
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <MapPin className="h-6 w-6" />
                Create New Tour
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                View All Users
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
