import { useEffect, useState } from "react";
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
  Image,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  capacity: number;
  location: string;
  category: string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  mainImage: string;
  date: string;
}

const TourManagement = () => {
  const { toast } = useToast();
  const navigate  = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Modal open et état d'édition
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  // Formulaire commun (création/édition)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    capacity: "",
    location: "",
    category: "",
    status: "DRAFT" as const,
    mainImage: "",
    date: "",
  });

  const [tours, setTours] = useState<Tour[]>([]);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  // Fetch tours from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data } = await api.get("/tours");
        console.log(data)
        setTours(data);
      } catch (error) {
        console.error("Failed to fetch tours", error);
        toast({
          title: "Error",
          description: "Unable to load tours",
          variant: "destructive",
        });
      }
    };
    fetchTours();
  }, []);

  // Filter tours
  const filteredTours = tours.filter((tour) => {
    const search = searchQuery.toLowerCase();
    return (
      (tour.title || "").toLowerCase().includes(search) ||
      (tour.location || "").toLowerCase().includes(search) ||
      (tour.category || "").toLowerCase().includes(search)
    );
  });



  // Ouvre modal création
  const openCreateModal = () => {
    setEditingTour(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      capacity: "",
      location: "",
      category: "",
      status: "DRAFT",
      mainImage: "",
      date: "",
    });
    setIsModalOpen(true);
  };

  // Ouvre modal édition avec données préremplies
  const openEditModal = (tour: Tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      description: tour.description,
      price: String(tour.price),
      duration: tour.duration,
      capacity: String(tour.capacity),
      location: tour.location,
      category: tour.category,
      status: "DRAFT",
      mainImage: tour.mainImage,
      date: tour.date || "",
    });
    setIsModalOpen(true);
  };

  const isFormValid =
    (formData.title || '').trim() !== "" &&
    (formData.price || '').toString().trim() !== "" &&
    (formData.location || '').trim() !== "" &&
    (formData.category || '').trim() !== "";


  // Création d'un tour
  const handleCreateTour = async () => {
    if (!isFormValid) {
      toast({
        title: "Error",
        description:
          "Please fill in all required fields: Title, Category, Location, Price",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        slug: generateSlug(formData.title),
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        status: formData.status.toUpperCase(),
        category: formData.category,
        date: formData.date,
        mainImage: formData.mainImage
      };

      const response = await api.post("/tours", payload);
      setTours([...tours, response.data]);
      toast({ title: "Success", description: "Tour created successfully" });

      setFormData({
        title: "",
        description: "",
        price: "",
        duration: "",
        capacity: "",
        location: "",
        category: "",
        status: "DRAFT",
        mainImage: "",
        date: "",
      });
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Failed to create tour", error);

      if (
        error.response?.data?.message?.includes("Slug already exists") ||
        error.message?.includes("Slug already exists")
      ) {
        toast({
          title: "Duplicate Title",
          description:
            "A tour with this title already exists. Please change it.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Unable to create tour",
          variant: "destructive",
        });
      }
    }
  };

  // Mise à jour d'un tour
  const handleUpdateTour = async () => {
    if (!editingTour) return;
    if (!isFormValid) {
      toast({
        title: "Error",
        description: "Please fill in all required fields: Title, Category, Location, Price",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        slug: generateSlug(formData.title),
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        status: formData.status.toUpperCase(),
        date: formData.date,
        mainImage: formData.mainImage,
        category: formData.category,
        title: formData.title,
        duration:formData.duration
      };

      const { data: updatedTour } = await api.put(`/tours/${editingTour.id}`, payload);

      // Update local state instead of refetching
      setTours((prevTours) =>
        prevTours.map((t) => (t.id === editingTour.id ? updatedTour : t))
      );

      toast({ title: "Success", description: "Tour updated successfully" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update tour", error);
      toast({
        title: "Error",
        description: "Unable to update tour",
        variant: "destructive",
      });
    }
  };

  // Suppression d'un tour
  const handleDeleteTour = async (tourId: string) => {
    try {
      await api.delete(`/tours/${tourId}`);
      setTours(tours.filter((tour) => tour.id !== tourId));
      toast({ title: "Success", description: "Tour deleted successfully" });
    } catch (error) {
      console.error("Failed to delete tour", error);
      toast({
        title: "Error",
        description: "Unable to delete tour",
        variant: "destructive",
      });
    }
  };

  // Changement du statut d'un tour
  const handleStatusChange = async (
    tourId: string,
    newStatus: Tour["status"],
  ) => {
    try {
      await api.put(`/tours/${tourId}`, { status: newStatus });
      setTours(
        tours.map((tour) =>
          tour.id === tourId ? { ...tour, status: newStatus } : tour,
        ),
      );
      toast({
        title: "Success",
        description: `Tour status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Failed to update status", error);
      toast({
        title: "Error",
        description: "Unable to update tour status",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tour Management</h1>
            <p className="text-gray-600">Create and manage your tour packages</p>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateModal}>
                <Plus className="h-4 w-4 mr-2" />
                Create Tour
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTour ? "Edit Tour" : "Create New Tour"}</DialogTitle>
                <DialogDescription>
                  {editingTour
                    ? "Modify the tour details"
                    : "Add a new tour package to your offerings"}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Tour title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="299"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Tour description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Florence, Tuscany"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) =>
                        setFormData({ ...formData, duration: value })
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
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Wine & Food">Wine & Food</SelectItem>
                        <SelectItem value="Art & Culture">Art & Culture</SelectItem>
                        <SelectItem value="Sightseeing">Sightseeing</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Relaxation">Relaxation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="mainImage">mainImage URL</Label>
                  <Input
                    id="mainImage"
                    value={formData.mainImage}
                    onChange={(e) =>
                      setFormData({ ...formData, mainImage: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="date">Starting Date</Label>
                  <Input
                    id="date"
                    type="date"
                    className="inline-block border-gray-300 rounded border w-full mt-2 p-2"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    placeholder="2024-01-15"
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={editingTour ? handleUpdateTour : handleCreateTour}
                  disabled={!isFormValid}
                >
                  {editingTour ? "Update Tour" : "Create Tour"}
                </Button>
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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
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
                  src={tour.mainImage}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={
                    tour.status === "ACTIVE"
                      ? "default"
                      : tour.status === "INACTIVE"
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
                    {tour.date}
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => openEditModal(tour)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTour(tour.id)}
                    className="flex-1 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
                <div className="mt-4 flex">
                  <Button
                    variant="outline"
                    className="h-20 flex  gap-2 w-full"
                    onClick={() => navigate(`/admin/tours/${tour.id}/gallery`)}
                  >
                    <Image className="h-6 w-6" />
                    Manage Gallery
                  </Button>

                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 w-full"
                    onClick={() => navigate(`/admin/tours/${tour.id}/edit-details`)}
                  >
                    <Edit className="h-6 w-6" />
                    Edit Details
                  </Button>
                </div>


                <div className="mt-4">
                  <Select
                    value={tour.status}
                    onValueChange={(value) =>
                      handleStatusChange(tour.id, value as Tour["status"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTours.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 2L3.09 8.26L12 22L20.91 8.26L12 2Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tours found
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? "No tours match your search criteria. Try adjusting your search or filters."
                  : "No tours have been created yet. Click 'Create Tour' to add your first tour package."
                }
              </p>
              {!searchQuery && (
                <Button onClick={openCreateModal} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Tour
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TourManagement;
