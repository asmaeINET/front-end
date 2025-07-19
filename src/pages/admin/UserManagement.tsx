import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Search, Eye, Ban, UserCheck, Download, Mail } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "active" | "inactive" | "banned";
  joinDate: string;
  lastLogin: string;
  totalBookings: number;
  totalSpent: number;
  phone?: string;
  location?: string;
  preferences?: string[];
}

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      status: "active",
      joinDate: "2023-06-15",
      lastLogin: "2024-01-14",
      totalBookings: 5,
      totalSpent: 1495,
      phone: "+1 234 567 8900",
      location: "New York, USA",
      preferences: ["Wine Tours", "Art & Culture"],
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b602cf90?w=100&h=100&fit=crop&crop=face",
      status: "active",
      joinDate: "2023-08-22",
      lastLogin: "2024-01-13",
      totalBookings: 3,
      totalSpent: 897,
      phone: "+1 234 567 8901",
      location: "San Francisco, USA",
      preferences: ["Adventure", "Sightseeing"],
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      status: "active",
      joinDate: "2023-04-10",
      lastLogin: "2024-01-12",
      totalBookings: 8,
      totalSpent: 2340,
      phone: "+1 234 567 8902",
      location: "Chicago, USA",
      preferences: ["Wine Tours", "Relaxation", "Food & Dining"],
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      status: "inactive",
      joinDate: "2023-12-05",
      lastLogin: "2023-12-20",
      totalBookings: 1,
      totalSpent: 199,
      phone: "+1 234 567 8903",
      location: "Boston, USA",
      preferences: ["Art & Culture"],
    },
    {
      id: "5",
      name: "Alex Brown",
      email: "alex.brown@email.com",
      status: "banned",
      joinDate: "2023-09-18",
      lastLogin: "2023-11-15",
      totalBookings: 2,
      totalSpent: 598,
      phone: "+1 234 567 8904",
      location: "Miami, USA",
      preferences: ["Adventure"],
    },
    {
      id: "6",
      name: "Lisa Green",
      email: "lisa.green@email.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      status: "active",
      joinDate: "2023-07-30",
      lastLogin: "2024-01-11",
      totalBookings: 4,
      totalSpent: 1196,
      phone: "+1 234 567 8905",
      location: "Los Angeles, USA",
      preferences: ["Wine Tours", "Sightseeing"],
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const updateUserStatus = (userId: string, newStatus: User["status"]) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "banned":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const exportUsers = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Email,Status,Join Date,Total Bookings,Total Spent,Phone,Location\n" +
      filteredUsers
        .map(
          (user) =>
            `${user.id},${user.name},${user.email},${user.status},${user.joinDate},${user.totalBookings},$${user.totalSpent},${user.phone || ""},${user.location || ""}`,
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-gray-600">
              Manage customer accounts and view booking history
            </p>
          </div>
          <Button onClick={exportUsers}>
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {users.filter((u) => u.status === "active").length}
                </p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">
                  {users.filter((u) => u.status === "inactive").length}
                </p>
                <p className="text-sm text-gray-600">Inactive Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {users.filter((u) => u.status === "banned").length}
                </p>
                <p className="text-sm text-gray-600">Banned Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {users.reduce((sum, user) => sum + user.totalBookings, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name or email..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          <Badge variant={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Email:</span>{" "}
                            {user.email}
                          </div>
                          <div>
                            <span className="font-medium">Joined:</span>{" "}
                            {user.joinDate}
                          </div>
                          <div>
                            <span className="font-medium">Bookings:</span>{" "}
                            {user.totalBookings}
                          </div>
                          <div>
                            <span className="font-medium">Spent:</span> $
                            {user.totalSpent}
                          </div>
                          <div>
                            <span className="font-medium">Last Login:</span>{" "}
                            {user.lastLogin}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span>{" "}
                            {user.location || "N/A"}
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span>{" "}
                            {user.phone || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              User Details - {selectedUser?.name}
                            </DialogTitle>
                            <DialogDescription>
                              Complete user profile and booking history
                            </DialogDescription>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                  <AvatarImage
                                    src={selectedUser.avatar}
                                    alt={selectedUser.name}
                                  />
                                  <AvatarFallback>
                                    {getInitials(selectedUser.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-xl font-semibold">
                                    {selectedUser.name}
                                  </h3>
                                  <p className="text-gray-600">
                                    {selectedUser.email}
                                  </p>
                                  <Badge
                                    variant={getStatusColor(
                                      selectedUser.status,
                                    )}
                                  >
                                    {selectedUser.status}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">
                                    Contact Information
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">
                                        Email:
                                      </span>{" "}
                                      {selectedUser.email}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Phone:
                                      </span>{" "}
                                      {selectedUser.phone || "Not provided"}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Location:
                                      </span>{" "}
                                      {selectedUser.location || "Not provided"}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">
                                    Account Details
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">
                                        Member Since:
                                      </span>{" "}
                                      {selectedUser.joinDate}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Last Login:
                                      </span>{" "}
                                      {selectedUser.lastLogin}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Status:
                                      </span>{" "}
                                      {selectedUser.status}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">
                                    Booking Statistics
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">
                                        Total Bookings:
                                      </span>{" "}
                                      {selectedUser.totalBookings}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Total Spent:
                                      </span>{" "}
                                      ${selectedUser.totalSpent}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Average per Booking:
                                      </span>{" "}
                                      $
                                      {selectedUser.totalBookings > 0
                                        ? Math.round(
                                            selectedUser.totalSpent /
                                              selectedUser.totalBookings,
                                          )
                                        : 0}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">
                                    Preferences
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedUser.preferences?.map(
                                      (pref, index) => (
                                        <Badge key={index} variant="outline">
                                          {pref}
                                        </Badge>
                                      ),
                                    ) || (
                                      <span className="text-sm text-gray-500">
                                        No preferences set
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>

                      <Select
                        value={user.status}
                        onValueChange={(value: User["status"]) =>
                          updateUserStatus(user.id, value)
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">
                            <div className="flex items-center gap-2">
                              <UserCheck className="h-4 w-4" />
                              Active
                            </div>
                          </SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="banned">
                            <div className="flex items-center gap-2">
                              <Ban className="h-4 w-4" />
                              Banned
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No users found
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

export default UserManagement;
