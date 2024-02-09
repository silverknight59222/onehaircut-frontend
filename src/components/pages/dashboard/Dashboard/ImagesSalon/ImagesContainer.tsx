import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import useSnackbar from "@/hooks/useSnackbar";
import { FileDetails, ImageSalon } from "@/types";
import { AddIcon, DeleteIcon } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
interface ImagesContainerProps {
  title: string;
  type: "showcase" | "hairstyle";
  setIsLoading: (value: boolean) => void;
  salonImages: ImageSalon[];
  getAllSalonImages: () => void;
}

interface ValidationErrorType {
  image: string;
}

const ImagesContainer = ({
  title,
  type,
  salonImages,
  setIsLoading,
  getAllSalonImages,
}: ImagesContainerProps) => {
  const showSnackbar = useSnackbar();

  const defaultUploadedImage: FileDetails = {
    lastModified: 0,
    lastModifiedDate: new Date(),
    name: "",
    size: 0,
    type: "",
    webkitRelativePath: "",
  };
  const user = getLocalStorage('user');
  const user_data = user ? JSON.parse(user) : null;
  const isProSubscription = user_data ? user_data.subscription?.name?.includes("Pro") : false;
  const limit = isProSubscription ? 25 : 5;
  const hiddenFileInput = React.useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [images, setImages] = useState<ImageSalon[]>(salonImages);
  const [uploadedImage, setUploadedImage] =
    useState<FileDetails>(defaultUploadedImage);
  const [updateMode, setUpdateMode] = useState<ImageSalon | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrorType>(
    {
      image: "",
    }
  );

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current?.click();
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const fileUploaded = event.target?.files[0];
    setUploadedImage(fileUploaded);
    setSelectedImage(URL.createObjectURL(fileUploaded));
  };

  const canAddImage = () => {
    return images?.filter((image) => image.type === type).length < limit
  }

  const addImage = async () => {
    if (uploadedImage.size === 0) {
      setValidationErrors({
        image: "Image is required!",
      });
      return;
    }
    setValidationErrors({
      image: "",
    });
    const formData = new FormData();
    const hairSalon = getLocalStorage("hair_salon");
    const hairSalonId = hairSalon ? JSON.parse(hairSalon).id : null;
    if (images?.filter((image) => image.type === type).length < limit) {
      if (hairSalonId) {
        formData.append("hair_salon_id", hairSalonId);
      }
      formData.append("type", type);
      if (
        type === "showcase" &&
        images.filter((image) => image.type === "showcase").length === 0
      ) {
        formData.append("is_cover", 1 as unknown as Blob);
      } else {
        formData.append("is_cover", 0 as unknown as Blob);
      }
      formData.append("image", uploadedImage as unknown as Blob);
      setIsLoading(true);
      await dashboard
        .addSalonImage(formData)
        .then((res) => {
          getAllSalonImages();
          setSelectedImage("");
          setUploadedImage(defaultUploadedImage);
          showSnackbar("success", res.data.message);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      showSnackbar("error", "Limit Exceeded!");
    }
  };

  const selectImage = (image: ImageSalon) => {
    setUpdateMode(image);
  };
  const clearUpdateMode = () => {
    setUpdateMode(null);
  };
  const deleteImage = async () => {
    if (updateMode) {
      setIsLoading(true);
      await dashboard
        .deleteSalonImage(updateMode.id)
        .then((resp) => {
          if (images.length === 1) {
            setImages([]);
          }
          getAllSalonImages();
          setUpdateMode(null);
          showSnackbar("success", resp.data.message);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const makeCover = async (id: number) => {
    setIsLoading(true);
    await dashboard
      .makeSalonImageCover(id)
      .then((resp) => {
        getAllSalonImages();
        showSnackbar("success", resp.data.message);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setImages(salonImages);
  }, [salonImages]);
  return (
    <>
      <h2 className="text-3xl font-medium">{title}</h2>
      <div className="w-full flex flex-col md:flex-row sm:justify-between gap-4">
        <div className="flex justify-center">
          <div className="flex flex-col w-max gap-4">
            <div className="flex flex-col">
              <div
                className={`flex items-center p-4 rounded-2xl border-2 bg-white shadow-lg cursor-pointer`}
                onClick={handleClick}
              >
                <div className={`w-32 h-32 relative flex items-center`}>
                  {updateMode || selectedImage ? (
                    <Image
                      src={updateMode ? (updateMode.image.includes('http') ? updateMode.image : `${updateMode.image}`) : selectedImage}
                      // fill={true}
                      layout="fill"
                      objectFit="cover"
                      alt={
                        type === "showcase"
                          ? "Showcase Image"
                          : "Hairstyle Image"
                      }
                    />
                  ) : (
                    <div>
                      <p className="text-[10px] font-medium text-[#959595] text-center">
                        Photo
                      </p>
                      <p className="text-[10px] font-medium text-[#959595] text-center mt-2">
                        Ajouter une photo puis valider avec +
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
              <div>
                {validationErrors.image && !selectedImage && (
                  <p className="text-xs text-red-700 ml-1 mt-1">
                    {validationErrors.image}*
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              {updateMode && (
                <>
                  <button
                    onClick={deleteImage}
                    className={`flex items-center justify-center px-4 py-2 gap-4 rounded-md ${Theme_A.button.mediumGradientButton} shadow-md `}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    onClick={clearUpdateMode}
                    className={`flex items-center justify-center px-4 py-2 gap-4 rounded-md ${Theme_A.button.medWhiteColoredButton} shadow-md `}
                  >
                    Annuler
                  </button>
                </>
              )}
              {!updateMode && canAddImage() && (
                <button
                  onClick={addImage}
                  className={`flex items-center justify-center px-4 py-2 gap-4 rounded-md ${Theme_A.button.mediumGradientButton} shadow-md `}
                >
                  <AddIcon />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center sm:justify-end gap-4">
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2 w-max border-2 rounded-xl border-gray-300 p-5 min-h-[456px]">
            {images
              .filter((item) => {
                return item.type === type;
              })
              .map((item, index) => {
                return (
                  <div key={index} className="flex justify-center">
                    <div
                      onClick={() => selectImage(item)}
                      className={`p-4 shadow-lg h-max flex flex-col justify-between cursor-pointer border-2 transition rounded-xl hover:border-secondary ${item.id === updateMode?.id && "border-secondary"
                        }`}
                    >
                      <div className="relative w-32 h-32">
                        <Image
                        fill={true}
                        src={item.image.includes('http') ? item.image : `https://api.onehaircut.com${item.image}`}
                        alt="image"
                        layout="fill"
                        objectFit="cover" />
                      </div>
                      {!item.is_cover && type === "showcase" && (
                        <div
                          className={`cursor-pointer h-8 mt-2 text-sm flex items-center justify-center text-white px-4 py-1 gap-4 rounded-md ${Theme_A.button.mediumGradientButton} shadow-md`}
                          onClick={() => makeCover(item.id)}
                        >
                          Image de couverture
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            <div className="absolute right-2 bottom-1 text-sm">{images.filter(image => image.type === type).length}/{limit}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagesContainer;
