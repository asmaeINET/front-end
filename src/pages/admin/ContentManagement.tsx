import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Edit,
  Trash2,
  Plus,
  Eye,
  Image,
  FileText,
  MessageSquare,
  Gift,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  tour: string;
  date: string;
  status: "published" | "pending" | "rejected";
  avatar?: string;
}

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  position: number;
}

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validUntil: string;
  tourIds: string[];
  isActive: boolean;
  code?: string;
}

const ContentManagement = () => {
  const { toast } = useToast();

  // Mock testimonials data
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "Maria Rodriguez",
      location: "Barcelona, Spain",
      rating: 5,
      comment:
        "Absolutely amazing experience! The wine tasting was incredible and our guide was so knowledgeable.",
      tour: "Tuscany Wine Tour",
      date: "2024-01-10",
      status: "published",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b602cf90?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "James Wilson",
      location: "London, UK",
      rating: 4,
      comment:
        "Great tour of Florence! Learned so much about Renaissance art. Would definitely recommend.",
      tour: "Florence Art Walk",
      date: "2024-01-08",
      status: "published",
    },
    {
      id: "3",
      name: "Sophie Chen",
      location: "Toronto, Canada",
      rating: 5,
      comment:
        "Perfect day trip to Pisa and Lucca. The countryside was breathtaking!",
      tour: "Pisa & Lucca Day Trip",
      date: "2024-01-12",
      status: "pending",
    },
  ]);

  // Mock banners data
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "1",
      title: "Discover Tuscany",
      subtitle: "Unforgettable tours through Italy's most beautiful region",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
      buttonText: "Explore Tours",
      buttonLink: "/packages",
      isActive: true,
      position: 1,
    },
    {
      id: "2",
      title: "Wine & Dine",
      subtitle: "Experience authentic Tuscan cuisine and world-class wines",
      image:
        "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&h=600&fit=crop",
      buttonText: "Book Now",
      buttonLink: "/packages",
      isActive: true,
      position: 2,
    },
  ]);

  // Mock special offers data
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([
    {
      id: "1",
      title: "Early Bird Special",
      description: "Book 30 days in advance and save 20% on all tours",
      discount: 20,
      validUntil: "2024-03-31",
      tourIds: ["all"],
      isActive: true,
      code: "EARLY20",
    },
    {
      id: "2",
      title: "Group Discount",
      description: "15% off for groups of 6 or more people",
      discount: 15,
      validUntil: "2024-12-31",
      tourIds: ["1", "2", "3"],
      isActive: true,
      code: "GROUP15",
    },
  ]);

  const updateTestimonialStatus = (
    id: string,
    status: Testimonial["status"],
  ) => {
    setTestimonials(
      testimonials.map((t) => (t.id === id ? { ...t, status } : t)),
    );
    toast({
      title: "Testimonial updated",
      description: `Status changed to ${status}`,
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
    toast({
      title: "Testimonial deleted",
      description: "The testimonial has been removed",
    });
  };

  const toggleBannerStatus = (id: string) => {
    setBanners(
      banners.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)),
    );
    toast({
      title: "Banner updated",
      description: "Banner status has been changed",
    });
  };

  const toggleOfferStatus = (id: string) => {
    setSpecialOffers(
      specialOffers.map((o) =>
        o.id === id ? { ...o, isActive: !o.isActive } : o,
      ),
    );
    toast({
      title: "Special offer updated",
      description: "Offer status has been changed",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
      case "inactive":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="text-gray-600">
            Manage website content, testimonials, and special offers
          </p>
        </div>

        <Tabs defaultValue="testimonials" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="testimonials"
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Banners
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Special Offers
            </TabsTrigger>
          </TabsList>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Customer Testimonials</span>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {
                        testimonials.filter((t) => t.status === "published")
                          .length
                      }{" "}
                      Published
                    </Badge>
                    <Badge variant="secondary">
                      {
                        testimonials.filter((t) => t.status === "pending")
                          .length
                      }{" "}
                      Pending
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            {testimonial.avatar ? (
                              <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-600 font-medium">
                                {testimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">
                                {testimonial.name}
                              </h4>
                              <span className="text-gray-500 text-sm">
                                from {testimonial.location}
                              </span>
                              <div className="flex items-center gap-1">
                                {renderStars(testimonial.rating)}
                              </div>
                              <Badge
                                variant={getStatusColor(testimonial.status)}
                              >
                                {testimonial.status}
                              </Badge>
                            </div>
                            <p className="text-gray-700 mb-2">
                              "{testimonial.comment}"
                            </p>
                            <div className="text-sm text-gray-500">
                              Tour: {testimonial.tour} • {testimonial.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {testimonial.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() =>
                                  updateTestimonialStatus(
                                    testimonial.id,
                                    "published",
                                  )
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateTestimonialStatus(
                                    testimonial.id,
                                    "rejected",
                                  )
                                }
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {testimonial.status === "published" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateTestimonialStatus(
                                  testimonial.id,
                                  "pending",
                                )
                              }
                            >
                              Unpublish
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteTestimonial(testimonial.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banners Tab */}
          <TabsContent value="banners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Homepage Banners</span>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Banner
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {banners.map((banner) => (
                    <div key={banner.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{banner.title}</h4>
                          <p className="text-gray-600 text-sm">
                            {banner.subtitle}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant={
                                banner.isActive ? "default" : "secondary"
                              }
                            >
                              {banner.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              Position: {banner.position}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Label
                              htmlFor={`banner-${banner.id}`}
                              className="text-sm"
                            >
                              Active
                            </Label>
                            <Switch
                              id={`banner-${banner.id}`}
                              checked={banner.isActive}
                              onCheckedChange={() =>
                                toggleBannerStatus(banner.id)
                              }
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Special Offers Tab */}
          <TabsContent value="offers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Special Offers & Promotions</span>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Offer
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {specialOffers.map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{offer.title}</h4>
                            <Badge
                              variant={offer.isActive ? "default" : "secondary"}
                            >
                              {offer.isActive ? "Active" : "Inactive"}
                            </Badge>
                            {offer.code && (
                              <Badge variant="outline">
                                Code: {offer.code}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {offer.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{offer.discount}% discount</span>
                            <span>Valid until: {offer.validUntil}</span>
                            <span>
                              Tours:{" "}
                              {offer.tourIds.includes("all")
                                ? "All"
                                : offer.tourIds.length}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Label
                              htmlFor={`offer-${offer.id}`}
                              className="text-sm"
                            >
                              Active
                            </Label>
                            <Switch
                              id={`offer-${offer.id}`}
                              checked={offer.isActive}
                              onCheckedChange={() =>
                                toggleOfferStatus(offer.id)
                              }
                            />
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                Update About Page
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Image className="h-6 w-6" />
                Manage Gallery
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Gift className="h-6 w-6" />
                Create Newsletter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;
