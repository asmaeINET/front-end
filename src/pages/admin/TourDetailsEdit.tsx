import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Save,
  Eye,
  Users,
  Clock,
  MapPin,
  Globe,
  Ticket,
  Bus,
  UserCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

interface TourDetails {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  price: number;
  //duration: string;
  location: string;
  groupSize: string;
  guideService: boolean;
  language: string;
  entryFees: string;
  transportation: string;
  mainImage: string;
  thumbnails: string[];
}

const TourDetailsEdit = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tour, setTour] = useState<TourDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    detailedDescription: "",
    groupSize: "",
    guideService: true,
    language: "",
    entryFees: "",
    transportation: "",
  });

  // Fetch tour data
  useEffect(() => {
    const fetchTourData = async () => {
      if (!tourId) return;
      
      try {
        const { data } = await api.get(`/tours/${tourId}`);
        setTour(data);
        setFormData({
          detailedDescription: data.detailedDescription || "",
          groupSize: data.groupSize || "",
          guideService: data.guideService ?? true,
          language: data.language || "",
          entryFees: data.entryFees || "",
          transportation: data.transportation || "",
        });
      } catch (error) {
        console.error("Failed to fetch tour data", error);
        toast({
          title: "Error",
          description: "Unable to load tour data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTourData();
  }, [tourId]);

  // Save tour details
  const handleSave = async () => {
    if (!tour) return;
    
    setSaving(true);
    try {
      const payload = {
        ...formData,
        guideService: formData.guideService,
      };
      
      const { data } = await api.put(`/tours/${tourId}/details`, payload);
      setTour({ ...tour, ...data });
      
      toast({
        title: "Success",
        description: "Tour details updated successfully",
      });
    } catch (error) {
      console.error("Failed to update tour details", error);
      toast({
        title: "Error",
        description: "Unable to update tour details",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Navigate to tour detail page for preview
  const handlePreview = () => {
    window.open(`/tour/${tourId}`, '_blank');
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading tour details...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!tour) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Tour not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/admin/tours')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tours
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Tour Details</h1>
              <p className="text-gray-600">Manage detailed information for "{tour.title}"</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Tour Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Tour Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Title</Label>
                  <p className="text-lg font-semibold text-gray-900">{tour.title}</p>
                </div>
                {/* <div>
                  <Label className="text-sm font-medium text-gray-700">Location</Label>
                  <p className="text-gray-800">{tour.location}</p>
                </div> */}
                {/* <div>
                  <Label className="text-sm font-medium text-gray-700">Duration</Label>
                  <p className="text-gray-800">{tour.duration}</p>
                </div> */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Price</Label>
                  <p className="text-lg font-semibold text-green-600">${tour.price}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Description */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="detailedDescription">
                    Description for Tour Detail Page
                  </Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, detailedDescription: e.target.value })
                    }
                    placeholder="Write a detailed description that will appear on the tour detail page..."
                    rows={6}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This description will be shown in the "Details" section of the tour page
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tour Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Tour Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="groupSize">Group Size Range</Label>
                    <Input
                      id="groupSize"
                      value={formData.groupSize}
                      onChange={(e) =>
                        setFormData({ ...formData, groupSize: e.target.value })
                      }
                      placeholder="5-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="language">Languages</Label>
                    <Input
                      id="language"
                      value={formData.language}
                      onChange={(e) =>
                        setFormData({ ...formData, language: e.target.value })
                      }
                      placeholder="English, Italian"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="transportation">Transportation</Label>
                    <Select
                      value={formData.transportation}
                      onValueChange={(value) =>
                        setFormData({ ...formData, transportation: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transportation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bus">Bus</SelectItem>
                        <SelectItem value="Bicycle">Bicycle</SelectItem>
                        <SelectItem value="Walking">Walking</SelectItem>
                        <SelectItem value="Boat">Boat</SelectItem>
                        <SelectItem value="Train">Train</SelectItem>
                        <SelectItem value="Car">Car</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="guideService">Guide Service</Label>
                    <Select
                      value={formData.guideService ? "true" : "false"}
                      onValueChange={(value) =>
                        setFormData({ ...formData, guideService: value === "true" })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Included</SelectItem>
                        <SelectItem value="false">Not Included</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="entryFees">Entry Fees</Label>
                  <Input
                    id="entryFees"
                    value={formData.entryFees}
                    onChange={(e) =>
                      setFormData({ ...formData, entryFees: e.target.value })
                    }
                    placeholder="Included / Not included / Museum fees not included"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Tour Image */}
            <Card>
              <CardHeader>
                <CardTitle>Tour Image</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={tour.mainImage}
                  alt={tour.title}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </CardContent>
            </Card>

            {/* Preview Details */}
            <Card>
              <CardHeader>
                <CardTitle>Details Preview</CardTitle>
                <p className="text-sm text-gray-600">
                  How this information will appear on the tour detail page
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.groupSize && (
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-800">
                      <span className="font-bold">Number of group:</span> {formData.groupSize}
                    </span>
                  </div>
                )}

                {/* <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-gray-800">
                    <span className="font-bold">Duration:</span> {tour.duration}
                  </span>
                </div> */}

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-gray-800">
                    <span className="font-bold">Departuring and arriving areas:</span> {tour.location}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-gray-800">
                    <span className="font-bold">Guide service:</span>{" "}
                    {formData.guideService ? "Included" : "Not Included"}
                  </span>
                </div>

                {formData.language && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-800">
                      <span className="font-bold">Language:</span> {formData.language}
                    </span>
                  </div>
                )}

                {formData.entryFees && (
                  <div className="flex items-center gap-3">
                    <Ticket className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-800">
                      <span className="font-bold">Entry Fees:</span> {formData.entryFees}
                    </span>
                  </div>
                )}

                {formData.transportation && (
                  <div className="flex items-center gap-3">
                    <Bus className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-800">
                      <span className="font-bold">Transportation:</span> {formData.transportation}
                    </span>
                  </div>
                )}

                {formData.detailedDescription && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Description</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {formData.detailedDescription}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/admin/tours/${tour.id}/gallery`)}
                >
                  Manage Gallery Images
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/admin/tours/${tour.id}')}
                >
                  Back to Tour Management
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TourDetailsEdit;
