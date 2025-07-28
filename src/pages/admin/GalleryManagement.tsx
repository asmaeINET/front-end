import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Upload,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  ExternalLink,
  Camera,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

type UploadType = "url" | "file";

interface TourGalleryItem {
  id: number;
  imageUrl: string;
  // backend currently doesn't expose caption -> keep it here if you plan to add it later
  caption?: string | null;
}

interface Tour {
  id: number;
  title: string;
  gallery: TourGalleryItem[]; // <— IMPORTANT: make sure your backend now returns id + imageUrl
}

const GalleryManagement = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [tour, setTour] = useState<Tour | null>(null);
  const [gallery, setGallery] = useState<TourGalleryItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<UploadType>("url");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // ---------------- helpers ----------------
  const fetchTour = useCallback(async () => {
    if (!tourId) return;
    try {
      const { data } = await api.get(`/tours/${tourId}`);
      // expecting data.gallery: [{ id, imageUrl }]
      setTour(data);
      setGallery(data.gallery ?? []);
      console.log(data.gallery)
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Unable to load tour data",
        variant: "destructive",
      });
    }
  }, [tourId, toast]);

  useEffect(() => {
    fetchTour();
  }, [fetchTour]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // ---------------- actions ----------------
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive",
      });
      return;
    }
    setNewFile(file);
  };

  const resetModal = () => {
    setNewImageUrl("");
    setNewFile(null);
    setCaption("");
    setUploadType("url");
    setIsAddModalOpen(false);
  };

  const handleAddImage = async () => {
    if (!tourId) return;
  
    // Validation
    if (uploadType === "url" && !newImageUrl.trim()) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive",
      });
      return;
    }
    if (uploadType === "file" && !newFile) {
      toast({
        title: "No file selected",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }
  
    setIsUploading(true);
  
    try {
      if (uploadType === "file" && newFile) {
        // Envoi multipart/form-data avec le fichier
        const formData = new FormData();
        formData.append("file", newFile);
  
        await api.post(`/tours/${tourId}/gallery/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Envoi JSON avec url
        await api.post(`/tours/${tourId}/gallery`, [
          { imageUrl: newImageUrl.trim() },
        ]);
      }
  
      await fetchTour();
      toast({ title: "Success", description: "Image saved to gallery" });
      resetModal();
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Unable to save image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  

  const handleRemoveImage = async (imageId: number) => {
    if (!tourId) return;
    try {
      await api.delete(`/tours/${tourId}/gallery/${imageId}`);
      setGallery((prev) => prev.filter((g) => g.id !== imageId));
      toast({ title: "Success", description: "Image deleted" });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Unable to delete image",
        variant: "destructive",
      });
    }
  };

  if (!tour) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading tour data...</p>
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
              onClick={() => navigate("/admin/tours")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tours
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gallery Management
              </h1>
              <p className="text-gray-600">
                Manage images for &quot;{tour.title}&quot;
              </p>
            </div>
          </div>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Image</DialogTitle>
                <DialogDescription>
                  Add a new image to the tour gallery
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Upload type */}
                <div className="flex gap-2">
                  <Button
                    variant={uploadType === "url" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadType("url")}
                    className="flex-1"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    URL
                  </Button>
                  <Button
                    variant={uploadType === "file" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setUploadType("file")}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>

                {uploadType === "url" && (
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}

                {uploadType === "file" && (
                  <div>
                    <Label htmlFor="imageFile">Select Image File</Label>
                    <div className="mt-2">
                      <input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        className="w-full h-32 border-dashed border-2 border-gray-300 hover:border-gray-400"
                        onClick={() =>
                          document.getElementById("imageFile")?.click()
                        }
                      >
                        <div className="flex flex-col items-center gap-2">
                          {newFile ? (
                            <>
                              <Camera className="h-8 w-8 text-green-600" />
                              <span className="text-sm font-medium">
                                {newFile.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {(newFile.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400" />
                              <span className="text-sm">
                                Click to upload image
                              </span>
                              <span className="text-xs text-gray-500">
                                Max 5MB
                              </span>
                            </>
                          )}
                        </div>
                      </Button>
                    </div>
                  </div>
                )}

                {/* (Optional) Caption – only works if you extend backend */}
                {/* <div>
                  <Label htmlFor="caption">Caption (Optional)</Label>
                  <Input
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Image description..."
                  />
                </div> */}

                {/* Preview */}
                {(newImageUrl || newFile) && (
                  <div>
                    <Label>Preview</Label>
                    <div className="mt-2 border rounded-lg overflow-hidden">
                      <img
                        src={
                          newFile
                            ? URL.createObjectURL(newFile)
                            : newImageUrl
                        }
                        alt="Preview"
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={resetModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddImage}
                  disabled={
                    isUploading ||
                    (uploadType === "url" && !newImageUrl.trim()) ||
                    (uploadType === "file" && !newFile)
                  }
                >
                  {isUploading ? "Adding..." : "Add Image"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Gallery Grid */
        
        }
        {gallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={image.imageUrl}
                    alt="Gallery image"
                    className="w-full h-48 object-cover"
                    // onError={(e) => {
                    //   (e.currentTarget as HTMLImageElement).src =
                    //     "/placeholder.svg";
                    // }}
                    onError={(e) => {
                      console.error("Image failed to load", image.imageUrl);
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveImage(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <ImageIcon className="h-16 w-16 text-gray-300 mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No images in gallery
                </h3>
                <p className="text-gray-600 mb-4">
                  Start building your tour gallery by adding some images
                </p>
                <Button onClick={() => setIsAddModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Image
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Gallery Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Gallery Statistics</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {gallery.length}
                </div>
                <div className="text-sm text-blue-600">Total Images</div>
              </div>
              {/* Drop these if you don't differentiate local/URL anymore */}
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {/* not tracked anymore */}
                  -
                </div>
                <div className="text-sm text-green-600">Local Uploads</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  -
                </div>
                <div className="text-sm text-purple-600">URL Images</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default GalleryManagement;
