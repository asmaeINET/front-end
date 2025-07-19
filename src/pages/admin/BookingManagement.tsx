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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, CalendarIcon, Eye, Download, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  tour: {
    title: string;
    date: string;
    time: string;
  };
  status: "confirmed" | "pending" | "cancelled" | "completed";
  amount: number;
  bookingDate: string;
  participants: number;
  specialRequests?: string;
}

const BookingManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Mock bookings data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK001",
      customer: {
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 234 567 8900",
      },
      tour: {
        title: "Tuscany Wine Tour",
        date: "2024-01-15",
        time: "09:00 AM",
      },
      status: "confirmed",
      amount: 299,
      bookingDate: "2024-01-10",
      participants: 2,
      specialRequests: "Vegetarian meal preference",
    },
    {
      id: "BK002",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+1 234 567 8901",
      },
      tour: {
        title: "Florence Art Walk",
        date: "2024-01-16",
        time: "10:00 AM",
      },
      status: "pending",
      amount: 149,
      bookingDate: "2024-01-12",
      participants: 1,
    },
    {
      id: "BK003",
      customer: {
        name: "Mike Davis",
        email: "mike.davis@email.com",
        phone: "+1 234 567 8902",
      },
      tour: {
        title: "Chianti Countryside",
        date: "2024-01-17",
        time: "08:30 AM",
      },
      status: "confirmed",
      amount: 399,
      bookingDate: "2024-01-08",
      participants: 4,
      specialRequests: "Anniversary celebration",
    },
    {
      id: "BK004",
      customer: {
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        phone: "+1 234 567 8903",
      },
      tour: {
        title: "Pisa & Lucca Day Trip",
        date: "2024-01-18",
        time: "09:00 AM",
      },
      status: "cancelled",
      amount: 199,
      bookingDate: "2024-01-05",
      participants: 2,
    },
    {
      id: "BK005",
      customer: {
        name: "Alex Brown",
        email: "alex.brown@email.com",
        phone: "+1 234 567 8904",
      },
      tour: {
        title: "Tuscany Wine Tour",
        date: "2024-01-12",
        time: "09:00 AM",
      },
      status: "completed",
      amount: 299,
      bookingDate: "2024-01-01",
      participants: 3,
    },
  ]);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      booking.tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    const matchesDate =
      !dateFilter || booking.tour.date === format(dateFilter, "yyyy-MM-dd");

    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateBookingStatus = (
    bookingId: string,
    newStatus: Booking["status"],
  ) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking,
      ),
    );
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "completed":
        return "outline";
      default:
        return "secondary";
    }
  };

  const exportBookings = () => {
    // Mock export functionality
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Customer,Email,Tour,Date,Status,Amount,Participants\n" +
      filteredBookings
        .map(
          (booking) =>
            `${booking.id},${booking.customer.name},${booking.customer.email},${booking.tour.title},${booking.tour.date},${booking.status},$${booking.amount},${booking.participants}`,
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bookings.csv");
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
              Booking Management
            </h1>
            <p className="text-gray-600">Manage and track all tour bookings</p>
          </div>
          <Button onClick={exportBookings}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search bookings..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-40 justify-start text-left font-normal",
                      !dateFilter && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter
                      ? format(dateFilter, "MMM dd, yyyy")
                      : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFilter}
                    onSelect={setDateFilter}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {dateFilter && (
                <Button
                  variant="outline"
                  onClick={() => setDateFilter(undefined)}
                >
                  Clear Date
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {booking.customer.name}
                        </h3>
                        <Badge variant={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Booking ID:</span>{" "}
                          {booking.id}
                        </div>
                        <div>
                          <span className="font-medium">Tour:</span>{" "}
                          {booking.tour.title}
                        </div>
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {booking.tour.date}
                        </div>
                        <div>
                          <span className="font-medium">Participants:</span>{" "}
                          {booking.participants}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span>{" "}
                          {booking.customer.email}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span>{" "}
                          {booking.customer.phone}
                        </div>
                        <div>
                          <span className="font-medium">Amount:</span> $
                          {booking.amount}
                        </div>
                        <div>
                          <span className="font-medium">Booked:</span>{" "}
                          {booking.bookingDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              Booking Details - {selectedBooking?.id}
                            </DialogTitle>
                            <DialogDescription>
                              Complete booking information and customer details
                            </DialogDescription>
                          </DialogHeader>
                          {selectedBooking && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div>
                                  <h3 className="font-semibold mb-3">
                                    Customer Information
                                  </h3>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Name:</span>{" "}
                                      {selectedBooking.customer.name}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Email:
                                      </span>{" "}
                                      {selectedBooking.customer.email}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Phone:
                                      </span>{" "}
                                      {selectedBooking.customer.phone}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-semibold mb-3">
                                    Tour Information
                                  </h3>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="font-medium">Tour:</span>{" "}
                                      {selectedBooking.tour.title}
                                    </div>
                                    <div>
                                      <span className="font-medium">Date:</span>{" "}
                                      {selectedBooking.tour.date}
                                    </div>
                                    <div>
                                      <span className="font-medium">Time:</span>{" "}
                                      {selectedBooking.tour.time}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Participants:
                                      </span>{" "}
                                      {selectedBooking.participants}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-semibold mb-3">
                                  Booking Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">
                                      Booking ID:
                                    </span>{" "}
                                    {selectedBooking.id}
                                  </div>
                                  <div>
                                    <span className="font-medium">Status:</span>
                                    <Badge
                                      className="ml-2"
                                      variant={getStatusColor(
                                        selectedBooking.status,
                                      )}
                                    >
                                      {selectedBooking.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <span className="font-medium">Amount:</span>{" "}
                                    ${selectedBooking.amount}
                                  </div>
                                  <div>
                                    <span className="font-medium">
                                      Booking Date:
                                    </span>{" "}
                                    {selectedBooking.bookingDate}
                                  </div>
                                </div>
                              </div>
                              {selectedBooking.specialRequests && (
                                <div>
                                  <h3 className="font-semibold mb-3">
                                    Special Requests
                                  </h3>
                                  <p className="text-sm bg-gray-50 p-3 rounded">
                                    {selectedBooking.specialRequests}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Select
                        value={booking.status}
                        onValueChange={(value: Booking["status"]) =>
                          updateBookingStatus(booking.id, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBookings.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </p>
                <p className="text-sm text-gray-600">Confirmed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {bookings.filter((b) => b.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {bookings.filter((b) => b.status === "completed").length}
                </p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {bookings.filter((b) => b.status === "cancelled").length}
                </p>
                <p className="text-sm text-gray-600">Cancelled</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BookingManagement;
