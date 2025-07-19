import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  capacity: number;
  location: string;
  category: string;
  status: "active" | "inactive" | "draft";
  image: string;
  dates: string[];
}

const TourManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    capacity: "",
    location: "",
    category: "",
    status: "draft" as const,
    image: "",
    dates: "",
  });

  // Mock tours data
  const [tours, setTours] = useState<Tour[]>([
    {
      id: "1",
      title: "Tuscany Wine Tour",
      description:
        "Explore the beautiful vineyards of Tuscany with wine tasting",
      price: 299,
      duration: "Full Day",
      capacity: 12,
      location: "Chianti, Tuscany",
      category: "Wine & Food",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      dates: ["2024-01-15", "2024-01-20", "2024-01-25"],
    },
    {
      id: "2",
      title: "Florence Art Walk",
      description: "Discover Renaissance art and architecture in Florence",
      price: 149,
      duration: "Half Day",
      capacity: 8,
      location: "Florence, Tuscany",
      category: "Art & Culture",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop",
      dates: ["2024-01-16", "2024-01-18", "2024-01-22"],
    },
    {
      id: "3",
      title: "Pisa & Lucca Day Trip",
      description: "Visit the famous Leaning Tower and medieval Lucca",
      price: 199,
      duration: "Full Day",
      capacity: 15,
      location: "Pisa & Lucca",
      category: "Sightseeing",
      status: "inactive",
      image:
        "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=300&h=200&fit=crop",
      dates: ["2024-01-19", "2024-01-24", "2024-01-26"],
    },
  ]);

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateTour = () => {
    if (!newTour.title || !newTour.price || !newTour.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const tour: Tour = {
      id: Date.now().toString(),
      title: newTour.title,
      description: newTour.description,
      price: Number(newTour.price),
      duration: newTour.duration,
      capacity: Number(newTour.capacity),
      location: newTour.location,
      category: newTour.category,
      status: newTour.status,
      image:
        newTour.image ||
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      dates: newTour.dates
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d),
    };

    setTours([...tours, tour]);
    setNewTour({
      title: "",
      description: "",
      price: "",
      duration: "",
      capacity: "",
      location: "",
      category: "",
      status: "draft",
      image: "",
      dates: "",
    });
    setIsCreateModalOpen(false);

    toast({
      title: "Success",
      description: "Tour created successfully",
    });
  };

  const handleDeleteTour = (tourId: string) => {
    setTours(tours.filter((tour) => tour.id !== tourId));
    toast({
      title: "Success",
      description: "Tour deleted successfully",
    });
  };

  const handleStatusChange = (tourId: string, newStatus: Tour["status"]) => {
    setTours(
      tours.map((tour) =>
        tour.id === tourId ? { ...tour, status: newStatus } : tour,
      ),
    );
    toast({
      title: "Success",
      description: `Tour status updated to ${newStatus}`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tour Management
            </h1>
            <p className="text-gray-600">
              Create and manage your tour packages
            </p>
          </div>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Tour</DialogTitle>
                <DialogDescription>
                  Add a new tour package to your offerings
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newTour.title}
                      onChange={(e) =>
                        setNewTour({ ...newTour, title: e.target.value })
                      }
                      placeholder="Tour title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newTour.price}
                      onChange={(e) =>
                        setNewTour({ ...newTour, price: e.target.value })
                      }
                      placeholder="299"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTour.description}
                    onChange={(e) =>
                      setNewTour({ ...newTour, description: e.target.value })
                    }
                    placeholder="Tour description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newTour.location}
                      onChange={(e) =>
                        setNewTour({ ...newTour, location: e.target.value })
                      }
                      placeholder="Florence, Tuscany"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select
                      value={newTour.duration}
                      onValueChange={(value) =>
                        setNewTour({ ...newTour, duration: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Half Day">Half Day</SelectItem>
                        <SelectItem value="Full Day">Full Day</SelectItem>
                        <SelectItem value="2 Days">2 Days</SelectItem>
                        <SelectItem value="3 Days">3 Days</SelectItem>
                        <SelectItem value="1 Week">1 Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={newTour.capacity}
                      onChange={(e) =>
                        setNewTour({ ...newTour, capacity: e.target.value })
                      }
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newTour.category}
                      onValueChange={(value) =>
                        setNewTour({ ...newTour, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Wine & Food">Wine & Food</SelectItem>
                        <SelectItem value="Art & Culture">
                          Art & Culture
                        </SelectItem>
                        <SelectItem value="Sightseeing">Sightseeing</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Relaxation">Relaxation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newTour.image}
                    onChange={(e) =>
                      setNewTour({ ...newTour, image: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="dates">
                    Available Dates (comma-separated)
                  </Label>
                  <Input
                    id="dates"
                    value={newTour.dates}
                    onChange={(e) =>
                      setNewTour({ ...newTour, dates: e.target.value })
                    }
                    placeholder="2024-01-15, 2024-01-20, 2024-01-25"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateTour}>Create Tour</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={
                    tour.status === "active"
                      ? "default"
                      : tour.status === "inactive"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {tour.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{tour.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {tour.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {tour.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    Max {tour.capacity} people
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <DollarSign className="h-4 w-4" />${tour.price}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTour(tour.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Select
                    value={tour.status}
                    onValueChange={(value: Tour["status"]) =>
                      handleStatusChange(tour.id, value)
                    }
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tours found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or create a new tour
              </p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Tour
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default TourManagement;
